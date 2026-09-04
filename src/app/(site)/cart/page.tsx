"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { useCart } from "@/lib/cart-context";
import { product, productSizes } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-24 sm:py-28">
        <Container>
          <FadeIn className="flex flex-col items-center text-center gap-5 max-w-md mx-auto">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-beige text-forest">
              <FiShoppingBag size={24} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">
              Your cart is empty
            </h1>
            <p className="text-sm text-ink/60">
              Looks like you haven&apos;t added Hayat+ Heart Tonic to your cart yet.
            </p>
            <Button href="/product" variant="primary">
              Shop Hayat+ Heart Tonic
            </Button>
          </FadeIn>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <FadeIn>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-10">Your Cart</h1>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          <FadeIn delay={0.05}>
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const size = productSizes.find((s) => s.id === item.sizeId);
                if (!size) return null;
                return (
                  <div
                    key={item.sizeId}
                    className="flex items-center gap-4 rounded-[18px] border border-line bg-white p-4 sm:p-5"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] bg-beige overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <span className="text-sm font-semibold text-ink">
                        {product.name}
                      </span>
                      <span className="text-xs text-ink/50">{size.label}</span>
                      <span className="text-sm font-semibold text-forest sm:hidden">
                        {formatPrice(size.price)}
                      </span>
                    </div>

                    <span className="hidden sm:block text-sm font-semibold text-ink/70 w-20 text-right">
                      {formatPrice(size.price)}
                    </span>

                    <div className="flex items-center gap-2 rounded-full border border-line px-1.5 py-1.5">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.sizeId, item.qty - 1)}
                        className="flex items-center justify-center w-7 h-7 rounded-full text-ink hover:bg-beige transition-colors"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-ink">
                        {item.qty}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.sizeId, item.qty + 1)}
                        className="flex items-center justify-center w-7 h-7 rounded-full text-ink hover:bg-beige transition-colors"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    <span className="hidden sm:block text-sm font-bold text-ink w-20 text-right">
                      {formatPrice(size.price * item.qty)}
                    </span>

                    <button
                      aria-label={`Remove ${size.label}`}
                      onClick={() => removeItem(item.sizeId)}
                      className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-ink/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                );
              })}

              <Link
                href="/product"
                className="text-sm font-medium text-forest hover:underline underline-offset-4 w-fit mt-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[18px] border border-line bg-beige p-6 sm:p-7 flex flex-col gap-5 lg:sticky lg:top-28">
              <h2 className="text-lg font-bold text-ink">Order Summary</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between text-ink/65">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-ink/65">
                  <span>Delivery</span>
                  <span className="font-semibold text-forest">Free</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <span className="text-base font-bold text-ink">Total</span>
                <span className="text-lg font-bold text-forest">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Button href="/checkout" variant="primary" icon={<FiArrowRight />} className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
