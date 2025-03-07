import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigService } from "src/typeOrm/typeOrm.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigService,
      inject: [ConfigService],
    }),
  ],
})

export class TypeOrmConfigModule {};
