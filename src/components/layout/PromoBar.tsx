"use client";

import { usePathname } from "next/navigation";
import { FiTruck } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { FREE_DELIVERY_LABEL } from "@/lib/offer";

export default function PromoBar() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="bg-forest text-white">
      <Container className="flex items-center justify-center gap-2 py-2.5 text-center">
        <FiTruck size={14} className="flex-shrink-0" />
        <span className="text-[11px] sm:text-xs font-semibold tracking-wide">
          {FREE_DELIVERY_LABEL} on Every Order of Hayat+ Heart Tonic
        </span>
      </Container>
    </div>
  );
}
