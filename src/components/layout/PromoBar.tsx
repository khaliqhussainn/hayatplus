"use client";

import { usePathname } from "next/navigation";
import { FiGift } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { DISCOUNT_PERCENT, DISCOUNT_LABEL, DISCOUNT_END_LABEL } from "@/lib/pricing";

export default function PromoBar() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="bg-forest text-white">
      <Container className="flex items-center justify-center gap-2 py-2.5 text-center">
        <FiGift size={14} className="flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
          {DISCOUNT_LABEL}: Get {DISCOUNT_PERCENT}% OFF on Hayat+ Heart Tonic — offer
          valid until {DISCOUNT_END_LABEL}
        </span>
      </Container>
    </div>
  );
}
