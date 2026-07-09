import type { Metadata } from "next";
import { ConocenosHero } from "@/components/conocenos/ConocenosHero";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { CrossSell } from "@/components/ui/CrossSell";
import { Blog } from "@/components/home/Blog";
import { conocenos } from "@/data/conocenos";

// Slug heredado de WP (/conocenos/) — no cambiar.
export const metadata: Metadata = {
  title: "Conócenos | Gioventù Dermatología y Estética",
  description:
    "Centro de dermatología, medicina estética y wellness con más de 10 años de experiencia, especialistas certificados y dos sucursales en Estado de México.",
  alternates: { canonical: "/conocenos/" },
};

export default function ConocenosPage() {
  const historia = conocenos.historia;
  const tray = conocenos.trayectoria;

  return (
    <>
      <ConocenosHero />

      {/* HISTORIA — imagen (fachada) a la izquierda, texto a la derecha */}
      <section className="bg-bg px-4 py-[clamp(56px,8vw,100px)] md:px-6">
        <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <MediaSurface
            as="image"
            src={historia.image}
            overlay="none"
            label={historia.image ? undefined : "fachada (TODO)"}
            className="order-1 aspect-[4/3] w-full rounded-block shadow-card"
          />
          <div className="order-2">
            <h2 className="font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
              {historia.titleTop} <span className="font-accent text-brand">{historia.titleAccent}</span>
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-ink-soft">
              {historia.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRAYECTORIA — bloque destacado índigo, números grandes en Playfair */}
      <section className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="rounded-block bg-brand px-6 py-[clamp(48px,7vw,84px)] text-center text-white">
          <h2 className="mx-auto max-w-[720px] font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {tray.titleTop} <span className="font-accent text-brand-tint">{tray.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-brand-tint">{tray.body}</p>
        </div>
      </section>

      {/* Cierre: cross-sell + blog */}
      <CrossSell
        title="¿Por dónde empezar?"
        body="Explora dermatología, medicina estética y wellness — encuentra lo que tu piel necesita."
        defaultImage="/faciales-hero.webp"
        verticals={[
          { label: "Dermatología", href: "/dermatologia/", image: "/dermacta.webp" },
          { label: "Wellness Spa", href: "/wellness/", image: "/masajes-hero.webp" },
        ]}
      />

      <Blog />
    </>
  );
}
