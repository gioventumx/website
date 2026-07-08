import type { Metadata } from "next";
import { BookingButton } from "@/components/booking/BookingButton";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { FAQ } from "@/components/home/FAQ";
import { Blog } from "@/components/home/Blog";
import { DermHero } from "@/components/dermatologia/DermHero";
import { PadecimientosGrid } from "@/components/dermatologia/PadecimientosGrid";
import { Testimonios } from "@/components/dermatologia/Testimonios";
import { BookingSource } from "@/components/dermatologia/BookingSource";
import { dermatologia } from "@/data/dermatologia";
import { faqDerma } from "@/data/faq-derma";
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
  // Ya no mostramos sucursales, pero si la visita llegó por ?suc= (campaña) lo
  // seguimos registrando en el flujo de agendamiento para medición.
  const branch = normalizeSuc(suc);

  const intro = dermatologia.intro;

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
            <BookingButton variant="primary" service="Dermatología">
              {intro.cta}
            </BookingButton>
          </div>
        </div>
      </section>

      <PadecimientosGrid />

      <Testimonios />

      {/* FAQ — mismo componente/estilo que el Home, con datos propios de derma */}
      <FAQ items={faqDerma} />

      {/* Blog — mismo componente del Home, filtrado al departamento Dermatología */}
      <Blog departamento="dermatologia" ctaHref="/blog/dermatologia/" />

      <ClosingCTA service="Dermatología" image="/dermacta.webp" />
    </>
  );
}
