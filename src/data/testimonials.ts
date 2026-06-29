import type { Review } from "./types";

export const testimonials = {
  googleScore: {
    value: "5.0",
    count: "Calificación en Google · +60 opiniones",
  },
  reviews: [
    {
      author: "Mariana A.",
      initial: "M",
      rating: 5,
      text: "Excelente atención de doctoras y personal. Muy amable y servicial, súper recomendable.",
    },
    {
      author: "Julio R.",
      initial: "J",
      rating: 5,
      text: "Decidí probar el tratamiento de láser CO2 y en pocas sesiones las manchas desaparecieron. Mi piel luce más limpia y rejuvenecida.",
    },
    {
      author: "Andrea U.",
      initial: "A",
      rating: 5,
      text: "Atención de primera, instalaciones impecables y resultados visibles. Volveré sin duda.",
    },
  ] satisfies Review[],
};
