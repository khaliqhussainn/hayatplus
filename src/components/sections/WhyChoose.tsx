import {
  FiHeart,
  FiActivity,
  FiShield,
  FiFeather,
  FiDroplet,
  FiCheckCircle,
  FiSunrise,
  FiThumbsUp,
} from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { benefits } from "@/lib/data";

const iconMap = {
  heart: FiHeart,
  activity: FiActivity,
  shield: FiShield,
  leaf: FiFeather,
  droplet: FiDroplet,
  check: FiCheckCircle,
  sunrise: FiSunrise,
  care: FiThumbsUp,
};

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-24 sm:py-28 bg-beige">
      <Container>
        <SectionHeading
          eyebrow="Why Hayat+"
          title="Why Choose Hayat+"
          description="A modern herbal formula built around trust, quality and everyday wellbeing."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <FadeIn key={benefit.title} delay={(index % 4) * 0.08}>
                <div className="h-full flex flex-col gap-4 rounded-[18px] border border-line bg-white p-7 hover:border-forest/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest/10 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-ink">{benefit.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">
                    {benefit.description}
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
