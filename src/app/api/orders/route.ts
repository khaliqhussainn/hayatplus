import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactInfo } from "@/lib/data";
import {
  generateOrderNumber,
  buildOwnerNotificationEmail,
  buildCustomerConfirmationEmail,
  type OrderPayload,
} from "@/lib/orders";

export async function POST(request: Request) {
  let payload: OrderPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { customer, items, paymentMethod, subtotal } = payload;

  if (
    !customer?.name ||
    !customer?.phone ||
    !customer?.email ||
    !customer?.address ||
    !customer?.city ||
    !Array.isArray(items) ||
    items.length === 0 ||
    (paymentMethod !== "cod" && paymentMethod !== "advance")
  ) {
    return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
  }

  const orderNumber = generateOrderNumber();

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from = process.env.ORDERS_FROM_EMAIL || "Hayat+ Orders <onboarding@resend.dev>";

      const ownerEmail = buildOwnerNotificationEmail(orderNumber, payload);
      const customerEmail = buildCustomerConfirmationEmail(orderNumber, payload);

      await Promise.all([
        resend.emails.send({
          from,
          to: contactInfo.email,
          subject: ownerEmail.subject,
          text: ownerEmail.text,
        }),
        resend.emails.send({
          from,
          to: customer.email,
          subject: customerEmail.subject,
          text: customerEmail.text,
        }),
      ]);
    } catch (err) {
      // Email delivery is best-effort — never block order placement on it.
      console.error("Failed to send order emails", err);
    }
  }

  return NextResponse.json({ orderNumber, subtotal });
}
