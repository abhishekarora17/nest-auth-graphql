import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

import { Message } from './entities/message.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String) 
  async hello() {
    return 'hello';
  }

  @Mutation(() => Message)
  async createUser(
    @Args('createUserData') createUserData: CreateUserDto,
  ): Promise<Message> {
    return this.userService.createUser(createUserData);
  }
}
