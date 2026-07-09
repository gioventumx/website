import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Página 404 (App Router): Next la renderiza para rutas no encontradas y devuelve
// un 404 real (no soft 404). Header/Footer vienen del layout raíz.
// Composición: tarjeta blanca a pantalla completa, texto centrado, y la ilustración
// 404.webp DETRÁS del texto, completa (sin recorte) y de tamaño moderado.
export default function NotFound() {
  return (
    <section className="bg-bg px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative flex min-h-[calc(100dvh-98px)] flex-col items-center justify-center overflow-hidden rounded-block border border-line bg-white px-6 py-10 text-center">
        {/* Ilustración detrás del texto: completa (contain), moderada, centrada */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/404.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(82%,440px)] -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        {/* Texto centrado, encima de la imagen */}
        <div className="relative z-10 max-w-[560px]">
          <span className="eyebrow">Error 404</span>
          <h1 className="mt-3 font-sans text-[clamp(2.1rem,4.6vw,3.2rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
            No encontramos
            <span className="font-accent block text-brand">lo que estás buscando…</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[440px] text-muted">
            Puede que el enlace haya cambiado o que la página ya no esté aquí. Te ayudamos a
            encontrar lo que buscas.
          </p>

          <div className="mt-7 flex justify-center">
            <Button variant="primary" href="/">
              Volver al inicio
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.9rem]">
            <span className="text-muted">O explora:</span>
            <Link
              href="/dermatologia/"
              className="font-medium text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
            >
              Dermatología
            </Link>
            <Link
              href="/depilacion-laser/"
              className="font-medium text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
            >
              Depilación Láser
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
