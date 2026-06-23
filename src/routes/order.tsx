import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, CreditCard, ShieldCheck, Lock } from "lucide-react";

type OrderSearch = { product?: string };

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>): OrderSearch => ({
    product: typeof search.product === "string" ? search.product : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Place Your Order — PenaltyPro" },
      {
        name: "description",
        content:
          "Complete your PenaltyPro order. Enter your shipping and contact details, then proceed to secure payment.",
      },
      { property: "og:title", content: "Place Your Order — PenaltyPro" },
      {
        property: "og:description",
        content: "Secure checkout for PenaltyPro hardware, software, and bundles.",
      },
    ],
  }),
  component: OrderPage,
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
        <Text className="text-xs text-muted-foreground">© 2026 HiveID LLC. All rights reserved.</Text>
      </View>
    </footer>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-foreground/90">{label}</Text>
      {children}
    </View>
  );
}

const PRODUCTS: { id: string; label: string; price: number }[] = [
  { id: "hardware", label: "PenaltyPro Pen (Hardware)", price: 299 },
  { id: "software", label: "PenaltyPro Platform (Software)", price: 49 },
  { id: "bundle", label: "PenaltyPro Complete Bundle", price: 329 },
];

type Step = "details" | "payment" | "confirmation";

function OrderPage() {
  const { product } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("details");
  const [productId, setProductId] = useState<string>(
    PRODUCTS.find((p) => p.id === product)?.id ?? "hardware"
  );
  const [quantity, setQuantity] = useState(1);

  const selected = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
  const subtotal = selected.price * quantity;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-20 pb-10">
          <View className="mx-auto w-full max-w-5xl gap-3">
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              CHECKOUT
            </Text>
            <Text as="h1" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {step === "details" && "Place Your Order"}
              {step === "payment" && "Payment Details"}
              {step === "confirmation" && "Order Confirmed"}
            </Text>
            <Text className="text-muted-foreground max-w-2xl leading-relaxed">
              {step === "details" &&
                "Tell us where to ship your PenaltyPro order and we'll take you through to secure payment."}
              {step === "payment" &&
                "Enter your card details below. All payments are encrypted and securely processed."}
              {step === "confirmation" &&
                "Thanks — your order has been received. A confirmation email is on its way."}
            </Text>
            <Row className="items-center gap-2 pt-2">
              {(["details", "payment", "confirmation"] as Step[]).map((s, i) => (
                <Row key={s} className="items-center gap-2">
                  <div
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : i <
                          (["details", "payment", "confirmation"] as Step[]).indexOf(step)
                        ? "bg-primary/30 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <Text className="text-xs uppercase tracking-wider text-muted-foreground hidden sm:inline">
                    {s}
                  </Text>
                  {i < 2 && <div className="h-px w-6 bg-border" />}
                </Row>
              ))}
            </Row>
          </View>
        </section>

        <section className="px-5 sm:px-8 pb-20">
          <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {step === "details" && (
              <DetailsForm
                productId={productId}
                setProductId={setProductId}
                quantity={quantity}
                setQuantity={setQuantity}
                onNext={() => navigate({ to: "/payment", search: { product: productId, qty: quantity } })}
                onCancel={() => navigate({ to: "/" })}
              />
            )}
            {step === "payment" && (
              <PaymentForm
                total={total}
                onBack={() => setStep("details")}
                onPaid={() => setStep("confirmation")}
              />
            )}
            {step === "confirmation" && (
              <Confirmation
                product={selected.label}
                quantity={quantity}
                total={total}
              />
            )}

            <OrderSummary
              product={selected}
              quantity={quantity}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />
          </div>
        </section>
      </main>
      <Footer />
    </View>
  );
}

function DetailsForm({
  productId,
  setProductId,
  quantity,
  setQuantity,
  onNext,
  onCancel,
}: {
  productId: string;
  setProductId: (v: string) => void;
  quantity: number;
  setQuantity: (v: number) => void;
  onNext: () => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-7 rounded-xl border border-border bg-card p-7"
    >
      <View className="gap-5">
        <Text as="h2" className="text-xl font-semibold tracking-tight">
          Customer Information
        </Text>
        <Row className="gap-4 flex-col sm:flex-row">
          <Field label="First Name">
            <input className={inputCls} placeholder="John" maxLength={60} required />
          </Field>
          <Field label="Last Name">
            <input className={inputCls} placeholder="Smith" maxLength={60} required />
          </Field>
        </Row>
        <Field label="Email Address">
          <input
            type="email"
            className={inputCls}
            placeholder="john@example.com"
            maxLength={255}
            required
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            className={inputCls}
            placeholder="(555) 000-0000"
            maxLength={32}
          />
        </Field>
        <Field label="Organisation / Conference Name">
          <input
            className={inputCls}
            placeholder="e.g. Southwest Officials Conference"
            maxLength={160}
          />
        </Field>
      </View>

      <View className="gap-5">
        <Text as="h2" className="text-xl font-semibold tracking-tight">
          Shipping Address
        </Text>
        <Field label="Street Address">
          <input className={inputCls} placeholder="Street address..." maxLength={200} required />
        </Field>
        <Row className="gap-4 flex-col sm:flex-row">
          <Field label="City">
            <input className={inputCls} placeholder="San Antonio" maxLength={80} required />
          </Field>
          <Field label="State / Region">
            <input className={inputCls} placeholder="Texas" maxLength={80} required />
          </Field>
          <Field label="ZIP / Postal Code">
            <input className={inputCls} placeholder="78201" maxLength={16} required />
          </Field>
        </Row>
      </View>

      <View className="gap-5">
        <Text as="h2" className="text-xl font-semibold tracking-tight">
          Product Selection
        </Text>
        <Field label="Select Product">
          <select
            className={inputCls}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} — ${p.price}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Quantity">
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className={inputCls}
            required
          />
        </Field>
        <Field label="Additional Notes (optional)">
          <textarea
            className={`${inputCls} min-h-[96px] resize-y`}
            placeholder="Any special requests or details..."
            maxLength={1000}
          />
        </Field>
      </View>

      <Row className="gap-3 flex-wrap justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          <CreditCard size={16} />
          Proceed to Payment
        </button>
      </Row>
    </form>
  );
}

function PaymentForm({
  total,
  onBack,
  onPaid,
}: {
  total: number;
  onBack: () => void;
  onPaid: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPaid();
      }}
      className="flex flex-col gap-6 rounded-xl border border-border bg-card p-7"
    >
      <Row className="items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary">
          <Lock size={18} />
        </div>
        <View>
          <Text as="h2" className="text-xl font-semibold tracking-tight">
            Secure Payment
          </Text>
          <Text className="text-xs text-muted-foreground">
            Your card details are encrypted in transit.
          </Text>
        </View>
      </Row>

      <Field label="Cardholder Name">
        <input className={inputCls} placeholder="John Smith" maxLength={120} required />
      </Field>
      <Field label="Card Number">
        <input
          className={inputCls}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          maxLength={19}
          required
        />
      </Field>
      <Row className="gap-4 flex-col sm:flex-row">
        <Field label="Expiry (MM/YY)">
          <input className={inputCls} placeholder="08/28" maxLength={5} required />
        </Field>
        <Field label="CVC">
          <input
            className={inputCls}
            placeholder="123"
            inputMode="numeric"
            maxLength={4}
            required
          />
        </Field>
        <Field label="ZIP / Postal Code">
          <input className={inputCls} placeholder="78201" maxLength={16} required />
        </Field>
      </Row>

      <Row className="items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2">
        <ShieldCheck size={16} className="text-[color:var(--success)]" />
        <Text className="text-xs text-muted-foreground">
          This is a demo checkout — no real charge will be made.
        </Text>
      </Row>

      <Row className="gap-3 flex-wrap justify-end pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          <Lock size={16} />
          Pay ${total.toFixed(2)}
        </button>
      </Row>
    </form>
  );
}

function Confirmation({
  product,
  quantity,
  total,
}: {
  product: string;
  quantity: number;
  total: number;
}) {
  return (
    <View className="rounded-xl border border-border bg-card p-7 gap-5">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
        <ShieldCheck size={22} />
      </div>
      <Text as="h2" className="text-2xl font-semibold tracking-tight">
        Thank you for your order!
      </Text>
      <Text className="text-muted-foreground leading-relaxed">
        We've received your payment of <span className="text-foreground font-medium">${total.toFixed(2)}</span> for{" "}
        <span className="text-foreground font-medium">
          {quantity} × {product}
        </span>
        . A receipt and shipping confirmation will arrive in your inbox shortly.
      </Text>
      <Row className="gap-3 flex-wrap pt-2">
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
  );
}

function OrderSummary({
  product,
  quantity,
  subtotal,
  tax,
  total,
}: {
  product: { label: string; price: number };
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <aside className="rounded-xl border border-border bg-card p-6 gap-4 flex flex-col h-fit lg:sticky lg:top-24">
      <Text as="h3" className="text-lg font-semibold tracking-tight">
        Order Summary
      </Text>
      <View className="gap-3 border-t border-border pt-4">
        <Row className="justify-between gap-3">
          <View>
            <Text className="text-sm text-foreground">{product.label}</Text>
            <Text className="text-xs text-muted-foreground">Qty {quantity}</Text>
          </View>
          <Text className="text-sm text-foreground">
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </Row>
      </View>
      <View className="gap-2 border-t border-border pt-4">
        <Row className="justify-between">
          <Text className="text-sm text-muted-foreground">Subtotal</Text>
          <Text className="text-sm text-foreground">${subtotal.toFixed(2)}</Text>
        </Row>
        <Row className="justify-between">
          <Text className="text-sm text-muted-foreground">Estimated tax</Text>
          <Text className="text-sm text-foreground">${tax.toFixed(2)}</Text>
        </Row>
        <Row className="justify-between">
          <Text className="text-sm text-muted-foreground">Shipping</Text>
          <Text className="text-sm text-[color:var(--success)]">Free</Text>
        </Row>
      </View>
      <Row className="justify-between border-t border-border pt-4">
        <Text className="font-semibold">Total</Text>
        <Text className="font-semibold">${total.toFixed(2)}</Text>
      </Row>
      <Row className="items-center gap-2 pt-2">
        <Lock size={14} className="text-muted-foreground" />
        <Text className="text-xs text-muted-foreground">Secure SSL checkout</Text>
      </Row>
    </aside>
  );
}
