import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { Token } from './entities/token.entity';
import { UserEntity } from 'src/user/entities/user-entity.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Token)
  async getTokens(
    @Args('createRefreshToken') createRefreshToken: CreateRefreshTokenDto,
  ): Promise<Token> {
    return this.authService.getTokens(createRefreshToken);
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') createUserData: CreateUserDto,
  ): Promise<UserEntity> {
    return this.authService.createUser(createUserData);
  }

  @Mutation(() => UserEntity)
  async login(
    @Args("login") loginDto: LoginDto
  ): Promise<UserEntity> {
      return this.authService.login(loginDto);
  }


}
