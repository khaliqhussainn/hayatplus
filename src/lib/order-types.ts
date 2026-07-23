import { ProductSizeId, PaymentMethodId } from "@/lib/data";

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

export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderRecord {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  payment_method: PaymentMethodId;
  status: OrderStatus;
  subtotal: number;
  items: OrderItem[];
  created_at: string;
}
