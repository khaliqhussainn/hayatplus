import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-guard";
import { listOrders } from "@/lib/orders";

export async function GET() {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrders();
  return NextResponse.json({ orders });
}
