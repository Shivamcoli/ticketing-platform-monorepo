import { Controller, Get } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';

@Controller('events')
export class EventsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async getAllEvents() {
    return this.bookingsService.getEvents();
  }
}
