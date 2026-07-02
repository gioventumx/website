import type { ReactNode } from "react";

type Props = {
  as?: "image" | "video";
  src?: string;
  poster?: string;
  overlay?: "brand" | "ink";
  /** Etiqueta de referencia mientras usamos placeholders (ej. "▶ video de fondo"). */
  label?: string;
  className?: string;
  children?: ReactNode;
};

export function MediaSurface({
  as = "image",
  src,
  poster,
  overlay = "brand",
  label,
  className = "",
  children,
}: Props) {
  // brand-deep como base plana detrás de la media: sirve de placeholder cuando aún
  // no hay `src`, y de fallback si el video/imagen no carga o no reproduce en móvil
  // (el texto sigue legible sobre el overlay del sistema base).
  const classes = [
    "media-surface",
    "bg-brand-deep",
    overlay === "ink" ? "overlay-ink" : "",
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
          <img src={src} alt="" />
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
