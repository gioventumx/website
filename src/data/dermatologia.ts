// Copy de la página /dermatologia/ (hero, intro). Los padecimientos viven en
// data/padecimientos.ts y los testimonios en data/testimonios-derma.ts. El CTA de
// cierre reutiliza home.band vía <ClosingCTA />. Imágenes = placeholder (TODO).

import type { Feature } from "./types";

export const dermatologia = {
  // Migas de pan (breadcrumb) del hero — navegación + SEO. La última es la actual.
  breadcrumb: [
    { label: "Inicio", href: "/" },
    { label: "Dermatología", href: "/dermatologia/" },
  ],

  hero: {
    titleTop: "Cuidado experto",
    titleAccent: "para la salud de tu piel",
    body: "Médicos dermatólogos evalúan tu padecimiento y diseñan el tratamiento específico para obtener los mejores resultados.",
    cta: "Agendar cita",
    // Mismo video de fondo que el hero del Home (muted, autoplay, loop, playsInline).
    video: "/GIO-web.mp4",
    rating: { value: "4.7", text: "en Google · 186 reseñas" },
    features: [
      { title: "Tecnología de punta", description: "Equipo médico de última generación", icon: "tech" },
      { title: "Atención personalizada", description: "Un plan a la medida de tu piel", icon: "care" },
      { title: "Médicos dermatólogos", description: "Especialistas certificados", icon: "team" },
    ] satisfies Feature[],
  },

  // Intro tipo "statement": prosa grande centrada, sin animación. Los segmentos con
  // `accent` van en Playfair italic (font-accent text-brand); el resto en DM Sans Light.
  statement: [
    { text: "En " },
    { text: "Gioventù", accent: true },
    { text: " entendemos que traer una duda sobre tu piel no es algo menor. Ese " },
    { text: "lunar", accent: true },
    { text: " que te preocupa, el " },
    { text: "acné", accent: true },
    { text: " que no cede, la " },
    { text: "mancha", accent: true },
    { text: " que apareció sin aviso; cada caso merece la atención de un " },
    { text: "dermatólogo certificado", accent: true },
    { text: ", la " },
    { text: "tecnología", accent: true },
    { text: " más avanzada y el tratamiento correcto. " },
    { text: "Diez años", accent: true },
    { text: " acompañando pieles, no tratando casos." },
  ] satisfies { text: string; accent?: boolean }[],

  // Chips (padecimientos) para la lluvia de pills de la intro.
  chips: [
    { slug: "eliminacion-de-verrugas", label: "Eliminación de verrugas", tint: true },
    { slug: "lunares", label: "Lunares" },
    { slug: "manchas-y-melasma", label: "Manchas y melasma", tint: true },
    { slug: "acne", label: "Acné" },
    { slug: "cicatrices", label: "Cicatrices", tint: true },
    { slug: "estrias", label: "Estrías" },
    { slug: "rosacea", label: "Rosácea", tint: true },
    { slug: "dermatitis", label: "Dermatitis" },
    { slug: "ojeras-y-bolsas", label: "Ojeras y bolsas", tint: true },
    { slug: "vitiligo", label: "Vitíligo" },
    { slug: "remocion-de-tatuajes", label: "Remoción de tatuajes", tint: true },
    { slug: "alopecia", label: "Alopecia" },
    { slug: "onicomicosis", label: "Onicomicosis", tint: true },
  ] satisfies { slug: string; label: string; tint?: boolean }[],
};
