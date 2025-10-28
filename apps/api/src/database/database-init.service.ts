import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  async onModuleInit() {
    console.log('🧩 Checking and creating database tables...');

    const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
    const db = drizzle(connection);

    try {
      // Create events table if it doesn’t exist
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

      // Create bookings table if it doesn’t exist
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

      console.log('✅ Database tables verified / created!');
    } catch (error) {
      console.error('❌ Error while initializing DB:', error);
    } finally {
      await connection.end();
    }
  }
}
