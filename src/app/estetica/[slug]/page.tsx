import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingSource } from "@/components/estetica/BookingSource";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { TextSection } from "@/components/ui/TextSection";
import { RatingBand } from "@/components/ui/RatingBand";
import { QueEsperar } from "@/components/estetica/QueEsperar";
import { TestimoniosMasonry } from "@/components/ui/TestimoniosMasonry";
import { Carrusel } from "@/components/ui/Carrusel";
import { RelatedBlog } from "@/components/blog/RelatedBlog";
import { BookingNudge } from "@/components/home/BookingNudge";
import {
  servicios,
  getServicioByPath,
  relatedServicios,
  servicioH1,
  servicioEyebrow,
  servicioQueEsTitulo,
  servicioParaQuienTitulo,
} from "@/data/servicios";
import { estetica } from "@/data/estetica";
import { testimoniosEstetica } from "@/data/testimonios-estetica";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // Array CRUDO (incluye drafts): la URL existe para preview, igual que blog/[slug].
  return servicios.filter((s) => s.especialidad === "estetica").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioByPath(`/estetica/${slug}/`);
  if (!servicio) return {};

  return pageMetadata({
    title: `${servicio.titulo} | Medicina Estética Gioventù`,
    description: servicio.excerpt,
    path: servicio.path,
    noindex: servicio.draft,
  });
}

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function ServicioEsteticaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { slug } = await params;
  const servicio = getServicioByPath(`/estetica/${slug}/`);
  if (!servicio) notFound();

  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);
  const relacionados = relatedServicios(servicio);

  return (
    <>
      <BookingSource suc={branch} />

      <VerticalHero
        hero={{
          eyebrow: servicioEyebrow(servicio),
          titleTop: servicioH1(servicio),
          titleAccent: servicio.hero.titleAccent ?? "",
          body: servicio.hero.body,
          cta: servicio.hero.cta ?? estetica.hero.cta,
          image: servicio.hero.image,
          rating: estetica.hero.rating,
          features: estetica.hero.features,
        }}
        service="Medicina Estética"
        compact
      />

      <TextSection eyebrow="Medicina Estética" titleTop={servicioQueEsTitulo(servicio)} body={servicio.queEs} />

      <RatingBand stats={servicio.ratingStats} />

      {servicio.paraQuien && (
        <TextSection eyebrow="¿Es para ti?" titleTop={servicioParaQuienTitulo(servicio)} body={servicio.paraQuien} />
      )}

      {servicio.queEsperar && <QueEsperar queEsperar={servicio.queEsperar} />}

      <TestimoniosMasonry reviews={testimoniosEstetica.reviews} />

      {relacionados.length > 0 && (
        <Carrusel
          id="relacionados"
          head={{
            titleTop: "Tratamientos",
            titleAccent: "relacionados",
            body: "Otros tratamientos de medicina estética que también ofrecemos.",
          }}
          items={relacionados.map((s) => ({
            id: s.slug,
            slug: s.slug,
            label: s.titulo,
            description: s.excerpt,
            image: s.hero.image,
          }))}
          service="Medicina Estética"
        />
      )}

      <RelatedBlog departamento="medicina-estetica" />

      <BookingNudge />
    </>
  );
}
