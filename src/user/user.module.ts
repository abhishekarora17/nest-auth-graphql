import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { IsEmailAlreadyExistConstraint } from './validation/email.validation';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService , IsEmailAlreadyExistConstraint],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
