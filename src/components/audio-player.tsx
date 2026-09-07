import { useState } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Shuffle, Repeat, ChevronUp, ChevronDown, X, Sparkles, Waves,
  Timer, Save, Star, Trash2, ListMusic,
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
          className="hidden sm:grid place-items-center h-10 w-10 rounded-full icon-control transition">
          <SkipBack className="h-4 w-4 text-ink" />
        </button>
        <button onClick={a.toggle} aria-label={a.playing ? "Pause" : "Play"}
          className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0">
          {a.playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
        <button onClick={a.next} aria-label="Next"
          className="hidden sm:grid place-items-center h-10 w-10 rounded-full icon-control transition">
          <SkipForward className="h-4 w-4 text-ink" />
        </button>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse player" : "Expand player"}
          className="grid place-items-center h-10 w-10 rounded-full icon-control shrink-0"
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
  const [mixName, setMixName] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [showMixes, setShowMixes] = useState(false);
  const [custom, setCustom] = useState("");

  const timerActive = a.sleepTimerEndsAt !== null;
  const remaining = a.sleepTimerRemaining;
  const mmss = `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`;

  return (
    <div className="glass-card rounded-3xl mt-2 p-4 sm:p-5 animate-rise">
      {/* Master row */}
      <div className="flex items-center gap-3">
        <button onClick={a.toggleMute} aria-label={a.muted ? "Unmute" : "Mute"}
          className="grid place-items-center h-10 w-10 rounded-full icon-control">
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
          className={`grid place-items-center h-9 w-9 rounded-full transition ${a.shuffle ? "btn-primary" : "icon-control"}`}>
          <Shuffle className="h-4 w-4" />
        </button>
        <button onClick={() => a.setLoop(!a.loop)} aria-label="Loop"
          className={`grid place-items-center h-9 w-9 rounded-full transition ${a.loop ? "btn-primary" : "icon-control"}`}>
          <Repeat className="h-4 w-4" />
        </button>
        <button onClick={() => a.startImmersive()} aria-label="Immersive mode"
          className="grid place-items-center h-9 w-9 rounded-full icon-control">
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      {/* Toolbar: sleep timer / saved mixes */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setShowTimer((v) => !v); setShowMixes(false); }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${timerActive ? "btn-primary" : "glass hover:bg-white/60"}`}
        >
          <Timer className="h-3.5 w-3.5" />
          {timerActive ? `Sleep in ${mmss}` : "Sleep timer"}
        </button>
        <button
          onClick={() => { setShowMixes((v) => !v); setShowTimer(false); }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${showMixes ? "btn-primary" : "glass hover:bg-white/60"}`}
        >
          <ListMusic className="h-3.5 w-3.5" />
          My mixes {a.savedMixes.length > 0 && <span className="opacity-70">· {a.savedMixes.length}</span>}
        </button>
        {activeIds.length > 0 && (
          <form
            className="flex items-center gap-1 glass rounded-full pl-3 pr-1 py-1"
            onSubmit={(e) => {
              e.preventDefault();
              if (!mixName.trim()) return;
              a.saveCurrentMix(mixName);
              setMixName("");
            }}
          >
            <input
              value={mixName}
              onChange={(e) => setMixName(e.target.value)}
              placeholder="Name this mix"
              className="bg-transparent text-xs outline-none w-32 sm:w-40 placeholder:text-ink-soft/70"
              aria-label="Mix name"
            />
            <button type="submit" className="grid place-items-center h-7 w-7 rounded-full btn-primary" aria-label="Save mix">
              <Save className="h-3.5 w-3.5" />
            </button>
          </form>
        )}
      </div>

      {showTimer && (
        <div className="mt-3 glass rounded-2xl p-3 animate-rise">
          <div className="text-xs uppercase tracking-widest text-ink-soft mb-2">Fade audio out in…</div>
          <div className="flex flex-wrap gap-2">
            {[15, 30, 45, 60, 90, 120].map((min) => (
              <button
                key={min}
                onClick={() => a.startSleepTimer(min)}
                className="rounded-full glass px-3 py-1.5 text-xs hover:bg-white/60"
              >
                {min < 60 ? `${min} min` : `${min / 60} h`}
              </button>
            ))}
            {timerActive && (
              <button
                onClick={a.cancelSleepTimer}
                className="rounded-full btn-ghost px-3 py-1.5 text-xs"
              >
                Cancel · {mmss}
              </button>
            )}
          </div>
          <form
            className="mt-2 flex items-center gap-1 glass rounded-full pl-3 pr-1 py-1 w-fit"
            onSubmit={(e) => {
              e.preventDefault();
              const min = Number(custom);
              if (!Number.isFinite(min) || min <= 0) return;
              a.startSleepTimer(Math.min(720, Math.round(min)));
              setCustom("");
            }}
          >
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              inputMode="numeric"
              placeholder="Custom min"
              aria-label="Custom sleep timer in minutes"
              className="bg-transparent text-xs outline-none w-20 placeholder:text-ink-soft/70"
            />
            <button type="submit" className="rounded-full btn-primary px-3 py-1 text-[11px] font-semibold">Set</button>
          </form>
          <p className="mt-2 text-[11px] text-ink-soft">Volume gently fades during the final minute, then stops.</p>
        </div>
      )}

      {showMixes && (
        <div className="mt-3 glass rounded-2xl p-3 animate-rise max-h-64 overflow-y-auto">
          {a.savedMixes.length === 0 ? (
            <p className="text-xs text-ink-soft text-center py-4">
              No saved mixes yet. Build a mix and name it above to save it.
            </p>
          ) : (
            <ul className="space-y-2">
              {a.savedMixes.map((m) => (
                <li key={m.id} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                  <button
                    onClick={() => a.toggleFavoriteMix(m.id)}
                    className="grid place-items-center h-8 w-8 rounded-full icon-control"
                    aria-label="Favorite"
                  >
                    <Star className={`h-3.5 w-3.5 ${m.favorite ? "fill-current text-brand" : "text-ink-soft"}`} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{m.name}</div>
                    <div className="text-[11px] text-ink-soft truncate">
                      {m.tracks.map((t) => SOUND_BY_ID[t.id]?.title ?? t.id).join(" · ")}
                    </div>
                  </div>
                  <button
                    onClick={() => a.loadMix(m.id)}
                    className="rounded-full btn-primary px-3 py-1.5 text-[11px] font-semibold"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => a.deleteMix(m.id)}
                    className="grid place-items-center h-8 w-8 rounded-full icon-control"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-ink-soft" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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
                   className="grid place-items-center h-8 w-8 rounded-full icon-control">
                   <X className="h-4 w-4 text-ink" />
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