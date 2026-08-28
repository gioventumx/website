import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicioTemplate } from "@/components/wellness/ServicioTemplate";
import { servicios, getServicioByPath } from "@/data/servicios";
import { getServicioBody } from "@/lib/servicios";
import type { BranchKey } from "@/data/booking";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // Array CRUDO (incluye drafts): la URL existe para preview, igual que blog/[slug].
  return servicios
    .filter((s) => s.especialidad === "wellness" && s.subvertical === "faciales")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicioByPath(`/wellness/faciales/${slug}/`);
  if (!servicio) return {};

  return pageMetadata({
    title: `${servicio.titulo} | Faciales Gioventù`,
    description: servicio.excerpt,
    path: servicio.path,
    noindex: servicio.draft,
  });
}

function normalizeSuc(raw?: string | string[]): BranchKey | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "antigua" || v === "cuspide" ? v : null;
}

export default async function ServicioFacialPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ suc?: string | string[] }>;
}) {
  const { slug } = await params;
  const servicio = getServicioByPath(`/wellness/faciales/${slug}/`);
  if (!servicio) notFound();

  const { suc } = await searchParams;
  const branch = normalizeSuc(suc);
  const body = getServicioBody(servicio.slug);

  return <ServicioTemplate servicio={servicio} subvertical="faciales" suc={branch} body={body} />;
}
