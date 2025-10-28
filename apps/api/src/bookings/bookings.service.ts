import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { bookings, events } from '../database/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class BookingsService {
  async create(eventId: number, userEmail: string, quantity: number) {
    return await db.transaction(async (tx) => {
      // Step 1: Lock event to prevent race conditions
      const [event] = await tx
        .select()
        .from(events)
        .where(eq(events.id, eventId))
        .for('update');

      if (!event) throw new Error('Event not found');

      // Step 2: Check availability
      const availableSeats = event.totalTickets - event.bookedTickets;
      if (availableSeats < quantity) {
        throw new Error(`Not enough tickets available. Only ${availableSeats} left.`);
      }

      // Step 3: Dynamic Pricing Logic 💰
      // Base condition 1: increase 20% if less than 20% seats left
      // Base condition 2: decrease 10% if more than 80% seats left
      let newPrice = Number(event.currentPrice);
      const remainingAfterBooking = availableSeats - quantity;
      const remainingRatio = remainingAfterBooking / event.totalTickets;

      if (remainingRatio < 0.2) {
        newPrice = Math.min(Number(event.ceilingPrice), newPrice * 1.2);
      } else if (remainingRatio > 0.8) {
        newPrice = Math.max(Number(event.floorPrice), newPrice * 0.9);
      }

      // Step 4: Insert booking
      const pricePerTicket = newPrice;
      const totalPrice = (pricePerTicket * quantity).toFixed(2);

      const [booking] = await tx
        .insert(bookings)
        .values({
          eventId,
          userEmail,
          quantity,
          pricePaid: String(totalPrice),
        })
        .returning();

      // Step 5: Update booked count + current price
      await tx
        .update(events)
        .set({
          bookedTickets: sql`${events.bookedTickets} + ${quantity}`,
          currentPrice: newPrice.toFixed(2),
        })
        .where(eq(events.id, eventId));

      return {
        booking,
        remainingSeats: remainingAfterBooking,
        newPrice: newPrice.toFixed(2),
        message: `Booking successful! ${remainingAfterBooking} seats left.`,
      };
    });
  }

  async getEvents() {
    const result = await db.select().from(events);
    return result.map((e) => ({
      ...e,
      availableSeats: e.totalTickets - e.bookedTickets,
    }));
  }
}
