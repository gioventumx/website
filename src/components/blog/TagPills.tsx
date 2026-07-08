// Etiquetas del artículo. SON PILLS VISUALES (spans), SIN <a>: no enlazan a ninguna
// parte porque las etiquetas NO tienen página/ruta (solo metadata y relación).
export function TagPills({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="mt-9 border-t border-line pt-6">
      <h4 className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">
        Temas relacionados
      </h4>
      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] text-muted"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
