import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "rejuvenecimiento",
    category: "Medicina Estética",
    title: "Rejuvenecimiento",
    description: "Renueva, mantén y promueve tu belleza con tratamientos de vanguardia.",
    href: "/estetica/",
    more: "Más información",
    image: "/medicina-estetica.png",
  },
  {
    slug: "salud-de-la-piel",
    category: "Dermatología",
    title: "Salud de la piel",
    description: "Médicos dermatólogos tratan padecimientos específicos de tu piel.",
    href: "/dermatologia/",
    more: "Más información",
    image: "/dermatologia.png",
  },
  {
    slug: "masajes",
    category: "Wellness",
    title: "Masajes",
    description: "Relájate y renuévate con nuestro menú de masajes corporales.",
    href: "/wellness/",
    more: "Más información",
    image: "/masajes.png",
  },
  {
    slug: "skin-care",
    category: "Cuidado",
    title: "Skin care",
    description: "Rutinas y protocolos diseñados por dermatólogos para tu tipo de piel.",
    href: "/dermatologia/",
    more: "Más información",
    image: "/skincare.png",
  },
  {
    slug: "faciales",
    category: "Wellness",
    title: "Faciales",
    description: "Limpieza profunda, hidratación y rejuvenecimiento facial a tu medida.",
    href: "/wellness/",
    more: "Más información",
    image: "/faciales.png",
  },
];
