// Copy de la página /dermatologia/ (hero, intro, testimonio, encabezados).
// Los padecimientos viven en data/padecimientos.ts. El CTA de cierre reutiliza
// home.band vía <ClosingCTA />. Imágenes = placeholder (TODO).

import type { Feature } from "./types";

export const dermatologia = {
  hero: {
    eyebrow: "Centro dermatológico · Lomas Verdes",
    titleTop: "Cuidado experto",
    titleAccent: "para la salud de tu piel",
    body: "Médicos dermatólogos evalúan tu padecimiento y diseñan el tratamiento específico para obtener los mejores resultados.",
    cta: "Agendar cita",
    // TODO: imagen/video de fondo real del hero. Vacío = placeholder.
    image: "",
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

  testimonial: {
    eyebrow: "Personas reales, resultados reales",
    quote:
      "Decidí probar el tratamiento de láser CO2 y en pocas sesiones las manchas desaparecieron. Mi piel luce más limpia y rejuvenecida.",
    author: "Julio R. · Paciente de Dermatología",
  },

  branchesHead: { eyebrow: "Encuentra", titleTop: "tu", titleAccent: "sucursal" },
};
