import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-guard";
import { updateOrderStatus, ORDER_STATUSES } from "@/lib/orders";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderNumber } = await params;

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.status || !ORDER_STATUSES.includes(body.status as (typeof ORDER_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateOrderStatus(
    orderNumber,
    body.status as (typeof ORDER_STATUSES)[number]
  );

  if (!updated) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
