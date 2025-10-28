import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: timestamp("date", { withTimezone: false }).notNull(),
  venue: text("venue").notNull(),
  description: text("description"),
  totalTickets: integer("total_tickets").notNull(),
  bookedTickets: integer("booked_tickets").default(0).notNull(),
  basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
  currentPrice: numeric("current_price", { precision: 10, scale: 2 }).notNull(),
  floorPrice: numeric("floor_price", { precision: 10, scale: 2 }).notNull(),
  ceilingPrice: numeric("ceiling_price", { precision: 10, scale: 2 }).notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id)
    .notNull(),
  userEmail: text("user_email").notNull(),
  quantity: integer("quantity").notNull(),
  pricePaid: numeric("price_paid", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
