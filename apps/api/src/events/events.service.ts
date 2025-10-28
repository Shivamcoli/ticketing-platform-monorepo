import { Injectable } from '@nestjs/common';
import { db } from '../database/drizzle.config';
import { events } from '../database/schema';
import { calculateDynamicPrice } from '../utils/pricing';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsService {
  async getAll() {
    const all = await db.select().from(events);

    return all.map((e) => ({
      ...e,
      currentPrice: calculateDynamicPrice({
        basePrice: Number(e.basePrice),
        floorPrice: Number(e.floorPrice),
        ceilingPrice: Number(e.ceilingPrice),
        totalTickets: Number(e.totalTickets),
        bookedTickets: Number(e.bookedTickets),
        eventDate: e.date.toISOString(),
      }),

    }));
  }

  async getById(id: number) {
    const [e] = await db.select().from(events).where(eq(events.id, id));
    if (!e) throw new Error('Event not found');

    return {
      ...e,
      currentPrice: calculateDynamicPrice({
        basePrice: Number(e.basePrice),
        floorPrice: Number(e.floorPrice),
        ceilingPrice: Number(e.ceilingPrice),
        totalTickets: Number(e.totalTickets),
        bookedTickets: Number(e.bookedTickets),
        eventDate: e.date.toISOString(),
      }),

    };
  }
}
