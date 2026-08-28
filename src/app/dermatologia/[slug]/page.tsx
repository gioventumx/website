import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingSource } from "@/components/dermatologia/BookingSource";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { TextSection } from "@/components/ui/TextSection";
import { RatingBand } from "@/components/ui/RatingBand";
import { Diagnostico } from "@/components/dermatologia/Diagnostico";
import { StickyContent } from "@/components/ui/StickyContent";
import { TestimoniosMasonry } from "@/components/ui/TestimoniosMasonry";
import { Carrusel } from "@/components/ui/Carrusel";
import { RelatedBlog } from "@/components/blog/RelatedBlog";
import { BookingNudge } from "@/components/home/BookingNudge";
import { PostBody } from "@/components/blog/PostBody";
import {
  servicios,
  getServicioByPath,
  relatedServicios,
  servicioH1,
  servicioEyebrow,
  servicioQueEsTitulo,
} from "@/data/servicios";
import { dermatologia } from "@/data/dermatologia";
import { testimoniosDerma } from "@/data/testimonios-derma";
import { getServicioBody } from "@/lib/servicios";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // Array CRUDO (incluye drafts): la URL existe para preview, igual que blog/[slug].
  return servicios.filter((s) => s.especialidad === "dermatologia").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioByPath(`/dermatologia/${slug}/`);
  if (!servicio) return {};

  return pageMetadata({
    title: `${servicio.titulo} | Dermatología Gioventù`,
    description: servicio.excerpt,
    path: servicio.path,
    noindex: servicio.draft,
  });
}

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function ServicioDermatologiaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { slug } = await params;
  const servicio = getServicioByPath(`/dermatologia/${slug}/`);
  if (!servicio) notFound();

  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);
  const body = getServicioBody(servicio.slug);
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
          cta: servicio.hero.cta ?? dermatologia.hero.cta,
          image: servicio.hero.image,
          rating: dermatologia.hero.rating,
          features: dermatologia.hero.features,
        }}
        service="Dermatología"
        compact
      />

      <TextSection eyebrow="Dermatología" titleTop={servicioQueEsTitulo(servicio)} body={servicio.queEs} />

      <RatingBand stats={servicio.ratingStats} />

      {servicio.diagnostico && <Diagnostico diagnostico={servicio.diagnostico} />}

      <StickyContent images={servicio.contenidoImagenes}>
        <PostBody markdown={body} />
      </StickyContent>

      <TestimoniosMasonry reviews={testimoniosDerma.reviews} />

      {relacionados.length > 0 && (
        <Carrusel
          id="relacionados"
          head={{
            titleTop: "Tratamientos",
            titleAccent: "relacionados",
            body: "Otros padecimientos que también tratamos en Dermatología.",
          }}
          items={relacionados.map((s) => ({
            id: s.slug,
            slug: s.slug,
            label: s.titulo,
            description: s.excerpt,
            image: s.hero.image,
          }))}
          service="Dermatología"
        />
      )}

      <RelatedBlog departamento="dermatologia" />

      <BookingNudge />
    </>
  );
}
