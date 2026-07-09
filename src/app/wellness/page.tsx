import type { Metadata } from "next";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { Destacados } from "@/components/home/Destacados";
import { wellness } from "@/data/wellness";

// Slug heredado de WP (/wellness/) — no cambiar. TODO: copy final de metadata.
export const metadata: Metadata = {
  title: "TODO · Wellness Spa | Gioventù (placeholder)",
  description:
    "TODO · descripción placeholder de /wellness/. Reemplazar por copy final (wellness).",
  alternates: { canonical: "/wellness/" },
};

// Hub de Wellness — versión mínima: hero + dos tarjetas de acceso (Faciales · Masajes).
export default function WellnessPage() {
  return (
    <>
      <VerticalHero hero={wellness.hero} service="Wellness Spa" />
      <Destacados items={wellness.cards} />
    </>
  );
}
