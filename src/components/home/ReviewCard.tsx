import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/data/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="mb-5 break-inside-avoid rounded-card border border-line bg-white p-6">
      {/* Comilla decorativa */}
      <span aria-hidden className="font-accent block text-5xl leading-none text-brand/25">
        &ldquo;
      </span>

      {/* Texto de la reseña — protagonista */}
      <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{review.text}</p>

      {/* Autor */}
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[0.95rem] font-semibold text-white">
          {review.initial}
        </span>
        <div>
          <b className="block text-[0.9rem] text-ink">{review.author}</b>
          <div className="text-[0.78rem] text-muted">
            Paciente · <Stars rating={review.rating} className="text-[0.8rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
