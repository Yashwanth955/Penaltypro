import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, CheckCircle2, Printer, Mail, Package, Lock } from "lucide-react";

type ConfirmationSearch = {
  product?: string;
  qty?: number;
  order?: string;
  email?: string;
};

export const Route = createFileRoute("/confirmation")({
  validateSearch: (search: Record<string, unknown>): ConfirmationSearch => ({
    product: typeof search.product === "string" ? search.product : undefined,
    qty:
      typeof search.qty === "number"
        ? search.qty
        : typeof search.qty === "string"
        ? Number(search.qty) || undefined
        : undefined,
    order: typeof search.order === "string" ? search.order : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmation — PenaltyPro" },
      {
        name: "description",
        content:
          "Your PenaltyPro order is confirmed. View your receipt and order summary.",
      },
      { property: "og:title", content: "Order Confirmation — PenaltyPro" },
      {
        property: "og:description",
        content: "Your PenaltyPro order is confirmed.",
      },
    ],
  }),
  component: ConfirmationPage,
});

const View = ({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => <div className={`flex flex-col ${className}`}>{children}</div>;
const Row = ({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => <div className={`flex flex-row ${className}`}>{children}</div>;
const Text = ({
  className = "",
  children,
  as: As = "span",
}: {
  className?: string;
  children?: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  const C = As as React.ElementType;
  return <C className={className}>{children}</C>;
};

function Logo() {
  return (
    <Row className="items-center gap-2">
      <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary font-bold">
        P
      </div>
      <Text className="font-semibold tracking-tight">PenaltyPro</Text>
    </Row>
  );
}

const NAV: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Registration", to: "/registration" },
  { label: "Contact Us", to: "/contact" },
];

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur print:hidden">
      <View className="mx-auto w-full max-w-7xl">
        <Row className="h-16 items-center justify-between px-5 sm:px-8">
          <Link to="/" className="contents">
            <Logo />
          </Link>
          <nav className="hidden md:flex flex-row items-center gap-8">
            {NAV.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
          >
            <Menu size={18} />
          </button>
        </Row>
        {open && (
          <View className="md:hidden border-t border-border px-5 py-3 gap-3">
            {NAV.map((l) => (
              <Link key={l.label} to={l.to} className="text-sm text-muted-foreground">
                {l.label}
              </Link>
            ))}
          </View>
        )}
      </View>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border print:hidden">
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-10">
        <Text className="text-xs text-muted-foreground">
          © 2026 HiveID LLC. All rights reserved.
        </Text>
      </View>
    </footer>
  );
}

const PRODUCTS: Record<string, { label: string; price: number; sku: string }> = {
  hardware: { label: "PenaltyPro Pen", price: 299, sku: "PP-PEN-001" },
  software: { label: "PenaltyPro Platform", price: 49, sku: "PP-SUB-ANN" },
  bundle: { label: "PenaltyPro Complete Bundle", price: 329, sku: "PP-BUNDLE" },
};

function ConfirmationPage() {
  const { product, qty, order, email } = Route.useSearch();
  const selected = (product && PRODUCTS[product]) ?? PRODUCTS.bundle;
  const quantity = Math.max(1, Math.min(99, qty ?? 1));
  const subtotal = selected.price * quantity;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;
  const orderId = order ?? `PP-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const eta = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-20 pb-10">
          <View className="mx-auto w-full max-w-3xl items-center text-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
              <CheckCircle2 size={32} />
            </div>
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              PAYMENT SUCCESSFUL
            </Text>
            <Text as="h1" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Thank You for Your Order
            </Text>
            <Text className="text-muted-foreground max-w-xl leading-relaxed">
              Your payment has been processed successfully. A receipt has been sent
              {email ? ` to ${email}` : " to your email"}.
            </Text>
          </View>
        </section>

        <section className="px-5 sm:px-8 pb-20">
          <View className="mx-auto w-full max-w-3xl gap-6">
            <View className="rounded-xl border border-border bg-card p-7 gap-6">
              <Row className="flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                <View className="gap-1">
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                    Order Number
                  </Text>
                  <Text className="text-lg font-semibold">{orderId}</Text>
                </View>
                <View className="gap-1 sm:items-end">
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                    Order Date
                  </Text>
                  <Text className="text-sm">{date}</Text>
                </View>
              </Row>

              <View className="gap-4">
                <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
                  RECEIPT
                </Text>
                <Row className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border pb-3">
                  <Text className="flex-1">Item</Text>
                  <Text className="w-16 text-center">Qty</Text>
                  <Text className="w-24 text-right">Price</Text>
                </Row>
                <Row className="items-start py-1">
                  <View className="flex-1 gap-1">
                    <Text className="text-sm font-medium">{selected.label}</Text>
                    <Text className="text-xs text-muted-foreground">
                      SKU: {selected.sku}
                    </Text>
                  </View>
                  <Text className="w-16 text-center text-sm">{quantity}</Text>
                  <Text className="w-24 text-right text-sm">
                    ${(selected.price * quantity).toFixed(2)}
                  </Text>
                </Row>
              </View>

              <View className="gap-2 border-t border-border pt-5">
                <Row className="justify-between">
                  <Text className="text-sm text-muted-foreground">Subtotal</Text>
                  <Text className="text-sm">${subtotal.toFixed(2)}</Text>
                </Row>
                <Row className="justify-between">
                  <Text className="text-sm text-muted-foreground">Estimated tax</Text>
                  <Text className="text-sm">${tax.toFixed(2)}</Text>
                </Row>
                <Row className="justify-between">
                  <Text className="text-sm text-muted-foreground">Shipping</Text>
                  <Text className="text-sm text-[color:var(--success)]">Free</Text>
                </Row>
                <Row className="justify-between border-t border-border pt-3 mt-1">
                  <Text className="font-semibold">Total Paid</Text>
                  <Text className="font-semibold">${total.toFixed(2)}</Text>
                </Row>
              </View>

              <Row className="items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2">
                <Lock size={14} className="text-[color:var(--success)]" />
                <Text className="text-xs text-muted-foreground">
                  Payment securely processed. This page serves as your receipt.
                </Text>
              </Row>
            </View>

            <View className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Row className="items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary shrink-0">
                  <Package size={18} />
                </div>
                <View className="gap-1">
                  <Text className="text-sm font-semibold">Estimated Delivery</Text>
                  <Text className="text-xs text-muted-foreground">{eta}</Text>
                </View>
              </Row>
              <Row className="items-start gap-3 rounded-xl border border-border bg-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <View className="gap-1">
                  <Text className="text-sm font-semibold">Receipt Sent</Text>
                  <Text className="text-xs text-muted-foreground break-all">
                    {email ?? "Check your inbox shortly"}
                  </Text>
                </View>
              </Row>
            </View>

            <Row className="flex-wrap gap-3 justify-center pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition"
              >
                <Printer size={16} />
                Print Receipt
              </button>
              <Link
                to="/registration"
                className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                Register Your Product
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                Back to Home
              </Link>
            </Row>
          </View>
        </section>
      </main>
      <Footer />
    </View>
  );
}
