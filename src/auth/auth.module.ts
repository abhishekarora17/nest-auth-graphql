import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: "1h" },
        }),
    }),
    UserModule,
    RolesModule
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, JwtModule],

})
export class AuthModule {}
