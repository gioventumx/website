import type { FeatureIcon } from "@/data/types";
import { home } from "@/data/home";

const icons: Record<FeatureIcon, React.ReactNode> = {
  tech: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </>
  ),
  care: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5a3 3 0 0 1 0 6" />
      <path d="M17 14a6 6 0 0 1 4 6" />
    </>
  ),
};

export function HeroFeatures() {
  return (
    <div className="container-x w-full pb-5 md:pb-6">
      <div className="grid gap-x-8 gap-y-5 pt-4 max-[760px]:grid-cols-1 md:grid-cols-4">
        {home.features.map((feature, i) => (
          <div
            key={feature.title}
            className={`group flex items-start gap-3 text-left text-white ${
              i > 0 ? "md:border-l md:border-white/15 md:pl-8" : ""
            }`}
          >
            <span
              className="feature-icon mt-0.5 shrink-0"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white/80 transition-transform duration-300 group-hover:scale-110"
              >
                {icons[feature.icon]}
              </svg>
            </span>
            <div>
              <h3 className="text-[0.95rem] font-medium">{feature.title}</h3>
              <p className="mt-1 max-w-[200px] text-[0.8rem] leading-snug text-white/70">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
