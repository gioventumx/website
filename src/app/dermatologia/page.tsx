import type { Metadata } from "next";
import { BookingButton } from "@/components/booking/BookingButton";
import { Stars } from "@/components/ui/Stars";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { DermHero } from "@/components/dermatologia/DermHero";
import { PadecimientosGrid } from "@/components/dermatologia/PadecimientosGrid";
import { BranchSwitch } from "@/components/dermatologia/BranchSwitch";
import { BookingSource } from "@/components/dermatologia/BookingSource";
import { dermatologia } from "@/data/dermatologia";
import type { BranchKey } from "@/data/booking";

// Canonical SIEMPRE a la URL limpia (no cambia con ?suc=), porque es export
// estático y no lee searchParams. El dominio absoluto sale de metadataBase (layout).
export const metadata: Metadata = {
  title: "Dermatología en Lomas Verdes y Zona Esmeralda | Gioventù",
  description:
    "Centro dermatológico en Lomas Verdes y Zona Esmeralda. Médicos dermatólogos certificados y tecnología de punta para tratar tu piel: lunares, cicatrices, dermatitis, acné y más. Agenda tu valoración.",
  alternates: { canonical: "/dermatologia/" },
};

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function DermatologiaPage({
  searchParams,
}: {
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);
  // Sin parámetro → ambas sucursales. ?suc=antigua|cuspide → solo esa.
  const branchesToShow: BranchKey[] = branch ? [branch] : ["antigua", "cuspide"];

  const intro = dermatologia.intro;
  const t = dermatologia.testimonial;
  const bh = dermatologia.branchesHead;

  return (
    <>
      {/* Inyecta el origen (suc) en el flujo de agendamiento para medición */}
      <BookingSource suc={branch} />

      <DermHero />

      {/* INTRO centrada */}
      <section className="bg-bg px-6 py-[clamp(60px,8vw,100px)] text-center md:px-10">
        <div className="container-x">
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className="mx-auto mt-3.5 max-w-[820px] font-sans text-[clamp(1.9rem,3.6vw,2.7rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {intro.titleTop} <span className="font-accent text-brand">{intro.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-muted">{intro.body}</p>
          <div className="mt-7 flex justify-center">
            <BookingButton variant="primary">{intro.cta}</BookingButton>
          </div>
        </div>
      </section>

      <PadecimientosGrid />

      {/* TESTIMONIO destacado */}
      <section className="bg-white px-6 py-[clamp(60px,8vw,100px)] text-center md:px-10">
        <div className="container-x">
          <div className="mx-auto max-w-[820px]">
            <span className="eyebrow">{t.eyebrow}</span>
            <div className="mt-3 flex justify-center">
              <Stars rating={5} className="text-[1.1rem]" />
            </div>
            <blockquote className="mt-4 font-accent text-[clamp(1.3rem,2.6vw,1.9rem)] italic leading-[1.4] text-ink">
              “{t.quote}”
            </blockquote>
            <cite className="mt-4 block text-[0.92rem] font-semibold not-italic text-muted">
              {t.author}
            </cite>
          </div>
        </div>
      </section>

      {/* ENCUENTRA TU SUCURSAL — con switch por ?suc= (resuelto en el server) */}
      <section id="sucursales" className="bg-bg px-6 py-[clamp(60px,8vw,100px)] md:px-10">
        <div className="container-x">
          <div className="mb-9 text-center">
            <span className="eyebrow">{bh.eyebrow}</span>
            <h2 className="mt-2 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
              {bh.titleTop} <span className="font-accent text-brand">{bh.titleAccent}</span>
            </h2>
          </div>
          <BranchSwitch branches={branchesToShow} />
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
