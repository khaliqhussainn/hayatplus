"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiRefreshCw,
  FiDroplet,
  FiCalendar,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { howToUseSteps, testimonials, nutritionSnapshot } from "@/lib/data";

const stepIconMap = {
  shake: FiRefreshCw,
  mix: FiDroplet,
  daily: FiCalendar,
};

export default function FeatureRow() {
  return (
    <section id="how-to-use" className="py-24 sm:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-start">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-ink text-center lg:text-left">
                How to Use
              </h3>
              <ol className="flex flex-col gap-5">
                {howToUseSteps.map((step, index) => {
                  const Icon = stepIconMap[step.icon];
                  return (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-line bg-beige text-forest">
                        <Icon size={18} />
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-forest text-white text-[10px] font-bold">
                          {index + 1}
                        </span>
                      </span>
                      <div className="flex flex-col gap-0.5 pt-1.5">
                        <span className="text-sm font-semibold text-ink">{step.title}</span>
                        <span className="text-xs text-ink/55 leading-relaxed">
                          {step.description}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div id="testimonials" className="scroll-mt-24">
              <h3 className="text-xl font-bold text-ink text-center mb-6">
                What Our Customers Say
              </h3>
              <TestimonialCarousel />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-ink text-center lg:text-left">
                Nutrition Snapshot
              </h3>
              <span className="text-xs font-medium text-ink/50 -mt-4 text-center lg:text-left">
                (Per Serving {nutritionSnapshot.servingSize})
              </span>
              <div className="rounded-[18px] border border-line overflow-hidden">
                {nutritionSnapshot.facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      index % 2 === 0 ? "bg-beige" : "bg-white"
                    } ${index !== nutritionSnapshot.facts.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <span className="text-sm text-ink/70">{fact.label}</span>
                    <span className="text-sm font-semibold text-ink">{fact.value}</span>
                  </div>
                ))}
              </div>
              <Button href="/product" variant="secondary" className="w-full">
                View Full Nutrition Facts
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative rounded-[18px] border border-line bg-beige p-7">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <FiStar key={i} size={14} style={{ fill: "currentColor" }} />
            ))}
          </div>

          <p className="text-sm text-ink/70 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <span className="text-sm font-semibold text-ink">
            — {testimonial.name}, {testimonial.age}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex items-center justify-center w-8 h-8 rounded-full border border-line bg-white text-ink/60 hover:text-forest transition-colors"
        >
          <FiChevronLeft size={15} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-forest" : "bg-line"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex items-center justify-center w-8 h-8 rounded-full border border-line bg-white text-ink/60 hover:text-forest transition-colors"
        >
          <FiChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
