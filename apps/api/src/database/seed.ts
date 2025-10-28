import * as path from "path";
import dotenv from "dotenv";

// ✅ Force-load the .env file from apps/api
<<<<<<< Updated upstream
dotenv.config({ path: path.resolve(__dirname, "../.env") });
=======
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
>>>>>>> Stashed changes
console.log("🔍 Using DB URL:", process.env.DATABASE_URL);
import { db } from "./drizzle.config";
import { events } from "./schema";
import { InferInsertModel } from "drizzle-orm";
console.log("🔍 Using DB URL:", process.env.DATABASE_URL);

type NewEvent = InferInsertModel<typeof events>;

async function seed() {
  const seedData: NewEvent[] = [
    {
      name: "Rock Concert",
      date: new Date("2025-11-20T18:00:00Z"),
      venue: "Bangalore Arena",
      description: "Rock the night with your favorite bands.",
      totalTickets: 100,
      bookedTickets: 0,
      basePrice: "1000",
      currentPrice: "1000",
      floorPrice: "800",
      ceilingPrice: "2000",
    },
    {
      name: "Tech Conference",
      date: new Date("2025-12-05T10:00:00Z"),
      venue: "Hyderabad Expo Center",
      description: "Future of AI and Tech.",
      totalTickets: 80,
      bookedTickets: 0,
      basePrice: "1500",
      currentPrice: "1500",
      floorPrice: "1000",
      ceilingPrice: "2500",
    },
  ];

  try {
    await db.insert(events).values(seedData);
    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    process.exit(0);
  }
}

seed();
