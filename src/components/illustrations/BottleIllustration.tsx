interface BottleIllustrationProps {
  className?: string;
}

export default function BottleIllustration({ className = "" }: BottleIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Hayat+ Heart Tonic bottle"
    >
      <defs>
        <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EAF1EC" />
          <stop offset="45%" stopColor="#D9E7DE" />
          <stop offset="100%" stopColor="#C3D9CC" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3C7F58" />
          <stop offset="100%" stopColor="#20553A" />
        </linearGradient>
        <linearGradient id="capGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E6B4A" />
          <stop offset="100%" stopColor="#204F38" />
        </linearGradient>
        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DDB876" />
          <stop offset="50%" stopColor="#C9A15B" />
          <stop offset="100%" stopColor="#B08D4C" />
        </linearGradient>
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="522" rx="105" ry="20" fill="url(#shadow)" />

      <rect x="128" y="34" width="64" height="46" rx="10" fill="url(#capGradient)" />
      <rect x="122" y="70" width="76" height="20" rx="6" fill="url(#goldRing)" />

      <path
        d="M138 90 H182 L198 158 C214 190 224 216 224 260 V468 C224 500 206 520 160 520 C114 520 96 500 96 468 V260 C96 216 106 190 122 158 Z"
        fill="url(#glassBody)"
        stroke="#B9CCC0"
        strokeWidth="2"
      />

      <path
        d="M104 300 C104 286 118 276 160 276 C202 276 216 286 216 300 V462 C216 492 200 508 160 508 C120 508 104 492 104 462 Z"
        fill="url(#liquid)"
      />

      <path
        d="M104 300 C104 286 118 276 160 276 C202 276 216 286 216 300"
        fill="none"
        stroke="#4E9068"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      <rect
        x="112"
        y="330"
        width="96"
        height="120"
        rx="14"
        fill="#FBFAF7"
        stroke="#E8E8E8"
      />
      <text
        x="160"
        y="372"
        textAnchor="middle"
        fontFamily="Manrope, sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="#2E6B4A"
        letterSpacing="1"
      >
        HAYAT+
      </text>
      <line x1="132" y1="386" x2="188" y2="386" stroke="#C9A15B" strokeWidth="2" />
      <text
        x="160"
        y="406"
        textAnchor="middle"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
        fontSize="11"
        letterSpacing="2"
        fill="#5B6B61"
      >
        HEART TONIC
      </text>
      <text
        x="160"
        y="432"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        letterSpacing="1.5"
        fill="#8A968E"
      >
        GINGER · GARLIC · LEMON
      </text>
      <text
        x="160"
        y="446"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        letterSpacing="1.5"
        fill="#8A968E"
      >
        HONEY · ACV
      </text>

      <path
        d="M150 92 L138 158 C124 188 114 212 110 250"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
