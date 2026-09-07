import { useEffect, useState } from "react";
import { X, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useAudio } from "@/lib/audio/audio-provider";
import type { SoundDef } from "@/lib/audio/catalog";

type Env = "rain" | "ocean" | "forest" | "fire" | "night" | "zen";

/** Map the focused sound onto a visual environment. */
function envFor(sound: SoundDef | null): Env {
  const k = sound?.synth ?? "";
  if (k.startsWith("rain") || k === "storm" || k === "rain-window") return "rain";
  if (["ocean", "beach", "calm-sea", "ocean-sunset", "stormy-ocean", "waterfall", "river", "stream"].includes(k)) return "ocean";
  if (["forest", "deep-forest", "bamboo", "birds", "birds-morning", "wind", "mountain-wind"].includes(k)) return "forest";
  if (["fire", "campfire", "crackling-fire", "cozy-cabin"].includes(k)) return "fire";
  if (["night-forest", "sleep", "delta"].includes(k)) return "night";
  return "zen";
}

/**
 * LivingEnvironment — soft, GPU-friendly layers that react to the sound
 * currently in focus and cross-fade whenever it changes.
 */
function LivingEnvironment({ env, tint }: { env: Env; tint: string }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000">
      {env === "rain" && (
        <>
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-px rounded-full bg-white/45"
              style={{
                left: `${(i * 17) % 100}%`,
                height: `${20 + ((i * 7) % 40)}px`,
                animation: `rainfall ${0.9 + ((i * 13) % 9) / 10}s linear ${(i % 12) * 0.12}s infinite`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,205,225,0.35),transparent_65%)]" />
          <div className="absolute inset-0 animate-drift bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
        </>
      )}

      {env === "ocean" && (
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-[-10%] right-[-10%] rounded-[50%] bg-white/12"
              style={{
                bottom: `${-6 + i * 7}%`,
                height: `${26 + i * 8}vh`,
                animation: `wave-roll ${9 + i * 3}s ease-in-out ${i * 1.2}s infinite`,
              }}
            />
          ))}
          <div className="absolute inset-x-0 top-0 h-1/2 opacity-60"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)" }} />
        </>
      )}

      {env === "forest" && (
        <>
          <div className="absolute inset-0" style={{ animation: "ray-sweep 14s ease-in-out infinite",
            background: "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.35) 34%, transparent 46%, rgba(255,255,255,0.22) 62%, transparent 76%)" }} />
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-[60%] bg-white/50"
              style={{
                left: `${(i * 31) % 100}%`,
                width: 8 + (i % 4) * 3,
                height: 5 + (i % 3) * 2,
                animation: `leaf-sway ${16 + (i % 7) * 2}s linear ${(i % 9) * 1.4}s infinite`,
              }}
            />
          ))}
        </>
      )}

      {env === "fire" && (
        <>
          <div className="absolute left-1/2 bottom-[-14vh] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${tint}cc, transparent 70%)`, animation: "glow-flicker 3.2s ease-in-out infinite" }} />
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full"
              style={{
                left: `${35 + ((i * 13) % 30)}%`,
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background: "rgba(255,196,120,0.9)",
                boxShadow: "0 0 10px rgba(255,170,80,0.9)",
                animation: `ember ${7 + (i % 6)}s linear ${(i % 10) * 0.8}s infinite`,
              }}
            />
          ))}
        </>
      )}

      {env === "night" && (
        <>
          {Array.from({ length: 46 }).map((_, i) => (
            <span key={i} className="absolute h-1 w-1 rounded-full bg-white animate-twinkle"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 23) % 70}%`, animationDelay: `${(i * 0.31) % 4}s` }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={`ff-${i}`} className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${(i * 41) % 100}%`,
                background: "rgba(200,255,180,0.95)",
                boxShadow: "0 0 12px rgba(180,255,160,0.9)",
                animation: `particle ${18 + i * 2}s linear ${i * 1.7}s infinite`,
              }} />
          ))}
          <div className="absolute right-[12%] top-[10%] h-24 w-24 rounded-full bg-white/70 blur-[2px] opacity-80" />
        </>
      )}

      {env === "zen" && (
        <>
          <div className="absolute inset-0 animate-breathe"
            style={{ background: `radial-gradient(circle at 50% 45%, ${tint}55, transparent 60%)` }} />
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="absolute rounded-full bg-white/60"
              style={{
                left: `${(i * 53) % 100}%`,
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                animation: `particle ${18 + (i % 8) * 2}s linear ${(i % 7) * 1.6}s infinite`,
              }} />
          ))}
        </>
      )}
    </div>
  );
}

export function ImmersiveMode() {
  const a = useAudio();
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [elapsed, setElapsed] = useState(0);
  const focused = a.getFocused();
  const tint = a.getTint();
  const env = envFor(focused);

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
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/35" />
      <LivingEnvironment key={env} env={env} tint={tint} />

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
           className="grid place-items-center h-11 w-11 rounded-full icon-control-dark transition"
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
         <div className="mx-auto max-w-md rounded-3xl px-4 py-3 bg-black/45 backdrop-blur-2xl border border-white/35 flex items-center gap-3 text-white">
          <button onClick={a.toggle} aria-label={a.playing ? "Pause" : "Play"}
             className="grid place-items-center h-11 w-11 rounded-full icon-control-dark transition">
            {a.playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>
          <div className="flex-1 flex items-center gap-2">
            <button onClick={a.toggleMute} aria-label={a.muted ? "Unmute" : "Mute"}
               className="grid place-items-center h-9 w-9 rounded-full icon-control-dark">
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