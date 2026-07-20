import { FiRefreshCw, FiDroplet, FiCalendar } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { howToUseSteps } from "@/lib/data";

const iconMap = {
  shake: FiRefreshCw,
  mix: FiDroplet,
  daily: FiCalendar,
};

export default function HowToUse() {
  return (
    <section id="how-to-use" className="py-24 sm:py-28 bg-beige">
      <Container>
        <SectionHeading
          eyebrow="Daily Ritual"
          title="How to Use"
          description="A simple three-step ritual designed to fit naturally into your day."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {howToUseSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <FadeIn key={step.title} delay={index * 0.1}>
                <div className="h-full flex flex-col items-center text-center gap-4 rounded-[18px] border border-line bg-white p-8 shadow-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    Step {index + 1}
                  </span>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-forest/10 text-forest">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
