"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiActivity,
  FiShield,
  FiSun,
  FiFeather,
  FiSlash,
  FiDroplet,
} from "react-icons/fi";
import { whyChooseLeft, whyChooseRight } from "@/lib/data";

const iconMap = {
  heart: FiHeart,
  activity: FiActivity,
  shield: FiShield,
  sun: FiSun,
  feather: FiFeather,
  leaf: FiFeather,
  slash: FiSlash,
  droplet: FiDroplet,
};

export default function WhyChooseDiagram() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Array<HTMLLIElement | null>>([]);
  const rightRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [leftPaths, setLeftPaths] = useState<string[]>([]);
  const [rightPaths, setRightPaths] = useState<string[]>([]);

  useEffect(() => {
    function computePaths() {
      const scene = sceneRef.current;
      const bottle = bottleRef.current;
      if (!scene || !bottle) return;

      const sceneRect = scene.getBoundingClientRect();
      const bottleRect = bottle.getBoundingClientRect();
      const bottleLeftX = bottleRect.left - sceneRect.left;
      const bottleRightX = bottleRect.right - sceneRect.left;
      const bottleCenterY = bottleRect.top - sceneRect.top + bottleRect.height / 2;

      const nextLeft = leftRefs.current.map((el) => {
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const startX = r.right - sceneRect.left;
        const startY = r.top - sceneRect.top + r.height / 2;
        const midX = startX + (bottleLeftX - startX) * 0.5;
        return `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${bottleCenterY}, ${bottleLeftX} ${bottleCenterY}`;
      });

      const nextRight = rightRefs.current.map((el) => {
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const endX = r.left - sceneRect.left;
        const endY = r.top - sceneRect.top + r.height / 2;
        const midX = bottleRightX + (endX - bottleRightX) * 0.5;
        return `M ${bottleRightX} ${bottleCenterY} C ${midX} ${bottleCenterY}, ${midX} ${endY}, ${endX} ${endY}`;
      });

      setLeftPaths(nextLeft);
      setRightPaths(nextRight);
    }

    computePaths();
    const observer = new ResizeObserver(computePaths);
    if (sceneRef.current) observer.observe(sceneRef.current);
    window.addEventListener("resize", computePaths);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", computePaths);
    };
  }, []);

  return (
    <div ref={sceneRef} className="relative">
      <svg className="absolute inset-0 hidden md:block w-full h-full pointer-events-none z-0">
        {[...leftPaths, ...rightPaths].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#C9CFC9"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center">
        <ul className="flex md:flex-col gap-4 md:gap-8 flex-wrap justify-center md:justify-end md:items-end order-2 md:order-1">
          {whyChooseLeft.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={item.label}
                ref={(el) => {
                  leftRefs.current[whyChooseLeft.indexOf(item)] = el;
                }}
                className="flex items-center gap-3 md:flex-row-reverse md:text-right"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-line bg-white text-forest">
                  <Icon size={16} />
                </span>
                <span className="text-sm font-semibold text-ink max-w-[140px]">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div ref={bottleRef} className="order-1 md:order-2 mx-auto w-[160px] sm:w-[190px]">
          <Image
            src="/images/formula/bottle-standing.png"
            alt="Hayat+ Heart Tonic bottle"
            width={700}
            height={1100}
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        <ul className="flex md:flex-col gap-4 md:gap-8 flex-wrap justify-center md:justify-start order-3">
          {whyChooseRight.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={item.label}
                ref={(el) => {
                  rightRefs.current[whyChooseRight.indexOf(item)] = el;
                }}
                className="flex items-center gap-3"
              >
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-line bg-white text-forest">
                  <Icon size={16} />
                </span>
                <span className="text-sm font-semibold text-ink max-w-[140px]">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
