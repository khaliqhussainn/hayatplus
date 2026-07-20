"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiFeather, FiFilter, FiCheckCircle, FiZap, FiArrowRight } from "react-icons/fi";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import WhyChooseDiagram from "@/components/sections/WhyChooseDiagram";
import { ingredients, formulaProcess } from "@/lib/data";

const processIconMap = {
  leaf: FiFeather,
  filter: FiFilter,
  scale: FiCheckCircle,
  zap: FiZap,
};

export default function WhyChooseFormula() {
  return (
    <section className="py-24 sm:py-28 bg-beige">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          <div id="benefits" className="scroll-mt-24">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-12">
                Why Choose Hayat+
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <WhyChooseDiagram />
            </FadeIn>
          </div>

          <div id="ingredients" className="scroll-mt-24 flex flex-col gap-10">
            <FadeIn>
              <div className="flex flex-col gap-4 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                  Our Natural Formula
                </h2>
                <p className="text-sm sm:text-base text-ink/65 leading-relaxed">
                  We believe the best wellness comes from nature. That&apos;s
                  why we carefully blend five powerful ingredients known for
                  their traditional goodness into one balanced tonic your
                  body will thank you for.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.key} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-line overflow-hidden">
                        <Image
                          src={ingredient.image}
                          alt={ingredient.name}
                          fill
                          sizes="80px"
                          className="object-cover p-2"
                        />
                      </div>
                      <span className="text-xs font-semibold text-ink max-w-[80px] leading-tight">
                        {ingredient.label}
                      </span>
                    </div>
                    {index < ingredients.length - 1 && (
                      <span className="text-lg font-bold text-gold pb-6">+</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center justify-between gap-2 pt-6 border-t border-line/70">
                {formulaProcess.map((step, index) => {
                  const Icon = processIconMap[step.icon];
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-line text-forest">
                          <Icon size={16} />
                        </span>
                        <span className="text-[11px] font-medium text-ink/60 max-w-[70px] leading-tight">
                          {step.label}
                        </span>
                      </div>
                      {index < formulaProcess.length - 1 && (
                        <FiArrowRight className="text-line flex-shrink-0" size={16} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
