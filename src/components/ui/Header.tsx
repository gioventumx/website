"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-x flex h-[74px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold text-ink">{site.brand.name}</span>
          <span className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-muted">
            {site.brand.tagline}
          </span>
        </Link>

        <ul className="flex items-center gap-[34px] max-[900px]:hidden">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[0.92rem] font-medium text-ink transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[18px]">
          <a
            href={`tel:${site.phone.tel}`}
            className="text-[0.82rem] font-semibold text-brand max-[900px]:hidden"
          >
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {site.phone.label}
            </span>
            {site.phone.display}
          </a>

          <Button href={site.cta.href} variant="primary">
            {site.cta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={open}
            className="hidden flex-col gap-[5px] max-[900px]:flex"
          >
            <span className="h-0.5 w-6 rounded-sm bg-ink" />
            <span className="h-0.5 w-6 rounded-sm bg-ink" />
            <span className="h-0.5 w-6 rounded-sm bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <ul className="container-x flex flex-col gap-3.5 pb-5 max-[900px]:flex">
          {site.nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[0.95rem] font-medium text-ink transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
