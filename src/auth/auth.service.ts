import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Token } from './entities/token.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { Roles } from 'src/roles/database/roles.entity';
import { UserRegister } from 'src/user/entities/user-register.entity';
import { AuthResponse , TokenResponse} from './response/auth.response';

@Injectable()
export class AuthService {
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserRegister> {
    const { name, email, password, mobileNo, role } = createUserDto;

    let userExists = await this.userRepository.findOne({where: { email }});
    if(userExists){
      throw new BadRequestException(this.i18nService.translate('user.USER_ALREADY_EXISTS'));
    }

    const roleEntity = await this.roleRepository.findOne({ where: { id: role } });
    if (!roleEntity) {
      throw new BadRequestException(this.i18nService.translate('user.USER_ALREADY_EXISTS'));
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        mobileNo,
        role:roleEntity
    });

    // Save user after creating
    await this.userRepository.save(user);

    const tokens = await this.generateTokens(user.id, user.email, roleEntity.name);
    // update tokens in table after creating
    await this.updateRefreshToken(user.id, tokens);

    let newUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ["role"],
    });

    if (!newUser) {
        throw new BadRequestException(this.i18nService.translate('user.USER_NOT_FOUND'));
    }

    return AuthResponse.decode(Object.assign(new UserRegister(), newUser, {
      message: this.i18nService.translate('user.USER_CREATED'),
      accessToken: tokens.accessToken, 
      refreshToken: tokens.refreshToken 
    }));
  }

  async login(loginDto: LoginDto): Promise<UserRegister> {
    const { email, password } = loginDto;

    // user credentials exists or not
    const user = await this.userRepository.findOne({ 
      where: { email }, 
      relations : { role : true}
    });

    if (!user) {
      throw new BadRequestException(this.i18nService.translate('user.USER_NOT_FOUND'));
    }

    // checking password is same or not
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new UnauthorizedException(this.i18nService.translate('user.USER_INVALID_CREDENTIALS'));
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role.name);
    // update tokens in table after creating
    await this.updateRefreshToken(user.id, tokens);

    return AuthResponse.decode(Object.assign(new UserRegister(), user, {
      message: this.i18nService.translate('user.USER_LOGGED_IN'),
      accessToken: tokens.accessToken, 
      refreshToken: tokens.refreshToken 
    }));
  }

  async getTokens(createRefreshTokenDto: CreateRefreshTokenDto): Promise<Token> {
    const { refreshToken  } = createRefreshTokenDto;
    let userExists = await this.userRepository.findOne({
      where: { refreshToken },
      relations: {role: true}
    });

    if(!userExists){
      throw new BadRequestException(this.i18nService.translate('user.USER_INVALID_REFRESH_TOKEN'));
    }

    const tokens = await this.generateTokens(userExists.id, userExists.email, userExists.role.name);
    //update tokens in table after creating
    await this.updateRefreshToken(userExists.id, tokens);

    return TokenResponse.decode(tokens);
  }

  async generateTokens(userId: number, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      { id: userId, email , role},
      { secret: process.env.JWT_SECRET, expiresIn: '30m' }
    );

    const refreshToken = this.jwtService.sign(
      { id: userId, email },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: number, tokens: { accessToken: string; refreshToken: string }){
    await this.userRepository.update(userId, { refreshToken: tokens.refreshToken, accessToken: tokens.accessToken });
  }
}
