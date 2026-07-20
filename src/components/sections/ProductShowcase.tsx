"use client";

import { motion } from "framer-motion";
import { FiHeart, FiFeather, FiShield, FiSunrise } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BottleIllustration from "@/components/illustrations/BottleIllustration";

const callouts = [
  {
    icon: FiHeart,
    title: "Heart Support",
    position: "lg:top-6 lg:-left-4",
  },
  {
    icon: FiFeather,
    title: "100% Natural",
    position: "lg:top-6 lg:-right-4",
  },
  {
    icon: FiShield,
    title: "Immune Care",
    position: "lg:bottom-16 lg:-left-8",
  },
  {
    icon: FiSunrise,
    title: "Daily Ritual",
    position: "lg:bottom-16 lg:-right-8",
  },
];

export default function ProductShowcase() {
  return (
    <section id="product" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Formula"
          title="One Bottle. Five Botanicals."
          description="Hayat+ Heart Tonic, crafted with precision and presented with elegance."
        />

        <div className="relative mt-16 flex items-center justify-center">
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-b from-sage/15 to-transparent blur-2xl" />

          <div className="relative w-[240px] sm:w-[300px] lg:w-[340px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="animate-float-slow"
            >
              <BottleIllustration className="w-full h-auto drop-shadow-2xl" />
            </motion.div>

            {callouts.map((callout, index) => {
              const Icon = callout.icon;
              return (
                <motion.div
                  key={callout.title}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`hidden lg:flex absolute items-center gap-2 rounded-full border border-line bg-white/95 backdrop-blur px-4 py-2 shadow-md ${callout.position}`}
                >
                  <Icon size={15} className="text-forest" />
                  <span className="text-xs font-semibold text-ink whitespace-nowrap">
                    {callout.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 lg:hidden">
          {callouts.map((callout) => {
            const Icon = callout.icon;
            return (
              <div
                key={callout.title}
                className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 shadow-sm"
              >
                <Icon size={15} className="text-forest" />
                <span className="text-xs font-semibold text-ink">{callout.title}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
