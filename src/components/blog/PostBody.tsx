import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// Render del cuerpo Markdown mapeado al sistema base. rehype-slug pone `id` en los
// headings (para el TOC y deep-links); scroll-mt evita que el header sticky los tape.
const components: Components = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="mt-8 mb-3 md:scroll-mt-24 font-sans text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium leading-[1.2] text-brand"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="mt-6 mb-2 md:scroll-mt-24 font-sans text-[1.2rem] font-medium text-ink">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-4 text-ink-soft">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-ink-soft">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-ink-soft">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  // Enlaces internos (empiezan con "/") → next/link para navegación cliente; el resto,
  // <a> externo con rel de seguridad. Habilita el interlinking contextual a servicios.
  a: ({ href, children }) => {
    const url = href ?? "";
    const internal = url.startsWith("/");
    const className =
      "font-medium text-brand underline underline-offset-2 hover:text-brand-hover";
    if (internal) {
      return (
        <Link href={url} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-brand/40 pl-4 text-muted italic">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-[0.92rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-brand-tint text-ink">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-line px-3 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-line px-3 py-2 align-top text-ink-soft">{children}</td>
  ),
};

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <div className="text-[1rem] leading-[1.75]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
