import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { nestiaSwaggerSetup } from './config/swagger/nestia-swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors();
  nestiaSwaggerSetup(app);

  const port = configService.get<string>('PORT') ?? 80;

  await app.listen(port);
}
bootstrap();
