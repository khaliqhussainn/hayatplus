"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiCheck, FiLoader } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { useCart } from "@/lib/cart-context";
import { paymentMethods, productSizes, PaymentMethodId } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDiscountedPrice } from "@/lib/pricing";

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const originalSubtotal = items.reduce((sum, item) => {
    const size = productSizes.find((s) => s.id === item.sizeId);
    return sum + (size?.price ?? 0) * item.qty;
  }, 0);
  const savings = originalSubtotal - subtotal;
  const [form, setForm] = useState<FormState>(initialForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          paymentMethod,
          subtotal,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();

      localStorage.setItem(
        "hayatplus_last_order",
        JSON.stringify({
          orderNumber: data.orderNumber,
          paymentMethod,
          subtotal,
          customerName: form.name,
        })
      );

      clear();
      router.push("/order-confirmation");
    } catch {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="py-24 sm:py-28">
        <Container>
          <FadeIn className="flex flex-col items-center text-center gap-5 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">
              Your cart is empty
            </h1>
            <p className="text-sm text-ink/60">
              Add Hayat+ Heart Tonic to your cart before checking out.
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
          <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-10">Checkout</h1>
        </FadeIn>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold text-ink">Shipping Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="text-xs font-semibold text-ink/70">
                        Full Name
                      </span>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                        placeholder="Your full name"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-ink/70">
                        Phone / WhatsApp Number
                      </span>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                        placeholder="03XX XXXXXXX"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-ink/70">Email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                        placeholder="you@example.com"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5 sm:col-span-2">
                      <span className="text-xs font-semibold text-ink/70">
                        Delivery Address
                      </span>
                      <input
                        required
                        type="text"
                        value={form.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                        placeholder="House no, street, area"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-ink/70">City</span>
                      <input
                        required
                        type="text"
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
                        placeholder="Your city"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold text-ink">Payment Method</h2>
                  <div className="flex flex-col gap-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start gap-3 rounded-[18px] border p-4 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-forest bg-forest/5"
                            : "border-line bg-white hover:border-forest/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="mt-1 accent-forest"
                        />
                        <span className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-ink">
                            {method.label}
                          </span>
                          <span className="text-xs text-ink/55 leading-relaxed">
                            {method.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-[18px] border border-line bg-beige p-6 sm:p-7 flex flex-col gap-5 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold text-ink">Order Summary</h2>
                <div className="flex flex-col gap-3">
                  {items.map((item) => {
                    const size = productSizes.find((s) => s.id === item.sizeId);
                    if (!size) return null;
                    return (
                      <div
                        key={item.sizeId}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-ink/70">
                          {size.label} × {item.qty}
                        </span>
                        <span className="font-semibold text-ink">
                          {formatPrice(getDiscountedPrice(item.sizeId) * item.qty)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-between text-sm text-forest font-medium">
                    <span>Independence Day Sale (14% off)</span>
                    <span>-{formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <span className="text-base font-bold text-ink">Total</span>
                  <span className="text-lg font-bold text-forest">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {error && (
                  <p className="text-xs text-red-600 leading-relaxed">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  icon={submitting ? <FiLoader className="animate-spin" /> : <FiCheck />}
                  className="w-full"
                >
                  {submitting ? "Placing Order…" : "Place Order"}
                </Button>

                <p className="text-[11px] text-ink/45 leading-relaxed text-center">
                  By placing your order you agree to be contacted via phone,
                  email or WhatsApp to confirm delivery details.
                </p>

                <Link
                  href="/cart"
                  className="text-xs font-medium text-forest hover:underline underline-offset-4 text-center"
                >
                  ← Back to Cart
                </Link>
              </div>
            </FadeIn>
          </div>
        </form>
      </Container>
    </section>
  );
}
