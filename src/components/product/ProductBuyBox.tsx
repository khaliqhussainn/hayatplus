"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiShoppingBag, FiCheck, FiFeather, FiSlash, FiDroplet } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { productSizes, heroTrustBadges, ProductSizeId } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { DISCOUNT_PERCENT, DISCOUNT_END_LABEL, getDiscountedPrice } from "@/lib/pricing";

const badgeIconMap = {
  leaf: FiFeather,
  slash: FiSlash,
  droplet: FiDroplet,
};

export default function ProductBuyBox() {
  const router = useRouter();
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState<ProductSizeId>(productSizes[1].id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const selectedSize = productSizes.find((s) => s.id === sizeId) ?? productSizes[0];

  const handleAddToCart = () => {
    addItem(sizeId, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(sizeId, qty);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold">
          {DISCOUNT_PERCENT}% OFF — Independence Day Sale
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-bold text-forest">
            {formatPrice(getDiscountedPrice(sizeId))}
          </span>
          <span className="text-base text-ink/40 line-through">
            {formatPrice(selectedSize.price)}
          </span>
          <span className="text-sm text-ink/50">/ bottle</span>
        </div>
        <span className="text-xs text-ink/50">
          Offer valid until {DISCOUNT_END_LABEL}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-ink">Size</span>
        <div className="flex flex-wrap gap-3">
          {productSizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSizeId(size.id)}
              className={`rounded-[18px] border px-5 py-3 text-left transition-colors ${
                sizeId === size.id
                  ? "border-forest bg-forest/5"
                  : "border-line bg-white hover:border-forest/40"
              }`}
            >
              <span className="block text-sm font-semibold text-ink">{size.label}</span>
              <span className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-forest">
                  {formatPrice(getDiscountedPrice(size.id))}
                </span>
                <span className="text-[11px] text-ink/40 line-through">
                  {formatPrice(size.price)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold text-ink">Quantity</span>
        <div className="inline-flex items-center gap-4 rounded-full border border-line w-fit px-2 py-2">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex items-center justify-center w-8 h-8 rounded-full text-ink hover:bg-beige transition-colors"
          >
            <FiMinus size={14} />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-ink">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="flex items-center justify-center w-8 h-8 rounded-full text-ink hover:bg-beige transition-colors"
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button onClick={handleAddToCart} variant="secondary" icon={<FiShoppingBag />}>
          {justAdded ? "Added" : "Add to Cart"}
        </Button>
        <Button onClick={handleBuyNow} variant="primary">
          Buy Now
        </Button>
      </div>

      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-forest font-medium"
          >
            <FiCheck size={16} /> Added {qty} × {selectedSize.label} to your cart
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-line">
        {heroTrustBadges.map((badge) => {
          const Icon = badgeIconMap[badge.icon];
          return (
            <div key={badge.label} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-line text-forest">
                <Icon size={14} />
              </span>
              <span className="text-xs font-medium text-ink/60 max-w-[90px] leading-tight">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
