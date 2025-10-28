import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import path from 'path';

// 🧩 Always resolve .env from monorepo root
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
  override: true,
});

// 🔍 Log which DATABASE_URL is being used
console.log('🧩 Effective DATABASE_URL =>', process.env.DATABASE_URL);

async function bootstrap() {
  // Create the NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS for your frontend (Next.js on port 3000)
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('🚀 API running on http://localhost:3001/api');
}

bootstrap();
