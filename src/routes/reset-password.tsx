import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthCard, Field, Notice } from "@/components/auth-card";
import { friendlyAuthError } from "@/lib/auth";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — MySerene" },
      { name: "description", content: "Choose a new password for your MySerene account." },
      { property: "og:title", content: "Set a new password — MySerene" },
      { property: "og:description", content: "Choose a new password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState<"checking" | "ok" | "invalid">("checking");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [fieldErr, setFieldErr] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery") || window.location.search.includes("code=");
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (session && isRecovery)) setReady("ok");
    });
    const t = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      setReady((r) => (r === "ok" ? r : data.session && isRecovery ? "ok" : "invalid"));
    }, 1200);
    return () => { sub.subscription.unsubscribe(); clearTimeout(t); };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const errs: Record<string, string> = {};
    if (pw.length < 8) errs.pw = "Use at least 8 characters.";
    if (pw !== pw2) errs.pw2 = "Passwords don't match.";
    setFieldErr(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setError(friendlyAuthError(error.message));
    setDone(true);
    setTimeout(() => navigate({ to: "/account" }), 1500);
  }

  return (
    <AuthCard title="Set a new password">
      {ready === "checking" && <div className="mt-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-ink" /></div>}
      {ready === "invalid" && (
        <div className="mt-8 space-y-4 text-center">
          <Notice kind="error">This reset link is invalid or has expired.</Notice>
          <Link to="/forgot-password" className="inline-block btn-primary px-5 py-3 rounded-full text-sm font-semibold">Request a new link</Link>
        </div>
      )}
      {ready === "ok" && (
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
          {error && <Notice kind="error">{error}</Notice>}
          {done && <Notice kind="success">Password updated. Taking you to your account…</Notice>}
          <Field label="New password" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} error={fieldErr.pw} />
          <Field label="Confirm new password" type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} error={fieldErr.pw2} />
          <button type="submit" disabled={busy || done} className="w-full btn-primary px-5 py-3 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} {busy ? "Saving…" : "Update password"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
