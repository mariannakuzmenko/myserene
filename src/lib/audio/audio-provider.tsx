import {
  createContext, useContext, useEffect, useMemo, useRef, useState,
  useCallback, type ReactNode,
} from "react";
import { SOUND_BY_ID, SOUND_CATALOG, type SoundDef, type SoundId } from "./catalog";
import { getSoundBuffer } from "./synth";
import { setBackgroundAudioActive, getBackgroundAudioElement } from "./background-audio";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type ActiveTracks = Record<SoundId, number>; // id -> 0..100 volume

export interface SavedMix {
  id: string;
  name: string;
  tracks: { id: SoundId; volume: number }[];
  createdAt: number;
  favorite?: boolean;
}

const MIX_STORAGE_KEY = "serene:saved-mixes:v1";
const FAV_STORAGE_KEY = "serene:favorites:v1";
const RECENT_STORAGE_KEY = "serene:recent:v1";

interface AudioState {
  active: ActiveTracks;              // tracks in the current mix
  playing: boolean;                  // master play state
  masterVolume: number;              // 0..100
  muted: boolean;
  loop: boolean;
  shuffle: boolean;
  focusedId: SoundId | null;         // "primary" track (used for mini player art)
  immersive: boolean;                // breathing/immersive mode
  sleepTimerEndsAt: number | null;   // epoch ms when timer stops audio
  sleepTimerRemaining: number;       // seconds left (updates each second)
  savedMixes: SavedMix[];
  favorites: SoundId[];
  recent: SoundId[];
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
  startSleepTimer: (minutes: number) => void;
  cancelSleepTimer: () => void;
  saveCurrentMix: (name: string) => SavedMix | null;
  deleteMix: (id: string) => void;
  renameMix: (id: string, name: string) => void;
  toggleFavoriteMix: (id: string) => void;
  loadMix: (id: string) => void;
  toggleFavorite: (id: SoundId) => void;
  isFavorite: (id: SoundId) => boolean;
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
  const [sleepTimerEndsAt, setSleepTimerEndsAt] = useState<number | null>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(0);
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [favorites, setFavorites] = useState<SoundId[]>([]);
  const [recent, setRecent] = useState<SoundId[]>([]);

  // hydrate saved mixes from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(MIX_STORAGE_KEY);
      if (raw) setSavedMixes(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(MIX_STORAGE_KEY, JSON.stringify(savedMixes)); } catch { /* ignore */ }
  }, [savedMixes]);

  // hydrate favorites + recently played
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const f = window.localStorage.getItem(FAV_STORAGE_KEY);
      if (f) setFavorites(JSON.parse(f));
      const r = window.localStorage.getItem(RECENT_STORAGE_KEY);
      if (r) setRecent(JSON.parse(r));
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites)); } catch { /* ignore */ }
  }, [favorites]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent)); } catch { /* ignore */ }
  }, [recent]);

  // Account sync: when signed in, favorites + history live in the user's private rows.
  const { user } = useAuth();
  const userIdRef = useRef<string | null>(null);
  useEffect(() => {
    userIdRef.current = user?.id ?? null;
    if (!user) return;
    let cancelled = false;
    (async () => {
      const [f, h] = await Promise.all([
        supabase.from("favorites").select("sound_id, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("play_history").select("sound_id, played_at").eq("user_id", user.id).order("played_at", { ascending: false }).limit(12),
      ]);
      if (cancelled) return;
      const valid = (id: string): id is SoundId => id in SOUND_BY_ID;
      const remoteFav = (f.data ?? []).map((r) => r.sound_id).filter(valid);
      setFavorites((local) => {
        const missing = local.filter((id) => !remoteFav.includes(id));
        if (missing.length) void supabase.from("favorites").upsert(missing.map((sound_id) => ({ user_id: user.id, sound_id })));
        return [...remoteFav, ...missing];
      });
      const remoteRecent = (h.data ?? []).map((r) => r.sound_id).filter(valid);
      setRecent((local) => [...remoteRecent, ...local.filter((id) => !remoteRecent.includes(id))].slice(0, 12));
    })();
    return () => { cancelled = true; };
  }, [user]);

  const remember = useCallback((ids: SoundId[]) => {
    if (ids.length === 0) return;
    setRecent((prev) => [...ids, ...prev.filter((p) => !ids.includes(p))].slice(0, 12));
    const uid = userIdRef.current;
    if (uid) {
      const now = new Date().toISOString();
      void supabase.from("play_history").upsert(ids.map((sound_id) => ({ user_id: uid, sound_id, played_at: now })))
        .then(({ error }) => { if (error) console.warn("history sync failed", error.message); });
    }
  }, []);

  // Refs for Web Audio machinery (persist across renders)
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const handlesRef = useRef<Map<SoundId, Handle>>(new Map());

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    // Called from user gestures — claim the media session while we still have
    // transient activation so iOS grants Lock Screen controls + background play.
    setBackgroundAudioActive(true);
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
    ensureCtx();
    setActive((prev) => {
      if (id in prev) {
        const { [id]: _drop, ...rest } = prev;
        return rest;
      }
      remember([id]);
      return { ...prev, [id]: initialVolume };
    });
    setFocusedId(id);
  }, [remember, ensureCtx]);

  const playTrackSolo = useCallback((id: SoundId) => {
    ensureCtx();
    setActive({ [id]: 70 });
    setFocusedId(id);
    remember([id]);
  }, [remember, ensureCtx]);

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
    ensureCtx();
    const map: ActiveTracks = {};
    tracks.forEach((t) => { map[t.id] = t.volume; });
    setActive(map);
    setFocusedId(tracks[0]?.id ?? null);
    remember(tracks.map((t) => t.id));
  }, [remember, ensureCtx]);

  const startImmersive = useCallback((id?: SoundId) => {
    if (id) playTrackSolo(id);
    else if (Object.keys(active).length === 0) playTrackSolo("rain");
    setImmersive(true);
  }, [active, playTrackSolo]);
  const exitImmersive = useCallback(() => setImmersive(false), []);

  // Sleep timer: tick every second; fade last 60s; stop at end.
  const cancelSleepTimer = useCallback(() => {
    setSleepTimerEndsAt(null);
    setSleepTimerRemaining(0);
    // restore master volume (was ramping down)
    const m = masterGainRef.current;
    const ctx = ctxRef.current;
    if (m && ctx) {
      m.gain.cancelScheduledValues(ctx.currentTime);
      m.gain.linearRampToValueAtTime(muted || !playing ? 0 : masterVolume / 100, ctx.currentTime + 0.4);
    }
  }, [muted, playing, masterVolume]);

  const startSleepTimer = useCallback((minutes: number) => {
    const endsAt = Date.now() + Math.max(1, minutes) * 60 * 1000;
    setSleepTimerEndsAt(endsAt);
    setSleepTimerRemaining(Math.round((endsAt - Date.now()) / 1000));
  }, []);

  useEffect(() => {
    if (!sleepTimerEndsAt) return;
    const tick = () => {
      const remaining = Math.max(0, Math.round((sleepTimerEndsAt - Date.now()) / 1000));
      setSleepTimerRemaining(remaining);
      // start volume fade during last 60s
      const m = masterGainRef.current;
      const ctx = ctxRef.current;
      if (m && ctx && remaining <= 60 && remaining > 0) {
        const factor = remaining / 60;
        const target = (muted ? 0 : masterVolume / 100) * factor;
        m.gain.cancelScheduledValues(ctx.currentTime);
        m.gain.linearRampToValueAtTime(target, ctx.currentTime + 1.0);
      }
      if (remaining <= 0) {
        // stop everything gracefully
        setActive({});
        setSleepTimerEndsAt(null);
        setSleepTimerRemaining(0);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sleepTimerEndsAt, masterVolume, muted]);

  // ---- Saved mixes ----
  const saveCurrentMix = useCallback((name: string) => {
    const tracks = Object.entries(active).map(([id, volume]) => ({ id, volume: volume as number }));
    if (tracks.length === 0) return null;
    const mix: SavedMix = {
      id: `mix_${Date.now().toString(36)}`,
      name: name.trim() || "Untitled mix",
      tracks,
      createdAt: Date.now(),
    };
    setSavedMixes((prev) => [mix, ...prev]);
    return mix;
  }, [active]);
  const deleteMix = useCallback((id: string) =>
    setSavedMixes((prev) => prev.filter((m) => m.id !== id)), []);
  const renameMix = useCallback((id: string, name: string) =>
    setSavedMixes((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m))), []);
  const toggleFavoriteMix = useCallback((id: string) =>
    setSavedMixes((prev) => prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))), []);
  const loadMix = useCallback((id: string) => {
    const mix = savedMixes.find((m) => m.id === id);
    if (!mix) return;
    const map: ActiveTracks = {};
    mix.tracks.forEach((t) => { map[t.id] = t.volume; });
    setActive(map);
    setFocusedId(mix.tracks[0]?.id ?? null);
  }, [savedMixes]);

  const getFocused = useCallback(() => (focusedId ? SOUND_BY_ID[focusedId] ?? null : null), [focusedId]);
  const getTint = useCallback(() => (focusedId ? SOUND_BY_ID[focusedId]?.tint ?? "#7fd5df" : "#7fd5df"), [focusedId]);

  // ---- iOS background playback: keep one media element as session anchor ----
  useEffect(() => {
    const shouldRun = playing && Object.keys(active).length > 0;
    setBackgroundAudioActive(shouldRun);
  }, [playing, active]);

  // Re-arm the audio session when Safari brings the tab back to the front.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (!playing || Object.keys(active).length === 0) return;
      const ctx = ctxRef.current;
      if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
      setBackgroundAudioActive(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [playing, active]);

  // ---- Media Session: Lock Screen / Control Center metadata + transport ----
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    const focused = focusedId ? SOUND_BY_ID[focusedId] : null;
    const ids = Object.keys(active);
    const artwork = focused?.image ?? "/images/fireplace-cabin.jpg";
    const absolute = artwork.startsWith("http")
      ? artwork
      : `${window.location.origin}${artwork}`;

    try {
      ms.metadata = new MediaMetadata({
        title: focused?.title ?? "Serene",
        artist: "MySerene",
        album: ids.length > 1 ? `Mix · ${ids.length} sounds` : `${focused?.cat ?? "Nature"} Sounds`,
        artwork: [
          { src: absolute, sizes: "512x512", type: "image/jpeg" },
          { src: absolute, sizes: "256x256", type: "image/jpeg" },
          { src: absolute, sizes: "96x96", type: "image/jpeg" },
        ],
      });
    } catch { /* MediaMetadata unsupported */ }

    ms.playbackState = playing && ids.length > 0 ? "playing" : "paused";
  }, [focusedId, active, playing]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    const setAction = (action: MediaSessionAction, handler: (() => void) | null) => {
      try { ms.setActionHandler(action, handler as never); } catch { /* unsupported action */ }
    };
    setAction("play", () => { ensureCtx(); setPlaying(true); getBackgroundAudioElement()?.play().catch(() => {}); });
    setAction("pause", () => setPlaying(false));
    setAction("stop", () => { setActive({}); setPlaying(false); });
    setAction("nexttrack", () => nextPrev(1));
    setAction("previoustrack", () => nextPrev(-1));
    // Ambient soundscapes are endless loops, so there is no timeline to seek.
    // The handlers are registered (so iOS renders a consistent transport) but
    // intentionally do nothing rather than fake a position change.
    setAction("seekbackward", () => {});
    setAction("seekforward", () => {});
    return () => {
      (["play", "pause", "stop", "nexttrack", "previoustrack", "seekbackward", "seekforward"] as MediaSessionAction[])
        .forEach((a) => setAction(a, null));
    };
  }, [ensureCtx, nextPrev]);

  const toggleFavorite = useCallback((id: SoundId) =>
    setFavorites((prev) => {
      const removing = prev.includes(id);
      const uid = userIdRef.current;
      if (uid) {
        const q = removing
          ? supabase.from("favorites").delete().eq("user_id", uid).eq("sound_id", id)
          : supabase.from("favorites").upsert({ user_id: uid, sound_id: id });
        void q.then(({ error }) => { if (error) console.warn("favorite sync failed", error.message); });
      }
      return removing ? prev.filter((f) => f !== id) : [id, ...prev];
    }), []);
  const isFavorite = useCallback((id: SoundId) => favorites.includes(id), [favorites]);

  const api = useMemo<AudioApi>(() => ({
    active, playing, masterVolume, muted, loop, shuffle, focusedId, immersive,
    sleepTimerEndsAt, sleepTimerRemaining, savedMixes, favorites, recent,
    toggleTrack, playTrackSolo, stopTrack, stopAll, setTrackVolume,
    setMasterVolume, setMuted, toggleMute, play, pause, toggle, next, prev,
    setLoop, setShuffle, loadPlaylist, startImmersive, exitImmersive,
    getFocused, getTint,
    startSleepTimer, cancelSleepTimer,
    saveCurrentMix, deleteMix, renameMix, toggleFavoriteMix, loadMix,
    toggleFavorite, isFavorite,
  }), [active, playing, masterVolume, muted, loop, shuffle, focusedId, immersive,
      sleepTimerEndsAt, sleepTimerRemaining, savedMixes, favorites, recent,
      toggleTrack, playTrackSolo, stopTrack, stopAll, setTrackVolume,
      setMasterVolume, toggleMute, play, pause, toggle, next, prev,
      loadPlaylist, startImmersive, exitImmersive, getFocused, getTint,
      startSleepTimer, cancelSleepTimer,
      saveCurrentMix, deleteMix, renameMix, toggleFavoriteMix, loadMix,
      toggleFavorite, isFavorite]);

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