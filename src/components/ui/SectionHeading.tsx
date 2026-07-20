import FadeIn from "@/components/ui/FadeIn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <FadeIn>
      <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.1] text-ink">
          {title}
        </h2>
        {description && (
          <p className="text-base sm:text-lg text-ink/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
