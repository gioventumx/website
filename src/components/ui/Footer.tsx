import Link from "next/link";
import { BookingButton } from "@/components/booking/BookingButton";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer id="contacto" className="px-4 pb-4 md:px-6 md:pb-6">
      <div className="rounded-block bg-ink px-6 py-12 text-[#CFCCE0] md:px-12 md:py-14">
        {/* Fila principal — 3 zonas */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          {/* IZQUIERDA — logo + descripción */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.brand.logo}
              alt={site.brand.name}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-[280px] text-[0.86rem] leading-relaxed text-[#9794b5]">
              {site.footer.about}
            </p>
          </div>

          {/* CENTRO — links */}
          <nav>
            <ul className="flex flex-col gap-2.5">
              {site.footer.assistance.links.map((link) => (
                <li key={link.href} className="text-[0.9rem]">
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* DERECHA — CTA + redes */}
          <div className="flex flex-col items-start gap-6 md:items-end">
            <BookingButton variant="primary">{site.cta.label}</BookingButton>
            <div className="flex gap-3">
              {site.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divisor + fila inferior */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3.5 border-t border-white/10 pt-6 text-[0.78rem] text-[#807da0]">
          <span>{site.footer.legal}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.footer.creditLogo}
            alt={site.footer.credit}
            className="h-3.5 w-auto opacity-70 invert"
          />
        </div>
      </div>
    </footer>
  );
}
