"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiDroplet,
  FiShield,
  FiActivity,
  FiFeather,
  FiSun,
  FiZap,
} from "react-icons/fi";
import { heroBenefits } from "@/lib/data";

const iconMap = {
  heart: FiHeart,
  droplet: FiDroplet,
  shield: FiShield,
  activity: FiActivity,
  feather: FiFeather,
  sun: FiSun,
  zap: FiZap,
};

interface HeroBenefitListProps {
  imageWrapRef: React.RefObject<HTMLDivElement | null>;
  sceneRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroBenefitList({ imageWrapRef, sceneRef }: HeroBenefitListProps) {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    function computePaths() {
      const scene = sceneRef.current;
      const imageWrap = imageWrapRef.current;
      if (!scene || !imageWrap) return;

      const sceneRect = scene.getBoundingClientRect();
      const imgRect = imageWrap.getBoundingClientRect();
      const startX = imgRect.right - sceneRect.left;
      const n = heroBenefits.length;

      const next = itemRefs.current.map((el, i) => {
        if (!el) return "";
        const itemRect = el.getBoundingClientRect();
        const startY = imgRect.top - sceneRect.top + ((i + 0.5) / n) * imgRect.height;
        const endX = itemRect.left - sceneRect.left;
        const endY = itemRect.top - sceneRect.top + itemRect.height / 2;
        const midX = startX + (endX - startX) * 0.5;
        return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
      });
      setPaths(next);
    }

    computePaths();
    const observer = new ResizeObserver(computePaths);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", computePaths);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", computePaths);
    };
  }, [imageWrapRef, sceneRef]);

  return (
    <>
      <svg className="absolute inset-0 hidden lg:block w-full h-full pointer-events-none z-0">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#B9CCC0"
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <ul className="relative z-10 flex flex-col gap-5">
        {heroBenefits.map((benefit, index) => {
          const Icon = iconMap[benefit.icon];
          return (
            <motion.li
              key={benefit.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-line bg-white text-forest">
                <Icon size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-ink">{benefit.title}</span>
                <span className="text-xs text-ink/55 leading-relaxed max-w-[220px]">
                  {benefit.description}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}
