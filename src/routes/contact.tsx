import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Mail, Phone, Building2, FileText } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — PenaltyPro" },
      {
        name: "description",
        content:
          "Get in touch with PenaltyPro. Questions about the product, orders, or partnerships? Our team will respond within one business day.",
      },
      { property: "og:title", content: "Contact PenaltyPro" },
      {
        property: "og:description",
        content:
          "Questions about the product, orders, or partnerships? Reach out and our team will respond within one business day.",
      },
    ],
  }),
  component: ContactPage,
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

function NavBar({ active }: { active: string }) {
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
                className={`text-sm transition-colors hover:text-foreground ${
                  l.label === active
                    ? "text-foreground border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
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
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-14 gap-10 md:flex-row md:justify-between">
        <View className="gap-4 max-w-sm">
          <Logo />
          <Text className="text-muted-foreground text-sm leading-relaxed">
            Real-time football foul reporting — hardware, AI, and cloud working together for every official.
          </Text>
        </View>
        <View className="gap-3">
          <Text className="text-primary text-xs font-semibold tracking-[0.18em]">QUICK LINKS</Text>
          {NAV.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </View>
        <View className="gap-3">
          <Text className="text-primary text-xs font-semibold tracking-[0.18em]">CONTACT INFO</Text>
          <a href="mailto:carlton@hive-id.com" className="text-sm text-muted-foreground hover:text-foreground">
            carlton@hive-id.com
          </a>
          <Text className="text-sm text-muted-foreground">(210) 542-7662</Text>
          <Text className="text-sm text-muted-foreground">HiveID LLC</Text>
        </View>
      </View>
      <View className="border-t border-border">
        <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-5">
          <Text className="text-xs text-muted-foreground">© 2026 HiveID LLC. All rights reserved.</Text>
        </View>
      </View>
    </footer>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-foreground/90">{label}</Text>
      {children}
      {hint && <Text className="text-xs text-muted-foreground">{hint}</Text>}
    </View>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-7"
    >
      <Text as="h2" className="text-xl font-semibold tracking-tight">
        Send Us a Message
      </Text>
      <Field label="Full Name">
        <input className={inputCls} placeholder="John Smith" maxLength={100} required />
      </Field>
      <Field label="Email Address">
        <input type="email" className={inputCls} placeholder="john@example.com" maxLength={255} required />
      </Field>
      <Field label="Phone Number (optional)">
        <input type="tel" className={inputCls} placeholder="(555) 000-0000" maxLength={32} />
      </Field>
      <Field label="Subject">
        <input className={inputCls} placeholder="Product enquiry / Order / Partnership" maxLength={200} required />
      </Field>
      <Field label="Message">
        <textarea
          className={`${inputCls} min-h-[120px] resize-y`}
          placeholder="Tell us how we can help..."
          maxLength={2000}
          required
        />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Send Message
      </button>
      {submitted && (
        <Text className="text-sm text-[color:var(--success)]">
          Thanks — your message was sent successfully.
        </Text>
      )}
    </form>
  );
}

function ContactInfo() {
  const items = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "carlton@hive-id.com",
      href: "mailto:carlton@hive-id.com",
    },
    {
      icon: Phone,
      label: "PHONE",
      value: "(210) 542-7662",
      href: "tel:2105427662",
    },
    {
      icon: Building2,
      label: "COMPANY",
      value: "HiveID LLC",
    },
    {
      icon: FileText,
      label: "DOCUMENT REFERENCE",
      value: "PP-PEN-CLOUD-REQ-001",
    },
  ];

  return (
    <View className="rounded-xl border border-border bg-card p-7 gap-6">
      <Text as="h2" className="text-xl font-semibold tracking-tight">
        Reach Us Directly
      </Text>
      <View className="gap-5">
        {items.map(({ icon: Icon, label, value, href }) => (
          <Row key={label} className="items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary shrink-0">
              <Icon size={18} />
            </div>
            <View className="gap-1">
              <Text className="text-xs font-semibold tracking-wider text-muted-foreground">{label}</Text>
              {href ? (
                <a href={href} className="text-sm text-primary hover:underline">
                  {value}
                </a>
              ) : (
                <Text className="text-sm text-foreground">{value}</Text>
              )}
            </View>
          </Row>
        ))}
      </View>
      <View className="border-t border-border pt-5 gap-2">
        <Row className="items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:var(--success)]" />
          <Text className="text-xs font-semibold tracking-wider text-[color:var(--success)]">
            AVAILABLE
          </Text>
        </Row>
        <Text className="text-sm text-muted-foreground">
          Mon–Fri, 9:00 AM – 6:00 PM CST
        </Text>
      </View>
    </View>
  );
}

function ContactPage() {
  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar active="Contact Us" />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
          <View className="mx-auto w-full max-w-7xl gap-6">
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              GET IN TOUCH
            </Text>
            <Text as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Contact PenaltyPro
            </Text>
            <Text className="text-muted-foreground max-w-2xl leading-relaxed">
              Questions about the product, orders, or partnerships? Reach out and our team will respond within one business day.
            </Text>
          </View>
        </section>
        <section className="px-5 sm:px-8 pb-20">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContactForm />
            <ContactInfo />
          </div>
        </section>
      </main>
      <Footer />
    </View>
  );
}
