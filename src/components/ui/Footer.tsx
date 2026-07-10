import Link from "next/link";
import { BookingButton } from "@/components/booking/BookingButton";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ClinicJsonLd } from "@/components/ui/ClinicJsonLd";
import { site } from "@/data/site";

const tel = (n: string) => `tel:+52${n.replace(/\D/g, "")}`;
const wa = (n: string) => `https://wa.me/52${n.replace(/\D/g, "")}`;

export function Footer() {
  return (
    <footer id="contacto" className="px-4 pb-4 md:px-6 md:pb-6">
      {/* Schema LocalBusiness (MedicalClinic) por sucursal — una sola vez */}
      <ClinicJsonLd />

      <div className="rounded-block bg-ink px-6 py-12 text-[#CFCCE0] md:px-12 md:py-14">
        {/* Fila principal — 4 zonas */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.4fr_1fr_1.5fr_1fr]">
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

          {/* LINKS */}
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

          {/* SUCURSALES — dirección (→ Maps), teléfonos (tel:) y horarios */}
          <div>
            <h3 className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white">
              {site.footer.branchesTitle}
            </h3>
            <ul className="flex flex-col gap-5">
              {site.branches.map((b) => (
                <li key={b.name} className="text-[0.84rem] leading-relaxed">
                  <p className="font-semibold text-white">Sucursal {b.name}</p>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block max-w-[280px] text-[#9794b5] transition-colors hover:text-white"
                  >
                    {b.address}
                  </a>
                  <p className="mt-1.5">
                    <a href={tel(b.phone)} className="transition-colors hover:text-white">
                      Tel: {b.phone}
                    </a>
                    <span className="text-[#807da0]"> · </span>
                    <a
                      href={wa(b.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      WhatsApp: {b.whatsapp}
                    </a>
                  </p>
                  <p className="mt-1 text-[0.8rem] text-[#807da0]">{b.hours}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + redes */}
          <div className="flex flex-col items-start gap-6 lg:items-end">
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{site.footer.legal}</span>
            <Link href="/aviso-de-privacidad/" className="transition-colors hover:text-white">
              Aviso de privacidad
            </Link>
          </div>
          <a
            href="https://scndal.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.footer.credit}
            className="opacity-70 transition-opacity hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.footer.creditLogo}
              alt={site.footer.credit}
              className="h-6 w-auto invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
