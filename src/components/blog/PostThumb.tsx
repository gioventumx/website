import Image from "next/image";

// Portada reutilizable. Con `src` usa next/image (lazy por defecto; `priority` solo
// para la portada del artículo sobre el fold). Sin `src`, fondo índigo (placeholder).
type Props = {
  src?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function PostThumb({ src, alt = "", sizes, priority = false, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-brand-deep ${className}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
