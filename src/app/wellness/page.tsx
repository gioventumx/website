import type { Metadata } from "next";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { Destacados } from "@/components/home/Destacados";
import { WellnessIntro } from "@/components/wellness/WellnessIntro";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Blog } from "@/components/home/Blog";
import { wellness } from "@/data/wellness";

// Slug heredado de WP (/wellness/) — no cambiar. Metadata neutral de hub: usa
// "wellness spa", "bienestar", "faciales" y "masajes" de forma natural, sin optimizar
// para faciales/masajes (esas keywords son de las páginas hijas).
export const metadata: Metadata = {
  title: "Wellness Spa | Gioventù Dermatología y Estética",
  description:
    "El wellness spa de Gioventù: bienestar dentro de una clínica dermatológica. Faciales y masajes con protocolos definidos, en un ambiente pensado para desconectarte.",
  alternates: { canonical: "/wellness/" },
};

// Hub de Wellness: hero → dos tarjetas de acceso → intro → CTA banner → blog.
export default function WellnessPage() {
  return (
    <>
      <VerticalHero hero={wellness.hero} service="Wellness Spa" />
      <Destacados items={wellness.cards} />
      <WellnessIntro />

      {/* CTA de agenda en formato BANNER */}
      <ClosingCTA
        service="Wellness Spa"
        image="/wellness-cta.webp"
        compact
        titleTop="Tu pausa"
        titleAccent="empieza aquí"
        body="Agenda tu facial o tu masaje en Plaza Antigua o Plaza Cúspide."
      />

      {/* Blog — filtrado al departamento Wellness, como en las páginas internas */}
      <Blog departamento="wellness" ctaHref="/blog/wellness/" />
    </>
  );
}
