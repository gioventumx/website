// Sección "Última Tecnología" — mosaico escalonado de 4 tarjetas.
// Los nombres e imágenes son PLACEHOLDERS: reemplazar por los aparatos reales.

export type TechSize = "tall" | "mid" | "short";

export type TechCard = {
  slug: string;
  /** TODO: nombre real del aparato / tecnología (reemplazar "Tecnología N"). */
  name: string;
  /** TODO: ruta de imagen real, ej. "/tecnologia/laser.webp". Vacío = placeholder. */
  image?: string;
  /** Altura de la tarjeta para el efecto escalonado desigual. */
  size: TechSize;
};

export const tecnologia = {
  eyebrow: "Tecnología",
  titleTop: "La última tecnología",
  titleAccent: "detrás de cada resultado",
  body: "Instalaciones de primer nivel y equipo premium de grado médico. Invertimos en la mejor tecnología para que cada tratamiento sea más seguro, preciso y efectivo.",
  cta: "Agendar cita",
  // Orden del mosaico: [0,1] = columna A · [2,3] = columna B (esta baja con offset).
  cards: [
    { slug: "venus-legacy", name: "Venus Legacy", image: "/venus-legacy.webp", size: "tall" },
    { slug: "dermapen", name: "Dermapen", image: "/dermapen.webp", size: "short" },
    // Nombres de archivo tal cual están en /public (mayúscula y guiones bajos).
    { slug: "laser-co2", name: "Láser CO2", image: "/laser_Co2.webp", size: "short" },
    { slug: "nordlys-candela", name: "Nordlys (Candela)", image: "/nordlys_candela.webp", size: "tall" },
  ] satisfies TechCard[],
};
