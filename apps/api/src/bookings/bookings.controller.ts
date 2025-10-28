import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  async createBooking(
    @Body('eventId') eventId: number,
    @Body('userEmail') userEmail: string,
    @Body('quantity') quantity: number,
  ) {
    return this.service.create(eventId, userEmail, quantity);
  }
}
