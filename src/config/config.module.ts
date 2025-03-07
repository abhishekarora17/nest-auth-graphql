import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes environment variables from .env available globally
      envFilePath: '.env',
    }),
  ],
})
export class ConfigAppModule {};