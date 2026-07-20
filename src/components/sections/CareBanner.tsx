import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import FadeIn from "@/components/ui/FadeIn";

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export default function CareBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/banner/banner-ingredients-flatlay.jpg"
          alt="Hayat+ ingredients flat lay"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/60 to-forest-dark/10" />
      </div>

      <div className="relative py-24 sm:py-28 px-6 sm:px-12 lg:px-20">
        <FadeIn>
          <div className="max-w-lg flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Made with Care.
              <br />
              Backed by Nature.
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              No shortcuts. No unnecessary additives. Just pure ingredients
              for your heart, your health, and your life.
            </p>
            <span className={`${script.className} text-4xl text-white/90 mt-2`}>
              Hayat+
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
