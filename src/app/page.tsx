import { Hero } from "@/components/home/Hero";
import { IntroLomas } from "@/components/home/IntroLomas";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { TechBand } from "@/components/home/TechBand";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroLomas />
      <ServicesGrid />
      <Benefits />
      <Testimonials />
      <FAQ />
      <TechBand />
    </>
  );
}
