import Hero from "@/components/sections/Hero";
import Ingredients from "@/components/sections/Ingredients";
import WhyChoose from "@/components/sections/WhyChoose";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowToUse from "@/components/sections/HowToUse";
import Nutrition from "@/components/sections/Nutrition";
import AboutFormula from "@/components/sections/AboutFormula";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Ingredients />
      <WhyChoose />
      <ProductShowcase />
      <HowToUse />
      <Nutrition />
      <AboutFormula />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
