import type { ReactNode } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";

export type StickyImage = { src?: string; alt: string };

type Props = {
  /** Cuerpo del artículo ya renderizado (ej. desde Markdown, como PostBody del blog). */
  children: ReactNode;
  images: StickyImage[];
};

// Contenido profundo con imágenes en scroll sticky: texto a la izquierda, columna de
// imágenes a la derecha. Mismo offset sticky que NewsletterAside (118px = header +
// aire). CADA imagen es sticky por su cuenta (no el bloque completo): con 1 sola
// imagen, el efecto es "se queda fija" todo el scroll (no tiene con qué turnarse).
// Con varias, cada una se pega en su turno y la siguiente la reemplaza al llegar
// —"avanzan" con el scroll en vez de quedar todas apiladas y visibles a la vez—.
// En móvil (sin lg:) el sticky no aplica y todo fluye en una columna.
export function StickyContent({ children, images }: Props) {
  return (
    <section className="bg-bg py-[clamp(40px,6vw,72px)]">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_420px]">
        {/* Sin wrapper tipográfico propio: `children` normalmente es PostBody (blog),
            que ya trae su propio text-[1rem] leading-[1.75]. Solo el ancho de lectura. */}
        <div className="max-w-[640px]">{children}</div>

        {images.length > 0 && (
          <div className="flex flex-col gap-5">
            {images.map((img, i) => (
              <div key={i} className="lg:sticky lg:top-[118px]">
                <MediaSurface
                  as="image"
                  src={img.src}
                  overlay="none"
                  label={img.src ? undefined : "imagen (TODO)"}
                  className="aspect-[4/5] rounded-block"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
