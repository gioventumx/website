import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CrossSell } from "@/components/ui/CrossSell";
import { FAQ } from "@/components/home/FAQ";
import { Blog } from "@/components/home/Blog";
import { ResultsRain } from "@/components/home/ResultsRain";
import { Carrusel } from "@/components/ui/Carrusel";
import { EsteticaHero } from "@/components/estetica/EsteticaHero";
import { BeneficiosGrid } from "@/components/estetica/BeneficiosGrid";
import { Testimonios } from "@/components/estetica/Testimonios";
import { BookingSource } from "@/components/estetica/BookingSource";
import { BookingNudge } from "@/components/home/BookingNudge";
import { estetica } from "@/data/estetica";
import { faqEstetica } from "@/data/faq-estetica";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

// Canonical SIEMPRE a la URL limpia /estetica/ (mismo slug que el WordPress actual,
// trailingSlash activo). El dominio absoluto sale de metadataBase (layout).
export const metadata: Metadata = pageMetadata({
  title: "Medicina Estética y Rejuvenecimiento Facial | Gioventù",
  description:
    "Rejuvenecimiento facial con rellenos dérmicos, toxina botulínica y bioestimuladores de colágeno. Medicina estética indicada por médicos, con tecnología de grado clínico. Agenda tu valoración.",
  path: "/estetica/",
});

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function EsteticaPage({
  searchParams,
}: {
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);

  return (
    <>
      {/* Inyecta el origen (suc) en el flujo de agendamiento para medición */}
      <BookingSource suc={branch} />

      <EsteticaHero />

      {/* TRATAMIENTOS — carrusel (igual que faciales/masajes), justo debajo del hero */}
      <Carrusel
        head={estetica.tratamientos.head}
        items={estetica.tratamientos.items}
        service="Medicina Estética"
        id="servicios"
      />

      {/* INTRO — statement + lluvia de chips (conceptos de beneficio) */}
      <ResultsRain statement={estetica.statement} chips={estetica.chips} id="sobre" />

      {/* BENEFICIOS — 4 tarjetas (imagen arriba), después de la intro */}
      <BeneficiosGrid />

      <Testimonios />

      {/* CTA de agenda en formato BANNER, entre Testimonios y Preguntas */}
      <ClosingCTA
        service="Medicina Estética"
        image="/medicina-estetica-cta.webp"
        compact
        titleTop="Reserva ahora"
        titleAccent="tu valoración estética"
        body="Programa una consulta con nuestros médicos, cuéntanos qué buscas, y diseñamos juntos el camino."
      />

      {/* FAQ — mismo componente/estilo que el Home, con datos propios de estética */}
      <FAQ items={faqEstetica} id="preguntas" />

      {/* Cross-sell: ofrece las otras dos verticales (imagen cambia por hover) */}
      <CrossSell
        title="¿No encuentras lo que buscas?"
        body="Cuida tu piel con un facial profesional o dile adiós al vello con depilación láser. Descubre nuestras otras especialidades."
        defaultImage="/rejuvenecimiento-facial-card.webp"
        verticals={[
          { label: "Faciales", href: "/wellness/faciales/", image: "/faciales-hero.webp" },
          { label: "Depilación Láser", href: "/depilacion-laser/", image: "/depilacion-laser-card.webp" },
        ]}
      />

      {/* Blog — mismo componente del Home, filtrado al departamento Medicina Estética */}
      <Blog departamento="medicina-estetica" ctaHref="/blog/medicina-estetica/" />

      {/* Notificación flotante de social proof (reaparece al scrollear) */}
      <BookingNudge />
    </>
  );
}
