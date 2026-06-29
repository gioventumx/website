import { ReviewCard } from "./ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { testimonials } from "@/data/testimonials";
import { home } from "@/data/home";

export function Testimonials() {
  const t = home.testimonials;

  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="mb-[46px] max-w-[620px]">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {t.titleTop} <span className="font-accent text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[1.02rem] text-muted">{t.body}</p>
        </div>

        <div className="mb-[38px] flex flex-wrap items-center gap-[30px]">
          <div className="flex items-center gap-3.5">
            <span className="text-[2.4rem] font-semibold leading-none text-ink">
              {testimonials.googleScore.value}
            </span>
            <div>
              <Stars rating={5} />
              <small className="block text-[0.82rem] text-muted">
                {testimonials.googleScore.count}
              </small>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
          {testimonials.reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
