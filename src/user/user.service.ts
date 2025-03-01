import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './database/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user-entity.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, mobileNo } = createUserDto;

    let userExists = await this.userRepository.findOne({where: { email }});

    if(userExists){
      let response = new UserEntity();
      response.message = 'User already exists';
      response.success = false;
      return response
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      mobileNo
    });

    await this.userRepository.save(user);
  
    const tokens = await this.generateTokens(user.id, user.email);
    user.refreshToken = await this.updateRefreshToken(user.id, tokens.refreshToken);

    let response = new UserEntity();
    response.message = 'User already exists';
    response.success = false;
    response.data = user;
    return response;
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return {
      success: true,
      message: "Login successful",
      data: Object.assign(new User(), user, { accessToken: token }),
    };
  }

  private async generateTokens(userId: number, email: string) {
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

  private async updateRefreshToken(userId: number, refreshToken: string): Promise<string> {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, { refreshToken: hashedToken });
    return hashedToken;
  }
}
