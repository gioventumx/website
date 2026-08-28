import { BookingSource } from "@/components/booking/BookingSource";
import { VerticalHero } from "@/components/ui/VerticalHero";
import { RatingBand } from "@/components/ui/RatingBand";
import { TextSection } from "@/components/ui/TextSection";
import { StickyContent } from "@/components/ui/StickyContent";
import { TestimoniosMasonry } from "@/components/ui/TestimoniosMasonry";
import { Carrusel } from "@/components/ui/Carrusel";
import { RelatedBlog } from "@/components/blog/RelatedBlog";
import { BookingNudge } from "@/components/home/BookingNudge";
import { PostBody } from "@/components/blog/PostBody";
import { DatosCompactos } from "@/components/wellness/DatosCompactos";
import { faciales } from "@/data/faciales";
import { masajes } from "@/data/masajes";
import { testimoniosFaciales } from "@/data/testimonios-faciales";
import { testimoniosMasajes } from "@/data/testimonios-masajes";
import {
  relatedServicios,
  servicioH1,
  servicioEyebrow,
  servicioQueEsTitulo,
  servicioParaQuienTitulo,
  type Servicio,
  type Subvertical,
} from "@/data/servicios";
import type { BranchKey } from "@/data/booking";

// Cuerpo compartido de las páginas de servicio de Wellness (faciales Y masajes) —
// mismo template, cambia solo `subvertical`. Cada route/page.tsx trae su propio
// generateStaticParams/generateMetadata y renderiza esto.
export function ServicioTemplate({
  servicio,
  subvertical,
  suc,
  body,
}: {
  servicio: Servicio;
  subvertical: Subvertical;
  suc: BranchKey | null;
  body: string;
}) {
  const hub = subvertical === "faciales" ? faciales : masajes;
  const service = subvertical === "faciales" ? "Faciales" : "Masajes";
  const testimonios = subvertical === "faciales" ? testimoniosFaciales : testimoniosMasajes;
  const relacionados = relatedServicios(servicio);

  return (
    <>
      <BookingSource suc={suc} base={subvertical} />

      <VerticalHero
        hero={{
          eyebrow: servicioEyebrow(servicio),
          titleTop: servicioH1(servicio),
          titleAccent: servicio.hero.titleAccent ?? "",
          body: servicio.hero.body,
          cta: servicio.hero.cta ?? hub.hero.cta,
          image: servicio.hero.image,
          rating: hub.hero.rating,
          features: hub.hero.features,
        }}
        service={service}
        compact
      />

      {servicio.datosCompactos && <DatosCompactos datos={servicio.datosCompactos} />}

      <TextSection eyebrow="Wellness" titleTop={servicioQueEsTitulo(servicio)} body={servicio.queEs} />

      <RatingBand stats={servicio.ratingStats} />

      {servicio.paraQuien && (
        <TextSection eyebrow="¿Es para ti?" titleTop={servicioParaQuienTitulo(servicio)} body={servicio.paraQuien} />
      )}

      <StickyContent images={servicio.contenidoImagenes}>
        <PostBody markdown={body} />
      </StickyContent>

      <TestimoniosMasonry reviews={testimonios.reviews} />

      {relacionados.length > 0 && (
        <Carrusel
          id="relacionados"
          head={{
            titleTop: "Otros tratamientos",
            titleAccent: subvertical === "faciales" ? "de faciales" : "de masajes",
            body: "Descubre el resto de nuestro catálogo de wellness.",
          }}
          items={relacionados.map((s) => ({
            id: s.slug,
            slug: s.slug,
            label: s.titulo,
            description: s.excerpt,
            image: s.hero.image,
          }))}
          service={service}
        />
      )}

      <RelatedBlog departamento="wellness" />

      <BookingNudge />
    </>
  );
}
