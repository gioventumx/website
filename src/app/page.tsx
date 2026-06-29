import { Hero } from "@/components/home/Hero";
import { FeatureBar } from "@/components/home/FeatureBar";
import { IntroLomas } from "@/components/home/IntroLomas";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { TechBand } from "@/components/home/TechBand";
import { Social } from "@/components/home/Social";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureBar />
      <IntroLomas />
      <ServicesGrid />
      <Benefits />
      <Testimonials />
      <TechBand />
      <Social />
    </>
  );
}
