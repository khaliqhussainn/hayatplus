"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ingredients } from "@/lib/data";
import {
  GingerIllustration,
  GarlicIllustration,
  LemonIllustration,
  HoneyIllustration,
  AcvIllustration,
} from "@/components/illustrations/IngredientIllustrations";

const illustrationMap = {
  ginger: GingerIllustration,
  garlic: GarlicIllustration,
  lemon: LemonIllustration,
  honey: HoneyIllustration,
  acv: AcvIllustration,
};

export default function Ingredients() {
  return (
    <section id="ingredients" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What's Inside"
          title="Five Premium Botanicals"
          description="Every bottle of Hayat+ is built on a simple principle — fewer, better ingredients."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ingredients.map((item, index) => {
            const Illustration = illustrationMap[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center text-center gap-4 rounded-[18px] border border-line bg-white p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-beige group-hover:bg-sage/20 transition-colors duration-300">
                  <Illustration className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-ink">{item.name}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
