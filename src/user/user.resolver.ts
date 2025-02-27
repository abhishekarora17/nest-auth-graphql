import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

import { User } from './entities/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String) 
  async hello() {
    return 'hello';
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserData);
  }
}
