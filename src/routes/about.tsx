import { createFileRoute, Link } from "@tanstack/react-router";
import { isAuthed, getUser } from "@/lib/auth";
import Logo from "@/components/logo";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, Cloud, FileText, Users, Download, Settings, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PenaltyPro" },
      {
        name: "description",
        content:
          "HiveID LLC is building the next generation of tools for football officials — combining hardware, AI, and cloud technology to make foul reporting accurate, fast, and built for every level of the game.",
      },
      { property: "og:title", content: "About PenaltyPro" },
      {
        property: "og:description",
        content:
          "Modernising football officiating with AI-powered foul reporting tools.",
      },
    ],
  }),
  component: AboutPage,
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

const services = [
  {
    icon: Cloud,
    title: "Cloud AI Transcription Engine",
    description:
      "AI-powered audio transcription with a Word Error Rate under 10%, converting raw voice notes captured on the PenaltyPro Pen into clean, readable text — automatically, post-game.",
  },
  {
    icon: FileText,
    title: "Foul Report NLP Extraction",
    description:
      "Natural language processing identifies and extracts structured foul fields from transcribed text — including foul name, offending player, down, distance, and field position — with over 90% extraction accuracy.",
  },
  {
    icon: Users,
    title: "Human-in-the-Loop Review",
    description:
      "Officials access extracted reports through the companion app to review, correct, and validate AI-generated fields before exporting. Full control stays with the official.",
  },
  {
    icon: Download,
    title: "CSV / PDF / JSON Export",
    description:
      "Generate export-ready foul reports in multiple formats, including CSV files compatible with foulreports.com conference submission standards.",
  },
  {
    icon: Settings,
    title: "Device Management & Firmware Updates",
    description:
      "Secure device registration, authentication, firmware update orchestration, and real-time sync between the PenaltyPro Pen and the cloud backend.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Officials track personal performance over time using all captured foul report categories — trends, accuracy, play types, and conference-level reporting where enabled.",
  },
];

function ServicesGrid() {
  return (
    <section className="px-5 sm:px-8 py-20 sm:py-28">
      <View className="mx-auto w-full max-w-7xl">
        <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
          WHAT WE OFFER
        </Text>
        <Text as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
          Our Services
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map(({ icon: Icon, title, description }) => (
            <View
              key={title}
              className="rounded-xl border border-border bg-card p-7 gap-4"
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/15 text-primary">
                <Icon size={18} />
              </div>
              <Text className="font-semibold mt-1">{title}</Text>
              <Text className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </Text>
            </View>
          ))}
        </div>
      </View>
    </section>
  );
}

function BuiltForGame() {
  return (
    <section className="px-5 sm:px-8 py-20 sm:py-28 border-t border-border">
      <View className="mx-auto w-full max-w-7xl gap-6">
        <Text as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight">
          Built for the Game
        </Text>
        <Text className="text-muted-foreground max-w-3xl leading-relaxed">
          The PenaltyPro ecosystem was designed from the ground up for working football officials. We understand that officiating happens in the field, under pressure, and at game speed. Our device captures what matters. Our AI does the heavy lifting. And our platform puts structured, accurate reports in your hands before you leave the parking lot.
        </Text>
      </View>
    </section>
  );
}

function AboutPage() {
  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar active="About Us" />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
          <View className="mx-auto w-full max-w-7xl gap-6">
            <Text className="text-primary text-xs font-semibold tracking-[0.18em]">
              WHO WE ARE
            </Text>
            <View className="border-l-4 border-primary pl-6">
              <Text as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Modernising Football Officiating
              </Text>
            </View>
            <Text className="text-muted-foreground max-w-2xl leading-relaxed">
              HiveID LLC is building the next generation of tools for football officials — combining hardware, AI, and cloud technology to make foul reporting accurate, fast, and built for every level of the game.
            </Text>
          </View>
        </section>
        <ServicesGrid />
        <BuiltForGame />
      </main>
      <Footer />
    </View>
  );
}
