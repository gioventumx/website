import type { Metadata } from "next";
import { BookingSource } from "@/components/booking/BookingSource";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { Carrusel } from "@/components/ui/Carrusel";
import { TestimoniosMasonry } from "@/components/ui/TestimoniosMasonry";
import { ResultsRain } from "@/components/home/ResultsRain";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FAQ } from "@/components/home/FAQ";
import { CrossSell } from "@/components/ui/CrossSell";
import { Blog } from "@/components/home/Blog";
import { BookingNudge } from "@/components/home/BookingNudge";
import { faciales } from "@/data/faciales";
import { faqFaciales } from "@/data/faq-faciales";
import { testimoniosFaciales } from "@/data/testimonios-faciales";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

// Canonical estático a la URL limpia (no cambia con ?suc=). Metadata neutral de
// sucursal (la página cambia con ?suc=): menciona ambas plazas, sin contradecir.
export const metadata: Metadata = pageMetadata({
  title: "Limpieza Facial Profunda y Estética Facial | Gioventù Wellness Spa",
  description:
    "Limpieza facial y estética facial en Gioventù Wellness Spa: hidratación, microdermoabrasión, hidrofacial y rejuvenecimiento facial, con el respaldo de una clínica dermatológica. Agenda en Plaza Antigua o Plaza Cúspide.",
  path: "/wellness/faciales/",
});

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function FacialesPage({
  searchParams,
}: {
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { suc } = await searchParams;
  // Ya no mostramos sucursales, pero si la visita llegó por ?suc= (campaña) lo
  // seguimos registrando en el flujo de agendamiento para medición.
  const branch = normalizeSuc(suc);

  return (
    <>
      {/* Inyecta el origen (suc) en el flujo de agendamiento para medición */}
      <BookingSource suc={branch} base="faciales" />

      <VerticalHero hero={faciales.hero} service="Wellness Spa" />

      {/* Carrusel de faciales — justo debajo del hero */}
      <Carrusel
        head={faciales.bentoHead}
        items={faciales.bento}
        service="Wellness Spa"
        eyebrow="Facial"
        id="faciales"
      />

      {/* INTRO — prosa grande centrada (statement) + lluvia de pills (faciales) */}
      <ResultsRain statement={faciales.statement} chips={faciales.chips} id="sobre" />

      <TestimoniosMasonry reviews={testimoniosFaciales.reviews} id="testimonios" />

      {/* CTA de agenda en formato BANNER, entre Testimonios y Preguntas */}
      <ClosingCTA
        service="Wellness Spa"
        compact
        image="/wellness-cta.webp"
        body="Agenda tu limpieza facial en Plaza Antigua o Plaza Cúspide."
      />

      {/* FAQ — mismo componente/estilo, con datos propios de faciales. Prueba: borde
          tipo tarjeta (solo en faciales). */}
      <FAQ items={faqFaciales} id="preguntas" bordered />

      {/* Cross-sell: masajes (wellness) o dermatología */}
      <CrossSell
        title="¿Buscas algo más?"
        body="Rejuvenece tu rostro con medicina estética o elimina el vello con depilación láser. Descubre nuestras otras especialidades."
        defaultImage="/faciales-hero.webp"
        verticals={[
          { label: "Medicina Estética", href: "/estetica/", image: "/medicina-estetica-cta.webp" },
          { label: "Depilación Láser", href: "/depilacion-laser/", image: "/depilacion-laser-card.webp" },
        ]}
      />

      {/* Blog — mismo componente del Home, filtrado al departamento Wellness */}
      <Blog departamento="wellness" ctaHref="/blog/wellness/" />

      {/* Notificación flotante de social proof (reaparece al scrollear) */}
      <BookingNudge />
    </>
  );
}
