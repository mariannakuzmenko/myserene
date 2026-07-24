import {
  createContext, useContext, useEffect, useMemo, useRef, useState,
  useCallback, type ReactNode,
} from "react";
import { SOUND_BY_ID, SOUND_CATALOG, type SoundDef, type SoundId } from "./catalog";
import { getSoundBuffer } from "./synth";

type ActiveTracks = Record<SoundId, number>; // id -> 0..100 volume

interface AudioState {
  active: ActiveTracks;              // tracks in the current mix
  playing: boolean;                  // master play state
  masterVolume: number;              // 0..100
  muted: boolean;
  loop: boolean;
  shuffle: boolean;
  focusedId: SoundId | null;         // "primary" track (used for mini player art)
  immersive: boolean;                // breathing/immersive mode
}

interface AudioApi extends AudioState {
  toggleTrack: (id: SoundId, initialVolume?: number) => void;
  playTrackSolo: (id: SoundId) => void;
  stopTrack: (id: SoundId) => void;
  stopAll: () => void;
  setTrackVolume: (id: SoundId, v: number) => void;
  setMasterVolume: (v: number) => void;
  setMuted: (m: boolean) => void;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setLoop: (v: boolean) => void;
  setShuffle: (v: boolean) => void;
  loadPlaylist: (tracks: { id: SoundId; volume: number }[]) => void;
  startImmersive: (id?: SoundId) => void;
  exitImmersive: () => void;
  getTint: () => string;
  getFocused: () => SoundDef | null;
}

const Ctx = createContext<AudioApi | null>(null);

type Handle =
  | { kind: "el"; el: HTMLAudioElement; gain: GainNode; source: MediaElementAudioSourceNode }
  | { kind: "buf"; src: AudioBufferSourceNode; gain: GainNode };

export function AudioProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveTracks>({});
  const [playing, setPlaying] = useState(false);
  const [masterVolume, setMasterVolumeState] = useState(70);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [focusedId, setFocusedId] = useState<SoundId | null>(null);
  const [immersive, setImmersive] = useState(false);

  // Refs for Web Audio machinery (persist across renders)
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const handlesRef = useRef<Map<SoundId, Handle>>(new Map());

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext ?? (window as any).webkitAudioContext;
      if (!AC) return null;
      const ctx: AudioContext = new AC();
      const master = ctx.createGain();
      master.gain.value = muted ? 0 : masterVolume / 100;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterGainRef.current = master;
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
    return ctxRef.current;
  }, [masterVolume, muted]);

  const createHandle = useCallback((sound: SoundDef, volume: number): Handle | null => {
    const ctx = ensureCtx();
    const master = masterGainRef.current;
    if (!ctx || !master) return null;

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(master);

    const target = volume / 100;

    // Prefer a real recording when one is provided (S3 / R2 / Supabase).
    if (sound.url) {
      const el = new Audio();
      el.src = sound.url;
      el.loop = true;
      el.crossOrigin = "anonymous";
      el.preload = "auto";
      el.play().catch(() => { /* will retry on user gesture */ });
      const source = ctx.createMediaElementSource(el);
      source.connect(gain);
      gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.8);
      return { kind: "el", el, gain, source };
    }

    // Default path: procedural synthesis (works everywhere, no network).
    const src = ctx.createBufferSource();
    src.buffer = getSoundBuffer(ctx, sound.synth);
    src.loop = true;
    src.connect(gain);
    try { src.start(0); } catch { /* already started */ }
    gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.5);
    return { kind: "buf", src, gain };
  }, [ensureCtx]);

  const disposeHandle = useCallback((id: SoundId) => {
    const h = handlesRef.current.get(id);
    if (!h) return;
    const ctx = ctxRef.current;
    const t = ctx?.currentTime ?? 0;
    try {
      h.gain.gain.cancelScheduledValues(t);
      h.gain.gain.linearRampToValueAtTime(0, t + 0.8);
    } catch { /* ignore */ }
    setTimeout(() => {
      try {
        if (h.kind === "el") { h.el.pause(); h.el.src = ""; h.source.disconnect(); }
        else { try { h.src.stop(); } catch { /* noop */ } h.src.disconnect(); }
        h.gain.disconnect();
      } catch { /* ignore */ }
      handlesRef.current.delete(id);
    }, 900);
  }, []);

  // sync master gain
  useEffect(() => {
    const m = masterGainRef.current;
    const ctx = ctxRef.current;
    if (!m || !ctx) return;
    const target = muted || !playing ? 0 : masterVolume / 100;
    m.gain.cancelScheduledValues(ctx.currentTime);
    m.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.4);
  }, [masterVolume, muted, playing]);

  // sync active tracks -> handles
  useEffect(() => {
    const activeIds = new Set(Object.keys(active));
    // add missing
    activeIds.forEach((id) => {
      const sound = SOUND_BY_ID[id];
      if (!sound) return;
      let h = handlesRef.current.get(id);
      if (!h) {
        const created = createHandle(sound, active[id]);
        if (created) handlesRef.current.set(id, created);
      } else {
        const ctx = ctxRef.current;
        if (ctx) {
          h.gain.gain.cancelScheduledValues(ctx.currentTime);
          h.gain.gain.linearRampToValueAtTime(active[id] / 100, ctx.currentTime + 0.3);
        }
      }
    });
    // remove those no longer active
    Array.from(handlesRef.current.keys()).forEach((id) => {
      if (!activeIds.has(id)) disposeHandle(id);
    });
    // update focused
    if (!focusedId || !activeIds.has(focusedId)) {
      const first = activeIds.values().next().value as SoundId | undefined;
      setFocusedId(first ?? null);
    }
    // if we have tracks, we're playing
    if (activeIds.size > 0 && !playing) setPlaying(true);
    if (activeIds.size === 0 && playing) setPlaying(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const toggleTrack = useCallback((id: SoundId, initialVolume = 60) => {
    setActive((prev) => {
      if (id in prev) {
        const { [id]: _drop, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: initialVolume };
    });
    setFocusedId(id);
  }, []);

  const playTrackSolo = useCallback((id: SoundId) => {
    setActive({ [id]: 70 });
    setFocusedId(id);
  }, []);

  const stopTrack = useCallback((id: SoundId) => {
    setActive((prev) => { const { [id]: _drop, ...rest } = prev; return rest; });
  }, []);

  const stopAll = useCallback(() => setActive({}), []);

  const setTrackVolume = useCallback((id: SoundId, v: number) => {
    setActive((prev) => (id in prev ? { ...prev, [id]: v } : { ...prev, [id]: v }));
  }, []);

  const setMasterVolume = useCallback((v: number) => setMasterVolumeState(Math.max(0, Math.min(100, v))), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  const play = useCallback(() => { ensureCtx(); setPlaying(true); }, [ensureCtx]);
  const pause = useCallback(() => setPlaying(false), []);
  const toggle = useCallback(() => setPlaying((p) => { if (!p) ensureCtx(); return !p; }), [ensureCtx]);

  const nextPrev = useCallback((dir: 1 | -1) => {
    setFocusedId((cur) => {
      const ids = Object.keys(active);
      if (ids.length === 0) {
        // if nothing playing, cycle through catalog
        const catIds = SOUND_CATALOG.map((s) => s.id);
        const idx = cur ? catIds.indexOf(cur) : -1;
        const nextId = catIds[(idx + dir + catIds.length) % catIds.length];
        setActive({ [nextId]: 65 });
        return nextId;
      }
      if (shuffle) {
        const pool = ids.filter((i) => i !== cur);
        const nextId = pool.length ? pool[Math.floor(Math.random() * pool.length)] : cur;
        return nextId;
      }
      const idx = cur ? ids.indexOf(cur) : -1;
      return ids[(idx + dir + ids.length) % ids.length];
    });
  }, [active, shuffle]);

  const next = useCallback(() => nextPrev(1), [nextPrev]);
  const prev = useCallback(() => nextPrev(-1), [nextPrev]);

  const loadPlaylist = useCallback((tracks: { id: SoundId; volume: number }[]) => {
    const map: ActiveTracks = {};
    tracks.forEach((t) => { map[t.id] = t.volume; });
    setActive(map);
    setFocusedId(tracks[0]?.id ?? null);
  }, []);

  const startImmersive = useCallback((id?: SoundId) => {
    if (id) playTrackSolo(id);
    else if (Object.keys(active).length === 0) playTrackSolo("rain");
    setImmersive(true);
  }, [active, playTrackSolo]);
  const exitImmersive = useCallback(() => setImmersive(false), []);

  const getFocused = useCallback(() => (focusedId ? SOUND_BY_ID[focusedId] ?? null : null), [focusedId]);
  const getTint = useCallback(() => (focusedId ? SOUND_BY_ID[focusedId]?.tint ?? "#7fd5df" : "#7fd5df"), [focusedId]);

  const api = useMemo<AudioApi>(() => ({
    active, playing, masterVolume, muted, loop, shuffle, focusedId, immersive,
    toggleTrack, playTrackSolo, stopTrack, stopAll, setTrackVolume,
    setMasterVolume, setMuted, toggleMute, play, pause, toggle, next, prev,
    setLoop, setShuffle, loadPlaylist, startImmersive, exitImmersive,
    getFocused, getTint,
  }), [active, playing, masterVolume, muted, loop, shuffle, focusedId, immersive,
      toggleTrack, playTrackSolo, stopTrack, stopAll, setTrackVolume,
      setMasterVolume, toggleMute, play, pause, toggle, next, prev,
      loadPlaylist, startImmersive, exitImmersive, getFocused, getTint]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used within AudioProvider");
  return v;
}

export function useIsPlaying(id: SoundId) {
  const { active } = useAudio();
  return id in active;
}