import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultCorsOrigins = 'https://mia-dota.onrender.com';

const corsOrigins = (process.env.CORS_ORIGIN ?? defaultCorsOrigins)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.enableCors({
  origin: corsOrigins,
  credentials: true,});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

   const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');
}
bootstrap();