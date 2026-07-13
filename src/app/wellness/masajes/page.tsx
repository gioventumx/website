import type { Metadata } from "next";
import { BookingSource } from "@/components/booking/BookingSource";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { Banner } from "@/components/ui/Banner";
import { Carrusel } from "@/components/ui/Carrusel";
import { TestimoniosMasonry } from "@/components/ui/TestimoniosMasonry";
import { ResultsRain } from "@/components/home/ResultsRain";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FAQ } from "@/components/home/FAQ";
import { CrossSell } from "@/components/ui/CrossSell";
import { Blog } from "@/components/home/Blog";
import { BookingNudge } from "@/components/home/BookingNudge";
import { masajes } from "@/data/masajes";
import { faqMasajes } from "@/data/faq-masajes";
import { testimoniosMasajes } from "@/data/testimonios-masajes";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

// Canonical estático a la URL limpia (no cambia con ?suc=). Metadata neutral de
// sucursal (la página cambia con ?suc=).
export const metadata: Metadata = pageMetadata({
  title: "Masajes Corporales y de Spa | Gioventù Wellness Spa",
  description:
    "Masajes terapéuticos y relajantes en Naucalpan y Atizapán. Drenaje linfático, descontracturante, reductivo y más. Agenda tu sesión.",
  path: "/wellness/masajes/",
});

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function MasajesPage({
  searchParams,
}: {
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);

  return (
    <>
      {/* Inyecta el origen (suc) en el flujo de agendamiento para medición */}
      <BookingSource suc={branch} base="masajes" />

      <VerticalHero hero={masajes.hero} service="Wellness Spa" />

      {/* Carrusel de masajes — justo debajo del hero */}
      <Carrusel
        head={masajes.carruselHead}
        items={masajes.carrusel}
        service="Wellness Spa"
        eyebrow="Masaje"
        id="masajes"
      />

      {/* INTRO — prosa grande centrada (statement) + lluvia de pills (masajes) */}
      <ResultsRain statement={masajes.statement} chips={masajes.chips} id="sobre" />

      {/* Banner protagonista: masaje en pareja (entre intro y testimonios) */}
      <Banner {...masajes.coupleBanner} service="Wellness Spa" />

      <TestimoniosMasonry reviews={testimoniosMasajes.reviews} id="testimonios" />

      {/* CTA de agenda en formato BANNER, entre Testimonios y Preguntas */}
      <ClosingCTA
        service="Wellness Spa"
        compact
        image="/wellness-cta.webp"
        titleTop="Tu cuerpo lleva rato"
        titleAccent="pidiéndolo"
        body="Agenda tu masaje en Plaza Antigua o Plaza Cúspide."
      />

      {/* FAQ — mismo componente/estilo, con datos propios de masajes */}
      <FAQ items={faqMasajes} id="preguntas" />

      {/* Cross-sell: faciales (wellness) o dermatología */}
      <CrossSell
        title="¿Buscas algo más?"
        body="Renueva tu piel con un facial, o resuelve un padecimiento con nuestros dermatólogos."
        defaultImage="/masajes-hero.webp"
        verticals={[
          { label: "Faciales", href: "/wellness/faciales/", image: "/faciales-hero.webp" },
          { label: "Dermatología", href: "/dermatologia/", image: "/dermacta.webp" },
        ]}
      />

      {/* Blog — mismo componente del Home, filtrado al departamento Wellness */}
      <Blog departamento="wellness" ctaHref="/blog/wellness/" />

      {/* Notificación flotante de social proof (reaparece al scrollear) */}
      <BookingNudge />
    </>
  );
}
