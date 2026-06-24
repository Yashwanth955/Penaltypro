import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { isAuthed, getUser } from "@/lib/auth";
import Logo from "@/components/logo";
import {
  Mic,
  PencilLine,
  Cloud,
  BarChart3,
  Check,
  Menu,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PenaltyPro — Near Real Time Officiating" },
      {
        name: "description",
        content:
          "PenaltyPro Pen: handheld device for sports officials. Capture voice notes and penalty metadata in real time — AI-powered foul reports.",
      },
      { property: "og:title", content: "PenaltyPro — Near Real Time Officiating" },
      {
        property: "og:description",
        content: "Capture fouls accurately. Every play. Every game.",
      },
    ],
  }),
  component: Index,
});

// View/Text-like primitives mirroring React Native composition
const View = ({
  className = "",
  children,
  ...rest
}: { className?: string; children?: ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col ${className}`} {...rest}>
    {children}
  </div>
);
const Row = ({ className = "", children }: { className?: string; children?: ReactNode }) => (
  <div className={`flex flex-row ${className}`}>{children}</div>
);
const Text = ({
  className = "",
  children,
  as: As = "span",
}: {
  className?: string;
  children?: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) => {
  const Component = As as React.ElementType;
  return <Component className={className}>{children}</Component>;
};



function NavBar() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    setAuthed(isAuthed());
    setUsername(getUser());
  }, []);
  const links: { label: string; to: string }[] = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Registration", to: "/registration" },
    { label: "Contact Us", to: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <View className="mx-auto w-full max-w-7xl">
        <Row className="h-16 items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden md:flex flex-row items-center gap-8">
            {links.map((l, i) => (
              <Link
                key={l.label}
                to={l.to}
                className={`text-sm transition-colors hover:text-foreground ${
                  i === 0
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
                  {username
                    ? username.split("@")[0].slice(0, 2).toUpperCase()
                    : "U"}
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
            {links.map((l) => (
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
              <Link
                to="/login"
                className="mt-2 inline-flex w-fit rounded-md border border-primary px-4 py-2 text-sm text-primary"
              >
                Login / Sign In
              </Link>
            )}
          </View>
        )}
      </View>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
      <View className="mx-auto w-full max-w-7xl gap-12 lg:flex-row lg:items-center lg:gap-16">
        <View className="flex-1 gap-6">
          <Text className="text-primary text-xs sm:text-sm font-semibold tracking-[0.18em]">
            NEAR REAL TIME OFFICIATING
          </Text>
          <Text
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Capture Fouls Accurately.
            <br />
            Every Play. Every Game.
          </Text>
          <Text className="text-muted-foreground text-base sm:text-lg max-w-xl">
            The PenaltyPro Pen is a handheld device built for sports officials to capture penalty
            information in real time. Record voice notes, timestamps, game details, and penalty
            metadata during the action, then let AI convert it into structured, export-ready reports.
          </Text>
          <Row className="flex-wrap gap-3 pt-2">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              Shop Now
            </a>
            <a
              href="#device"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Learn More
            </a>
          </Row>
        </View>
        <View className="flex-1 w-full">
          <View className="aspect-square w-full max-w-[520px] self-end rounded-2xl border border-border bg-card p-8 items-center justify-center">
            <View className="flex-1 w-full rounded-xl border border-dashed border-border bg-background/60 items-center justify-center">
              <Text className="text-muted-foreground text-sm text-center px-6">
                [Product 3D / 360° View — Image Placeholder]
              </Text>
            </View>
            <Text className="text-primary text-xs mt-4 tracking-wider">
              360° View Coming Soon
            </Text>
          </View>
        </View>
      </View>
    </section>
  );
}

const stats = [
  { v: "< 10%", l: "Transcription Error Rate" },
  { v: "> 90%", l: "Foul Name Extraction Accuracy" },
  { v: "99.9%", l: "System Uptime" },
  { v: "CSV / PDF / JSON", l: "Export Formats" },
];

function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <View
              key={s.l}
              className={`items-center text-center px-4 ${
                i !== 0 ? "md:border-l md:border-border" : ""
              }`}
            >
              <Text className="text-2xl sm:text-3xl font-bold text-foreground">{s.v}</Text>
              <Text className="text-muted-foreground text-sm mt-2">{s.l}</Text>
            </View>
          ))}
        </div>
      </View>
    </section>
  );
}

const features = [
  {
    icon: Mic,
    t: "Voice Capture",
    d: "AI-powered audio transcription converts raw voice notes captured on the PenaltyPro Pen into clean, readable text after the game, with a target Word Error Rate under 10%.",
  },
  {
    icon: PencilLine,
    t: "Auto Metadata",
    d: "PenaltyPro uses natural language processing to pull key foul details from transcribed notes, including the foul, player, down, distance, and field position, then organizes them into structured report fields.",
  },
  {
    icon: Cloud,
    t: "Cloud AI Engine",
    d: "PenaltyPro creates export-ready foul reports that can be downloaded in multiple formats, including CSV files for conference submissions. API support also allows integration with other foul reporting platforms and reporting workflow.",
  },
  {
    icon: BarChart3,
    t: "Analytics Dashboard",
    d: "Officials can track personal performance over time using captured foul report data, including trends, accuracy, play types, foul categories, and conference-level reporting where enabled.",
  },
];

function Device() {
  return (
    <section id="device" className="px-5 sm:px-8 py-20 sm:py-28">
      <View className="mx-auto w-full max-w-7xl gap-12 lg:flex-row lg:items-start lg:gap-16">
        <View className="flex-1 gap-6 max-w-xl">
          <Text className="text-primary text-xs font-semibold tracking-[0.18em]">THE DEVICE</Text>
          <Text as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight">
            About the PenaltyPro Pen
          </Text>
          <Text className="text-muted-foreground leading-relaxed">
            The PenaltyPro Pen is a handheld device built for sports officials to capture penalty
            information in real time. Record voice notes, timestamps, game details, and penalty
            metadata during the action, then let AI convert it into structured, export-ready reports.
          </Text>
          <View className="gap-3 pt-2">
            {[
              "Real-time voice capture with built-in high-quality microphone",
              "Records play sequence and game data automatically",
              "Uploads to cloud via USB-C post-game",
              "AI/NLP transcription with structured field extraction",
              "Export-ready foul reports compatible with foulreports.com",
            ].map((t) => (
              <Row key={t} className="gap-3 items-start">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <Text className="text-muted-foreground">{t}</Text>
              </Row>
            ))}
          </View>
        </View>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, t, d }) => (
            <View key={t} className="rounded-xl border border-border bg-card p-6 gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary">
                <Icon size={18} />
              </div>
              <Text className="font-semibold mt-2">{t}</Text>
              <Text className="text-muted-foreground text-sm leading-relaxed">{d}</Text>
            </View>
          ))}
        </div>
      </View>
    </section>
  );
}

type Plan = {
  badge: string;
  badgeVariant?: "filled" | "outline";
  ribbon?: string;
  title: string;
  price: ReactNode;
  features: string[];
  highlighted?: boolean;
  showImage?: boolean;
  productId: "hardware" | "software" | "bundle";
};

const plans: Plan[] = [
  {
    productId: "hardware",
    badge: "HARDWARE",
    title: "PenaltyPro Pen",
    showImage: true,
    price: (
      <Row className="items-baseline gap-1">
        <Text className="text-4xl font-bold">$—</Text>
        <Text className="text-muted-foreground">/device</Text>
      </Row>
    ),
    features: [
      "Handheld pen-sized recording device",
      "Built-in high-quality microphone",
      "Power On/Off + Record/Stop/Play Increment buttons",
      "Status/Battery LED indicator",
      "USB-C port for charging and data transfer",
    ],
  },
  {
    productId: "software",
    badge: "SOFTWARE",
    badgeVariant: "outline",
    title: "PenaltyPro Platform",
    price: (
      <Row className="items-baseline gap-1">
        <Text className="text-4xl font-bold">$—</Text>
        <Text className="text-muted-foreground">/yr</Text>
      </Row>
    ),
    features: [
      "Cloud AI transcription engine",
      "Foul report NLP extraction",
      "Human-in-the-loop review and correction",
      "CSV / PDF / JSON export",
      "Analytics dashboard for official performance tracking",
      "Compatible with foulreports.com",
    ],
  },
  {
    productId: "bundle",
    badge: "BEST VALUE",
    ribbon: "Most Popular",
    title: "PenaltyPro Complete Bundle",
    showImage: true,
    price: (
      <Row className="items-baseline gap-3">
        <Text className="text-2xl text-muted-foreground line-through">$—</Text>
        <Text className="text-4xl font-bold">$—</Text>
      </Row>
    ),
    features: [
      "Handheld pen-sized recording device",
      "Built-in high-quality microphone",
      "USB-C port for charging and data transfer",
      "Cloud AI transcription engine",
      "Foul report NLP extraction",
      "Human-in-the-loop review and correction",
      "CSV / PDF / JSON export",
      "Analytics dashboard",
    ],
    highlighted: true,
  },
];

function Pricing() {
  const navigate = useNavigate();
  const goBuy = (productId: string) => {
    if (isAuthed()) navigate({ to: "/order", search: { product: productId } });
    else navigate({ to: "/login", search: { redirect: `/order?product=${productId}` } });
  };
  return (
    <section id="pricing" className="px-5 sm:px-8 py-20 sm:py-28">
      <View className="mx-auto w-full max-w-7xl">
        <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
          CHOOSE YOUR PLAN
        </Text>
        <Text as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
          Hardware, Software, or Both
        </Text>
        <Text className="text-muted-foreground mt-4 max-w-2xl">
          Buy the pen, the software subscription, or the complete bundle — tailored for individual
          officials and conference teams.
        </Text>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {plans.map((p) => (
            <View
              key={p.title}
              className={`relative rounded-xl bg-card p-7 gap-5 h-full ${
                p.highlighted ? "border-2 border-primary" : "border border-border"
              }`}
            >
              {p.ribbon && (
                <Text className="absolute top-0 left-0 right-0 text-center text-xs font-semibold text-primary py-2 border-b border-primary/40 rounded-t-xl bg-primary/5">
                  {p.ribbon}
                </Text>
              )}
              <View className={`${p.ribbon ? "pt-8" : ""} gap-5 h-full`}>
                <Text
                  className={`self-start inline-block text-xs font-semibold tracking-wider rounded-md px-3 py-1 ${
                    p.badgeVariant === "outline"
                      ? "border border-primary text-primary"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {p.badge}
                </Text>
                {p.showImage ? (
                  <View className="aspect-[5/3] rounded-lg border border-dashed border-border bg-background/60 items-center justify-center">
                    <Text className="text-muted-foreground text-sm">[Pen Device Image]</Text>
                  </View>
                ) : (
                  <View className="aspect-[5/3] rounded-lg border border-dashed border-border bg-background/60 items-center justify-center">
                    <Cloud size={36} className="text-primary" />
                  </View>
                )}
                <Text as="h3" className="text-xl font-semibold">
                  {p.title}
                </Text>
                <div>{p.price}</div>
                <View className="gap-3 pt-2 flex-1">
                  {p.features.map((f) => (
                    <Row key={f} className="gap-3 items-start">
                      <Check size={16} className="text-[color:var(--success)] mt-1 shrink-0" />
                      <Text className="text-sm text-muted-foreground">{f}</Text>
                    </Row>
                  ))}
                </View>
                <button
                  type="button"
                  onClick={() => goBuy(p.productId)}
                  className="mt-auto inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  Purchase
                </button>
              </View>
            </View>
          ))}
        </div>
      </View>
    </section>
  );
}

const steps = [
  {
    n: "01",
    t: "Capture",
    d: "Use the PenaltyPro Pen to record voice notes and metadata during live play.",
  },
  {
    n: "02",
    t: "Upload",
    d: "After the game, connect via USB-C. Recordings sync to the PenaltyPro cloud.",
  },
  {
    n: "03",
    t: "AI Processing",
    d: "Cloud AI transcribes audio and extracts structured foul report fields with > 90% accuracy.",
  },
  {
    n: "04",
    t: "Review & Export",
    d: "Review, correct, and export structured reports as CSV, PDF, or JSON via the companion app.",
  },
];

function Workflow() {
  return (
    <section className="px-5 sm:px-8 py-20 sm:py-28">
      <View className="mx-auto w-full max-w-7xl">
        <Text className="text-primary text-xs font-semibold tracking-[0.18em]">WORKFLOW</Text>
        <Text as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
          From Field to Report in Four Steps
        </Text>
        <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-border" />
          {steps.map((s) => (
            <View key={s.n} className="items-center text-center gap-4 relative">
              <View className="grid h-14 w-14 place-items-center rounded-full border-2 border-primary bg-background text-primary font-semibold">
                {s.n}
              </View>
              <Text className="font-semibold">{s.t}</Text>
              <Text className="text-sm text-muted-foreground max-w-[220px]">{s.d}</Text>
            </View>
          ))}
        </div>
      </View>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-14 gap-10 md:flex-row md:justify-between">
        <View className="gap-4 max-w-sm">
          <Logo />
          <Text className="text-muted-foreground text-sm leading-relaxed">
            Real-time foul reporting — hardware, AI, and cloud working together for every
            official.
          </Text>
        </View>
        <View className="gap-3">
          <Text className="text-primary text-xs font-semibold tracking-[0.18em]">QUICK LINKS</Text>
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Registration", to: "/registration" },
            { label: "Contact Us", to: "/contact" },
          ].map((l) => (
            <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </View>
        <View className="gap-3">
          <Text className="text-primary text-xs font-semibold tracking-[0.18em]">CONTACT INFO</Text>
          <a
            href="mailto:carlton@hive-id.com"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            carlton@hive-id.com
          </a>
          <Text className="text-sm text-muted-foreground">(210) 542-7662</Text>
          <Text className="text-sm text-muted-foreground">HiveID LLC</Text>
        </View>
      </View>
      <View className="border-t border-border">
        <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-5">
          <Text className="text-xs text-muted-foreground">
            © 2026 HiveID LLC. All rights reserved.
          </Text>
        </View>
      </View>
    </footer>
  );
}

function Index() {
  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <Hero />
        <Stats />
        <Device />
        <Pricing />
        <Workflow />
      </main>
      <Footer />
    </View>
  );
}
