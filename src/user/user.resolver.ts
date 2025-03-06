import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserType } from './entities/current-user.entity';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  @Auth()
  async getProfile(@CurrentUser() user:UserType) {
      return user;
  }
}
