import type { Review } from "./types";

export const testimonials = {
  googleScore: {
    value: "4.9",
    count: "Calificación en Google · +100 opiniones",
  },
  // Reseñas reales de Google (C1→C7 del wireframe). Altura variable por el largo del texto.
  reviews: [
    {
      author: "Mariana A.",
      initial: "M",
      rating: 5,
      text: "Me encantó la honestidad. No quisieron venderme por venderme.",
    },
    {
      author: "Georgina Arana",
      initial: "G",
      rating: 5,
      text: "Los servicios que ofrecen son aplicados con personal profesional y altamente calificado, además de ser amables. He contratado tratamientos corporales y faciales y he salido muy satisfecha; desde que llega uno, la atención siempre es muy cordial.",
    },
    {
      author: "Andrea Sánchez",
      initial: "A",
      rating: 5,
      text: "El doctor explica muy bien y da tratamientos concisos. Resolvió todas mis dudas.",
    },
    {
      author: "Michael Mejía",
      initial: "M",
      rating: 5,
      text: "Rapidísimo, sin dolor y eficiente. 100% satisfecho.",
    },
    {
      author: "Paola Vallet",
      initial: "P",
      rating: 5,
      text: "Lindo lugar, rápido y sin dolor. Muy buen lugar para atenderme la eliminación de lunares y verrugas.",
    },
    {
      author: "Jiménez Fernanda",
      initial: "J",
      rating: 5,
      text: "En menos de un mes vi avances con mi procedimiento. Tenía años con alopecia areata y ahora ya me creció el cabello de esa zona. Hasta ahora estoy muy satisfecha con mi procedimiento.",
    },
    {
      author: "Montserrat Barjau",
      initial: "M",
      rating: 5,
      text: "Excelente servicio en tratamientos cosmetológicos. Mi paquete de radiofrecuencia antes de mi boda me ayudó a lucir increíble y a llegar al peso que quería.",
    },
  ] satisfies Review[],
};
