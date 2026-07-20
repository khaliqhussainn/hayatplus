"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import BottleIllustration from "@/components/illustrations/BottleIllustration";
import {
  GingerIllustration,
  LemonIllustration,
  HoneyIllustration,
} from "@/components/illustrations/IngredientIllustrations";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-beige">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-beige to-beige" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-7 order-2 lg:order-1">
            <FadeIn>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-forest">
                Natural Herbal Formula
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] text-ink max-w-xl">
                Nature&apos;s Daily Support for a Healthy Heart
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-lg">
                Hayat+ Heart Tonic is a carefully crafted herbal blend made
                from Ginger, Garlic, Lemon, Honey and Apple Cider Vinegar to
                support heart health, healthy circulation, immune wellness
                and everyday vitality.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="#product" variant="primary" icon={<FiArrowRight />}>
                  Shop Now
                </Button>
                <Button href="#ingredients" variant="secondary" icon={<FiPlay />}>
                  Learn More
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <motion.div
              style={{ y: parallaxY }}
              className="absolute -top-6 -left-2 sm:left-4 text-sage animate-float"
            >
              <LemonIllustration className="w-14 h-14 sm:w-16 sm:h-16 opacity-80" />
            </motion.div>
            <motion.div
              style={{ y: parallaxY }}
              className="absolute top-1/3 -right-2 sm:right-6 animate-float-slow"
            >
              <GingerIllustration className="w-16 h-16 sm:w-20 sm:h-20 opacity-70" />
            </motion.div>
            <motion.div
              style={{ y: parallaxY }}
              className="absolute bottom-4 left-6 sm:left-10 animate-float"
            >
              <HoneyIllustration className="w-12 h-12 sm:w-14 sm:h-14 opacity-70" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[220px] sm:w-[280px] lg:w-[340px] animate-float"
            >
              <div className="absolute inset-0 blur-3xl bg-forest/10 rounded-full scale-90" />
              <BottleIllustration className="relative w-full h-auto drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
