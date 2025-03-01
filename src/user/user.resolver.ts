import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user-entity.entity';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String) 
  async hello() {
    return 'hello';
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserData') createUserData: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => UserEntity)
  async login(@Args("loginDto") loginDto: LoginDto): Promise<UserEntity> {
      return this.userService.login(loginDto);
  }
}
