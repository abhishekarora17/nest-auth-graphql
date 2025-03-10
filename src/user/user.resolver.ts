import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserEntity } from './entities/user-entity.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @Auth()
  async getProfile(@CurrentUser() user) : Promise<UserEntity> {
      return this.userService.getProfile(user);
  }


  @Query(() => [UserEntity])
  @Auth()
  async getUsers() : Promise<UserEntity[]> {
      return this.userService.getUsers();
  }
}
