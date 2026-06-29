import { home } from "@/data/home";

export function Benefits() {
  const b = home.benefits;

  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-[620px]">
          <span className="eyebrow">{b.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {b.titleTop} <span className="font-accent text-brand">{b.titleAccent}</span>
          </h2>
        </div>

        <div className="mt-[30px] flex flex-wrap gap-3.5">
          {b.chips.map((chip) => (
            <span
              key={chip}
              className="flex items-center gap-[0.55em] rounded-full border border-line bg-surface px-[1.3em] py-[0.7em] text-[0.95rem] font-medium"
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
