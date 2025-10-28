import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  async onModuleInit() {
    console.log('🧩 Checking and creating database tables...');

    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL is not set. Aborting DB init.');
      return;
    }

    const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(connection);

    try {
      // ✅ Create the `events` table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS events (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          date TIMESTAMP NOT NULL,
          venue TEXT NOT NULL,
          description TEXT,
          total_tickets INTEGER NOT NULL,
          booked_tickets INTEGER DEFAULT 0 NOT NULL,
          base_price NUMERIC(10,2) NOT NULL,
          current_price NUMERIC(10,2) NOT NULL,
          floor_price NUMERIC(10,2) NOT NULL,
          ceiling_price NUMERIC(10,2) NOT NULL
        );
      `);

      // ✅ Create the `bookings` table
      await db.execute(`
        CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
          user_email TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          price_paid NUMERIC(10,2) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );
      `);

      // ✅ Auto-seed if no events exist
      const result = await db.execute(`SELECT COUNT(*) AS count FROM events;`);
      const count = Number(result[0]?.count || 0);

      if (count === 0) {
        console.log('🌱 No events found, seeding default data...');
        await db.execute(`
          INSERT INTO events
            (name, date, venue, description, total_tickets, booked_tickets, base_price, current_price, floor_price, ceiling_price)
          VALUES
            ('Rock Concert', '2025-11-20 18:00:00', 'Bangalore Arena', 'Rock the night with your favorite bands.', 100, 0, 1000, 1000, 800, 2000),
            ('Tech Conference', '2025-12-05 10:00:00', 'Hyderabad Expo Center', 'Future of AI and Tech.', 80, 0, 1500, 1500, 1000, 2500);
        `);
        console.log('✅ Seeded initial events!');
      }
    } catch (error) {
      console.error('❌ Error while initializing DB:', error);
    } finally {
      await connection.end();
    }
  }
}
