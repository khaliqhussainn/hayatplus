import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { GingerIllustration } from "@/components/illustrations/IngredientIllustrations";

export default function AboutFormula() {
  return (
    <section id="about" className="py-24 sm:py-28 bg-forest text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <div className="flex flex-col gap-6 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
                About the Formula
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15]">
                Balanced by Nature, Refined by Design
              </h2>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                Hayat+ was created around a simple idea — that everyday
                wellness shouldn&apos;t require complicated formulas. We
                selected five time-trusted botanicals and balanced them into
                a single, elegant tonic, made with quality ingredients and
                nothing more than necessary.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                No fillers. No artificial additions. Just a thoughtfully
                balanced blend, crafted in small batches for consistent
                quality in every bottle.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-64 h-64 rounded-full bg-white/5 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-5 w-full max-w-sm">
                {["Quality Sourced", "Small Batch", "Balanced Blend", "Made with Care"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-3 rounded-[18px] border border-white/15 bg-white/5 p-6 text-center backdrop-blur-sm"
                    >
                      <GingerIllustration className="w-8 h-8 [&_path]:stroke-white opacity-80" />
                      <span className="text-xs font-semibold tracking-wide">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
