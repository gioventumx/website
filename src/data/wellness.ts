// Copy del hub /wellness/ (versión mínima: hero + 2 tarjetas de acceso).
// Hero con copy PLACEHOLDER (TODO). Imágenes = placeholder.

import type { Feature } from "./types";
import type { Destacado } from "./destacados";

export const wellness = {
  hero: {
    eyebrow: "Wellness Spa",
    // TODO: copy final del hero (placeholder).
    titleTop: "TODO · Título del hero",
    titleAccent: "de wellness (placeholder)",
    body: "TODO · Texto del hero (placeholder). Reemplazar por copy final de wellness.",
    cta: "Agendar cita",
    // TODO: imagen/video de fondo real. Vacío = placeholder.
    image: "",
    rating: { value: "4.9", text: "en Google · clientas reales" },
    features: [
      { title: "Cosmetólogas y terapeutas", description: "Un equipo dedicado a tu bienestar", icon: "team" },
      { title: "Atención personalizada", description: "Una experiencia a tu medida", icon: "care" },
      { title: "Respaldo dermatológico", description: "El aval de una clínica especializada", icon: "tech" },
    ] satisfies Feature[],
  },

  // Dos tarjetas de acceso (mismo componente que los destacados del Home).
  cards: [
    {
      slug: "faciales",
      title: "Faciales",
      hook: "Rituales de limpieza y luminosidad para tu piel.",
      href: "/wellness/faciales/",
      image: "/faciales-hero.webp",
    },
    {
      slug: "masajes",
      title: "Masajes",
      hook: "Suelta la tensión. Recupera tu descanso.",
      href: "/wellness/masajes/",
      image: "/masajes-hero.webp",
    },
  ] satisfies Destacado[],
};
