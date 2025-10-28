import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [BookingsModule],
  controllers: [EventsController],
})
export class EventsModule {}
