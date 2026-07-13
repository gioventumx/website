import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FAQ } from "@/components/home/FAQ";
import { DepilacionHero } from "@/components/depilacion/DepilacionHero";
import { FeaturesGrid } from "@/components/depilacion/FeaturesGrid";
import { ZonasGrid } from "@/components/depilacion/ZonasGrid";
import { Testimonios } from "@/components/depilacion/Testimonios";
import { CrossSell } from "@/components/ui/CrossSell";
import { RelatedBlog } from "@/components/blog/RelatedBlog";
import { BookingNudge } from "@/components/home/BookingNudge";
import { depilacion } from "@/data/depilacion";
import { pageMetadata } from "@/lib/seo";

// Canonical SIEMPRE a la URL limpia /depilacion-laser/ (migración SEO desde el
// WordPress actual). trailingSlash está activo globalmente (next.config).
// El dominio absoluto sale de metadataBase (layout).
export const metadata: Metadata = pageMetadata({
  title: "Depilación Láser en Lomas Verdes | Gioventù",
  description:
    "Depilación láser definitiva con tecnología de grado médico. Resultados desde la primera sesión en Naucalpan y Atizapán. Agenda tu primera sesión.",
  path: "/depilacion-laser/",
});

export default function DepilacionLaserPage() {
  const banner = depilacion.banner;
  const faq = depilacion.faq;

  return (
    <>
      {/* 1) HERO */}
      <DepilacionHero />

      {/* 2) FEATURES */}
      <FeaturesGrid />

      {/* 3) BANNER DESCUENTO — componente compartido ClosingCTA en formato compact
          (igual que el banner medio de derma/faciales). */}
      <ClosingCTA
        compact
        service="Depilación Láser"
        image={banner.image}
        titleTop={banner.titleTop}
        titleAccent={banner.titleAccent}
        body={banner.body}
        ctaLabel={banner.cta}
      />

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

      {/* 7) BLOG RELACIONADO — componente reutilizable (se usará también en las 14
          páginas de tratamiento de dermatología). Sin posts propios de depilación aún,
          se rellena con lo más reciente. */}
      <RelatedBlog categoria="depilacion" />

      {/* Notificación flotante de social proof (reaparece al scrollear) — igual que
          derma/faciales. Copy vía getNotification(pathname). */}
      <BookingNudge />
    </>
  );
}
