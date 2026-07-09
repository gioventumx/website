import { ReviewCard } from "@/components/home/ReviewCard";
import { GoogleRatingScore } from "@/components/ui/GoogleRating";
import { testimoniosDerma } from "@/data/testimonios-derma";
import { home } from "@/data/home";

// Mismo masonry y encabezado (score Google) que la sección del Home, con las
// reseñas propias de Dermatología. Encabezado reutilizado por consistencia.
export function Testimonios() {
  const t = home.testimonials;

  return (
    <section id="testimonios" className="scroll-mt-[96px] bg-bg pb-[clamp(30px,4vw,48px)] pt-[clamp(40px,5vw,64px)]">
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

        {/* Masonry (columnas CSS): 1 col en móvil, 2 en sm, 3 en lg */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimoniosDerma.reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
