import type { Feature, CTA } from "./types";

export const home = {
  hero: {
    eyebrow: "Centro dermatológico y estético · Lomas Verdes",
    titleTop: "Bienestar y tecnología",
    titleAccent: "para una piel radiante",
    body: "Dermatólogos y médicos especializados combinan ciencia y tecnología de vanguardia para cuidar tu piel desde adentro hacia afuera.",
    cta: { label: "Agendar en WhatsApp", href: "#" } as CTA,
    rating: { value: "5.0", text: "en Google · pacientes reales" },
  },

  features: [
    { title: "Tecnología de punta", description: "Equipo médico premium de última generación" },
    { title: "Atención personalizada", description: "Tratamientos a la medida de tu piel" },
    { title: "Equipo especializado", description: "Cosmiatras, dermatólogos y médicos" },
  ] satisfies Feature[],

  intro: {
    eyebrow: "Quiénes somos",
    titleTop: "Centro estético en Lomas Verdes",
    titleAccent: "y Zona Esmeralda",
    body: "En Gioventù te ayudamos a resaltar lo mejor de ti y de tu piel. Nuestro equipo de especialistas utiliza la última tecnología, productos y tratamientos personalizados de medicina estética y dermatología para resolver diversos padecimientos y brindar soluciones estéticas.",
    cta: { label: "Agendar en WhatsApp", href: "#" } as CTA,
  },

  services: {
    eyebrow: "Nuestros servicios",
    titleTop: "Todo lo que tu piel necesita",
    titleAccent: "en un solo lugar",
  },

  benefits: {
    eyebrow: "Ven a Gioventù si buscas...",
    titleTop: "Resultados que se notan",
    titleAccent: "y se sienten",
    chips: [
      "Lucir más joven",
      "Tener una piel radiante",
      "Reducir imperfecciones",
      "Mejorar mi silueta",
      "Piel sin vello",
      "Simplemente relax",
    ],
  },

  testimonials: {
    eyebrow: "Testimonios",
    titleTop: "Personas reales,",
    titleAccent: "resultados reales",
    body: "Lo que dicen nuestros pacientes, directo desde Google.",
  },

  band: {
    eyebrow: "Tecnología médica",
    titleTop: "Instalaciones de primer nivel",
    titleAccent: "y equipo premium",
    body: "Descubre la tecnología que garantiza una atención de última generación, segura y efectiva.",
    cta: { label: "Agendar en WhatsApp", href: "#" } as CTA,
  },

  social: {
    heading: "Encuéntranos en tu red social favorita…",
    handle: "@gioventuderma",
  },
};
