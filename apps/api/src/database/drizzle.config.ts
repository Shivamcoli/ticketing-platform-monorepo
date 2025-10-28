

// apps/api/src/database/drizzle.config.ts
import * as dotenv from 'dotenv';
import path from 'path';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// 🧩 Explicitly load the .env file from the monorepo root
const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath, override: true });

console.log('🧩 Loading .env from:', envPath);
console.log('🧩 DATABASE_URL =>', process.env.DATABASE_URL);

// 🚨 Fail fast if not defined
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined! Check your .env file at', envPath);
  process.exit(1);
}

// ✅ Create and export a reusable Drizzle connection
export const connection = postgres(process.env.DATABASE_URL!, { max: 1 });

export const db = drizzle(connection);
