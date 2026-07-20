"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiHeart, FiDroplet, FiShield, FiSun, FiFeather } from "react-icons/fi";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { problems } from "@/lib/data";

const iconMap = {
  heart: FiHeart,
  droplet: FiDroplet,
  shield: FiShield,
  sun: FiSun,
  feather: FiFeather,
};

export default function Problems() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <Container>
        <FadeIn className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-3 text-sage">
            <span className="h-px w-8 bg-line" />
            <FiFeather size={16} />
            <span className="h-px w-8 bg-line" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink">
            Support for the Problems That Matter
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {problems.map((problem, index) => {
            const Icon = iconMap[problem.icon];
            return (
              <motion.div
                key={problem.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-full aspect-[4/5] rounded-[18px] overflow-hidden">
                  <Image
                    src={problem.image}
                    alt={problem.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <span className="relative -mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-line text-forest shadow-md">
                  <Icon size={18} />
                </span>
                <span className="mt-3 text-sm font-semibold text-ink">
                  {problem.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
