// Reseñas de /wellness/faciales/ (clientas de faciales). Mismo tipo Review que
// Derma. Elena va primera → cae en la posición más prominente del masonry (arriba a
// la izquierda, primera columna).

import type { Review } from "./types";

export const testimoniosFaciales = {
  googleScore: {
    value: "4.9",
    count: "Calificación en Google · +100 opiniones",
  },
  reviews: [
    {
      author: "Elena M.",
      initial: "E",
      rating: 5,
      text: "El servicio y la atención muy buena. Gaby me hizo el Hollywood Peel y mi cara quedó radiante y muy tersa. Quedé feliz.",
    },
    {
      author: "Lizbeth N.",
      initial: "L",
      rating: 5,
      text: "El servicio es excelente desde que llegué, me encantó mi facial. La atención, estupenda.",
    },
    {
      author: "Georgina A.",
      initial: "G",
      rating: 5,
      text: "He contratado tratamientos corporales y faciales y he salido muy satisfecha. El personal es profesional y altamente calificado.",
    },
    {
      author: "Fernanda R.",
      initial: "F",
      rating: 5,
      text: "¡Me encantó! Está súper bonito el lugar. La atención está increíble, no quería que se terminara.",
    },
    {
      author: "Karla A.",
      initial: "K",
      rating: 5,
      text: "Buen lugar. En especial la atención y el servicio de las cosmetólogas Gabriela Parra y Karen Canales.",
    },
    {
      author: "Moira D.",
      initial: "M",
      rating: 5,
      text: "Increíble la atención y los productos.",
    },
  ] satisfies Review[],
};
