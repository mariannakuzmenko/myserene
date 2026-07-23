import { useEffect, useState } from "react";
import { X, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useAudio } from "@/lib/audio/audio-provider";

export function ImmersiveMode() {
  const a = useAudio();
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [elapsed, setElapsed] = useState(0);
  const focused = a.getFocused();
  const tint = a.getTint();

  useEffect(() => {
    if (!a.immersive) return;
    // 4-7-8-ish breathing pattern (compressed for feel)
    const cycle = [
      { p: "in" as const, ms: 4000 },
      { p: "hold" as const, ms: 3000 },
      { p: "out" as const, ms: 5000 },
    ];
    let idx = 0;
    setPhase(cycle[0].p);
    const tick = () => {
      idx = (idx + 1) % cycle.length;
      setPhase(cycle[idx].p);
    };
    let t = window.setTimeout(function run() {
      tick();
      t = window.setTimeout(run, cycle[idx].ms);
    }, cycle[0].ms);
    return () => window.clearTimeout(t);
  }, [a.immersive]);

  useEffect(() => {
    if (!a.immersive) { setElapsed(0); return; }
    const start = Date.now();
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [a.immersive]);

  useEffect(() => {
    if (!a.immersive) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") a.exitImmersive(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [a.immersive, a]);

  if (!a.immersive) return null;

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  const bg = focused?.image
    ? `linear-gradient(180deg, ${tint}cc 0%, ${tint}88 40%, #04120faa 100%), url(${focused.image})`
    : `linear-gradient(180deg, ${tint}cc, #04120f)`;

  return (
    <div
      className="fixed inset-0 z-[90] animate-rise"
      role="dialog"
      aria-modal="true"
      aria-label="Immersive breathing mode"
      style={{ background: bg, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/20" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-4 sm:px-8 pt-6"
        style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}>
        <div className="text-white/90">
          <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Immersive</div>
          <div className="text-sm font-medium">{focused?.title ?? "Serene"}</div>
        </div>
        <button
          onClick={a.exitImmersive}
          aria-label="Exit immersive mode"
          className="grid place-items-center h-11 w-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-white hover:bg-white/25 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Breathing orb */}
      <div className="relative h-[calc(100%-9rem)] grid place-items-center">
        <div className="relative">
          <div
            className="rounded-full transition-transform duration-[4000ms] ease-in-out"
            style={{
              width: 260, height: 260,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${tint} 60%, ${tint}88)`,
              transform: phase === "in" ? "scale(1.25)" : phase === "hold" ? "scale(1.25)" : "scale(0.85)",
              boxShadow: `0 0 120px 20px ${tint}88`,
              transitionDuration: phase === "in" ? "4s" : phase === "hold" ? "3s" : "5s",
            }}
          />
          <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none"
            style={{ animation: "ripple 4s ease-out infinite" }} />
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <span className="text-white text-xl sm:text-2xl font-medium tracking-[0.3em] uppercase"
              style={{ fontFamily: "Fraunces, serif" }}>
              {phase === "in" ? "Inhale" : phase === "hold" ? "Hold" : "Exhale"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute left-0 right-0 px-4 sm:px-8"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto max-w-md rounded-3xl px-4 py-3 bg-white/12 backdrop-blur-2xl border border-white/25 flex items-center gap-3 text-white">
          <button onClick={a.toggle} aria-label={a.playing ? "Pause" : "Play"}
            className="grid place-items-center h-11 w-11 rounded-full bg-white/25 hover:bg-white/35 transition">
            {a.playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>
          <div className="flex-1 flex items-center gap-2">
            <button onClick={a.toggleMute} aria-label={a.muted ? "Unmute" : "Mute"}
              className="grid place-items-center h-9 w-9 rounded-full bg-white/15">
              {a.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range" min={0} max={100} value={a.masterVolume}
              onChange={(e) => a.setMasterVolume(Number(e.target.value))}
              className="flex-1 accent-white"
              aria-label="Volume"
            />
          </div>
          <div className="text-sm tabular-nums opacity-90 w-14 text-right">{mm}:{ss}</div>
        </div>
      </div>
    </div>
  );
}