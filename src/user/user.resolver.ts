import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UserEntity } from './entities/user-entity.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/roles/enum/user-role.enum';
import { PaginateInput } from './dto/paginate.input';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @Auth()
  async getProfile(@CurrentUser() user) : Promise<UserEntity> {
      return this.userService.getProfile(user);
  }

  @Mutation(() => [UserEntity])
  @Roles(UserRole.ADMIN)
  async getUsers(@Args('Pagination') paginateInput: PaginateInput) : Promise<UserEntity[]> {
      return this.userService.getUsers(paginateInput);
  }
}
