import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config"; // ✅ ensure env file is loaded

const connectionString = process.env.DATABASE_URL!;
export const connection = postgres(connectionString, { max: 10 });
export const db = drizzle(connection);
