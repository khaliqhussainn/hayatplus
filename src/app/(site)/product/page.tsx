import type { Metadata } from "next";
import Image from "next/image";
import { FiFeather, FiRefreshCw, FiDroplet, FiCalendar } from "react-icons/fi";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import Reviews from "@/components/sections/Reviews";
import {
  product,
  ingredients,
  howToUseSteps,
  nutritionSnapshot,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Shop Hayat+ Heart Tonic",
  description: product.description,
};

const stepIconMap = {
  shake: FiRefreshCw,
  mix: FiDroplet,
  daily: FiCalendar,
};

export default function ProductPage() {
  return (
    <div className="bg-white">
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <FadeIn>
              <div className="relative flex items-center justify-center lg:sticky lg:top-28">
                <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-sage/15 blur-3xl" />
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={1200}
                  priority
                  className="relative w-[280px] sm:w-[380px] h-auto drop-shadow-2xl"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-6">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-beige px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-forest">
                  <FiFeather size={13} /> Natural Herbal Formula
                </span>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-base text-ink/65 leading-relaxed max-w-lg">
                    {product.description}
                  </p>
                </div>

                <ProductBuyBox />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-beige">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <FadeIn>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  About the Formula
                </h2>
                <p className="text-sm sm:text-base text-ink/65 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  What&apos;s Inside
                </h2>
                <div className="flex flex-wrap gap-3">
                  {ingredients.map((ingredient) => (
                    <div
                      key={ingredient.key}
                      className="flex items-center gap-3 rounded-full border border-line bg-white pl-1.5 pr-4 py-1.5"
                    >
                      <div className="relative w-9 h-9 rounded-full bg-beige overflow-hidden flex-shrink-0">
                        <Image
                          src={ingredient.image}
                          alt={ingredient.name}
                          fill
                          sizes="36px"
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-xs font-semibold text-ink">
                        {ingredient.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <FadeIn>
              <div className="flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">How to Use</h2>
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
                          <span className="text-sm font-semibold text-ink">
                            {step.title}
                          </span>
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
              <div className="flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  Nutrition Snapshot
                </h2>
                <span className="text-xs font-medium text-ink/50 -mt-4">
                  (Per Serving {nutritionSnapshot.servingSize})
                </span>
                <div className="rounded-[18px] border border-line overflow-hidden">
                  {nutritionSnapshot.facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`flex items-center justify-between px-5 py-3.5 ${
                        index % 2 === 0 ? "bg-beige" : "bg-white"
                      } ${
                        index !== nutritionSnapshot.facts.length - 1
                          ? "border-b border-line"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-ink/70">{fact.label}</span>
                      <span className="text-sm font-semibold text-ink">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Reviews />
    </div>
  );
}
