// Padecimientos que atiende Dermatología. Cada uno es contenido SEO (keyword)
// y lleva slug para enlazar después a su página. Imágenes = placeholder (TODO).

export type Padecimiento = {
  slug: string;
  label: string;
  /** TODO: imagen de portada real (ej. "/dermatologia/cicatrices.png"). Vacío = placeholder. */
  image?: string;
};

export const padecimientos = {
  eyebrow: "Lo que tratamos",
  titleTop: "Padecimientos",
  titleAccent: "que atendemos",
  items: [
    { slug: "extraccion-de-lunares", label: "Extracción de lunares", image: undefined },
    { slug: "cicatrices", label: "Cicatrices", image: undefined },
    { slug: "dermatitis", label: "Dermatitis", image: undefined },
    { slug: "onicomicosis", label: "Onicomicosis", image: undefined },
    { slug: "perdida-del-cabello", label: "Pérdida del cabello", image: undefined },
    { slug: "ojeras-o-bolsas", label: "Ojeras o bolsas", image: undefined },
    { slug: "remocion-de-tatuajes", label: "Remoción de tatuajes", image: undefined },
    { slug: "estrias", label: "Estrías", image: undefined },
    { slug: "eliminacion-de-verrugas", label: "Eliminación de verrugas", image: undefined },
    { slug: "vitiligo", label: "Vitíligo", image: undefined },
  ] satisfies Padecimiento[],
};
