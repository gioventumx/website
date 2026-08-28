type Props = {
  eyebrow: string;
  titleTop: string;
  titleAccent?: string;
  body: string;
  id?: string;
};

// Bloque de texto centrado (eyebrow + título + párrafo), mismo tratamiento
// tipográfico que el resto del sitio (Testimonios, RelatedBlog, Carrusel). Sirve
// para secciones de prosa simple de las páginas de servicio: "Qué es esto" /
// "Qué es y cómo funciona" / "Qué es y qué se siente" (los 3 templates) y
// "Para quién es" (Estética + Wellness) — solo cambia el copy, no el layout.
export function TextSection({ eyebrow, titleTop, titleAccent, body, id }: Props) {
  return (
    <section id={id} className="md:scroll-mt-[96px] bg-bg py-[clamp(36px,5vw,56px)]">
      <div className="container-x mx-auto max-w-[680px] text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
          {titleTop} {titleAccent && <span className="font-accent text-brand">{titleAccent}</span>}
        </h2>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{body}</p>
      </div>
    </section>
  );
}
