import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer id="contacto" className="bg-ink text-[#CFCCE0]">
      <div className="container-x pb-7 pt-16">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-10 border-b border-white/10 pb-10 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <span className="font-serif text-[1.6rem] font-semibold text-white">
              {site.brand.name}
            </span>
            <p className="mt-3 max-w-[280px] text-[0.86rem] text-[#9794b5]">
              {site.footer.about}
            </p>
          </div>

          <div>
            <h4 className="mb-[18px] text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white">
              {site.footer.assistance.title}
            </h4>
            <ul>
              {site.footer.assistance.links.map((link) => (
                <li key={link.href} className="mb-2.5 text-[0.9rem]">
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-[18px] text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white">
              {site.footer.branchesTitle}
            </h4>
            {site.branches.map((branch) => (
              <div key={branch.name}>
                <b className="mb-1.5 block text-[0.9rem] font-semibold text-white">
                  {branch.name}
                </b>
                <div className="mb-3.5 text-[0.86rem]">
                  {branch.phone} · WhatsApp {branch.whatsapp}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-6 text-[0.78rem] text-[#807da0]">
          <span>{site.footer.legal}</span>
          <span>{site.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
