import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your Next.js app
    methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
    credentials: true,               // Optional: allows cookies/headers
  });

  // ✅ Optional: add /api prefix to all routes
  app.setGlobalPrefix('api');

  // Start the server
  await app.listen(3001);
  console.log('🚀 API running on http://localhost:3001/api');
}

bootstrap();
