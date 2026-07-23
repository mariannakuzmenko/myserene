import { useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Shuffle, Repeat, ChevronUp, ChevronDown, X, Sparkles, Waves,
} from "lucide-react";
import { useAudio } from "@/lib/audio/audio-provider";
import { SOUND_BY_ID } from "@/lib/audio/catalog";

export function FloatingAudioPlayer() {
  const a = useAudio();
  const [expanded, setExpanded] = useState(false);
  const focused = a.getFocused();
  const activeIds = Object.keys(a.active);
  const hasAny = activeIds.length > 0;

  if (a.immersive) return null;
  if (!hasAny && !expanded) return null;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 w-[min(96vw,720px)]"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass-card rounded-3xl px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
        {/* Art / focus */}
        <div
          className="relative grid place-items-center h-11 w-11 sm:h-12 sm:w-12 rounded-2xl shrink-0 overflow-hidden"
          style={{ background: focused ? `linear-gradient(135deg, ${focused.tint}55, ${focused.tint}aa)` : "linear-gradient(135deg,#8fe0c6,#35b39a)" }}
        >
          {focused ? <focused.icon className="h-5 w-5 text-white" strokeWidth={1.5} /> : <Waves className="h-5 w-5 text-white" />}
          {a.playing && <span className="absolute inset-0 rounded-2xl border border-white/70 animate-breathe" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-ink-soft truncate">
            {activeIds.length > 1 ? `Mix · ${activeIds.length} tracks` : focused?.cat ?? "Idle"}
          </div>
          <div className="text-sm font-semibold text-ink truncate">
            {focused?.title ?? "Nothing playing"}
          </div>
          {/* animated equalizer */}
          <div className="mt-1 flex items-end gap-0.5 h-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="w-0.5 rounded-full bg-brand"
                style={{
                  height: a.playing ? `${20 + ((i * 37) % 80)}%` : "20%",
                  animation: a.playing ? `breathe ${1 + (i % 5) * 0.15}s ease-in-out ${i * 0.05}s infinite` : "none",
                  opacity: a.playing ? 0.9 : 0.35,
                }}
              />
            ))}
          </div>
        </div>

        <button onClick={a.prev} aria-label="Previous"
          className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-white/60 transition">
          <SkipBack className="h-4 w-4" />
        </button>
        <button onClick={a.toggle} aria-label={a.playing ? "Pause" : "Play"}
          className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0">
          {a.playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
        <button onClick={a.next} aria-label="Next"
          className="hidden sm:grid place-items-center h-10 w-10 rounded-full hover:bg-white/60 transition">
          <SkipForward className="h-4 w-4" />
        </button>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse player" : "Expand player"}
          className="grid place-items-center h-10 w-10 rounded-full glass shrink-0"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      {expanded && <ExpandedPanel />}
    </div>
  );
}

function ExpandedPanel() {
  const a = useAudio();
  const activeIds = Object.keys(a.active);
  return (
    <div className="glass-card rounded-3xl mt-2 p-4 sm:p-5 animate-rise">
      {/* Master row */}
      <div className="flex items-center gap-3">
        <button onClick={a.toggleMute} aria-label={a.muted ? "Unmute" : "Mute"}
          className="grid place-items-center h-10 w-10 rounded-full hover:bg-white/60">
          {a.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <input
          type="range" min={0} max={100} value={a.masterVolume}
          onChange={(e) => a.setMasterVolume(Number(e.target.value))}
          className="flex-1 accent-[color:var(--brand)]"
          aria-label="Master volume"
        />
        <span className="text-xs text-ink-soft tabular-nums w-10 text-right">{a.masterVolume}%</span>

        <button onClick={() => a.setShuffle(!a.shuffle)} aria-label="Shuffle"
          className={`grid place-items-center h-9 w-9 rounded-full transition ${a.shuffle ? "btn-primary" : "hover:bg-white/60"}`}>
          <Shuffle className="h-4 w-4" />
        </button>
        <button onClick={() => a.setLoop(!a.loop)} aria-label="Loop"
          className={`grid place-items-center h-9 w-9 rounded-full transition ${a.loop ? "btn-primary" : "hover:bg-white/60"}`}>
          <Repeat className="h-4 w-4" />
        </button>
        <button onClick={() => a.startImmersive()} aria-label="Immersive mode"
          className="grid place-items-center h-9 w-9 rounded-full glass">
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      {/* Active tracks list */}
      {activeIds.length > 0 ? (
        <div className="mt-4 max-h-64 overflow-y-auto pr-1 space-y-2">
          {activeIds.map((id) => {
            const s = SOUND_BY_ID[id];
            if (!s) return null;
            const Icon = s.icon;
            return (
              <div key={id} className="glass rounded-2xl px-3 py-2 flex items-center gap-3">
                <div className="grid place-items-center h-9 w-9 rounded-xl shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.tint}55, ${s.tint}cc)` }}>
                  <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{s.title}</div>
                  <input
                    type="range" min={0} max={100} value={a.active[id]}
                    onChange={(e) => a.setTrackVolume(id, Number(e.target.value))}
                    className="mt-1 w-full accent-[color:var(--brand)]"
                    aria-label={`${s.title} volume`}
                  />
                </div>
                <span className="text-xs text-ink-soft tabular-nums w-9 text-right">{a.active[id]}%</span>
                <button onClick={() => a.stopTrack(id)} aria-label={`Remove ${s.title}`}
                  className="grid place-items-center h-8 w-8 rounded-full hover:bg-white/60">
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-soft text-center">No tracks yet — pick a sound to begin.</p>
      )}

      {activeIds.length > 0 && (
        <button onClick={a.stopAll}
          className="mt-4 w-full btn-ghost rounded-full py-2.5 text-sm font-medium">
          Stop all
        </button>
      )}
    </div>
  );
}