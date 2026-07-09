import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import type { ServiceOption } from "@/data/booking";

// Banner grande protagonista: imagen de fondo a todo el ancho + overlay plano (sin
// gradiente), contenido centrado y CTA que abre el modal. Más alto que el CTA banner.
type Props = {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  body: string;
  cta: string;
  service: ServiceOption;
  image?: string;
};

export function Banner({ eyebrow, titleTop, titleAccent, body, cta, service, image }: Props) {
  return (
    <section className="px-4 py-4 md:px-6 md:py-6">
      <MediaSurface
        as="image"
        src={image}
        overlay="ink"
        label={image ? undefined : "imagen (TODO)"}
        className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-block px-6 py-[clamp(60px,10vw,120px)] text-center md:min-h-[520px]"
      >
        {/* Scrim plano extra (sin gradiente) para contraste del texto */}
        <div aria-hidden className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container-x max-w-[680px]">
          <span className="eyebrow on-dark">{eyebrow}</span>
          <h2 className="mt-3 whitespace-pre-line font-sans text-[clamp(1.9rem,3.8vw,2.9rem)] font-light leading-[1.14] tracking-[-0.01em] text-white">
            {titleTop} <span className="font-accent text-brand-tint">{titleAccent}</span>
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-[540px] text-[1.05rem] text-brand-tint">{body}</p>
          <BookingButton variant="light" service={service}>
            {cta}
          </BookingButton>
        </div>
      </MediaSurface>
    </section>
  );
}
