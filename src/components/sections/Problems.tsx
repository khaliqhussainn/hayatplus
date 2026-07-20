"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiFeather } from "react-icons/fi";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { problems } from "@/lib/data";

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
      </Container>

      <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 bg-white">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[380px] sm:h-[440px] lg:h-[520px] overflow-hidden"
          >
            <Image
              src={problem.image}
              alt={problem.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 34vw, 17vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-4 sm:left-6 select-none font-heading font-extrabold text-white/25 text-[4.5rem] sm:text-[5.5rem] lg:text-[6.5rem] leading-none tracking-tighter"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 right-4 flex flex-col gap-3">
              <span className="text-white text-lg sm:text-xl font-bold tracking-wide drop-shadow-sm">
                {problem.title}
              </span>
              <span className="h-px w-10 bg-white/70" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
