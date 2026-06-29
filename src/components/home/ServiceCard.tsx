import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import type { Service } from "@/data/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={service.href} className="group block">
      <MediaSurface
        as="image"
        className="flex min-h-[320px] flex-col justify-end rounded-card p-[26px] shadow-card transition-transform duration-[250ms] group-hover:-translate-y-1.5"
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#C7C9F2]">
          {service.category}
        </span>
        <h3 className="font-accent mb-2 mt-1.5 text-[1.7rem] leading-[1.1]">{service.title}</h3>
        <p className="mb-3.5 text-[0.88rem] text-brand-tint">{service.description}</p>
        <span className="inline-flex items-center gap-[0.4em] text-[0.85rem] font-semibold text-white">
          {service.more}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </MediaSurface>
    </Link>
  );
}
