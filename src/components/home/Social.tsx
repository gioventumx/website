import { home } from "@/data/home";
import { site } from "@/data/site";
import type { SocialPlatform } from "@/data/types";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24" } as const;

  if (platform === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M16 3c.3 2 1.7 3.6 4 4v3c-1.5 0-2.9-.4-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1A3 3 0 1 0 13 15V3h3z" />
    </svg>
  );
}

export function Social() {
  const s = home.social;

  return (
    <section className="section bg-bg text-center">
      <div className="container-x">
        <h2 className="font-sans text-[clamp(1.6rem,3vw,2.1rem)] font-light leading-[1.2]">
          {s.heading}
          <br />
          <span className="font-semibold text-brand">{s.handle}</span>
        </h2>

        <div className="mt-6 flex justify-center gap-4">
          {site.socials.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-brand text-white transition-transform hover:-translate-y-[3px]"
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
