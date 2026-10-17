import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard, Field, Notice } from "@/components/auth-card";
import { friendlyAuthError } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — MySerene" },
      { name: "description", content: "Create your free MySerene account to save favorites and history." },
      { property: "og:title", content: "Create account — MySerene" },
      { property: "og:description", content: "Create your free MySerene account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(80, "Name must be under 80 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  password: z.string().min(8, "Use at least 8 characters.").max(72, "Password is too long."),
});

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const r = schema.safeParse(form);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: r.data.email,
      password: r.data.password,
      options: { emailRedirectTo: `${window.location.origin}/account`, data: { display_name: r.data.name } },
    });
    setBusy(false);
    if (error) return setError(friendlyAuthError(error.message));
    setSentTo(r.data.email);
  }

  if (sentTo) {
    return (
      <AuthCard title="Check your inbox">
        <div className="mt-6 text-center space-y-4">
          <MailCheck className="h-10 w-10 mx-auto text-ink" />
          <p className="text-sm text-ink/85">We sent a confirmation link to <strong>{sentTo}</strong>. Open it to activate your free account, then sign in.</p>
          <Link to="/login" search={{ redirect: undefined }} className="inline-block btn-primary px-5 py-3 rounded-full text-sm font-semibold">Go to sign in</Link>
        </div>
      </AuthCard>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  return (
    <AuthCard title="Start your calm" subtitle="Create your free account.">
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        {error && <Notice kind="error">{error}</Notice>}
        <Field label="Name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
        <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <Field label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} error={errors.password} placeholder="At least 8 characters" />
        <button type="submit" disabled={busy} className="w-full btn-primary px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-ink-soft">
        Already have an account? <Link to="/login" search={{ redirect: undefined }} className="text-ink font-semibold hover:underline">Sign in</Link>
      </p>
    </AuthCard>
  );
}
