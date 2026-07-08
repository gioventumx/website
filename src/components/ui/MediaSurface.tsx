import type { ReactNode } from "react";

type Props = {
  as?: "image" | "video";
  src?: string;
  poster?: string;
  overlay?: "brand" | "ink" | "none";
  /** Etiqueta de referencia mientras usamos placeholders (ej. "▶ video de fondo"). */
  label?: string;
  /** Carga inmediata (LCP, p. ej. hero above-the-fold). Por defecto lazy. */
  priority?: boolean;
  className?: string;
  children?: ReactNode;
};

export function MediaSurface({
  as = "image",
  src,
  poster,
  overlay = "brand",
  label,
  priority = false,
  className = "",
  children,
}: Props) {
  // brand-deep como base plana detrás de la media: sirve de placeholder cuando aún
  // no hay `src`, y de fallback si el video/imagen no carga o no reproduce en móvil
  // (el texto sigue legible sobre el overlay del sistema base).
  const classes = [
    "media-surface",
    "bg-brand-deep",
    overlay === "ink" ? "overlay-ink" : overlay === "none" ? "overlay-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {src &&
        (as === "video" ? (
          <video src={src} poster={poster} autoPlay muted loop playsInline />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            // Lazy por defecto: el navegador difiere la descarga hasta acercarse
            // al viewport (bento bajo el fold). No hay CLS porque el contenedor ya
            // tiene tamaño (grid/min-h) y la imagen es absolute + object-fit:cover.
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
        ))}

      {label && (
        <span className="absolute left-4 top-3.5 z-[3] text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/60">
          {label}
        </span>
      )}

      {children}
    </div>
  );
}
