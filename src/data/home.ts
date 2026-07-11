import type { Feature, CTA, StatementSegment } from "./types";

export const home = {
  statement: {
    eyebrow: "Sobre Gioventù",
    segments: [
      { text: "Más de 10 años revelando la mejor versión de tu piel. " },
      { text: "Dermatología", accent: "service" },
      { text: " y " },
      { text: "medicina estética", accent: "service" },
      { text: " de la mano de " },
      { text: "especialistas certificados", accent: "attribute" },
      { text: ", con la " },
      { text: "última tecnología", accent: "attribute" },
      { text: ". Y cuando el cuerpo también pide pausa, nuestro " },
      { text: "wellness spa", accent: "service" },
      { text: ": masajes y faciales. Porque cuidarte no debería sentirse como un trámite, sino como un " },
      { text: "ritual", accent: "attribute" },
      { text: "." },
    ] satisfies StatementSegment[],
    local:
      "Dermatología, medicina estética y wellness en Lomas Verdes y Zona Esmeralda, Estado de México.",
  },

  hero: {
    video: "/GIO-web.mp4",
    eyebrow: "Centro dermatológico y estético",
    titleTop: "Bienestar y tecnología",
    titleAccent: "para una piel radiante",
    body: "Dermatología, medicina estética y wellness en un mismo lugar. Dermatólogos y médicos especializados combinan ciencia y tecnología de vanguardia para cuidar tu piel.",
    cta: { label: "Agendar en WhatsApp", href: "#" } as CTA,
    rating: { value: "4.7", text: "en Google · 186 reseñas" },
  },

  features: [
    { title: "Tecnología de punta", description: "Equipo médico premium de última generación", icon: "tech" },
    { title: "Atención personalizada", description: "Tratamientos a la medida de tu piel", icon: "care" },
    { title: "Equipo especializado", description: "Cosmiatras, dermatólogos y médicos", icon: "team" },
  ] satisfies Feature[],

  intro: {
    eyebrow: "Quiénes somos",
    titleTop: "Centro estético en Lomas Verdes",
    titleAccent: "y Zona Esmeralda",
    body: "En Gioventù te ayudamos a resaltar lo mejor de ti y de tu piel. Nuestro equipo de especialistas utiliza la última tecnología, productos y tratamientos personalizados de medicina estética y dermatología para resolver diversos padecimientos y brindar soluciones estéticas.",
    cta: { label: "Agendar en WhatsApp", href: "#" } as CTA,
  },

  services: {
    titleTop: "Tres especialidades, un mismo lugar",
    titleAccent: "Todo lo que tu piel necesita",
    body: "Dermatología, medicina estética y wellness en un mismo lugar, con tratamientos diseñados para cada tipo de piel.",
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
    titleTop: "Historias que dejan",
    titleAccent: "huella",
    body: "Detrás de cada reseña hay una piel que volvió a sentirse bien. Esto es lo que dicen quienes ya pasaron por Gioventù.",
  },

  band: {
    titleTop: "La mejor versión de tu piel",
    titleAccent: "empieza aquí",
    body: "Reserva tu valoración con nuestros especialistas y descúbrelo.",
    cta: { label: "Agendar cita", href: "#" } as CTA,
    // TODO: imagen de fondo real del CTA de cierre (ej. "/cta-cierre.webp"). Vacío = placeholder.
    image: "",
  },

  social: {
    heading: "Encuéntranos en tu red social favorita…",
    handle: "@gioventuderma",
  },
};
