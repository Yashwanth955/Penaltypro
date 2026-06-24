// Lightweight client-side auth, profile and order storage (frontend-only demo).
type Profile = {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
};

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  productId: string;
  productLabel: string;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  notes?: string;
};

const KEY_USER = "pp_auth_user";
const KEY_PROFILE = "pp_profile";
const KEY_ORDERS = "pp_orders";
const KEY_ORDER_DRAFT = "pp_order_draft";

function safeParse<T>(s: string | null, fallback: T): T {
  if (!s) return fallback;
  try {
    return JSON.parse(s) as T;
  } catch (e) {
    return fallback;
  }
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!window.localStorage.getItem(KEY_USER);
}

export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY_USER);
}

export function signIn(email: string, profile?: Profile) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY_USER, email || "user");
    if (profile) window.localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
  }
}

export function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY_USER);
  }
}

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  return safeParse<Profile>(window.localStorage.getItem(KEY_PROFILE), null as any);
}

export function setProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_PROFILE, JSON.stringify(p));
}

export function setOrderDraft(draft: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY_ORDER_DRAFT, JSON.stringify(draft));
}

export function getOrderDraft(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  return safeParse<Record<string, unknown>>(window.localStorage.getItem(KEY_ORDER_DRAFT), null as any);
}

export function clearOrderDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY_ORDER_DRAFT);
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  return safeParse<Order[]>(window.localStorage.getItem(KEY_ORDERS), [] as Order[]);
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  if (typeof window === "undefined") return;
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return;
  orders[idx].status = status;
  window.localStorage.setItem(KEY_ORDERS, JSON.stringify(orders));
}

export function addOrder(opts: Partial<Order> & { productId: string; productLabel: string; quantity: number; total: number; subtotal?: number; tax?: number; id?: string; createdAt?: number; customer?: Record<string, unknown>; shipping?: Record<string, unknown>; notes?: string; }): Order {
  if (typeof window === "undefined") {
    // return a minimal in-memory order (not persisted)
    return {
      id: opts.id || `PP-${Date.now().toString(36).toUpperCase()}`,
      productId: opts.productId,
      productLabel: opts.productLabel,
      quantity: opts.quantity,
      subtotal: opts.subtotal ?? Math.round((opts.total / 1.08) * 100) / 100,
      tax: opts.tax ?? Math.round((opts.subtotal ?? 0) * 0.08 * 100) / 100,
      total: opts.total,
      status: "processing",
      createdAt: opts.createdAt ?? Date.now(),
      customer: opts.customer as any,
      shipping: opts.shipping as any,
      notes: opts.notes,
    } as Order;
  }

  const id = opts.id ?? `PP-${Date.now().toString(36).toUpperCase()}`;
  const subtotal = opts.subtotal ?? Math.round((opts.total / 1.08) * 100) / 100;
  const tax = opts.tax ?? Math.round(subtotal * 0.08 * 100) / 100;
  const order: Order = {
    id,
    productId: opts.productId,
    productLabel: opts.productLabel,
    quantity: opts.quantity,
    subtotal,
    tax,
    total: opts.total,
    status: "processing",
    createdAt: opts.createdAt ?? Date.now(),
    customer: opts.customer as any,
    shipping: opts.shipping as any,
    notes: opts.notes,
  };

  const orders = getOrders();
  orders.unshift(order);
  window.localStorage.setItem(KEY_ORDERS, JSON.stringify(orders));
  return order;
}
