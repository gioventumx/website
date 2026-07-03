import { Hero } from "@/components/home/Hero";
import { BookingNudge } from "@/components/home/BookingNudge";
import { ResultsRain } from "@/components/home/ResultsRain";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TechShowcase } from "@/components/home/TechShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { Destacados } from "@/components/home/Destacados";
import { FAQ } from "@/components/home/FAQ";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Blog } from "@/components/home/Blog";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ResultsRain />
      <TechShowcase />
      <Testimonials />
      <Destacados />
      <FAQ />
      <ClosingCTA />
      <Blog />
      <BookingNudge />
    </>
  );
}
