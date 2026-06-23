import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Lock } from "lucide-react";

type PaymentSearch = { product?: string; qty?: number };

export const Route = createFileRoute("/payment")({
  validateSearch: (search: Record<string, unknown>): PaymentSearch => ({
    product: typeof search.product === "string" ? search.product : undefined,
    qty:
      typeof search.qty === "number"
        ? search.qty
        : typeof search.qty === "string"
        ? Number(search.qty) || undefined
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Secure Checkout — PenaltyPro" },
      {
        name: "description",
        content:
          "Complete your PenaltyPro order. Review your summary and continue to secure payment.",
      },
      { property: "og:title", content: "Secure Checkout — PenaltyPro" },
      {
        property: "og:description",
        content: "Review your order and continue to secure payment.",
      },
    ],
  }),
  component: PaymentPage,
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
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
          <Row className="items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Login / Sign In
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setOpen((s) => !s)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
            >
              <Menu size={18} />
            </button>
          </Row>
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
    <footer className="border-t border-border">
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-10">
        <Text className="text-xs text-muted-foreground">
          © 2026 HiveID LLC. All rights reserved.
        </Text>
      </View>
    </footer>
  );
}

const PRODUCTS: Record<string, { label: string; price: number }> = {
  hardware: { label: "PenaltyPro Pen", price: 299 },
  software: { label: "PenaltyPro Platform", price: 49 },
  bundle: { label: "PenaltyPro Complete Bundle", price: 329 },
};

function PaymentPage() {
  const { product, qty } = Route.useSearch();
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);

  const selected =
    (product && PRODUCTS[product]) ?? PRODUCTS.bundle;
  const quantity = Math.max(1, Math.min(99, qty ?? 1));
  const subtotal = selected.price * quantity;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
          <View className="mx-auto w-full max-w-2xl items-center gap-4 text-center">
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              SECURE CHECKOUT
            </Text>
            <Text as="h1" className="text-4xl sm:text-5xl font-bold tracking-tight">
              {done ? "Payment Successful" : "Complete Your Order"}
            </Text>
          </View>

          <View className="mx-auto w-full max-w-2xl pt-10 gap-6">
            <View className="rounded-xl border border-border bg-card p-7 gap-5">
              <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
                ORDER SUMMARY
              </Text>
              <View className="gap-4">
                <Row className="justify-between border-b border-border pb-4">
                  <Text className="text-muted-foreground text-sm">Product</Text>
                  <Text className="text-sm">{selected.label}</Text>
                </Row>
                <Row className="justify-between border-b border-border pb-4">
                  <Text className="text-muted-foreground text-sm">Quantity</Text>
                  <Text className="text-sm">{quantity}</Text>
                </Row>
                <Row className="justify-between border-b border-border pb-4">
                  <Text className="text-muted-foreground text-sm">Subtotal</Text>
                  <Text className="text-sm">${subtotal.toFixed(2)}</Text>
                </Row>
                <Row className="justify-between border-b border-border pb-4">
                  <Text className="text-muted-foreground text-sm">Estimated tax</Text>
                  <Text className="text-sm">${tax.toFixed(2)}</Text>
                </Row>
                <Row className="justify-between pt-1">
                  <Text className="font-semibold">Total</Text>
                  <Text className="font-semibold">${total.toFixed(2)}</Text>
                </Row>
              </View>
            </View>

            {!done ? (
              <>
                <Row className="items-start gap-3 rounded-xl border border-border bg-card/60 p-5">
                  <Lock size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                  <Text className="text-sm text-muted-foreground leading-relaxed">
                    Payment is processed securely through our payment partner. You will be
                    redirected to complete checkout.
                  </Text>
                </Row>

                <button
                  type="button"
                  disabled={paying}
                  onClick={() => {
                    setPaying(true);
                    setTimeout(() => {
                      setPaying(false);
                      setDone(true);
                      const orderId = `PP-${Date.now().toString(36).toUpperCase()}`;
                      navigate({
                        to: "/confirmation",
                        search: { product: product ?? "bundle", qty: quantity, order: orderId },
                      });
                    }, 1200);
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-60"
                >
                  {paying ? "Redirecting…" : "Continue to Payment"}
                </button>

                <Link
                  to="/order"
                  search={{ product: product ?? "bundle" }}
                  className="text-sm text-primary hover:underline text-center"
                >
                  ← Back to Order
                </Link>
              </>
            ) : (
              <View className="rounded-xl border border-border bg-card p-7 gap-4 items-center text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
                  <Lock size={20} />
                </div>
                <Text className="text-lg font-semibold">
                  Thanks — your payment of ${total.toFixed(2)} was received.
                </Text>
                <Text className="text-sm text-muted-foreground max-w-sm">
                  A confirmation and receipt have been sent to your email. You can register your
                  product once it arrives.
                </Text>
                <Row className="gap-3 flex-wrap justify-center pt-2">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition"
                  >
                    Back to Home
                  </Link>
                  <Link
                    to="/registration"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                  >
                    Register Your Product
                  </Link>
                </Row>
              </View>
            )}
          </View>
        </section>
      </main>
      <Footer />
    </View>
  );
}
