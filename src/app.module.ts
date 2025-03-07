import { Module } from '@nestjs/common';
import { Config, TypeOrm , Graphql, I18n} from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    Config,
    TypeOrm,
    Graphql,
    I18n,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
