import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { Token } from './entities/token.entity';
import { UserEntity } from 'src/user/entities/user-entity.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRegister } from 'src/user/entities/user-register.entity';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserRegister)
  async createUser(
    @Args('createUser') createUserData: CreateUserDto,
  ): Promise<UserRegister> {
    return this.authService.createUser(createUserData);
  }

  @Mutation(() => UserRegister)
  async login(
    @Args("login") loginDto: LoginDto
  ): Promise<UserRegister> {
      return this.authService.login(loginDto);
  }

  @Mutation(() => Token)
  async getTokens(
    @Args('createRefreshToken') createRefreshToken: CreateRefreshTokenDto,
  ): Promise<Token> {
    return this.authService.getTokens(createRefreshToken);
  }
}
