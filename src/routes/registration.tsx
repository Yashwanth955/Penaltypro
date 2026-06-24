import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { isAuthed, getUser } from "@/lib/auth";
import Logo from "@/components/logo";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: "Registration — PenaltyPro" },
      {
        name: "description",
        content:
          "Register your PenaltyPro Pen or activate your software subscription. Link your device to enable cloud sync, firmware updates, and support.",
      },
      { property: "og:title", content: "Register Your PenaltyPro Product" },
      {
        property: "og:description",
        content:
          "Register hardware or activate your software subscription for PenaltyPro.",
      },
    ],
  }),
  component: RegistrationPage,
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



const NAV: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Registration", to: "/registration" },
  { label: "Contact Us", to: "/contact" },
];

function NavBar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    setAuthed(isAuthed());
    setUsername(getUser());
  }, []);
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
            {authed ? (
              <Link
                to="/profile"
                className="hidden md:inline-flex items-center rounded-md border border-primary px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold mr-2">
                  {username ? username.split("@")[0].slice(0, 2).toUpperCase() : "U"}
                </span>
                <span className="hidden lg:inline-block">{username ?? "Profile"}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Login / Sign In
              </Link>
            )}
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
            {authed ? (
              <Link to="/profile" className="mt-2 inline-flex w-fit items-center rounded-md border border-primary px-4 py-2 text-sm text-primary">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-semibold mr-2">
                  {username ? username.split("@")[0].slice(0, 2).toUpperCase() : "U"}
                </span>
                <span>{username ?? "Profile"}</span>
              </Link>
            ) : (
              <Link to="/login" className="mt-2 inline-flex w-fit rounded-md border border-primary px-4 py-2 text-sm text-primary">
                Login / Sign In
              </Link>
            )}
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

const inputCls =
  "w-full rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function HardwareForm() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isAuthed()) {
          navigate({ to: "/login", search: { redirect: "/registration" } });
          return;
        }
        setSubmitted(true);
      }}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-7"
    >
      <View className="gap-2">
        <Text as="h2" className="text-2xl font-semibold tracking-tight">
          Register PenaltyPro Pen
        </Text>
        <Text className="text-muted-foreground text-sm leading-relaxed">
          Link your physical device to your account to enable cloud sync, firmware updates, and warranty coverage.
        </Text>
      </View>
      <Field label="Full Name">
        <input className={inputCls} placeholder="John Smith" maxLength={100} required />
      </Field>
      <Field label="Email Address">
        <input type="email" className={inputCls} placeholder="john@example.com" maxLength={255} required />
      </Field>
      <Field label="Phone Number">
        <input type="tel" className={inputCls} placeholder="(555) 000-0000" maxLength={32} />
      </Field>
      <Field label="Device Serial Number" hint="Found on the underside of your pen device">
        <input className={inputCls} placeholder="PP-XXXX-XXXX" maxLength={32} required />
      </Field>
      <Row className="gap-4">
        <Field label="Purchase Date">
          <input type="date" className={inputCls} />
        </Field>
        <Field label="Purchased From">
          <input className={inputCls} placeholder="Retailer or website" maxLength={120} />
        </Field>
      </Row>
      <Field label="Conference / Organisation Name (optional)">
        <input className={inputCls} placeholder="e.g. State Football Officials Assoc." maxLength={160} />
      </Field>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Register Device
      </button>
      {submitted && (
        <Text className="text-sm text-[color:var(--success)]">
          Thanks — we received your registration.
        </Text>
      )}
    </form>
  );
}

function SoftwareForm() {
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState<"software" | "bundle">("software");
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isAuthed()) {
          navigate({ to: "/login", search: { redirect: "/registration" } });
          return;
        }
        setSubmitted(true);
      }}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-7"
    >
      <View className="gap-2">
        <Text as="h2" className="text-2xl font-semibold tracking-tight">
          Activate Software Subscription
        </Text>
        <Text className="text-muted-foreground text-sm leading-relaxed">
          Enter your subscription key to activate the PenaltyPro platform and companion app access for your account.
        </Text>
      </View>
      <Field label="Full Name">
        <input className={inputCls} placeholder="John Smith" maxLength={100} required />
      </Field>
      <Field label="Email Address">
        <input type="email" className={inputCls} placeholder="john@example.com" maxLength={255} required />
      </Field>
      <Field label="Phone Number">
        <input type="tel" className={inputCls} placeholder="(555) 000-0000" maxLength={32} />
      </Field>
      <Field label="Subscription / Licence Key">
        <input className={inputCls} placeholder="PPRO-XXXX-XXXX-XXXX" maxLength={64} required />
      </Field>
      <Field label="Conference / Organisation Name (optional)">
        <input className={inputCls} placeholder="e.g. State Football Officials Assoc." maxLength={160} />
      </Field>
      <View className="gap-2">
        <Text className="text-sm text-foreground/90">Select Plan</Text>
        <Row className="gap-3">
          {(["software", "bundle"] as const).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPlan(p)}
              className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-medium transition ${
                plan === p
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "software" ? "Software Only" : "Bundle"}
            </button>
          ))}
        </Row>
      </View>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Activate Subscription
      </button>
      {submitted && (
        <Text className="text-sm text-[color:var(--success)]">
          Thanks — your subscription request was received.
        </Text>
      )}
    </form>
  );
}

function RegistrationForm() {
  const [type, setType] = useState<"hardware" | "software" | "both">("hardware");
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState<"software" | "bundle">("software");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serial, setSerial] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [org, setOrg] = useState("");
  const [subscriptionKey, setSubscriptionKey] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthed()) {
      navigate({ to: "/login", search: { redirect: "/registration" } });
      return;
    }
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-xl border border-border bg-card p-7">
      <View className="gap-2">
        <Text as="h2" className="text-2xl font-semibold tracking-tight">Register PenaltyPro Pen / Activate Subscription</Text>
        <Text className="text-muted-foreground text-sm leading-relaxed">Choose an option and complete the fields below.</Text>
      </View>

      <View className="gap-2">
        <Row className="gap-3">
          {(["hardware", "software", "both"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-md border px-4 py-2 text-sm ${type === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              {t === "hardware" ? "Register Pen" : t === "software" ? "Activate Subscription" : "Both"}
            </button>
          ))}
        </Row>
      </View>

      <Field label="Full Name">
        <input className={inputCls} placeholder="John Smith" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </Field>
      <Field label="Email Address">
        <input type="email" className={inputCls} placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Field>
      <Field label="Phone Number (optional)">
        <input type="tel" className={inputCls} placeholder="(555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Field>

      {(type === "hardware" || type === "both") && (
        <>
          <Field label="Device Serial Number" hint="Found on the underside of your pen device">
            <input className={inputCls} placeholder="PP-XXXX-XXXX" value={serial} onChange={(e) => setSerial(e.target.value)} required={type === "hardware"} />
          </Field>
          <Row className="gap-4">
            <Field label="Purchase Date">
              <input type="date" className={inputCls} value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </Field>
            <Field label="Purchased From">
              <input className={inputCls} placeholder="Retailer or website" value={purchasedFrom} onChange={(e) => setPurchasedFrom(e.target.value)} />
            </Field>
          </Row>
        </>
      )}

      {(type === "software" || type === "both") && (
        <>
          <Field label="Subscription / Licence Key">
            <input className={inputCls} placeholder="PPRO-XXXX-XXXX-XXXX" value={subscriptionKey} onChange={(e) => setSubscriptionKey(e.target.value)} required={type === "software"} />
          </Field>
          <Field label="Conference / Organisation Name (optional)">
            <input className={inputCls} placeholder="e.g. State Football Officials Assoc." value={org} onChange={(e) => setOrg(e.target.value)} />
          </Field>
          <View className="gap-2">
            <Text className="text-sm text-foreground/90">Select Plan</Text>
            <Row className="gap-3">
              {(["software", "bundle"] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPlan(p)}
                  className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-medium transition ${plan === p ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {p === "software" ? "Software Only" : "Bundle"}
                </button>
              ))}
            </Row>
          </View>
        </>
      )}

      <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
        {submitted ? "Submitted" : "Submit Registration"}
      </button>
      {submitted && (
        <Text className="text-sm text-[color:var(--success)]">
          Thanks — we received your request.
        </Text>
      )}
    </form>
  );
}

function RegistrationPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isAuthed()) {
      navigate({ to: "/login", search: { redirect: "/registration" } });
    } else {
      setReady(true);
    }
  }, [navigate]);
  if (!ready) return null;
  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar active="Registration" />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
          <View className="mx-auto w-full max-w-7xl gap-6">
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              PRODUCT REGISTRATION
            </Text>
            <Text as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Register Your PenaltyPro Product
            </Text>
            <Text className="text-muted-foreground max-w-2xl leading-relaxed">
              Already purchased? Register your hardware or activate your software subscription below. Registration links your device to your PenaltyPro account and enables cloud sync, firmware updates, and support.
            </Text>
          </View>
        </section>
        <section className="px-5 sm:px-8 pb-20">
          <div className="mx-auto w-full max-w-7xl">
            <RegistrationForm />
          </div>
          <View className="mx-auto w-full max-w-7xl pt-10">
            <Text className="text-sm text-muted-foreground text-center">
              Having trouble registering? Contact us at{" "}
              <a href="mailto:carlton@hive-id.com" className="text-primary hover:underline">
                carlton@hive-id.com
              </a>{" "}
              or call (210) 542-7662
            </Text>
          </View>
        </section>
      </main>
      <Footer />
    </View>
  );
}
