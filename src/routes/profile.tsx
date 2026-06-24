import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { isAuthed, getUser, getProfile, getOrders, Order, signOut } from "@/lib/auth";
import { Menu, User, Package, Truck, CheckCircle2 } from "lucide-react";
import Logo from "@/components/logo";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Profile — PenaltyPro" }],
  }),
  component: ProfilePage,
});

const View = ({ className = "", children }: any) => (
  <div className={`flex flex-col ${className}`}>{children}</div>
);
const Row = ({ className = "", children }: any) => <div className={`flex flex-row ${className}`}>{children}</div>;
const Text = ({ className = "", children, as: As = "span" }: any) => {
  const C = As as any;
  return <C className={className}>{children}</C>;
};

function NavBar() {
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
            <button aria-label="Open menu" onClick={() => setOpen((s) => !s)} className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground">
              <Menu size={18} />
            </button>
          </Row>
        </Row>
        {open && (
          <View className="md:hidden border-t border-border px-5 py-3 gap-3">
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
      <View className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-10">
        <Text className="text-xs text-muted-foreground">© 2026 HiveID LLC. All rights reserved.</Text>
      </View>
    </footer>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [user, setUserState] = useState<string | null>(null);
  const [profile, setProfileState] = useState<any>(null);
  const [orders, setOrdersState] = useState<Order[]>([]);

  useEffect(() => {
    const a = isAuthed();
    setAuthed(a);
    if (a) {
      setUserState(getUser());
      setProfileState(getProfile());
      setOrdersState(getOrders());
    }
  }, []);

  if (authed === null) return null;
  if (!authed) {
    return (
      <View className="min-h-screen flex items-center justify-center">
        <Text>
          Please sign in to view your profile. <Link to="/login" className="text-primary">Sign in</Link>
        </Text>
      </View>
    );
  }

  return (
    <View className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <section className="px-5 sm:px-8 pt-16 sm:pt-24 pb-8">
          <View className="mx-auto w-full max-w-5xl gap-6">
            <Text as="h1" className="text-3xl font-bold">Your Profile</Text>
            <View className="rounded-xl border border-border bg-card p-6">
              <Row className="items-center gap-4 justify-between">
                <Row className="items-center gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                    <User size={18} />
                  </div>
                  <View>
                    <Text className="font-semibold">{profile?.name ?? user}</Text>
                    <Text className="text-sm text-muted-foreground">{profile?.email ?? user}</Text>
                  </View>
                </Row>
                <div>
                  <button
                    onClick={() => {
                      try {
                        signOut();
                      } catch (e) {
                        // ignore
                      }
                      navigate({ to: "/" });
                    }}
                    className="inline-flex items-center rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/50"
                  >
                    Sign out
                  </button>
                </div>
              </Row>
            </View>
          </View>
        </section>

        <section className="px-5 sm:px-8 pb-20">
          <View className="mx-auto w-full max-w-5xl gap-6">
            <Text as="h2" className="text-xl font-semibold">Orders</Text>
            {orders.length === 0 ? (
              <View className="rounded-xl border border-border bg-card p-7">
                <Text className="text-sm text-muted-foreground">You have no orders yet.</Text>
                <Link to="/" className="mt-3 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Shop Now</Link>
              </View>
            ) : (
              <div className="grid gap-4">
                {orders.map((o: Order) => (
                  <View key={o.id} className="rounded-xl border border-border bg-card p-5">
                    <Row className="justify-between items-start">
                      <View>
                        <Text className="font-semibold">{o.productLabel}</Text>
                        <Text className="text-xs text-muted-foreground">Order {o.id} • {new Date(o.createdAt).toLocaleString()}</Text>
                      </View>
                      <View className="text-right">
                        <Text className="font-semibold">${o.total.toFixed(2)}</Text>
                        <Text className="text-xs text-muted-foreground">{o.status}</Text>
                      </View>
                    </Row>
                    <Row className="gap-2 mt-3">
                      <Link to={`/confirmation?order=${o.id}&product=${o.productId}&qty=${o.quantity}`} className="text-sm text-primary hover:underline">View receipt</Link>
                    </Row>
                  </View>
                ))}
              </div>
            )}
          </View>
        </section>
      </main>
      <Footer />
    </View>
  );
}
