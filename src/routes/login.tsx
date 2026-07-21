import { createFileRoute, Link } from "@tanstack/react-router";
import { Waves } from "lucide-react";
import { AuroraBg } from "@/components/site-chrome";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Serene" },
      { name: "description", content: "Sign back into your Serene account." },
      { property: "og:title", content: "Sign in — Serene" },
      { property: "og:url", content: "/login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative min-h-screen grid place-items-center px-4">
      <AuroraBg />
      <div className="w-full max-w-md glass-card rounded-[32px] p-8 sm:p-10 animate-rise">
        <Link to="/" className="flex items-center gap-2 justify-center">
          <span className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-brand-soft to-brand">
            <Waves className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-semibold text-lg">Serene</span>
        </Link>
        <h1 className="mt-8 text-3xl font-semibold text-center">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-soft text-center">Sign in to your calm.</p>
        <form className="mt-8 space-y-4">
          <input type="email" placeholder="Email" className="w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/60" />
          <input type="password" placeholder="Password" className="w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/60" />
          <button type="button" className="w-full btn-primary px-5 py-3 rounded-full text-sm font-semibold">Sign in</button>
        </form>
        <p className="mt-6 text-sm text-center text-ink-soft">
          New here?{" "}
          <Link to="/register" className="text-ink font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}