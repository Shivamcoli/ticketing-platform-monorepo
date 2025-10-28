import path from "path";
import dotenv from "dotenv";
<<<<<<< Updated upstream
dotenv.config({ path: path.resolve(".env") });
=======
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
>>>>>>> Stashed changes

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { events, bookings } from "./schema";

async function sync() {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(connection);

  try {
    console.log("🛠️ Creating tables...");

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

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        event_id INTEGER NOT NULL REFERENCES events(id),
        user_email TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price_paid NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("❌ Failed to create tables:", err);
  } finally {
    await connection.end();
  }
}

sync();
