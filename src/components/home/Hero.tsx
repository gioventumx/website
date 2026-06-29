import { MediaSurface } from "@/components/ui/MediaSurface";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { home } from "@/data/home";

export function Hero() {
  const h = home.hero;

  return (
    <MediaSurface as="video" label="▶ video de fondo">
      <div className="container-x max-w-[960px] pb-[112px] pt-[104px]">
        <span className="eyebrow on-dark">{h.eyebrow}</span>

        <h1 className="mt-[18px] font-sans text-[clamp(2.4rem,5.2vw,4rem)] font-light leading-[1.08] tracking-[-0.015em]">
          {h.titleTop}
          <span className="font-accent block text-[1.04em] text-brand-tint">
            {h.titleAccent}
          </span>
        </h1>

        <p className="mb-8 mt-[22px] max-w-[560px] text-[1.05rem] text-brand-tint">{h.body}</p>

        <div className="flex flex-wrap items-center gap-3.5">
          <Button href={h.cta.href} variant="light">
            {h.cta.label}
          </Button>
          <div className="flex items-center gap-2.5 text-[0.85rem] text-brand-tint">
            <Stars rating={5} />
            <span>
              <b className="text-white">{h.rating.value}</b> {h.rating.text}
            </span>
          </div>
        </div>
      </div>
    </MediaSurface>
  );
}
