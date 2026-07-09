// Reseñas de /wellness/masajes/. Luis y Lili van primeras → caen en las posiciones
// más prominentes del masonry (arriba). Mismo tipo Review que las demás páginas.

import type { Review } from "./types";

export const testimoniosMasajes = {
  googleScore: {
    value: "4.7",
    count: "en Google · 186 reseñas",
  },
  reviews: [
    {
      author: "Luis Z.",
      initial: "L",
      rating: 5,
      text: "El lugar y las instalaciones son muy agradables. El servicio de masaje fue excelente. Muchas gracias.",
    },
    {
      author: "Lili V.",
      initial: "L",
      rating: 5,
      text: "¡Me encanta! El servicio es excelente. La chica de recepción muy amable y la chica que me hizo el masaje es buenísima. Disfruté mucho mi visita.",
    },
    {
      author: "Carla A.",
      initial: "C",
      rating: 5,
      text: "He asistido a sesiones de depilación, masajes y faciales. Todos los servicios increíbles y el personal muy amable.",
    },
    {
      author: "Catheryne C.",
      initial: "C",
      rating: 5,
      text: "Un buen lugar, con especialistas en cosmética y dermatología. Ideal para relajarte.",
    },
    {
      author: "Ana S.",
      initial: "A",
      rating: 5,
      text: "Me puse en las manos de la señorita Desiré. ¡El servicio fue espectacular!",
    },
    {
      author: "Georgina A.",
      initial: "G",
      rating: 5,
      text: "He contratado tratamientos corporales y faciales y he salido muy satisfecha. Desde que llega uno, la atención siempre es muy cordial.",
    },
    {
      author: "Fernanda R.",
      initial: "F",
      rating: 5,
      text: "¡Me encantó! Está súper bonito el lugar. La atención está increíble, no quería que se terminara.",
    },
  ] satisfies Review[],
};
