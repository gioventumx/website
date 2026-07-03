// Sección "lluvia" (ResultsRain): statement de marca + chips de TRATAMIENTOS
// que caen con física. Cada chip lleva su slug listo para enlazar a su página
// de servicio más adelante (por ahora NO clickeables, solo interactivos).

import type { StatementSegment } from "./types";

export type Tratamiento = {
  slug: string;
  label: string;
  /** Algunos chips arrancan en el color claro de marca (resalte visual). */
  tint?: boolean;
  // TODO: enlazar a la página del servicio (ej. `/${slug}/`) cuando exista.
};

export const tratamientos = {
  titleTop: "Resultados que se notan",
  titleAccent: "y se sienten",

  // Statement con acentos: "service" = Playfair itálica brand, "attribute" = Playfair itálica ink.
  // La protección de "ritual" (espacio duro) la aplica el componente al render.
  statement: [
    { text: "Más de 10 años revelando la mejor versión de tu piel. " },
    { text: "Dermatología", accent: "service" },
    { text: " y " },
    { text: "medicina estética", accent: "service" },
    { text: " de la mano de " },
    { text: "especialistas certificados", accent: "attribute" },
    { text: ", con la " },
    { text: "última tecnología", accent: "attribute" },
    { text: ". Y cuando el cuerpo también pide pausa, nuestro " },
    { text: "wellness spa", accent: "service" },
    { text: ": masajes y faciales. Porque cuidarte no debería sentirse como un trámite, sino como un " },
    { text: "ritual", accent: "attribute" },
    { text: "." },
  ] satisfies StatementSegment[],

  // Chips de tratamientos (texto real en el DOM). Por ahora no clickeables.
  chips: [
    { slug: "depilacion-laser", label: "Depilación láser", tint: true },
    { slug: "rosacea", label: "Tratamiento de rosácea" },
    { slug: "melasma-manchas", label: "Melasma y manchas" },
    { slug: "verrugas", label: "Eliminación de verrugas", tint: true },
    { slug: "lunares", label: "Eliminación de lunares" },
    { slug: "cicatrices", label: "Desvanecimiento de cicatrices" },
    { slug: "rejuvenecimiento-facial", label: "Rejuvenecimiento facial", tint: true },
    { slug: "bioestimuladores-colageno", label: "Bioestimuladores de colágeno" },
    { slug: "radiofrecuencia", label: "Radiofrecuencia" },
    { slug: "acne", label: "Tratamiento de acné", tint: true },
    { slug: "laser-co2", label: "Láser CO2" },
    { slug: "peeling-quimico", label: "Peeling químico" },
    { slug: "faciales", label: "Faciales", tint: true },
    { slug: "masajes", label: "Masajes" },
    { slug: "tratamiento-capilar", label: "Tratamiento capilar" },
  ] satisfies Tratamiento[],
};
