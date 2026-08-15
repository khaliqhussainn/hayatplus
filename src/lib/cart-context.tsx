"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { ProductSizeId } from "@/lib/data";
import { getDiscountedPrice } from "@/lib/pricing";

export interface CartItem {
  sizeId: ProductSizeId;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (sizeId: ProductSizeId, qty: number) => void;
  updateQty: (sizeId: ProductSizeId, qty: number) => void;
  removeItem: (sizeId: ProductSizeId) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "hayatplus_cart";

function priceFor(sizeId: ProductSizeId): number {
  return getDiscountedPrice(sizeId);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (sizeId: ProductSizeId, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.sizeId === sizeId);
      if (existing) {
        return prev.map((item) =>
          item.sizeId === sizeId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { sizeId, qty }];
    });
  };

  const updateQty = (sizeId: ProductSizeId, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.sizeId !== sizeId)
        : prev.map((item) => (item.sizeId === sizeId ? { ...item, qty } : item))
    );
  };

  const removeItem = (sizeId: ProductSizeId) => {
    setItems((prev) => prev.filter((item) => item.sizeId !== sizeId));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + priceFor(item.sizeId) * item.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
