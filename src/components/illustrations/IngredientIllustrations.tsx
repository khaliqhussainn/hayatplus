interface IllustrationProps {
  className?: string;
}

const strokeProps = {
  fill: "none",
  stroke: "#2E6B4A",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GingerIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        {...strokeProps}
        d="M18 40c-3-6-1-13 4-16 1-5 6-8 11-6 4-2 9 0 10 5 5 1 8 6 6 11 2 4 0 9-4 11-1 4-6 6-10 4-4 2-9 0-11-4-4-1-6-5-6-5Z"
      />
      <path {...strokeProps} d="M27 22c1-3 4-5 7-4" />
      <path {...strokeProps} d="M33 46c3 1 6-1 7-4" />
    </svg>
  );
}

export function GarlicIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path {...strokeProps} d="M32 10c2 4-2 6 0 9" />
      <path
        {...strokeProps}
        d="M20 22c0-6 5-10 12-10s12 4 12 10c5 3 7 9 6 15-1 8-8 16-18 16s-17-8-18-16c-1-6 1-12 6-15Z"
      />
      <path {...strokeProps} d="M32 22v28" />
      <path {...strokeProps} d="M24 24c-1 8-1 18 2 26" />
      <path {...strokeProps} d="M40 24c1 8 1 18-2 26" />
    </svg>
  );
}

export function LemonIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse {...strokeProps} cx="32" cy="34" rx="18" ry="16" />
      <path {...strokeProps} d="M20 20c4-6 10-8 14-8" />
      <path {...strokeProps} d="M32 18v32" />
      <path {...strokeProps} d="M23 22c3 6 3 18 0 24" />
      <path {...strokeProps} d="M41 22c-3 6-3 18 0 24" />
    </svg>
  );
}

export function HoneyIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path {...strokeProps} d="M32 10v8" />
      <path
        {...strokeProps}
        d="M32 18c8 8 14 16 14 24a14 14 0 0 1-28 0c0-8 6-16 14-24Z"
      />
      <path {...strokeProps} d="M24 40h16" />
      <path {...strokeProps} d="M26 46h12" />
    </svg>
  );
}

export function AcvIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path {...strokeProps} d="M27 10h10" />
      <path {...strokeProps} d="M29 10v8l-7 10c-2 3-3 6-3 9v11a6 6 0 0 0 6 6h14a6 6 0 0 0 6-6V37c0-3-1-6-3-9l-7-10v-8" />
      <path {...strokeProps} d="M21 40h22" />
      <path {...strokeProps} d="M26 48h4" />
      <path {...strokeProps} d="M34 48h4" />
    </svg>
  );
}
