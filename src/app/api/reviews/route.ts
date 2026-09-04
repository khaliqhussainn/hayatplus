import { NextResponse } from "next/server";
import { listReviews, insertReview } from "@/lib/reviews";
import {
  REVIEW_NAME_MAX,
  REVIEW_COMMENT_MIN,
  REVIEW_COMMENT_MAX,
} from "@/lib/review-types";

export async function GET() {
  const reviews = await listReviews();
  return NextResponse.json({ reviews });
}

export async function POST(request: Request) {
  let payload: { name?: unknown; rating?: unknown; comment?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const comment = typeof payload.comment === "string" ? payload.comment.trim() : "";
  const rating = Number(payload.rating);

  if (!name || name.length > REVIEW_NAME_MAX) {
    return NextResponse.json({ error: "Please enter a valid name" }, { status: 400 });
  }

  if (
    !comment ||
    comment.length < REVIEW_COMMENT_MIN ||
    comment.length > REVIEW_COMMENT_MAX
  ) {
    return NextResponse.json(
      {
        error: `Review must be between ${REVIEW_COMMENT_MIN} and ${REVIEW_COMMENT_MAX} characters`,
      },
      { status: 400 }
    );
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  try {
    const review = await insertReview({ name, rating, comment });
    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error("Failed to save review", err);
    return NextResponse.json(
      { error: "Something went wrong saving your review. Please try again." },
      { status: 503 }
    );
  }
}
