import postgres from "postgres";

const sql = postgres("postgres://postgres:password@localhost:5432/ticketing");

async function test() {
  try {
    const result = await sql`SELECT 1 + 1 AS result`;
    console.log("✅ Connection successful:", result);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await sql.end();
  }
}

test();
