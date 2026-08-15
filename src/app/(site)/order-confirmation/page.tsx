"use client";

import { useEffect, useState } from "react";
import { FiCheckCircle, FiMessageCircle, FiCopy } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { bankDetails, contactInfo, PaymentMethodId } from "@/lib/data";
import { formatPrice } from "@/lib/format";

interface LastOrder {
  orderNumber: string;
  paymentMethod: PaymentMethodId;
  subtotal: number;
  customerName: string;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<LastOrder | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hayatplus_last_order");
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  if (order === undefined) return null;

  if (!order) {
    return (
      <section className="py-24 sm:py-28">
        <Container>
          <FadeIn className="flex flex-col items-center text-center gap-5 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">
              No recent order found
            </h1>
            <p className="text-sm text-ink/60">
              We couldn&apos;t find a recent order for this browser.
            </p>
            <Button href="/product" variant="primary">
              Shop Hayat+ Heart Tonic
            </Button>
          </FadeIn>
        </Container>
      </section>
    );
  }

  const isAdvance = order.paymentMethod === "advance";
  const whatsappMessage = encodeURIComponent(
    `Hi, I've made payment for order ${order.orderNumber}. Sharing my payment screenshot here.`
  );
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, "")}?text=${whatsappMessage}`;

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <FadeIn className="flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-forest/10 text-forest">
            <FiCheckCircle size={28} />
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">
            {order.customerName ? `Thank you, ${order.customerName}!` : "Thank you!"}
          </h1>
          <p className="text-sm text-ink/60">
            Your order has been placed successfully.
          </p>

          <div className="rounded-full border border-line bg-beige px-6 py-2 text-sm font-semibold text-ink">
            Order #{order.orderNumber}
          </div>

          <div className="text-sm text-ink/60">
            Total:{" "}
            <span className="font-semibold text-ink">{formatPrice(order.subtotal)}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-lg mx-auto mt-10 rounded-[18px] border border-line bg-white p-6 sm:p-8">
            {isAdvance ? (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-ink">Complete Your Payment</h2>
                <p className="text-sm text-ink/65 leading-relaxed">
                  Please transfer{" "}
                  <span className="font-semibold text-ink">
                    {formatPrice(order.subtotal)}
                  </span>{" "}
                  to the account below, then send us a screenshot on WhatsApp to
                  confirm your order.
                </p>

                <div className="rounded-[14px] bg-beige p-5 flex flex-col gap-3">
                  {[
                    { label: "Bank", value: bankDetails.bankName },
                    { label: "Account Title", value: bankDetails.accountTitle },
                    { label: "Account Number", value: bankDetails.accountNumber },
                    { label: "Branch Code", value: bankDetails.branchCode },
                    { label: "IBAN", value: bankDetails.iban },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wide text-ink/45">
                          {row.label}
                        </span>
                        <span className="text-sm font-semibold text-ink">
                          {row.value}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Copy ${row.label}`}
                        onClick={() => handleCopy(row.value)}
                        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-line text-ink/50 hover:text-forest hover:border-forest transition-colors"
                      >
                        <FiCopy size={13} />
                      </button>
                    </div>
                  ))}
                  {copied && (
                    <span className="text-xs text-forest font-medium">Copied!</span>
                  )}
                </div>

                <Button
                  href={whatsappHref}
                  variant="primary"
                  icon={<FiMessageCircle />}
                  className="w-full"
                >
                  Send Payment Screenshot on WhatsApp
                </Button>

                <p className="text-xs text-ink/45 leading-relaxed text-center">
                  Your order will be confirmed once we verify your payment.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-lg font-bold text-ink">
                  Cash on Delivery Selected
                </h2>
                <p className="text-sm text-ink/65 leading-relaxed">
                  We&apos;ll contact you shortly to confirm your delivery
                  details. A confirmation has also been sent to your email.
                </p>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="flex justify-center mt-10">
          <Button href="/product" variant="secondary">
            Continue Shopping
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
