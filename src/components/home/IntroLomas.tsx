import { MediaSurface } from "@/components/ui/MediaSurface";
import { Button } from "@/components/ui/Button";
import { home } from "@/data/home";

export function IntroLomas() {
  const i = home.intro;

  return (
    <section className="section bg-bg">
      <div className="container-x grid grid-cols-[1.1fr_0.9fr] items-center gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-[34px]">
        <div>
          <span className="eyebrow">{i.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {i.titleTop}
            <span className="font-accent block text-brand">{i.titleAccent}</span>
          </h2>
          <p className="mt-[18px] text-[1.02rem] text-muted">{i.body}</p>
          <Button href={i.cta.href} variant="outline" className="mt-[26px]">
            {i.cta.label}
          </Button>
        </div>

        <MediaSurface
          as="image"
          label="imagen — clínica / equipo"
          className="aspect-[4/3] rounded-block shadow-card"
        />
      </div>
    </section>
  );
}
