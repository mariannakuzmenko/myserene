import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard, Field, Notice } from "@/components/auth-card";
import { friendlyAuthError, safeRedirect, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: typeof s.redirect === "string" ? s.redirect : undefined }),
  head: () => ({
    meta: [
      { title: "Sign in — MySerene" },
      { name: "description", content: "Sign in to your MySerene account." },
      { property: "og:title", content: "Sign in — MySerene" },
      { property: "og:description", content: "Sign in to your MySerene account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  password: z.string().min(1, "Please enter your password."),
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: safeRedirect(redirect), replace: true });
  }, [authLoading, user, redirect, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const r = schema.safeParse({ email, password });
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(r.data);
    setBusy(false);
    if (error) setError(friendlyAuthError(error.message));
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your calm.">
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        {error && <Notice kind="error">{error}</Notice>}
        <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Field label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-ink hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={busy} className="w-full btn-primary px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-ink-soft">
        New here? <Link to="/register" className="text-ink font-semibold hover:underline">Create an account</Link>
      </p>
    </AuthCard>
  );
}
