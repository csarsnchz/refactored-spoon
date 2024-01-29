import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v0.0.1');
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
