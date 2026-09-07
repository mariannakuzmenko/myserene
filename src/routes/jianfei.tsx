import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Play, Pause, RotateCcw, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/jianfei")({
  head: () => ({
    meta: [
      { title: "Jianfei Breathing — MySerene" },
      {
        name: "description",
        content:
          "Three traditional breathing exercises — Wave, Frog and Lotus — guided in one calm, fullscreen practice.",
      },
      { property: "og:title", content: "Jianfei Breathing — MySerene" },
      {
        property: "og:description",
        content: "Wave, Frog and Lotus breathing, guided step by step in a calm fullscreen practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Jianfei Breathing — MySerene" },
      {
        name: "twitter:description",
        content: "Wave, Frog and Lotus breathing, guided step by step in a calm fullscreen practice.",
      },
    ],
    links: [{ rel: "canonical", href: "/jianfei" }],
  }),
  component: JianfeiPage,
});

type Step = {
  glyph: string;
  index: string;
  name: string;
  meta: string;
  /** Total duration of the exercise in seconds. */
  seconds: number;
  /** Optional sub-stages, each of equal length. */
  stages?: string[];
  /** Breathing pattern in seconds: inhale / hold / exhale. */
  pattern: { in: number; hold: number; out: number };
  cue: string;
};

const STEPS: Step[] = [
  {
    glyph: "🌊",
    index: "01",
    name: "Wave",
    meta: "40–60 breathing cycles",
    seconds: 50 * 8,
    pattern: { in: 4, hold: 0, out: 4 },
    cue: "Let the breath roll through the belly, then the chest.",
  },
  {
    glyph: "🐸",
    index: "02",
    name: "Frog",
    meta: "15 minutes",
    seconds: 15 * 60,
    pattern: { in: 4, hold: 2, out: 6 },
    cue: "Soft belly. Breathe low, slow and quietly.",
  },
  {
    glyph: "🪷",
    index: "03",
    name: "Lotus",
    meta: "15 minutes · 3 × 5-minute stages",
    seconds: 15 * 60,
    stages: ["Stage 1 · Guided breath", "Stage 2 · Natural breath", "Stage 3 · Simply resting"],
    pattern: { in: 5, hold: 0, out: 5 },
    cue: "Sit still and let attention settle where the breath is.",
  },
];

function mmss(total: number) {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Soft animated backdrop shared by every screen of the practice. */
function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 animate-breathe"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(135,200,255,0.35), transparent 62%)" }}
      />
      <div
        className="absolute inset-0 animate-drift"
        style={{ background: "radial-gradient(circle at 22% 78%, rgba(14,124,90,0.35), transparent 58%)" }}
      />
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/50"
          style={{
            left: `${(i * 53) % 100}%`,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            animation: `particle ${18 + (i % 8) * 2}s linear ${(i % 7) * 1.6}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** The 3-step introduction, with a subtle progress line connecting each step. */
function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative mx-auto flex min-h-full max-w-2xl flex-col justify-center px-5 py-16 text-white">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">Guided breathing</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
        Jianfei Breathing
      </h1>
      <p className="mt-3 max-w-md text-base text-white/85 leading-relaxed">
        “Three traditional breathing exercises for a calm, focused practice.”
      </p>

      <ol className="relative mt-10 space-y-5">
        {/* subtle progress line */}
        <span
          aria-hidden
          className="absolute left-[27px] top-6 bottom-6 w-px"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.15))" }}
        />
        {STEPS.map((s) => (
          <li key={s.name} className="relative flex items-center gap-4">
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/40 bg-white/15 text-2xl backdrop-blur-xl">
              {s.glyph}
            </span>
            <div className="flex-1 rounded-3xl border border-white/30 bg-black/25 px-4 py-3 backdrop-blur-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">{s.index}</div>
              <div className="text-lg font-semibold leading-tight">{s.name}</div>
              <div className="mt-0.5 text-sm text-white/80">{s.meta}</div>
            </div>
          </li>
        ))}
      </ol>

      <button
        onClick={onStart}
        className="mt-10 inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/40 bg-white/95 px-8 py-4 text-sm font-semibold text-[#08201b] shadow-lg transition hover:scale-[1.02]"
      >
        Start Practice <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function JianfeiPage() {
  const [screen, setScreen] = useState<"intro" | "run" | "transition" | "done">("intro");
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const nextRef = useRef<number | null>(null);

  const step = STEPS[stepIdx];
  const cycle = step.pattern.in + step.pattern.hold + step.pattern.out;

  // main session clock
  useEffect(() => {
    if (screen !== "run" || paused) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [screen, paused]);

  // advance when an exercise finishes
  useEffect(() => {
    if (screen !== "run" || elapsed < step.seconds) return;
    if (stepIdx === STEPS.length - 1) {
      setScreen("done");
      return;
    }
    setScreen("transition");
    nextRef.current = window.setTimeout(() => {
      setStepIdx((i) => i + 1);
      setElapsed(0);
      setScreen("run");
    }, 2800);
  }, [elapsed, screen, step.seconds, stepIdx]);

  useEffect(() => () => { if (nextRef.current) window.clearTimeout(nextRef.current); }, []);

  // lock scroll while the practice is fullscreen
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const phase = useMemo(() => {
    const t = elapsed % cycle;
    if (t < step.pattern.in) return { label: "Inhale", secs: step.pattern.in, scale: 1.22 };
    if (t < step.pattern.in + step.pattern.hold) return { label: "Hold", secs: step.pattern.hold, scale: 1.22 };
    return { label: "Exhale", secs: step.pattern.out, scale: 0.86 };
  }, [elapsed, cycle, step.pattern]);

  const cycles = Math.floor(elapsed / cycle);
  const stageLabel = step.stages
    ? step.stages[Math.min(step.stages.length - 1, Math.floor(elapsed / (step.seconds / step.stages.length)))]
    : null;
  const progress = Math.min(100, (elapsed / step.seconds) * 100);

  const restart = () => {
    if (nextRef.current) window.clearTimeout(nextRef.current);
    setStepIdx(0);
    setElapsed(0);
    setPaused(false);
    setScreen("run");
  };

  return (
    <div
      className="fixed inset-0 z-[95] overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #0b3b32 0%, #0a2a2a 45%, #04120f 100%)" }}
    >
      <Backdrop />

      {/* Close */}
      <div
        className="absolute right-4 sm:right-8 z-20"
        style={{ top: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <Link
          to="/meditation"
          aria-label="Leave Jianfei breathing"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-xl transition hover:bg-black/55"
        >
          <X className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative min-h-full">
        {screen === "intro" && <Intro onStart={() => { setStepIdx(0); setElapsed(0); setScreen("run"); }} />}

        {screen === "transition" && (
          <div className="grid min-h-full place-items-center px-6 text-center text-white animate-fade-in">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">Next</div>
              <div className="mt-3 text-3xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
                {STEPS[Math.min(STEPS.length - 1, stepIdx + 1)].glyph}{" "}
                {STEPS[Math.min(STEPS.length - 1, stepIdx + 1)].name}
              </div>
              <p className="mt-2 text-sm text-white/80">Rest for a moment, then keep breathing.</p>
            </div>
          </div>
        )}

        {screen === "run" && (
          <div className="flex min-h-full flex-col items-center justify-center gap-8 px-5 py-16 text-white">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/75">
                {step.index} / 0{STEPS.length} · {step.name}
              </div>
              <div className="mt-2 text-sm text-white/80">{stageLabel ?? step.meta}</div>
            </div>

            <div className="relative">
              <div
                className="rounded-full"
                style={{
                  width: 240,
                  height: 240,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.92), #87c8ff 58%, rgba(14,124,90,0.85))",
                  boxShadow: "0 0 120px 20px rgba(135,200,255,0.45)",
                  transform: `scale(${phase.scale})`,
                  transition: `transform ${phase.secs}s ease-in-out`,
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <span
                  className="text-xl sm:text-2xl font-medium uppercase tracking-[0.3em] text-white"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {phase.label}
                </span>
              </div>
            </div>

            <p className="max-w-sm text-center text-sm text-white/80">{step.cue}</p>

            <div className="w-full max-w-md rounded-3xl border border-white/35 bg-black/45 px-5 py-4 backdrop-blur-2xl">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white/85 transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-white">
                <button
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Resume practice" : "Pause practice"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25"
                >
                  {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
                </button>
                <div className="text-sm text-white/85">
                  {step.name === "Wave" ? `${cycles} cycles` : "Keep the rhythm easy"}
                </div>
                <div className="w-16 text-right text-sm tabular-nums text-white/90">
                  {mmss(step.seconds - elapsed)}
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "done" && (
          <div className="grid min-h-full place-items-center px-6 text-center text-white animate-fade-in">
            <div className="max-w-md">
              <h2 className="text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "Fraunces, serif" }}>
                Practice Complete
              </h2>
              <p className="mt-3 text-base text-white/85">“Take a moment before returning to your day.”</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/meditation"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/95 px-7 py-3.5 text-sm font-semibold text-[#08201b] shadow-lg transition hover:scale-[1.02]"
                >
                  Finish
                </Link>
                <button
                  onClick={restart}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/25"
                >
                  <RotateCcw className="h-4 w-4" /> Practice Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
