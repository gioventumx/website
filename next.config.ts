import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserva las URLs con barra final heredadas de WordPress (ej. /dermatologia/)
  // para conservar el posicionamiento durante la migración SEO.
  // /dermatologia  -> 308 -> /dermatologia/
  trailingSlash: true,

  // Redirecciones 301 permanentes de las URLs del WordPress anterior a las nuevas.
  // Todas con barra final (coherente con trailingSlash: true). `permanent: true` = 308,
  // que Google trata igual que un 301 para SEO.
  async redirects() {
    return [
      // ── Blog: las notas del WP vivían en la RAÍZ; en el repo van bajo /blog/ ──
      { source: "/lunares-vs-verrugas-identificacion/", destination: "/blog/lunares-vs-verrugas/", permanent: true },
      { source: "/rejuvenecimiento-facial-tratamientos-efectivos/", destination: "/blog/rejuvenecimiento-facial/", permanent: true },
      { source: "/gioventu-com-mx-blog-causas-flacidez-como-eliminarla/", destination: "/blog/causas-flacidez/", permanent: true },
      // Slug idéntico pero pasa de la raíz a /blog/: source y destination DIFIEREN,
      // así que no hay loop de redirección.
      { source: "/rosacea-sintomas-causas/", destination: "/blog/rosacea-sintomas-causas/", permanent: true },
      { source: "/tipos-de-depilacion-guia/", destination: "/blog/depilacion-laser-guia/", permanent: true },
      { source: "/por-que-sale-la-celulitis/", destination: "/blog/que-es-celulitis/", permanent: true },

      // ── Wellness: páginas hijas consolidadas en faciales / masajes ──
      { source: "/wellness/facial-antiacne/", destination: "/wellness/faciales/", permanent: true },
      { source: "/wellness/hidratacion/", destination: "/wellness/faciales/", permanent: true },
      { source: "/wellness/limpieza-profunda/", destination: "/wellness/faciales/", permanent: true },
      { source: "/wellness/hydrofacial/", destination: "/wellness/faciales/", permanent: true },
      { source: "/wellness/masaje-con-piedras/", destination: "/wellness/masajes/", permanent: true },
      { source: "/wellness/masaje-reductivo/", destination: "/wellness/masajes/", permanent: true },
      { source: "/wellness/parejas/", destination: "/wellness/masajes/", permanent: true },

      // ── Otros ──
      { source: "/estetica/depilacion-laser/", destination: "/depilacion-laser/", permanent: true },
      { source: "/estetica/relleno-de-labios/", destination: "/estetica/", permanent: true },
      { source: "/elemento/co2-laser-fraccionado/", destination: "/estetica/", permanent: true },
      // El servicio se mudó de Estética a Faciales.
      { source: "/estetica/hollywood-peel/", destination: "/wellness/faciales/", permanent: true },
    ];
  },
};

export default nextConfig;
