
// apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { DatabaseInitService } from './database/database-init.service';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';

import 'dotenv/config';


@Module({
  imports: [BookingsModule, EventsModule],
  providers: [DatabaseInitService],
})
export class AppModule {}
