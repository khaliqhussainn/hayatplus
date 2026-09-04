import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import WhyChooseFormula from "@/components/sections/WhyChooseFormula";
import FeatureRow from "@/components/sections/FeatureRow";
import CareBanner from "@/components/sections/CareBanner";
import AboutFormula from "@/components/sections/AboutFormula";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <WhyChooseFormula />
      <FeatureRow />
      <CareBanner />
      <AboutFormula />
      <FAQ />
      <Contact />
      <Reviews />
    </>
  );
}
