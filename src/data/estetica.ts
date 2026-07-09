// Copy de la página /estetica/ (Medicina Estética). Estructura tipo faciales/masajes:
// los TRATAMIENTOS van en CARRUSEL justo debajo del hero (antes de la intro); además
// hay una sección de 4 tarjetas de BENEFICIOS después de la intro.
// Nota de estilo: siempre "toxina botulínica", nunca "Botox" (marca registrada).

import type { Feature } from "./types";

export type BeneficioCard = {
  slug: string;
  title: string;
  body: string;
  /** TODO: imagen real arriba de la tarjeta. Vacío = placeholder. */
  image?: string;
};

export const estetica = {
  hero: {
    eyebrow: "Medicina Estética",
    titleTop: "La mejor versión de ti",
    titleAccent: "comienza aquí",
    body: "Rejuvenecimiento facial con rellenos dérmicos, toxina botulínica y estimulación de colágeno. Tratamientos indicados por médicos estéticos, con tecnología de grado clínico.",
    cta: "Agendar valoración",
    // Mismo video de fondo que el hero del Home / Dermatología.
    video: "/GIO-web.mp4",
    rating: { value: "4.7", text: "en Google · 186 reseñas" },
    features: [
      { title: "Tecnología avanzada", description: "Equipo médico de última generación", icon: "tech" },
      { title: "Atención personalizada", description: "Un plan a la medida de tu rostro", icon: "care" },
      { title: "Médicos certificados", description: "Especialistas en medicina estética", icon: "team" },
    ] satisfies Feature[],
  },

  // Intro tipo "statement" (prosa grande) + lluvia de chips. Los segmentos accent van
  // en Playfair italic (los que el copy marcaba entre asteriscos).
  statement: [
    { text: "En Gioventù no buscamos que te veas como alguien más. Nuestros " },
    { text: "médicos estéticos", accent: true },
    { text: " valoran tus rasgos, tu piel y lo que quieres lograr, y a partir de ahí diseñan un plan que respeta lo que ya eres. Rellenos, toxina botulínica, estimulación de colágeno: cada procedimiento tiene una razón detrás, y ninguno se indica sin antes entender qué necesitas." },
  ] satisfies { text: string; accent?: boolean }[],

  // Chips de la lluvia — conceptos de los beneficios (no servicios).
  chips: [
    { slug: "arrugas", label: "Arrugas", tint: true },
    { slug: "lineas-de-expresion", label: "Líneas de expresión" },
    { slug: "colageno", label: "Colágeno", tint: true },
    { slug: "firmeza", label: "Firmeza" },
    { slug: "elasticidad", label: "Elasticidad", tint: true },
    { slug: "resultados-naturales", label: "Resultados naturales" },
    { slug: "no-invasivo", label: "No invasivo", tint: true },
    { slug: "rejuvenecimiento", label: "Rejuvenecimiento" },
  ] satisfies { slug: string; label: string; tint?: boolean }[],

  // 4 tarjetas de beneficios (imagen arriba + título + texto). COPY DEFINITIVO.
  beneficios: {
    eyebrow: "Por qué elegirnos",
    titleTop: "Beneficios que",
    titleAccent: "notas y se mantienen",
    items: [
      {
        slug: "arrugas-lineas",
        title: "Arrugas y Líneas de Expresión",
        body: "Nuestros tratamientos actúan directamente en las zonas donde aparecen los signos de la edad, suavizando arrugas y líneas finas. El resultado es un rostro más relajado, con un aspecto renovado y juvenil.",
        image: "/cards-estetica/arrugas.webp",
      },
      {
        slug: "estimulacion-colageno",
        title: "Estimulación de Colágeno",
        body: "Al activar la producción natural de colágeno, logramos una piel más elástica, firme y resistente al paso del tiempo. Esto no solo mejora la apariencia inmediata, sino que fortalece la piel desde adentro.",
        image: "/cards-estetica/colageno.webp",
      },
      {
        slug: "resultados-naturales",
        title: "Resultados Visibles y Naturales",
        body: "Nuestro enfoque busca resaltar tu belleza auténtica. Obtén cambios notorios pero sutiles, manteniendo la naturalidad de tus rasgos y logrando una apariencia fresca, no exagerada.",
        image: "/cards-estetica/resultados.webp",
      },
      {
        slug: "seguridad-no-invasiva",
        title: "Seguridad No Invasiva",
        body: "Contamos con tecnología avanzada y protocolos médicos que aseguran resultados efectivos no invasivos. Disfruta de procedimientos cómodos, con mínima recuperación y máxima confianza.",
        image: "/cards-estetica/no-invasiva.webp",
      },
    ] satisfies BeneficioCard[],
  },

  // Tratamientos en CARRUSEL (mismo formato que faciales/masajes), debajo del hero.
  // La tarjeta muestra eyebrow + nombre; la `description` queda para datos/SEO.
  tratamientos: {
    head: {
      titleTop: "Nuestros",
      titleAccent: "tratamientos",
      body: "Medicina estética de vanguardia, indicada por médicos y respaldada por más de 10 años de experiencia clínica.",
    },
    items: [
      {
        id: "rellenos-dermicos",
        slug: "rellenos-dermicos",
        label: "Rellenos Dérmicos",
        description: "Recupera volumen y define contornos con ácido hialurónico, para un resultado natural que acompaña la forma de tu rostro.",
        image: "/estetica-services/rellenos.webp",
      },
      {
        id: "toxina-botulinica",
        slug: "toxina-botulinica",
        label: "Toxina Botulínica",
        description: "Suaviza las líneas de expresión relajando el músculo, sin congelar el gesto ni cambiar tu forma de mirar.",
        image: "/estetica-services/toxina.webp",
      },
      {
        id: "co2-fraccionado",
        slug: "co2-fraccionado",
        label: "CO2 Fraccionado",
        description: "Renueva la piel desde adentro con láser fraccionado: mejora textura, cicatrices y manchas, estimulando la regeneración celular.",
        image: "/estetica-services/co2.webp",
      },
      {
        id: "bioestimuladores",
        slug: "bioestimuladores",
        label: "Bioestimuladores",
        description: "Activa la producción natural de colágeno de tu piel, para una firmeza que se construye con el tiempo y dura más que un relleno.",
        image: "/estetica-services/bioestimuladores.webp",
      },
      {
        id: "pdrn-fraccionado",
        slug: "pdrn-fraccionado",
        label: "PDRN Fraccionado",
        description: "Regenera la piel a nivel celular con polinucleótidos, mejorando hidratación, elasticidad y calidad del tejido.",
        image: "/estetica-services/pdrn.webp",
      },
    ],
  },
};
