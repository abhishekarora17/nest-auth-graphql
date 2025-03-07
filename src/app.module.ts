import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from './config/config.module';
import { I18nConfigModule } from './config/i18n.module';
import { TypeOrmConfigModule } from './config/typeOrm.module';
import { GraphqlConfigModule } from './config/graphql.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    ConfigAppModule,
    TypeOrmConfigModule,
    GraphqlConfigModule,
    I18nConfigModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
