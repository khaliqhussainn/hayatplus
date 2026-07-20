import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { nutritionFacts } from "@/lib/data";

export default function Nutrition() {
  return (
    <section id="nutrition" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Transparency"
          title="Nutrition & Ingredients"
          description="A clean label, formulated with only what belongs."
        />

        <FadeIn delay={0.1}>
          <div className="mt-12 max-w-xl mx-auto rounded-[18px] border border-line overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 bg-beige border-b border-line">
              <span className="text-sm font-semibold text-ink">Serving Size</span>
              <span className="text-sm font-semibold text-forest">15 ml</span>
            </div>

            {nutritionFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex items-center justify-between px-7 py-4 ${
                  index !== nutritionFacts.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="text-sm text-ink/70">{fact.label}</span>
                <span className="text-sm font-medium text-ink">{fact.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-10 flex justify-center">
          <Button href="#contact" variant="secondary">
            View Full Ingredients
          </Button>
        </div>
      </Container>
    </section>
  );
}
