import type { MetadataRoute } from "next";

const SITE = "https://gioventu.com.mx";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Refuerzo: bloquea cualquier patrón de ETIQUETA aunque no exista ruta.
        // No se bloquea nada que deba indexarse (home, servicios, blog, departamentos,
        // categorías y artículos quedan permitidos).
        disallow: [
          "/blog/etiqueta/",
          "/blog/etiquetas/",
          "/blog/tag/",
          "/blog/tags/",
          "/etiqueta/",
          "/tag/",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
