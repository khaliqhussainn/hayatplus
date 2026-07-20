import { FiHeart } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Loved Daily"
          title="What Our Community Says"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.name} delay={index * 0.1}>
              <div className="h-full flex flex-col gap-6 rounded-[18px] border border-line bg-white p-8 shadow-sm">
                <FiHeart size={20} className="text-gold" />
                <p className="text-sm sm:text-base text-ink/75 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-line">
                  <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-ink/50">{testimonial.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
