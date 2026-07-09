import { ReviewCard } from "./ReviewCard";
import { GoogleRatingScore } from "@/components/ui/GoogleRating";
import { testimonials } from "@/data/testimonials";
import { home } from "@/data/home";

export function Testimonials() {
  const t = home.testimonials;

  return (
    <section className="bg-bg pb-[clamp(30px,4vw,48px)] pt-[clamp(15px,2vw,24px)]">
      <div className="container-x">
        {/* Encabezado centrado: título + apoyo + score Google (vertical) */}
        <div className="mx-auto mb-10 max-w-[640px] text-center md:mb-12">
          <span className="eyebrow">{t.eyebrow}</span>

          {/* Score Google (dinámico por sucursal) — entre el eyebrow y el título */}
          <GoogleRatingScore />

          <h2 className="mt-5 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {t.titleTop} <span className="font-accent text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[1.02rem] text-muted">{t.body}</p>
        </div>

        {/* Masonry (columnas CSS): altura de cada tarjeta según su contenido */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
