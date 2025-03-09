import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './database/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RolesModule {}
