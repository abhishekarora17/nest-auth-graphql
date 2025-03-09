import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const typeOrmConfigService = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  autoLoadEntities: true,
  synchronize: false, // Set false in production
  entities: [path.join(__dirname, 'database/core/**/*.entity{.ts,.js}')],
});
