// Padecimientos y tratamientos de Dermatología, en formato BENTO de composición
// MANUAL: cada pieza se coloca con grid-column / grid-row EXACTOS (ver más abajo).
// Grid base validado: 12 columnas (A=1 … L=12) × 10 filas.
//
// TIPOS DE PIEZA
//   treatment → tratamiento: imagen + overlay + nombre serif; hover con descripción
//               y flecha circular. slug listo para enlazar a su página después.
//   cta       → CTA especial índigo pleno (#3336B8), abre el modal. Resalta del resto.
//   decor     → decorativa: solo imagen + overlay, sin texto/CTA/hover (da aire).
//
// El tamaño del título se calcula por ÁREA de la pieza en el componente (grande/
// media/chica), no se guarda aquí. `image` = placeholder (TODO) si está vacío. Las
// descripciones son CORTAS (1 línea, sin truncar). El orden del array = orden móvil.

export type BentoKind = "treatment" | "cta" | "decor";

export type BentoPos = {
  id: string;
  /** grid-column: "col-inicio / col-fin" (letra A=1 … L=12) */
  col: string;
  /** grid-row: "fila-inicio / fila-fin" */
  row: string;
  kind: BentoKind;
  /** Nombre del tratamiento (treatment) o texto del CTA (cta). Vacío en decor. */
  label?: string;
  /** Descripción corta (1 línea) que aparece al hover / en móvil. */
  description?: string;
  /** Slug para enlazar a su página después. Por ahora todo abre el modal. */
  slug?: string;
  /** TODO: imagen de portada real. Vacío = placeholder. */
  image?: string;
};

export const padecimientos = {
  eyebrow: "Padecimientos y tratamientos",
  titleTop: "Un tratamiento para",
  titleAccent: "cada necesidad de tu piel",
};

// Composición exacta (coordenadas validadas). Orden P1…P15 = orden de apilado móvil.
export const bentoLayout: BentoPos[] = [
  {
    id: "P1",
    col: "1 / 3",
    row: "1 / 6",
    kind: "treatment",
    label: "Manchas y melasma",
    description: "Piel más pareja y luminosa.",
    slug: "manchas-y-melasma",
    image: "/derma-services/melasma.webp",
  },
  {
    id: "P2",
    col: "1 / 3",
    row: "6 / 9",
    kind: "treatment",
    label: "Acné",
    description: "Control del acné y sus marcas.",
    slug: "acne",
    image: "/derma-services/acne.webp",
  },
  {
    id: "P3",
    col: "1 / 3",
    row: "9 / 11",
    kind: "treatment",
    label: "Dermatitis",
    description: "Cuidado de la piel irritada.",
    slug: "dermatitis",
    image: "/derma-services/dermatologia.webp",
  },
  {
    id: "P4",
    col: "3 / 6",
    row: "1 / 4",
    kind: "treatment",
    label: "Eliminación de verrugas",
    description: "Retiro seguro de verrugas.",
    slug: "eliminacion-de-verrugas",
    image: "/derma-services/verrugas.webp",
  },
  {
    id: "P5",
    col: "3 / 5",
    row: "4 / 6",
    kind: "treatment",
    label: "Rosácea",
    description: "Calmamos el enrojecimiento.",
    slug: "rosacea",
    image: "/derma-services/rosacea.webp",
  },
  {
    id: "P6",
    col: "3 / 5",
    row: "6 / 9",
    kind: "treatment",
    label: "Remoción de tatuajes",
    description: "Borrado por sesiones con láser.",
    slug: "remocion-de-tatuajes",
    image: "/derma-services/eliminacion-tatuaje.webp",
  },
  {
    id: "P7",
    col: "3 / 5",
    row: "9 / 11",
    kind: "treatment",
    label: "Vitíligo",
    description: "Manejo con enfoque médico.",
    slug: "vitiligo",
    image: "/derma-services/vitiligo.webp",
  },
  {
    id: "P8",
    col: "6 / 9",
    row: "1 / 4",
    kind: "treatment",
    label: "Estrías",
    description: "Reducimos su apariencia.",
    slug: "estrias",
    image: "/derma-services/estrias.webp",
  },
  {
    id: "P9",
    col: "5 / 9",
    row: "4 / 8",
    kind: "cta",
    label: "Agenda ahora con uno de nuestros dermatólogos",
  },
  {
    id: "P10",
    col: "5 / 7",
    row: "8 / 11",
    kind: "treatment",
    label: "Cicatrices",
    description: "Mejoramos su aspecto.",
    slug: "cicatrices",
    image: "/derma-services/cicatrices.webp",
  },
  {
    id: "P11",
    col: "7 / 9",
    row: "8 / 11",
    kind: "treatment",
    label: "Alopecia",
    description: "Frenamos la caída del cabello.",
    slug: "alopecia",
    image: "/derma-services/alopecia.webp",
  },
  {
    id: "P12",
    col: "9 / 13",
    row: "1 / 4",
    kind: "treatment",
    label: "Lunares",
    description: "Retiro con seguridad médica.",
    slug: "lunares",
    image: "/derma-services/lunares.webp",
  },
  {
    id: "P13",
    col: "9 / 11",
    row: "4 / 7",
    kind: "treatment",
    label: "Onicomicosis",
    description: "Tratamiento de hongos en las uñas.",
    slug: "onicomicosis",
    image: "/derma-services/onicomicosis.webp",
  },
  {
    id: "P14",
    col: "11 / 13",
    row: "4 / 7",
    kind: "treatment",
    label: "Ojeras y bolsas",
    description: "Mirada más descansada.",
    slug: "ojeras-y-bolsas",
    image: "/derma-services/ojeras-bolsas.webp",
  },
  {
    id: "P15",
    col: "9 / 13",
    row: "7 / 11",
    kind: "treatment",
    label: "Rutina skincare personalizada",
    description: "Tu rutina de cuidado a medida.",
    slug: "rutina-skincare",
    image: "/skincare.webp",
  },
];
