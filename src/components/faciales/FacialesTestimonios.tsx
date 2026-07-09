import { ReviewCard } from "@/components/home/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { testimoniosFaciales } from "@/data/testimonios-faciales";
import { home } from "@/data/home";

// Mismo masonry y encabezado (score Google 4.9) que la sección del Home/Derma, con
// las reseñas de faciales (placeholder por ahora).
export function FacialesTestimonios() {
  const t = home.testimonials;

  return (
    <section
      id="testimonios"
      className="scroll-mt-[96px] bg-bg pb-[clamp(30px,4vw,48px)] pt-[clamp(40px,5vw,64px)]"
    >
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-[640px] text-center md:mb-12">
          <span className="eyebrow">{t.eyebrow}</span>

          <div className="mt-5 flex flex-col items-center gap-1">
            <span className="text-[2.6rem] font-semibold leading-none text-ink">
              {testimoniosFaciales.googleScore.value}
            </span>
            <Stars rating={5} className="text-[1.05rem]" />
            <small className="text-[0.82rem] text-muted">{testimoniosFaciales.googleScore.count}</small>
          </div>

          <h2 className="mt-5 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {t.titleTop} <span className="font-accent text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[1.02rem] text-muted">{t.body}</p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimoniosFaciales.reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
