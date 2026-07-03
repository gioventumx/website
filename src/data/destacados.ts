// Servicios destacados del Home (dos tarjetas grandes). Imágenes = placeholder (TODO).

export type Destacado = {
  slug: string;
  title: string;
  hook: string;
  href: string;
  /** TODO: imagen de fondo real (ej. "/destacados/facial.png"). Vacío = placeholder. */
  image?: string;
};

export const destacados: Destacado[] = [
  {
    slug: "rejuvenecimiento-facial",
    title: "Rejuvenecimiento Facial",
    hook: "Recupera la firmeza y luminosidad de tu piel.",
    href: "/estetica/",
    image: undefined,
  },
  {
    slug: "depilacion-laser",
    title: "Depilación Láser",
    hook: "Adiós al vello. Piel suave, para siempre.",
    href: "/depilacion/",
    image: undefined,
  },
];
