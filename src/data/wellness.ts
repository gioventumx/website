// Copy del hub /wellness/: hero + 2 tarjetas de acceso + intro + CTA banner.
// Los segmentos `accent` van en Playfair italic (font-accent text-brand).

import type { Feature } from "./types";
import type { Destacado } from "./destacados";

type Seg = { text: string; accent?: boolean };

export const wellness = {
  hero: {
    eyebrow: "Wellness Spa",
    titleTop: "Un espacio para que el cuerpo",
    titleAccent: "también descanse",
    body: "Nuestro wellness spa, dentro de una clínica dermatológica. Faciales y masajes con protocolos definidos, en un ambiente pensado para desconectarte.",
    cta: "Agendar cita",
    image: "/wellness-hero.webp",
    rating: { value: "4.7", text: "en Google · 186 reseñas" },
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

  // Intro (después de las dos tarjetas). Título con accent + párrafos con italic inline.
  intro: {
    titleTop: "Cuidarte no debería sentirse",
    titleAccent: "como un trámite",
    paragraphs: [
      [
        { text: "En Gioventù el bienestar no es un extra, es parte de cómo entendemos el cuidado de la piel. Descubre nuestro " },
        { text: "wellness spa", accent: true },
        { text: ", con " },
        { text: "faciales", accent: true },
        { text: " para que tu piel recupere luz y textura con tratamientos cosmetológicos profesionales y los " },
        { text: "masajes", accent: true },
        { text: ", para que el cuerpo suelte lo que lleva semanas cargando." },
      ],
      [{ text: "Ninguno de los dos es un lujo. Son la pausa que te toca." }],
    ] satisfies Seg[][],
  },
};
