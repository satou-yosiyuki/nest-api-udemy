import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { request } from 'express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

// バックエンドは3005
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    // フロント、バックをcookieベースで通信する
    credentials: true,
    // React側のアクセスを許可
    origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  await app.listen(3005);
}
bootstrap();
