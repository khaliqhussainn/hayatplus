import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function CareBanner() {
  return (
    <section className="relative overflow-hidden border-y border-line">
      <div className="absolute inset-0">
        <Image
          src="/images/banner/banner-ingredients-flatlay.jpg"
          alt="Ginger, garlic, lemon and honey arranged on a marble surface"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10" />
      </div>

      <div className="relative py-24 sm:py-28 px-6 sm:px-12 lg:px-20">
        <FadeIn>
          <div className="max-w-lg flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Made with Care.
              <br />
              Backed by Nature.
            </h2>
            <p className="text-ink/70 text-sm sm:text-base leading-relaxed">
              No shortcuts. No unnecessary additives. Just pure ingredients
              for your heart, your health, and your life.
            </p>
            <Image
              src="/images/logo/hayat-logo.png"
              alt="Hayat+"
              width={900}
              height={293}
              className="h-9 w-auto self-start mt-2"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
