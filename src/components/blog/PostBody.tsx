import ReactMarkdown, { type Components } from "react-markdown";

// Render del cuerpo Markdown mapeado al sistema base: h2 en índigo, listas, negritas.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-8 mb-3 font-sans text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium leading-[1.2] text-brand">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 font-sans text-[1.2rem] font-medium text-ink">{children}</h3>
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
  a: ({ href, children }) => (
    <a href={href} className="text-brand underline underline-offset-2 hover:text-brand-hover">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-brand/40 pl-4 text-muted italic">
      {children}
    </blockquote>
  ),
};

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <div className="text-[1rem] leading-[1.75]">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}
