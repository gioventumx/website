// Reseñas de pacientes de Dermatología (data propia de la página /dermatologia/).
// Mismo tipo Review que el Home; se renderizan en el masonry de <Testimonios />.

import type { Review } from "./types";

export const testimoniosDerma = {
  googleScore: {
    value: "4.7",
    count: "en Google · 186 reseñas",
  },
  reviews: [
    {
      author: "Julio R.",
      initial: "J",
      rating: 5,
      text: "Decidí probar el tratamiento de láser CO2 y en pocas sesiones las manchas desaparecieron. Mi piel luce más limpia y rejuvenecida.",
    },
    {
      author: "Paola V.",
      initial: "P",
      rating: 5,
      text: "Lindo lugar, rápido y sin dolor. Muy buen lugar para atenderme la eliminación de lunares y verrugas.",
    },
    {
      author: "Andrea S.",
      initial: "A",
      rating: 5,
      text: "El doctor explica muy bien y da tratamientos concisos. Resolvió todas mis dudas.",
    },
    {
      author: "Michael M.",
      initial: "M",
      rating: 5,
      text: "Rapidísimo, sin dolor y eficiente. 100% satisfecho.",
    },
    {
      author: "Mariana A.",
      initial: "M",
      rating: 5,
      text: "Me encantó la honestidad. No quisieron venderme por venderme.",
    },
    {
      author: "Fernanda J.",
      initial: "F",
      rating: 5,
      text: "Tenía años con alopecia areata y en menos de un mes ya me creció el cabello de esa zona. Muy satisfecha con mi procedimiento.",
    },
    {
      author: "Georgina A.",
      initial: "G",
      rating: 5,
      text: "Personal profesional y altamente calificado. La atención siempre muy cordial desde que llegas.",
    },
  ] satisfies Review[],
};
