// Copy de /wellness/masajes/. Es WELLNESS: masajistas profesionales (no médicos).
// Imágenes = placeholder. Misma estructura de datos que faciales.

import type { Feature } from "./types";

export type MasajePieza = {
  id: string;
  label: string;
  description: string;
  slug: string;
  image?: string;
};

export const masajes = {
  hero: {
    eyebrow: "Masajes",
    titleTop: "Renueva tu energía",
    titleAccent: "con un masaje corporal",
    body: "Masajes relajantes, descontracturantes y reductivos en nuestro Wellness Spa, con masajistas profesionales y técnicas para cada necesidad de tu cuerpo.",
    cta: "Agendar cita",
    image: "/masajes-hero.webp",
    rating: { value: "4.9", text: "en Google · clientas reales" },
    features: [
      { title: "Masajistas profesionales", description: "Manos expertas en cada técnica", icon: "team" },
      { title: "Técnica para tu cuerpo", description: "La presión que cada cuerpo necesita", icon: "care" },
      { title: "Ambiente de spa", description: "Un espacio para desconectar", icon: "tech" },
    ] satisfies Feature[],
  },

  // Intro tipo "statement" (prosa grande centrada). Acentos en Playfair italic.
  statement: [
    {
      text: "En Gioventù entendemos que un masaje no es un capricho, es lo que tu cuerpo pide cuando lleva semanas sosteniéndote. Nuestros ",
    },
    { text: "masajistas profesionales", accent: true },
    {
      text: " trabajan con técnicas definidas y la presión que cada cuerpo necesita, no la que viene en el catálogo. Masaje descontracturante, drenaje linfático, presoterapia, piedras calientes: el que te toca depende de ",
    },
    { text: "cómo llegues", accent: true },
    { text: ", no de lo que esté de moda." },
  ] satisfies { text: string; accent?: boolean }[],

  // Chips (masajes) para la lluvia de pills de la intro.
  chips: [
    { slug: "masaje-descontracturante", label: "Descontracturante", tint: true },
    { slug: "presoterapia", label: "Presoterapia" },
    { slug: "masaje-con-piedras", label: "Piedras calientes", tint: true },
    { slug: "drenaje-linfatico", label: "Drenaje linfático" },
    { slug: "masaje-de-cuarzos", label: "Cuarzos", tint: true },
    { slug: "masaje-relajante", label: "Relajante" },
    { slug: "masaje-reductivo", label: "Reductivo", tint: true },
  ] satisfies { slug: string; label: string; tint?: boolean }[],

  // Banner protagonista de masaje en pareja (entre la intro y los testimonios).
  coupleBanner: {
    eyebrow: "Experiencia en pareja",
    // \n fuerza el salto: "En pareja, se recuerda." siempre baja al 2° renglón.
    titleTop: "Un masaje se disfruta.\nEn pareja,",
    titleAccent: "se recuerda.",
    body: "Dos camillas, una misma hora, el mismo silencio. Nuestro masaje en pareja está pensado para que salgan del ruido juntos y regresen distintos.",
    cta: "Agendar en pareja",
    image: "/masajes-pareja.webp",
  },

  // Encabezado del carrusel.
  carruselHead: {
    titleTop: "Masajes que",
    titleAccent: "devuelven tu descanso",
    body: "Masajes corporales y de spa para relajar, descontracturar y revitalizar tu cuerpo.",
  },

  // Los 7 masajes.
  carrusel: [
    {
      id: "M1",
      label: "Masaje Descontracturante",
      description:
        "Alivia tensiones y reduce el estrés con un masaje descontracturante ideal para relajar músculos y mejorar tu bienestar general.",
      slug: "masaje-descontracturante",
      image: "/masajes-services/masaje-descontracturante.webp",
    },
    {
      id: "M2",
      label: "Presoterapia",
      description:
        "Mejora la circulación y reduce la retención de líquidos con la presoterapia, un tratamiento eficaz que revitaliza tu cuerpo y promueve el bienestar.",
      slug: "presoterapia",
      image: "/masajes-services/presoterpia.webp",
    },
    {
      id: "M3",
      label: "Masaje con Piedras",
      description:
        "Disfruta de una experiencia única con masaje con piedras calientes, que relaja profundamente los músculos y equilibra tu energía, brindando bienestar total.",
      slug: "masaje-con-piedras",
      image: "/masajes-services/masaje-con-piedras.webp",
    },
    {
      id: "M4",
      label: "Drenaje Linfático",
      description:
        "Estimula tu sistema linfático y reduce la hinchazón con el drenaje linfático, un tratamiento que purifica y revitaliza tu cuerpo.",
      slug: "drenaje-linfatico",
      image: "/masajes-services/drenaje-linfatico-masaje.webp",
    },
    {
      id: "M5",
      label: "Masaje de Cuarzos",
      description:
        "Revitaliza tu piel y equilibra tus energías con el masaje de cuarzos, que combina técnicas de relajación y beneficios curativos de los minerales.",
      slug: "masaje-de-cuarzos",
      image: "/masajes-services/masaje-de-cuarzos.webp",
    },
    {
      id: "M6",
      label: "Masaje Relajante",
      description:
        "Sumérgete en la serenidad con nuestros masajes relajantes, diseñados para reducir el estrés y promover una sensación de calma y bienestar total.",
      slug: "masaje-relajante",
      image: "/masajes-services/masaje-relajante.webp",
    },
    {
      id: "M7",
      label: "Masaje Reductivo",
      description:
        "Reduce medidas y mejora la apariencia de tu figura con nuestro masaje reductivo, que ayuda a eliminar grasa localizada y tonifica tu piel.",
      slug: "masaje-reductivo",
      image: "/masajes-services/masaje-reductivo.webp",
    },
  ] satisfies MasajePieza[],
};
