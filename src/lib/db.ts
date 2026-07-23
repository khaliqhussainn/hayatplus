import postgres from "postgres";

let sql: ReturnType<typeof postgres> | null = null;

/**
 * Returns a lazily-initialized Postgres client, or null if DATABASE_URL
 * isn't configured. Callers must treat a null return as "no database yet"
 * rather than an error — order placement stays functional without one.
 */
export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!sql) {
    sql = postgres(connectionString);
  }

  return sql;
}
