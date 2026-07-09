import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CrossSell } from "@/components/ui/CrossSell";
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

  return (
    <>
      {/* Inyecta el origen (suc) en el flujo de agendamiento para medición */}
      <BookingSource suc={branch} />

      <DermHero />

      {/* INTRO — prosa grande centrada (statement), sin animación. Acentos en italic. */}
      <section id="sobre" className="scroll-mt-[96px] bg-bg px-6 py-[clamp(60px,8vw,100px)] md:px-10">
        <div className="container-x text-center">
          <p className="mx-auto max-w-[1040px] font-sans text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.35] tracking-[-0.01em] text-ink">
            {dermatologia.statement.map((seg, i) =>
              seg.accent ? (
                <span key={i} className="font-accent text-brand">
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </p>
        </div>
      </section>

      <PadecimientosGrid />

      <Testimonios />

      {/* CTA de agenda en formato BANNER, entre Testimonios y Preguntas */}
      <ClosingCTA
        service="Dermatología"
        image="/dermacta.webp"
        compact
        body="Reserva tu cita con nuestros especialistas y descúbrelo."
      />

      {/* FAQ — mismo componente/estilo que el Home, con datos propios de derma */}
      <FAQ items={faqDerma} id="preguntas" />

      {/* Blog — mismo componente del Home, filtrado al departamento Dermatología */}
      <Blog departamento="dermatologia" ctaHref="/blog/dermatologia/" />

      {/* Cross-sell final: ofrece las otras dos verticales (imagen cambia por hover) */}
      <CrossSell
        title="¿No encuentras lo que buscas?"
        body="En Gioventù también somos especialistas en medicina estética y wellness. Descubre la especialidad que necesitas."
        defaultImage="/faciales.webp"
        verticals={[
          { label: "Medicina Estética", href: "/estetica/", image: "/medicina-estetica-cta.webp" },
          { label: "Wellness Spa", href: "/wellness/", image: "/wellness-cta.webp" },
        ]}
      />
    </>
  );
}
