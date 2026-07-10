// Reseñas de la página /estetica/ (Medicina Estética). Mismo tipo Review y masonry
// que el Home; la etiqueta "Paciente" y las estrellas las pone <ReviewCard>.
// Nota: el rating del encabezado YA NO sale de aquí — lo renderiza el componente
// dinámico por sucursal <GoogleRatingScore> (Antigua 4.8 · Cúspide 4.6 · default 4.8).
// `googleScore` queda solo por paridad con los otros archivos (no se renderiza).

import type { Review } from "./types";

export const testimoniosEstetica = {
  googleScore: {
    value: "4.7",
    count: "en Google · 186 reseñas",
  },
  reviews: [
    {
      author: "Montserrat B.",
      initial: "M",
      rating: 5,
      text: "Excelente servicio en tratamientos cosmetológicos. Mi paquete de radiofrecuencia antes de mi boda me ayudó a lucir increíble y a llegar al peso que quería.",
    },
    {
      author: "Carolina R.",
      initial: "C",
      rating: 5,
      text: "Me encantó el lugar, excelente trato, excelentes resultados del tratamiento. ¡Salgo muy feliz siempre!",
    },
    {
      author: "Georgina A.",
      initial: "G",
      rating: 5,
      text: "He contratado tratamientos corporales y faciales y he salido muy satisfecha. Personal profesional y altamente calificado.",
    },
    {
      author: "Aicel M.",
      initial: "A",
      rating: 5,
      text: "Me encantó. Excelente servicio. Sí o sí regresaré.",
    },
    {
      author: "Angélica G.",
      initial: "A",
      rating: 5,
      text: "Es una clínica de alta especialidad, cuentan con un excelente servicio.",
    },
    {
      author: "Moira D.",
      initial: "M",
      rating: 5,
      text: "Increíble la atención y los productos.",
    },
    {
      author: "Mariana A.",
      initial: "M",
      rating: 5,
      text: "Me encantó la honestidad. No quisieron venderme por venderme.",
    },
  ] satisfies Review[],
};
