import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { home } from "@/data/home";

export function TechBand() {
  const b = home.band;

  return (
    <MediaSurface as="video" label="▶ video de fondo" className="text-center">
      <div className="container-x max-w-[680px] py-[clamp(60px,8vw,96px)]">
        <span className="eyebrow on-dark">{b.eyebrow}</span>
        <h2 className="mt-3 font-sans text-[clamp(1.8rem,3.4vw,2.4rem)] font-light leading-[1.18]">
          {b.titleTop} <span className="font-accent block text-brand-tint">{b.titleAccent}</span>
        </h2>
        <p className="mx-auto mb-7 mt-[18px] text-brand-tint">{b.body}</p>
        <BookingButton variant="light">{b.cta.label}</BookingButton>
      </div>
    </MediaSurface>
  );
}
