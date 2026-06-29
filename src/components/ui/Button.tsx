import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light";

type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
};

export function Button({ variant = "primary", href, children, className = "" }: Props) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
