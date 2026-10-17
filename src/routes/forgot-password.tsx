import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard, Field, Notice } from "@/components/auth-card";
import { friendlyAuthError } from "@/lib/auth";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — MySerene" },
      { name: "description", content: "Request a password reset link for your MySerene account." },
      { property: "og:title", content: "Reset password — MySerene" },
      { property: "og:description", content: "Request a password reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [fieldErr, setFieldErr] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const r = z.string().trim().email().max(255).safeParse(email);
    if (!r.success) return setFieldErr("Please enter a valid email address.");
    setFieldErr("");
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(r.data, { redirectTo: `${window.location.origin}/reset-password` });
    setBusy(false);
    if (error) return setError(friendlyAuthError(error.message));
    setSent(true);
  }

  return (
    <AuthCard title="Forgot your password?" subtitle="We'll email you a link to set a new one.">
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        {error && <Notice kind="error">{error}</Notice>}
        {sent && <Notice kind="success">If an account exists for that email, a reset link is on its way.</Notice>}
        <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={fieldErr} />
        <button type="submit" disabled={busy} className="w-full btn-primary px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-ink-soft">
        <Link to="/login" search={{ redirect: undefined }} className="text-ink font-semibold hover:underline">Back to sign in</Link>
      </p>
    </AuthCard>
  );
}
