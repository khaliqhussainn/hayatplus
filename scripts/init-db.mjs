import postgres from "postgres";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const schema = readFileSync(join(__dirname, "..", "db", "schema.sql"), "utf-8");

const sql = postgres(connectionString);

try {
  await sql.unsafe(schema);
  console.log("Database schema is up to date.");
} finally {
  await sql.end();
}
