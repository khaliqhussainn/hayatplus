"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiPlay,
  FiFeather,
  FiSlash,
  FiDroplet,
  FiHeart,
  FiActivity,
  FiShield,
  FiSun,
  FiZap,
} from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import HeroBenefitList from "@/components/sections/HeroBenefitList";
import { heroTrustBadges, heroBenefits } from "@/lib/data";

const badgeIconMap = {
  leaf: FiFeather,
  slash: FiSlash,
  droplet: FiDroplet,
};

const benefitIconMap = {
  heart: FiHeart,
  droplet: FiDroplet,
  shield: FiShield,
  activity: FiActivity,
  feather: FiFeather,
  sun: FiSun,
  zap: FiZap,
};

export default function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none select-none absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/images/hero/hero-background-leaves.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none select-none absolute inset-x-0 top-0 h-44 z-0 lg:hidden">
        <Image
          src="/images/hero/hero-background-leaves.jpg"
          alt=""
          fill
          priority
          aria-hidden="true"
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="pointer-events-none select-none absolute inset-x-0 bottom-0 h-44 z-0 lg:hidden">
        <Image
          src="/images/hero/hero-background-leaves.jpg"
          alt=""
          fill
          aria-hidden="true"
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-16 items-center">
          <div className="flex flex-col gap-6">
            <FadeIn>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-beige px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-forest">
                <FiFeather size={13} /> Natural Herbal Formula
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] text-ink max-w-lg">
                Nature&apos;s Daily Support for a{" "}
                <span className="text-forest">Healthy Heart</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-ink/70 leading-relaxed max-w-md">
                Hayat+ Heart Tonic is a carefully crafted herbal blend made
                from Ginger, Garlic, Lemon, Honey and Apple Cider Vinegar to
                support heart health, healthy circulation, immune wellness
                and everyday vitality.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button href="/product" variant="primary" icon={<FiArrowRight />}>
                  Shop Now
                </Button>
                <Button href="#ingredients" variant="secondary" icon={<FiPlay />}>
                  Learn More
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-line max-w-md">
                {heroTrustBadges.map((badge) => {
                  const Icon = badgeIconMap[badge.icon];
                  return (
                    <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                      <span className="flex items-center justify-center w-11 h-11 rounded-full border border-line text-forest">
                        <Icon size={17} />
                      </span>
                      <span className="text-[11px] font-medium text-ink/60 max-w-[80px] leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          <div ref={sceneRef} className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <motion.div
                ref={imageWrapRef}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-[440px] lg:max-w-none animate-float-slow"
              >
                <div className="absolute inset-0 blur-3xl bg-sage/15 rounded-full scale-90" />
                <Image
                  src="/images/hero/hero-product-ingredients.png"
                  alt="Hayat+ Heart Tonic bottle surrounded by ginger, garlic, lemon, honey and apple cider vinegar"
                  width={1200}
                  height={1200}
                  priority
                  className="relative w-full h-auto drop-shadow-2xl"
                />
              </motion.div>

              <div className="hidden lg:block">
                <HeroBenefitList imageWrapRef={imageWrapRef} sceneRef={sceneRef} />
              </div>
            </div>

            <div className="lg:hidden mt-8">
              <HeroBenefitMobileGrid />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroBenefitMobileGrid() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {heroBenefits.map((benefit) => {
        const Icon = benefitIconMap[benefit.icon];
        return (
          <li key={benefit.title} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-line text-forest">
              <Icon size={14} />
            </span>
            <span className="text-xs font-semibold text-ink leading-tight pt-1.5">
              {benefit.title}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
