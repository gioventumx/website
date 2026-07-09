import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Página 404 (App Router): Next la renderiza para rutas no encontradas y devuelve
// un 404 real (no soft 404). Header/Footer vienen del layout raíz.
// Composición: tarjeta blanca que se adapta al contenido (sin ocupar la pantalla),
// texto centrado, y la figura 404.webp a la derecha (persona completa, apoyada al
// borde derecho) solapando un poco el texto por detrás. En móvil no se encima: la
// figura baja debajo del texto.
export default function NotFound() {
  return (
    <section className="bg-bg px-4 py-[clamp(40px,7vw,72px)] md:px-6">
      <div className="relative mx-auto max-w-[920px] overflow-hidden rounded-block border border-line bg-white px-6 py-12 md:min-h-[400px] md:px-12 md:py-16">
        {/* Texto centrado (encima de la figura) */}
        <div className="relative z-10 mx-auto max-w-[560px] text-center">
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

        {/* Figura 404: móvil = debajo (en flujo, centrada, sin encimar);
            desktop = absoluta a la derecha, completa, apoyada abajo, detrás del texto. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/404.webp"
          alt=""
          draggable={false}
          className="mx-auto mt-10 block w-full max-w-[240px] md:pointer-events-none md:absolute md:bottom-0 md:right-2 md:z-0 md:mt-0 md:h-[88%] md:max-h-[380px] md:w-auto md:max-w-none"
        />
      </div>
    </section>
  );
}
