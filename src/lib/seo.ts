import type { Metadata } from "next";

// Helper de metadata: garantiza que TODA página tenga OpenGraph + Twitter card
// completos (título, descripción, url canónica y og:image), sin depender de cómo
// Next fusiona/reemplaza `openGraph` entre layout y página.

export const SITE_URL = "https://gioventu.com.mx";
export const SITE_NAME = "Gioventù";

// og:image por defecto para todo el sitio (absoluta). JPG y no WebP: WhatsApp —canal
// principal— no renderiza WebP en previews de forma consistente.
const DEFAULT_OG_IMAGE = "/thumbnail.jpg";
const DEFAULT_OG_ALT = "Gioventù — Centro Dermatológico y Estético";

/** URL absoluta a partir de una ruta relativa (o deja pasar una ya absoluta). */
function abs(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

type Opts = {
  title: string;
  description: string;
  /** Ruta con trailing slash, ej. "/dermatologia/". Alimenta canonical + og:url. */
  path: string;
  /** og:image propia (ej. portada de nota). Default: /thumbnail.webp del sitio. */
  image?: string;
  imageAlt?: string;
  /** og:type — "website" (default) o "article" (notas del blog). */
  type?: "website" | "article";
  /** Añade robots noindex (borradores, aviso de privacidad). */
  noindex?: boolean;
  /** Keywords opcionales (solo metadata, no ruta). */
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  noindex,
  keywords,
}: Opts): Metadata {
  const url = abs(path);
  const ogImage = abs(image ?? DEFAULT_OG_IMAGE);
  const ogAlt = imageAlt ?? (image ? title : DEFAULT_OG_ALT);

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(keywords ? { keywords } : {}),
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_MX",
      type,
      images: [{ url: ogImage, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
