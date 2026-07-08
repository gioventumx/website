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

  intro: {
    eyebrow: "Dermatología en Lomas Verdes",
    titleTop: "Consigue un tratamiento personalizado",
    titleAccent: "para tu tipo de piel",
    body: "Te ayudamos a sacar lo mejor de tu piel con tratamientos personalizados, medicina estética, faciales y cuidado especializado, apoyados por dermatólogos expertos.",
    cta: "Agendar cita",
  },
};
