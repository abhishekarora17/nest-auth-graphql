import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Token } from './entities/token.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh-token';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/database/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user-entity.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, mobileNo } = createUserDto;

    let userExists = await this.userRepository.findOne({where: { email }});
    if(userExists){
      throw new BadRequestException(this.i18nService.translate('user.USER_ALREADY_EXISTS'));
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        mobileNo
    });

    // Save user after creating
    await this.userRepository.save(user);

    const tokens = await this.generateTokens(user.id, user.email);
    //update tokens in table after creating
    await this.updateRefreshToken(user.id, tokens);

    return {
      message: this.i18nService.translate('user.USER_CREATED'),
      success: true,
      data: Object.assign(new UserEntity(), user, { 
                accessToken: tokens.accessToken, 
                refreshToken: tokens.refreshToken 
            })
    };
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;

    // user credentials exists or not
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(this.i18nService.translate('user.USER_NOT_FOUND'));
    }

    // checking password is same or not
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new UnauthorizedException(this.i18nService.translate('user.USER_INVALID_CREDENTIALS'));
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return {
      success: true,
      message: "Login successful",
      data: Object.assign(new User(), user, { accessToken: token }),
    };
  }

  async getTokens(createRefreshTokenDto: CreateRefreshTokenDto): Promise<Token> {
    const { refreshToken  } = createRefreshTokenDto;
    let userExists = await this.userRepository.findOne({where: { refreshToken }});

    if(!userExists){
     throw new BadRequestException(this.i18nService.translate('user.USER_INVALID_REFRESH_TOKEN'));
    }

    const tokens = await this.generateTokens(userExists.id, userExists.email);
    //update tokens in table after creating
    await this.updateRefreshToken(userExists.id, tokens);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  }

  async generateTokens(userId: number, email: string) {
    const accessToken = this.jwtService.sign(
      { id: userId, email },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' }
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
