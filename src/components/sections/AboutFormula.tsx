import Image from "next/image";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

const stats = [
  { value: "5", label: "Botanicals" },
  { value: "0", label: "Additives" },
  { value: "100%", label: "Natural" },
];

export default function AboutFormula() {
  return (
    <section id="about" className="py-24 sm:py-28 bg-forest text-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col gap-7 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sage">
                About the Formula
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15]">
                Balanced by Nature, Refined by Design
              </h2>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed">
                Hayat+ was created around a simple idea — that everyday
                wellness shouldn&apos;t require complicated formulas. We
                selected five time-trusted botanicals and balanced them into
                a single, elegant tonic, made with quality ingredients and
                nothing more than necessary.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                No fillers. No artificial additions. Just a thoughtfully
                balanced blend, crafted in small batches for consistent
                quality in every bottle.
              </p>

              <div className="flex items-center gap-5 sm:gap-12 pt-4 mt-2 border-t border-white/15">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col gap-1 ${
                      index > 0 ? "pl-5 sm:pl-12 border-l border-white/15" : ""
                    }`}
                  >
                    <span className="text-xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.15em] text-white/50 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-white/10 blur-3xl" />
              <Image
                src="/images/formula/bottle-standing.png"
                alt="Hayat+ Heart Tonic bottle"
                width={700}
                height={1100}
                className="relative w-[200px] sm:w-[240px] h-auto animate-float-slow drop-shadow-2xl"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
