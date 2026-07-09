import { ReviewCard } from "@/components/home/ReviewCard";
import { GoogleRatingScore } from "@/components/ui/GoogleRating";
import { depilacion } from "@/data/depilacion";

// Encabezado con score de Google + grid de reseñas (placeholder). Reutiliza
// ReviewCard. Grid 3 → 1 en móvil.
export function Testimonios() {
  const t = depilacion.testimonios;

  return (
    <section className="bg-white px-6 py-[clamp(60px,8vw,100px)] md:px-10">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="eyebrow">{t.eyebrow}</span>

          {/* Score Google (dinámico por sucursal) — entre eyebrow y título */}
          <GoogleRatingScore />

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
