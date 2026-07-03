"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { padecimientos } from "@/data/padecimientos";

export function PadecimientosGrid() {
  const p = padecimientos;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Entrada al hacer scroll (una sola vez); con reduced-motion aparece directo.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg px-6 py-[clamp(60px,8vw,100px)] md:px-10">
      <div className="container-x">
        <div className="mb-10 max-w-[640px]">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {p.titleTop} <span className="font-accent text-brand">{p.titleAccent}</span>
          </h2>
        </div>

        {/* 2 col móvil/tablet · 5 col desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {p.items.map((item, i) => (
            <div
              key={item.slug}
              className={[
                "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" } as CSSProperties}
            >
              <Link href={`/dermatologia/${item.slug}/`} className="group block">
                <MediaSurface
                  as="image"
                  src={item.image}
                  overlay="ink"
                  label={item.image ? undefined : "imagen"}
                  className="flex min-h-[220px] items-end rounded-card p-4 shadow-card transition-transform duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                >
                  <span className="font-accent text-[1.05rem] italic leading-[1.15] text-white">
                    {item.label}
                  </span>
                </MediaSurface>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
