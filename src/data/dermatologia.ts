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
    rating: { value: "4.9", text: "en Google · pacientes reales" },
    features: [
      { title: "Tecnología de punta", description: "Equipo médico de última generación", icon: "tech" },
      { title: "Atención personalizada", description: "Un plan a la medida de tu piel", icon: "care" },
      { title: "Médicos dermatólogos", description: "Especialistas certificados", icon: "team" },
    ] satisfies Feature[],
  },

  // Intro tipo "statement": prosa grande centrada, sin animación. Los segmentos con
  // `accent` van en Playfair italic (font-accent text-brand); el resto en DM Sans Light.
  statement: [
    {
      text: "En Gioventù entendemos que traer una duda sobre tu piel no es algo menor. Ese lunar que te preocupa, el acné que no cede, la mancha que apareció sin aviso; cada caso merece la atención de un ",
    },
    { text: "dermatólogo certificado", accent: true },
    {
      text: ", la tecnología más avanzada y el tratamiento correcto. Nuestros especialistas se mantienen al día con lo que la dermatología descubre cada año, porque el conocimiento no se detiene, y tu piel tampoco. ",
    },
    { text: "Diez años", accent: true },
    { text: " acompañando pieles, no tratando casos." },
  ] satisfies { text: string; accent?: boolean }[],
};
