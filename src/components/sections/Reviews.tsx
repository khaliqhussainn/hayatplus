"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiStar, FiLoader, FiMessageSquare } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import {
  REVIEW_NAME_MAX,
  REVIEW_COMMENT_MAX,
  type ReviewRecord,
} from "@/lib/review-types";

function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          style={i < rating ? { fill: "currentColor" } : undefined}
          className={i < rating ? "" : "text-line"}
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Rate ${starValue} out of 5`}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            className="text-gold transition-transform hover:scale-110"
          >
            <FiStar
              size={24}
              style={starValue <= display ? { fill: "currentColor" } : undefined}
              className={starValue <= display ? "" : "text-line"}
            />
          </button>
        );
      })}
    </div>
  );
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;

  return new Date(iso).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewRecord[] | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]));
  }, []);

  const average =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setReviews((prev) => [data.review as ReviewRecord, ...(prev ?? [])]);
      setName("");
      setRating(0);
      setComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 sm:py-28 bg-beige scroll-mt-24">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="What People Are Saying"
          description="Real feedback from customers and visitors alike — share your own experience with Hayat+ Heart Tonic."
        />

        {reviews && reviews.length > 0 && (
          <FadeIn className="flex items-center justify-center gap-3 mt-8">
            <StarRating rating={Math.round(average)} size={17} />
            <span className="text-sm font-semibold text-ink">
              {average.toFixed(1)} out of 5
            </span>
            <span className="text-sm text-ink/50">
              ({reviews.length} review{reviews.length === 1 ? "" : "s"})
            </span>
          </FadeIn>
        )}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10">
          <FadeIn>
            <form
              onSubmit={handleSubmit}
              className="rounded-[18px] border border-line bg-white p-6 sm:p-7 flex flex-col gap-5 lg:sticky lg:top-28"
            >
              <h3 className="text-lg font-bold text-ink">Write a Review</h3>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink/70">Your Rating</span>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink/70">Your Name</span>
                <input
                  required
                  type="text"
                  maxLength={REVIEW_NAME_MAX}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                  placeholder="e.g. Ayesha K."
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-ink/70">Your Review</span>
                <textarea
                  required
                  rows={4}
                  maxLength={REVIEW_COMMENT_MAX}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest resize-none"
                  placeholder="Share your experience with Hayat+ Heart Tonic…"
                />
              </label>

              {error && <p className="text-xs text-red-600 leading-relaxed">{error}</p>}

              <Button
                type="submit"
                variant="primary"
                disabled={submitting}
                icon={submitting ? <FiLoader className="animate-spin" /> : undefined}
                className="w-full"
              >
                {submitting ? "Submitting…" : "Submit Review"}
              </Button>

              <AnimatePresence>
                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-forest font-medium text-center"
                  >
                    Thank you! Your review has been posted.
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-[11px] text-ink/45 leading-relaxed text-center">
                Open to everyone — you don&apos;t need to have purchased to leave a
                review.
              </p>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4">
              {reviews === null && (
                <p className="text-sm text-ink/50 text-center py-8">
                  Loading reviews…
                </p>
              )}

              {reviews && reviews.length === 0 && (
                <div className="flex flex-col items-center text-center gap-2 rounded-[18px] border border-dashed border-line py-14">
                  <FiMessageSquare className="text-ink/30" size={22} />
                  <p className="text-sm text-ink/50">
                    No reviews yet — be the first to share your experience.
                  </p>
                </div>
              )}

              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="rounded-[18px] border border-line bg-white p-5 sm:p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-beige text-forest text-sm font-bold uppercase">
                        {review.name.charAt(0)}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-ink">
                          {review.name}
                        </span>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <span className="text-xs text-ink/40 flex-shrink-0">
                      {timeAgo(review.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
