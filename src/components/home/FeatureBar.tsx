import { home } from "@/data/home";

export function FeatureBar() {
  const last = home.features.length - 1;

  return (
    <div className="border-b border-line bg-surface">
      <div className="container-x grid grid-cols-3 max-[900px]:grid-cols-1">
        {home.features.map((feature, i) => (
          <div
            key={feature.title}
            className={`px-7 py-[30px] text-center max-[900px]:border-b max-[900px]:border-line ${
              i < last ? "border-r border-line" : ""
            }`}
          >
            <h3 className="mb-[3px] text-base font-medium">{feature.title}</h3>
            <p className="text-[0.82rem] text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
