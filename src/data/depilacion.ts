// Copy de la página /depilacion-laser/ (hero, features, banner, zonas, testimonios,
// faq y CTA de cierre). Clona el patrón de /dermatologia/ con el sistema de marca.
// NO incluye sección de sucursales. Imágenes = placeholder (TODO).
// Contenido tomado de la referencia del WordPress actual para preservar SEO.

import type { FaqItem } from "./faq";
import type { Review } from "./types";

export type FeatureCard = { title: string; body: string };

export type Zona = {
  slug: string;
  title: string;
  lead: string;
  body: string;
  /** TODO: imagen real de la zona (ej. "/depilacion/piernas.webp"). Vacío = placeholder. */
  image?: string;
};

export const depilacion = {
  hero: {
    eyebrow: "Depilación láser · Lomas Verdes",
    titleTop: "Disfruta de una piel perfecta,",
    titleAccent: "sin fecha de caducidad.",
    body: "Dile adiós al vello no deseado con la tecnología láser más avanzada. Resultados visibles desde la primera sesión.",
    cta: "Agenda ahora",
    image: "/depilacion-laser-card.webp",
  },

  features: [
    {
      title: "Eficacia de grado médico",
      body: "Tecnología de láser diodo de última generación, que elimina el vello desde la raíz de forma segura en cualquier tipo de piel.",
    },
    {
      title: "Piel libre de irritación",
      body: "Olvida las manchas, el vello enterrado y la irritación del rastrillo. Mejora la textura y claridad de tu piel.",
    },
    {
      title: "Resultados definitivos",
      body: "Reducción del vello de hasta el 95% al completar tu tratamiento. Una inversión que dura.",
    },
    {
      title: "Experiencia sin dolor",
      body: "Sistema de enfriamiento integrado: sesiones rápidas, cómodas y prácticamente indoloras.",
    },
  ] satisfies FeatureCard[],

  banner: {
    titleTop: "Consigue un descuento",
    titleAccent: "en tu primera visita",
    body: "Programa tu primera sesión con 10% de descuento.",
    cta: "Agenda ahora",
    // TODO: imagen de fondo real del banner. Vacío = placeholder.
    image: "",
  },

  zonas: {
    eyebrow: "Zonas de tratamiento",
    titleTop: "Olvida el vello",
    titleAccent: "elige tu zona",
    body: "Personalizamos cada sesión según tu piel. Tecnología de láser diodo de grado médico para tratar con precisión cada área del cuerpo, de forma eficaz, segura y definitiva.",
    cta: "Agenda tu primera sesión",
    items: [
      {
        slug: "piernas",
        title: "Piernas",
        lead: "Dile adiós al rastrillo.",
        body: "Suavidad absoluta y duradera. Elimina el vello grueso y previene el vello encarnado.",
        image: undefined,
      },
      {
        slug: "brazos-y-axilas",
        title: "Brazos y axilas",
        lead: "Libertad en movimiento.",
        body: "Piel uniforme, clara y libre de vello, sin las manchas de la depilación tradicional.",
        image: undefined,
      },
      {
        slug: "bikini",
        title: "Bikini",
        lead: "Comodidad e higiene.",
        body: "La zona más delicada con el mejor cuidado: precisión y suavidad, sin irritaciones.",
        image: undefined,
      },
      {
        slug: "rostro",
        title: "Rostro",
        lead: "Tu rostro impecable.",
        body: "Elimina el vello facial de forma segura, cuidando la sensibilidad de tu piel.",
        image: undefined,
      },
    ] satisfies Zona[],
  },

  testimonios: {
    eyebrow: "Testimonios",
    titleTop: "Personas reales,",
    titleAccent: "resultados inigualables",
    googleScore: {
      value: "4.7",
      count: "en Google · 186 reseñas",
    },
    // TODO: reemplazar por reseñas reales de depilación de Google.
    reviews: [
      {
        author: "Carla A.",
        initial: "C",
        rating: 5,
        text: "He asistido a sesiones de depilación, masajes y faciales. Todos los servicios increíbles y el personal muy amable.",
      },
      {
        author: "Richard L.",
        initial: "R",
        rating: 5,
        text: "Se nota el cambio desde la primera sesión, ya casi no me sale vello. Muy limpio el lugar.",
      },
      {
        author: "Paola V.",
        initial: "P",
        rating: 5,
        text: "Rápido, sin dolor y con resultados. El equipo que usan se nota que es de última generación.",
      },
    ] satisfies Review[],
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    titleTop: "¿Alguna duda?",
    titleAccent: "Confía en los expertos",
    items: [
      {
        q: "¿La depilación láser duele?",
        a: "Es un procedimiento muy tolerable. Nuestro sistema de enfriamiento integrado hace que sientas apenas un calorcito momentáneo; la mayoría lo describe como una molestia mínima, no dolor.",
      },
      {
        q: "¿Cómo prepararse para la depilación?",
        a: "Rasura la zona un día antes (no depiles con cera ni pinzas), evita el sol y llega con la piel limpia, sin cremas ni maquillaje. En tu valoración te damos las indicaciones exactas.",
      },
      {
        q: "¿Cuándo esperar los resultados?",
        a: "Notarás menos vello desde la primera sesión. Los resultados se acumulan sesión a sesión; el plan completo depende de tu tipo de piel y vello, y te lo definimos en tu valoración.",
      },
      {
        q: "¿Se puede eliminar el vello claro con láser?",
        a: "El láser funciona mejor sobre vello con pigmento (oscuro). El vello muy claro, canoso o rubio responde menos; en tu valoración evaluamos tu caso y te decimos qué esperar.",
      },
      {
        q: "¿En qué zonas puedo aplicarme la depilación láser?",
        a: "Prácticamente en todo el cuerpo: piernas, brazos, axilas, bikini, rostro, espalda, pecho y más. Adaptamos la sesión a cada zona.",
      },
      {
        q: "¿Es adecuado para hombres y mujeres?",
        a: "Sí, atendemos a hombres y mujeres. El tratamiento se ajusta al tipo de piel y vello de cada persona.",
      },
      {
        q: "¿Puedo depilarme si estoy embarazada?",
        a: "Por precaución no recomendamos la depilación láser durante el embarazo. Podrás retomar tu tratamiento después; consúltalo con nosotros.",
      },
      {
        q: "¿Me puedo depilar si tengo tatuajes?",
        a: "No aplicamos el láser directamente sobre un tatuaje, pero sí podemos tratar la zona alrededor, cuidando el diseño. Coméntanoslo en tu valoración.",
      },
      {
        q: "¿Cómo cuidar tu piel después de la depilación?",
        a: "Evita el sol directo y usa protector solar, no exfolies ni uses productos irritantes las primeras 48 horas, e hidrata la zona. Te damos las indicaciones completas tras cada sesión.",
      },
      {
        q: "¿Se puede realizar en cualquier época del año?",
        a: "Sí. Solo hay que cuidar la exposición al sol antes y después de cada sesión, así que con la protección adecuada puedes tratarte todo el año.",
      },
      {
        q: "Contraindicaciones de la depilación láser",
        a: "Embarazo, ciertas condiciones de la piel, fotosensibilidad por medicamentos y bronceado reciente pueden contraindicar el tratamiento. Por eso siempre hacemos una valoración previa para asegurar que sea seguro para ti.",
      },
    ] satisfies FaqItem[],
  },

  closing: {
    titleTop: "Piel suave, sin vello,",
    titleAccent: "para siempre",
    body: "Reserva tu primera sesión con 10% de descuento y compruébalo.",
    cta: "Agenda ahora",
    // TODO: imagen de fondo real del CTA de cierre. Vacío = placeholder.
    image: "",
  },
};
