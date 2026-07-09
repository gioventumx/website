// Copy de la página /wellness/faciales/ (hero, intro, bento). Es WELLNESS, no
// dermatología: los faciales los aplican cosmetólogas (no dermatólogos) y NO son
// procedimientos médicos. El respaldo dermatológico de la clínica va solo como
// contexto. Hero/intro con copy PLACEHOLDER (TODO). Imágenes = placeholder.

import type { Feature } from "./types";

export type FacialPieza = {
  id: string;
  /** grid-column: "col-inicio / col-fin" (12 columnas) */
  col: string;
  /** grid-row: "fila-inicio / fila-fin" (6 filas) */
  row: string;
  label: string;
  description: string;
  slug: string;
  image?: string;
};

export const faciales = {
  hero: {
    eyebrow: "Faciales",
    titleTop: "Limpieza facial profunda",
    titleAccent: "que devuelve la luz a tu piel",
    body: "Estética facial y limpieza profunda en nuestro Wellness Spa: hidratación, microdermoabrasión y rejuvenecimiento facial, con el respaldo de una clínica dermatológica.",
    cta: "Agendar cita",
    image: "/faciales-hero.webp",
    rating: { value: "4.7", text: "en Google · 186 reseñas" },
    features: [
      { title: "Cosmetólogas expertas", description: "Manos especializadas en el cuidado de tu piel", icon: "team" },
      { title: "Atención personalizada", description: "Un facial a la medida de tu piel", icon: "care" },
      { title: "Respaldo dermatológico", description: "El aval de una clínica especializada", icon: "tech" },
    ] satisfies Feature[],
  },

  // Intro tipo "statement" (prosa grande centrada). Acentos en Playfair italic.
  statement: [
    { text: "En " },
    { text: "Gioventù", accent: true },
    { text: ", un " },
    { text: "facial", accent: true },
    { text: " no es un lujo " },
    { text: "ocasional", accent: true },
    { text: ", es lo que tu " },
    { text: "piel", accent: true },
    { text: " necesita para sostenerse sana. Nuestras " },
    { text: "cosmetólogas", accent: true },
    { text: " trabajan con protocolos definidos y " },
    { text: "equipo profesional", accent: true },
    { text: ". Por eso cada facial empieza por entender tu tipo de piel, desde " },
    { text: "limpieza facial", accent: true },
    { text: " profunda, " },
    { text: "hidratación", accent: true },
    { text: ", microdermoabrasión, " },
    { text: "Hydrafacial", accent: true },
    { text: ": descubre el " },
    { text: "mejor", accent: true },
    { text: " tratamiento para ti." },
  ] satisfies { text: string; accent?: boolean }[],

  // Chips (faciales / wellness) para la lluvia de pills de la intro.
  chips: [
    { slug: "hidratacion-profunda", label: "Hidratación profunda", tint: true },
    { slug: "microdermoabrasion", label: "Microdermoabrasión" },
    { slug: "facial-antiacne", label: "Facial antiacné", tint: true },
    { slug: "limpieza-profunda", label: "Limpieza profunda" },
    { slug: "hydrafacial", label: "Hydrafacial", tint: true },
    { slug: "piel-radiante", label: "Piel radiante" },
    { slug: "relajacion", label: "Relajación", tint: true },
  ] satisfies { slug: string; label: string; tint?: boolean }[],

  // Encabezado del bento.
  bentoHead: {
    titleTop: "Faciales que",
    titleAccent: "renuevan tu piel",
    body: "Tratamientos de estética facial para limpiar, hidratar y revitalizar tu rostro, con el respaldo de una clínica dermatológica.",
  },

  // 5 faciales — composición manual (grid 12 col × 6 fil): 2 grandes arriba, 3 abajo.
  bento: [
    {
      id: "F1",
      col: "1 / 7",
      row: "1 / 4",
      label: "Hidratación Profunda",
      description:
        "Revitaliza tu piel con una hidratación profunda que elimina impurezas y le devuelve un aspecto fresco y saludable al instante.",
      slug: "hidratacion-profunda",
      image: "/faciales-services/hidratacion-profunda.webp",
    },
    {
      id: "F2",
      col: "7 / 13",
      row: "1 / 4",
      label: "Microdermoabrasión",
      description:
        "Mejora la textura y el brillo de tu piel, reduciendo líneas finas, decoloración, poros dilatados y cicatrices de acné leves.",
      slug: "microdermoabrasion",
      image: "/faciales-services/microdermoabrasion.webp",
    },
    {
      id: "F3",
      col: "1 / 5",
      row: "4 / 7",
      label: "Facial Antiacné",
      description:
        "Regula el pH y reduce el sebo en los poros, dejando una apariencia limpia y libre de impurezas.",
      slug: "facial-antiacne",
      image: "/faciales-services/facial-antiacne.webp",
    },
    {
      id: "F4",
      col: "5 / 9",
      row: "4 / 7",
      label: "Limpieza Profunda",
      description:
        "Limpieza facial profesional que elimina células muertas y espinillas, y tonifica los músculos faciales para un rostro revitalizado.",
      slug: "limpieza-profunda",
      image: "/faciales-services/facial-limpieza-profunda.webp",
    },
    {
      id: "F5",
      col: "9 / 13",
      row: "4 / 7",
      label: "Hydrafacial",
      description:
        "Ilumina tu piel al instante, mejora la textura y reduce líneas y arrugas. Sus efectos se mantienen de 3 a 7 días.",
      slug: "hydrafacial",
      image: "/faciales-services/hydrofacial.webp",
    },
  ] satisfies FacialPieza[],
};
