import { wellness } from "@/data/wellness";

// Intro del hub /wellness/: título con accent + párrafos con italic inline (Playfair).
// Va después de las dos tarjetas de acceso.
export function WellnessIntro() {
  const it = wellness.intro;
  return (
    <section className="bg-bg px-6 pb-[clamp(48px,7vw,90px)] pt-[clamp(16px,2.5vw,36px)] md:px-10">
      <div className="container-x max-w-[820px] text-center">
        <div className="space-y-5 text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed text-ink-soft">
          {it.paragraphs.map((paragraph, i) => (
            <p key={i}>
              {paragraph.map((seg, j) =>
                seg.accent ? (
                  <span key={j} className="font-accent text-brand">
                    {seg.text}
                  </span>
                ) : (
                  <span key={j}>{seg.text}</span>
                )
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
