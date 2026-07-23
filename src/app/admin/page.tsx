"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiRefreshCw, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { productSizes, ProductSizeId } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ORDER_STATUSES, OrderRecord, OrderStatus } from "@/lib/order-types";

const statusStyles: Record<OrderStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function sizeLabel(sizeId: ProductSizeId) {
  return productSizes.find((s) => s.id === sizeId)?.label ?? sizeId;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const loadOrders = async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to load orders");
      const data = await res.json();
      setOrders(data.orders);
    } catch {
      setError("Couldn't load orders. Try refreshing.");
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (orderNumber: string, status: OrderStatus) => {
    setUpdating(orderNumber);
    try {
      const res = await fetch(`/api/admin/orders/${orderNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setOrders(
        (prev) =>
          prev?.map((o) =>
            o.order_number === orderNumber ? { ...o, status } : o
          ) ?? null
      );
    } catch {
      setError("Couldn't update order status.");
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink">Orders</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={loadOrders}
              aria-label="Refresh"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink/60 hover:text-forest hover:border-forest transition-colors"
            >
              <FiRefreshCw size={15} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-red-600 transition-colors"
            >
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        {orders === null ? (
          <p className="text-sm text-ink/50">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-ink/50">
            No orders yet. New orders will show up here.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => {
              const isOpen = expanded === order.order_number;
              return (
                <div
                  key={order.order_number}
                  className="rounded-[18px] border border-line bg-white overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpanded(isOpen ? null : order.order_number)
                    }
                    className="w-full flex flex-wrap items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-bold text-ink w-40 truncate">
                      #{order.order_number}
                    </span>
                    <span className="text-sm text-ink/70 flex-1 min-w-[140px] truncate">
                      {order.customer_name}
                    </span>
                    <span className="text-xs text-ink/50 w-24">
                      {order.customer_city}
                    </span>
                    <span className="text-xs font-medium text-ink/50 w-28">
                      {order.payment_method === "cod" ? "COD" : "Advance"}
                    </span>
                    <span className="text-sm font-semibold text-forest w-24">
                      {formatPrice(order.subtotal)}
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-ink/40">
                      {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2 text-sm">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                          Customer
                        </span>
                        <span className="text-ink">{order.customer_name}</span>
                        <span className="text-ink/60">{order.customer_phone}</span>
                        <span className="text-ink/60">{order.customer_email}</span>
                        <span className="text-ink/60">
                          {order.customer_address}, {order.customer_city}
                        </span>
                        <span className="text-ink/40 text-xs mt-1">
                          Placed {new Date(order.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-col gap-3 text-sm">
                        <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                          Items
                        </span>
                        {order.items.map((item) => (
                          <div
                            key={item.sizeId}
                            className="flex items-center justify-between text-ink/70"
                          >
                            <span>
                              {sizeLabel(item.sizeId)} × {item.qty}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between font-semibold text-ink pt-2 border-t border-line">
                          <span>Total</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>

                        <label className="flex flex-col gap-1.5 mt-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                            Status
                          </span>
                          <select
                            value={order.status}
                            disabled={updating === order.order_number}
                            onChange={(e) =>
                              handleStatusChange(
                                order.order_number,
                                e.target.value as OrderStatus
                              )
                            }
                            className="rounded-[10px] border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:border-forest"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
