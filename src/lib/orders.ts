import type postgres from "postgres";
import { productSizes, bankDetails } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { getDb } from "@/lib/db";
import type { OrderItem, OrderPayload, OrderRecord, OrderStatus } from "@/lib/order-types";

export * from "@/lib/order-types";

export function generateOrderNumber(): string {
  const datePart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `HP-${datePart}${randomPart}`;
}

/**
 * Best-effort insert — returns false (rather than throwing) if there's no
 * database configured or the write fails, so order placement never blocks
 * on persistence.
 */
export async function insertOrder(
  orderNumber: string,
  order: OrderPayload
): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO orders (
        order_number, customer_name, customer_phone, customer_email,
        customer_address, customer_city, payment_method, subtotal, items
      ) VALUES (
        ${orderNumber}, ${order.customer.name}, ${order.customer.phone},
        ${order.customer.email}, ${order.customer.address}, ${order.customer.city},
        ${order.paymentMethod}, ${order.subtotal}, ${sql.json(order.items as unknown as postgres.JSONValue)}
      )
    `;
    return true;
  } catch (err) {
    console.error("Failed to persist order", err);
    return false;
  }
}

export async function listOrders(): Promise<OrderRecord[]> {
  const sql = getDb();
  if (!sql) return [];

  const rows = await sql<OrderRecord[]>`
    SELECT * FROM orders ORDER BY created_at DESC
  `;
  return rows;
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus
): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  const result = await sql`
    UPDATE orders SET status = ${status} WHERE order_number = ${orderNumber}
  `;
  return result.count > 0;
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
