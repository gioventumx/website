// Servicios destacados del Home (dos tarjetas grandes). Imágenes = placeholder (TODO).

export type Destacado = {
  slug: string;
  title: string;
  hook: string;
  href: string;
  /** TODO: imagen de fondo real (ej. "/destacados/facial.webp"). Vacío = placeholder. */
  image?: string;
};

export const destacados: Destacado[] = [
  {
    slug: "rejuvenecimiento-facial",
    title: "Rejuvenecimiento Facial",
    hook: "Recupera la firmeza y luminosidad de tu piel.",
    href: "/estetica/",
    image: "/rejuvenecimiento-facial-card.webp",
  },
  {
    slug: "depilacion-laser",
    title: "Depilación Láser",
    hook: "Adiós al vello. Piel suave, para siempre.",
    href: "/depilacion-laser/",
    image: "/depilacion-laser-card.webp",
  },
];
