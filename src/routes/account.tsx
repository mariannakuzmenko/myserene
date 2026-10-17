import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, History, Loader2, LogOut, Play, Sparkles, User as UserIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site-chrome";
import { Field, Notice } from "@/components/auth-card";
import { useAuth } from "@/lib/auth";
import { useAudio } from "@/lib/audio/audio-provider";
import { SOUND_BY_ID, type SoundId } from "@/lib/audio/catalog";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Account — MySerene" },
      { name: "description", content: "Your MySerene profile, favorites, listening history and plan." },
      { property: "og:title", content: "My Account — MySerene" },
      { property: "og:description", content: "Your MySerene profile, favorites and plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login", search: { redirect: "/account" }, replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <PageShell><div className="grid place-items-center py-32"><Loader2 className="h-8 w-8 animate-spin text-ink" /></div></PageShell>;
  }
  return <AccountContent userId={user.id} email={user.email ?? ""} />;
}

function AccountContent({ userId, email }: { userId: string; email: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { favorites, recent, playTrackSolo, toggleFavorite } = useAudio();
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<string | null>(null);
  const [loadErr, setLoadErr] = useState("");

  useEffect(() => {
    (async () => {
      const [p, s] = await Promise.all([
        supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle(),
        supabase.from("subscriptions").select("plan").eq("user_id", userId).maybeSingle(),
      ]);
      if (p.error || s.error) setLoadErr("We couldn't load your account details. Please refresh.");
      setName(p.data?.display_name ?? "");
      setPlan(s.data?.plan ?? "free");
    })();
  }, [userId]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", search: { redirect: undefined }, replace: true });
  }

  return (
    <PageShell>
      <section className="px-4">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="glass-card rounded-[32px] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <span className="grid place-items-center h-16 w-16 rounded-full btn-primary shrink-0">
              <UserIcon className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-4xl font-semibold text-ink break-words">{name ? `Hello, ${name}` : "My Account"}</h1>
              <p className="mt-1 text-sm text-ink-soft break-all">{email}</p>
            </div>
            <button onClick={signOut} className="btn-ghost px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 self-start sm:self-auto">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
          {loadErr && <Notice kind="error">{loadErr}</Notice>}

          <div className="grid gap-6 md:grid-cols-2">
            <SoundList title="My Favorites" icon={Heart} ids={favorites} empty="Tap the heart on any sound to save it here."
              onPlay={playTrackSolo} onRemove={toggleFavorite} />
            <SoundList title="Recently Played" icon={History} ids={recent} empty="Sounds you play will appear here."
              onPlay={playTrackSolo} />
          </div>

          <div className="glass-card rounded-[32px] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-ink flex items-center gap-2"><Sparkles className="h-5 w-5 text-ink" /> Subscription</h2>
            {plan === null ? <Loader2 className="mt-4 h-5 w-5 animate-spin text-ink" /> : (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-ink">{plan === "premium" ? "Premium Plan" : "Free Plan"}</p>
                  <p className="text-sm text-ink-soft">Premium plans are coming soon.</p>
                </div>
                <Link to="/pricing" className="btn-ghost px-5 py-2.5 rounded-full text-sm font-semibold text-center">View plans</Link>
              </div>
            )}
          </div>

          <Settings userId={userId} email={email} name={name} onName={setName} />
        </div>
      </section>
    </PageShell>
  );
}

function SoundList({ title, icon: Icon, ids, empty, onPlay, onRemove }: {
  title: string; icon: typeof Heart; ids: SoundId[]; empty: string;
  onPlay: (id: SoundId) => void; onRemove?: (id: SoundId) => void;
}) {
  const items = ids.map((id) => SOUND_BY_ID[id]).filter(Boolean);
  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink flex items-center gap-2"><Icon className="h-5 w-5 text-ink" /> {title}</h2>
      {items.length === 0 ? <p className="mt-4 text-sm text-ink-soft">{empty}</p> : (
        <ul className="mt-4 space-y-2">
          {items.slice(0, 8).map((s) => {
            const SIcon = s.icon;
            return (
              <li key={s.id} className="flex items-center gap-3 glass rounded-2xl px-3 py-2.5">
                <SIcon className="h-5 w-5 sound-icon shrink-0" />
                <span className="flex-1 min-w-0 truncate text-sm font-medium text-ink">{s.title}</span>
                <button onClick={() => onPlay(s.id)} aria-label={`Play ${s.title}`} className="grid place-items-center h-9 w-9 rounded-full icon-control shrink-0">
                  <Play className="h-4 w-4" />
                </button>
                {onRemove && (
                  <button onClick={() => onRemove(s.id)} aria-label={`Remove ${s.title} from favorites`} className="grid place-items-center h-9 w-9 rounded-full icon-control shrink-0">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Settings({ userId, email, name, onName }: { userId: string; email: string; name: string; onName: (n: string) => void }) {
  const [draft, setDraft] = useState(name);
  const [nameMsg, setNameMsg] = useState<{ k: "error" | "success"; t: string } | null>(null);
  const [savingName, setSavingName] = useState(false);
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ k: "error" | "success"; t: string } | null>(null);
  const [savingPw, setSavingPw] = useState(false);
  useEffect(() => setDraft(name), [name]);

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    const v = draft.trim();
    if (!v || v.length > 80) return setNameMsg({ k: "error", t: "Name must be 1–80 characters." });
    setSavingName(true);
    const { error } = await supabase.from("profiles").update({ display_name: v, updated_at: new Date().toISOString() }).eq("id", userId);
    setSavingName(false);
    if (error) return setNameMsg({ k: "error", t: "Couldn't save your name. Please try again." });
    onName(v);
    setNameMsg({ k: "success", t: "Name saved." });
  }

  async function savePw(e: React.FormEvent) {
    e.preventDefault();
    if (!cur) return setPwMsg({ k: "error", t: "Please enter your current password." });
    if (pw.length < 8) return setPwMsg({ k: "error", t: "New password must be at least 8 characters." });
    setSavingPw(true);
    // Verify current password before changing it.
    const check = await supabase.auth.signInWithPassword({ email, password: cur });
    if (check.error) { setSavingPw(false); return setPwMsg({ k: "error", t: "Your current password is incorrect." }); }
    const { error } = await supabase.auth.updateUser({ password: pw, current_password: cur } as { password: string });
    setSavingPw(false);
    if (error) return setPwMsg({ k: "error", t: error.message });
    setCur(""); setPw("");
    setPwMsg({ k: "success", t: "Password updated." });
  }

  return (
    <div className="glass-card rounded-[32px] p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink">Account settings</h2>
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <form onSubmit={saveName} noValidate className="space-y-3">
          <Field label="Display name" value={draft} maxLength={80} onChange={(e) => setDraft(e.target.value)} />
          <Field label="Email" value={email} readOnly disabled />
          {nameMsg && <Notice kind={nameMsg.k}>{nameMsg.t}</Notice>}
          <button disabled={savingName} className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-70">
            {savingName && <Loader2 className="h-4 w-4 animate-spin" />} Save profile
          </button>
        </form>
        <form onSubmit={savePw} noValidate className="space-y-3">
          <Field label="Current password" type="password" autoComplete="current-password" value={cur} onChange={(e) => setCur(e.target.value)} />
          <Field label="New password" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
          {pwMsg && <Notice kind={pwMsg.k}>{pwMsg.t}</Notice>}
          <button disabled={savingPw} className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 disabled:opacity-70">
            {savingPw && <Loader2 className="h-4 w-4 animate-spin" />} Change password
          </button>
        </form>
      </div>
    </div>
  );
}
