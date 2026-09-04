import { getDb } from "@/lib/db";
import type { ReviewPayload, ReviewRecord } from "@/lib/review-types";

export * from "@/lib/review-types";

export async function listReviews(): Promise<ReviewRecord[]> {
  const sql = getDb();
  if (!sql) return [];

  const rows = await sql<ReviewRecord[]>`
    SELECT * FROM reviews ORDER BY created_at DESC
  `;
  return rows;
}

/**
 * Unlike order placement, a review has no fallback path — persistence is
 * the entire point, so callers must surface a failure rather than treat
 * it as best-effort.
 */
export async function insertReview(review: ReviewPayload): Promise<ReviewRecord> {
  const sql = getDb();
  if (!sql) throw new Error("Reviews are not configured on this deployment");

  const rows = await sql<ReviewRecord[]>`
    INSERT INTO reviews (name, rating, comment)
    VALUES (${review.name}, ${review.rating}, ${review.comment})
    RETURNING *
  `;
  return rows[0];
}
