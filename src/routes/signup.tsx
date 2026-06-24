import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — PenaltyPro" },
      { name: "description", content: "Create your PenaltyPro account." },
    ],
  }),
  component: SignupPage,
});

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.2C41.1 36 44 30.5 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.46 2.23-1.21 3.03-.81.85-2.13 1.51-3.21 1.42-.13-1.11.44-2.27 1.18-3.04.83-.86 2.24-1.5 3.24-1.41zM20.5 17.27c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.52-1.54.02-1.93-1-4.02-.99-2.09.01-2.52 1.01-4.06.99-1.73-.02-3.06-1.77-4.05-3.33C.4 16.79-.18 11.6 2.39 8.83c1.21-1.32 3.12-2.15 4.92-2.15 1.84 0 3 .99 4.51.99 1.46 0 2.36-.99 4.49-.99 1.6 0 3.3.87 4.51 2.38-3.97 2.17-3.32 7.84-.32 8.21z"/>
    </svg>
  );
}

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/signup" });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email || "user@penaltypro", { name: name || undefined, email: email || undefined, phone: phone || undefined, organization: organization || undefined });
    navigate({ to: redirect || "/profile" });
  };

  const handleSocial = () => {
    signIn("social@penaltypro", { name: "Social User" });
    navigate({ to: redirect || "/profile" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Join PenaltyPro!</h1>

        <button onClick={handleSocial} className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 text-sm font-medium hover:bg-muted transition mb-3">
          <GoogleIcon /> Sign up with Google
        </button>
        <button onClick={handleSocial} className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 text-sm font-medium hover:bg-muted transition">
          <AppleIcon /> Sign up with Apple
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium mb-1.5">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Name@example.com"
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Organization (optional)</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. State Football Officials Assoc."
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 hover:opacity-90 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">Login</Link>
        </p>
      </div>
    </main>
  );
}
