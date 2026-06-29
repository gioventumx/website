import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";
import { home } from "@/data/home";

export function ServicesGrid() {
  const s = home.services;

  return (
    <section id="servicios" className="section bg-surface">
      <div className="container-x">
        <div className="mb-[46px] max-w-[620px]">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {s.titleTop} <span className="font-accent text-brand">{s.titleAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-[22px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
