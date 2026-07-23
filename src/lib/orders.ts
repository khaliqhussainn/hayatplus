import { productSizes, bankDetails, ProductSizeId, PaymentMethodId } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface OrderItem {
  sizeId: ProductSizeId;
  qty: number;
}

export interface OrderPayload {
  customer: OrderCustomer;
  items: OrderItem[];
  paymentMethod: PaymentMethodId;
  subtotal: number;
}

export function generateOrderNumber(): string {
  const datePart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `HP-${datePart}${randomPart}`;
}

function lineItemsText(items: OrderItem[]): string {
  return items
    .map((item) => {
      const size = productSizes.find((s) => s.id === item.sizeId);
      const label = size?.label ?? item.sizeId;
      const lineTotal = size ? formatPrice(size.price * item.qty) : "";
      return `- Hayat+ Heart Tonic (${label}) × ${item.qty} — ${lineTotal}`;
    })
    .join("\n");
}

export function buildOwnerNotificationEmail(orderNumber: string, order: OrderPayload) {
  const paymentLabel = order.paymentMethod === "cod" ? "Cash on Delivery" : "Advance Payment";
  const text = `New order received: ${orderNumber}

Customer: ${order.customer.name}
Phone: ${order.customer.phone}
Email: ${order.customer.email}
Address: ${order.customer.address}, ${order.customer.city}

Payment Method: ${paymentLabel}

Items:
${lineItemsText(order.items)}

Total: ${formatPrice(order.subtotal)}`;

  return {
    subject: `New Order ${orderNumber} — ${paymentLabel}`,
    text,
  };
}

export function buildCustomerConfirmationEmail(orderNumber: string, order: OrderPayload) {
  const isAdvance = order.paymentMethod === "advance";

  const nextSteps = isAdvance
    ? `To confirm your order, please transfer ${formatPrice(order.subtotal)} to:

Bank: ${bankDetails.bankName}
Account Title: ${bankDetails.accountTitle}
Account Number: ${bankDetails.accountNumber}

Once paid, please send your payment screenshot along with your order number (${orderNumber}) to our WhatsApp. Your order will be confirmed as soon as we verify the payment.`
    : `Your order will be delivered via Cash on Delivery. We'll contact you shortly to confirm your delivery details.`;

  const text = `Hi ${order.customer.name},

Thank you for your order! Here's a summary:

Order Number: ${orderNumber}

Items:
${lineItemsText(order.items)}

Total: ${formatPrice(order.subtotal)}

${nextSteps}

— Hayat+`;

  return {
    subject: `Your Hayat+ order ${orderNumber} has been received`,
    text,
  };
}
