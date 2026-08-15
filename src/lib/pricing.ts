import { productSizes, ProductSizeId } from "@/lib/data";

export const DISCOUNT_PERCENT = 14;
export const DISCOUNT_LABEL = "Independence Day Sale";
export const DISCOUNT_END_LABEL = "August 31";

export function applyDiscount(price: number): number {
  return Math.round(price * (1 - DISCOUNT_PERCENT / 100));
}

export function getOriginalPrice(sizeId: ProductSizeId): number {
  return productSizes.find((s) => s.id === sizeId)?.price ?? 0;
}

export function getDiscountedPrice(sizeId: ProductSizeId): number {
  return applyDiscount(getOriginalPrice(sizeId));
}
