import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/data/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[0.95rem] font-semibold text-white">
          {review.initial}
        </span>
        <div>
          <b className="block text-[0.92rem]">{review.author}</b>
          <Stars rating={review.rating} className="text-[0.78rem]" />
        </div>
      </div>
      <p className="text-[0.9rem] text-ink-soft">{review.text}</p>
    </div>
  );
}
