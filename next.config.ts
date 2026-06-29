import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserva las URLs con barra final heredadas de WordPress (ej. /dermatologia/)
  // para conservar el posicionamiento durante la migración SEO.
  // /dermatologia  -> 308 -> /dermatologia/
  trailingSlash: true,
};

export default nextConfig;
