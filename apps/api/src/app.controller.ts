import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return '🎟️ Ticketing API is running!';
  }

  @Get('/status')
  getStatus(): string {
    return '✅ Backend is healthy!';
  }
}
