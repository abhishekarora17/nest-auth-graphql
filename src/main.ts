import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './database/app-datasource';

async function bootstrap() {
  await AppDataSource.initialize()
        // .then(() => console.log("Database Connected"))
        // .catch((error) => console.error("Database Connection Error:", error));

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
