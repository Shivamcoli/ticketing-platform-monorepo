import { Module } from '@nestjs/common';
import { DatabaseInitService } from './database/database-init.service';
import { BookingsModule } from './bookings/bookings.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [BookingsModule, EventsModule],
  providers: [DatabaseInitService],
})
export class AppModule {}
