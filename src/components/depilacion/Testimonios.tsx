import { ReviewCard } from "@/components/home/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { depilacion } from "@/data/depilacion";

// Encabezado con score de Google (4.9) + grid de reseñas (placeholder). Reutiliza
// ReviewCard. Grid 3 → 1 en móvil.
export function Testimonios() {
  const t = depilacion.testimonios;

  return (
    <section className="bg-white px-6 py-[clamp(60px,8vw,100px)] md:px-10">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="eyebrow">{t.eyebrow}</span>

          {/* Score Google — vertical, entre eyebrow y título */}
          <div className="mt-5 flex flex-col items-center gap-1">
            <span className="text-[2.4rem] font-bold leading-none text-ink">
              {t.googleScore.value}
            </span>
            <Stars rating={5} className="text-[1.05rem]" />
            <small className="text-[0.82rem] text-muted">{t.googleScore.count}</small>
          </div>

          <h2 className="mt-5 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {t.titleTop} <span className="font-accent text-brand">{t.titleAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {t.reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
