type Props = {
  rating?: number;
  className?: string;
};

export function Stars({ rating = 5, className = "" }: Props) {
  return (
    <span
      className={`text-gold tracking-[1px] ${className}`.trim()}
      aria-label={`${rating} de 5 estrellas`}
    >
      {"★".repeat(rating)}
    </span>
  );
}
