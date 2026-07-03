import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "dermatologia",
    category: "Salud de tu piel",
    title: "Dermatología",
    description: "Médicos dermatólogos tratan padecimientos específicos de tu piel.",
    href: "/dermatologia/",
    more: "Más información",
    image: "/dermatologia.webp",
  },
  {
    slug: "medicina-estetica",
    category: "Realza y rejuvenece",
    title: "Medicina Estética",
    description: "Renueva, mantén y promueve tu belleza con tratamientos de vanguardia.",
    href: "/estetica/",
    more: "Más información",
    image: "/medicina-estetica.webp",
  },
  {
    slug: "wellness",
    category: "Relájate y renuévate",
    title: "Wellness",
    description: "Masajes y faciales para reconectar cuerpo y piel.",
    href: "/wellness/",
    more: "Más información",
    image: "/masajes.webp",
  },
  {
    slug: "skincare",
    category: "Rutinas a tu medida",
    title: "Skincare",
    description: "Rutinas y protocolos diseñados por dermatólogos para tu tipo de piel.",
    href: "/dermatologia/",
    more: "Más información",
    image: "/skincare.webp",
  },
];
