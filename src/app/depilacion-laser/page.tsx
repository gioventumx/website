import type { Metadata } from "next";
import { BookingButton } from "@/components/booking/BookingButton";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { FAQ } from "@/components/home/FAQ";
import { DepilacionHero } from "@/components/depilacion/DepilacionHero";
import { FeaturesGrid } from "@/components/depilacion/FeaturesGrid";
import { ZonasGrid } from "@/components/depilacion/ZonasGrid";
import { Testimonios } from "@/components/depilacion/Testimonios";
import { CrossSell } from "@/components/ui/CrossSell";
import { depilacion } from "@/data/depilacion";
import { pageMetadata } from "@/lib/seo";

// Canonical SIEMPRE a la URL limpia /depilacion-laser/ (migración SEO desde el
// WordPress actual). trailingSlash está activo globalmente (next.config).
// El dominio absoluto sale de metadataBase (layout).
export const metadata: Metadata = pageMetadata({
  title: "Depilación Láser en Lomas Verdes | Gioventù",
  description:
    "Depilación láser en Lomas Verdes con tecnología de láser diodo de grado médico: elimina el vello de forma segura, sin dolor y con resultados definitivos. Piernas, brazos, axilas, bikini y rostro. Agenda con 10% de descuento en tu primera sesión.",
  path: "/depilacion-laser/",
});

export default function DepilacionLaserPage() {
  const banner = depilacion.banner;
  const closing = depilacion.closing;
  const faq = depilacion.faq;

  return (
    <>
      {/* 1) HERO */}
      <DepilacionHero />

      {/* 2) FEATURES */}
      <FeaturesGrid />

      {/* 3) BANNER DESCUENTO — bloque redondeado media+overlay (patrón ClosingCTA) */}
      <section className="px-4 pb-4 md:px-6 md:pb-6">
        <MediaSurface
          as="image"
          src={banner.image}
          overlay="ink"
          label={banner.image ? undefined : "imagen de fondo (TODO)"}
          className="rounded-block text-center"
        >
          <div className="container-x max-w-[640px] py-[clamp(48px,6vw,72px)]">
            <h2 className="font-sans text-[clamp(1.8rem,3.4vw,2.5rem)] font-light leading-[1.18] text-white">
              {banner.titleTop}
              <span className="font-accent block text-brand-tint">{banner.titleAccent}</span>
            </h2>
            <p className="mx-auto mb-6 mt-3.5 max-w-[420px] text-brand-tint">{banner.body}</p>
            <BookingButton variant="light">{banner.cta}</BookingButton>
          </div>
        </MediaSurface>
      </section>

      {/* 4) ZONAS */}
      <ZonasGrid />

      {/* 5) TESTIMONIOS */}
      <Testimonios />

      {/* 6) FAQ */}
      <FAQ
        items={faq.items}
        eyebrow={faq.eyebrow}
        titleTop={faq.titleTop}
        titleAccent={faq.titleAccent}
      />

      {/* Cross-sell: ofrece otras verticales afines (imagen cambia por hover) */}
      <CrossSell
        title="¿Buscas algo más?"
        body="En Gioventù también hacemos medicina estética y faciales. Descubre la especialidad que necesitas."
        defaultImage="/depilacion-laser-card.webp"
        verticals={[
          { label: "Medicina Estética", href: "/estetica/", image: "/medicina-estetica-cta.webp" },
          { label: "Faciales", href: "/wellness/faciales/", image: "/faciales-hero.webp" },
        ]}
      />

      {/* 7) CTA DE CIERRE — bloque redondeado media+overlay (patrón ClosingCTA) */}
      <section className="px-4 pb-4 md:px-6 md:pb-6">
        <MediaSurface
          as="image"
          src={closing.image}
          overlay="ink"
          label={closing.image ? undefined : "imagen (TODO)"}
          className="rounded-block text-center"
        >
          <div className="container-x max-w-[640px] py-[clamp(52px,6vw,80px)]">
            <h2 className="font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.18] text-white">
              {closing.titleTop}
              <span className="font-accent block text-brand-tint">{closing.titleAccent}</span>
            </h2>
            <p className="mx-auto mb-7 mt-3.5 max-w-[420px] text-brand-tint">{closing.body}</p>
            <BookingButton variant="light">{closing.cta}</BookingButton>
          </div>
        </MediaSurface>
      </section>
    </>
  );
}
