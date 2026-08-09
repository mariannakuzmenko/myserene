import type { LucideIcon } from "lucide-react";
import {
  CloudRain, Waves, Trees, Flame, Cloud, Wind, Bird, Music, Coffee,
  Mountain, Moon, Droplets, Zap, Leaf, Bell, Tent, Home, Piano,
  Sunrise, Activity, Radio, Sparkles,
} from "lucide-react";
import type { SynthKind } from "./synth";

/**
 * Sound catalog. URLs point at the public Google Actions ambient
 * sound library (royalty-free, CORS-enabled, safe for demos).
 * To swap in a private library (S3 / R2 / Supabase Storage) later,
 * only the `url` field needs to change — every consumer reads
 * through this catalog.
 */
export type SoundId = string;

export interface SoundDef {
  id: SoundId;
  title: string;
  cat: "Nature" | "Rain" | "Water" | "Focus" | "Cozy" | "Sleep" | "Ambient" | "Meditation" | "Weather" | "Zen" | "Music" | "Frequencies";
  duration: string;
  icon: LucideIcon;
  grad: string;
  image: string;
  /** Procedural synthesis recipe (always defined; used unless `url` is set). */
  synth: SynthKind;
  /** Optional remote audio (S3 / R2 / Supabase Storage). Takes precedence over `synth`. */
  url?: string;
  /** hex tint used by the immersive scene when this sound is active */
  tint: string;
}

// Cinematic imagery per sound — every URL resolves through the curated
// collection in `@/lib/images` (verified IDs, one art direction).
const IMG = {
  rain: P.rain,
  heavyRain: P.heavyRain,
  window: P.rainWindow,
  tent: P.rainTent,
  forest: P.forest,
  sunlitForest: P.sunlitForest,
  birds: P.forestBirds,
  ocean: P.ocean,
  calmSea: P.calmSea,
  beach: P.beach,
  waterfall: P.waterfall,
  river: P.river,
  stream: P.stream,
  wind: P.meadow,
  mountain: P.mountain,
  storm: P.thunderstorm,
  stormyOcean: P.stormyOcean,
  fire: P.fireplace,
  campfire: P.campfire,
  cracklingFire: P.cracklingFire,
  cabin: P.cozyCabin,
  night: P.nightForest,
  starry: P.starryNight,
  noise: P.hush,
  meditation: P.meditation,
  sleep: P.sleep,
  focus: P.focus,
  zen: P.zenGarden,
};

/** Extra cinematic imagery for the expanded library. */
const IMG2 = {
  sunriseForest: P.sunriseForest,
  mistForest: P.deepForest,
  bamboo: P.bamboo,
  oceanSunset: P.oceanSunset,
  mountains: P.alpineMorning,
  piano: P.piano,
  calmLake: P.calmLake,
  quietRoom: P.quietRoom,
  sunrise: P.sunrise,
  temple: P.temple,
  chimes: P.windChimes,
  bowls: P.singingBowls,
  bowls2: P.bowls,
  strings: P.strings,
  ambient: P.softAmbient,
  whiteHush: P.whiteHush,
  pinkHush: P.pinkHush,
  brownHush: P.brownHush,
  greenValley: P.greenValley,
  cafe: P.cafe,
  stillness: P.stillness,
  moonlight: P.moonlight,
  aurora: P.aurora,
  lakeReflection: P.lakeReflection,
};

export const SOUND_CATALOG: SoundDef[] = [
  // ---------------- Nature ----------------
  { id: "morning-birds", title: "Morning Birds", cat: "Nature",  duration: "∞", icon: Sunrise,   grad: "from-sky-mist to-brand-soft", image: IMG2.sunriseForest, synth: "birds-morning", tint: "#e0b06e" },
  { id: "birds",        title: "Forest Birds",   cat: "Nature",  duration: "∞", icon: Bird,      grad: "from-sky-mist to-brand-soft", image: IMG.birds,     synth: "birds-morning", tint: "#7bb069" },
  { id: "deep-forest",  title: "Deep Forest",    cat: "Nature",  duration: "∞", icon: Trees,     grad: "from-sky-ice to-sky-mist",    image: IMG2.mistForest, synth: "deep-forest", tint: "#2f6144" },
  { id: "bamboo",       title: "Bamboo Forest",  cat: "Nature",  duration: "∞", icon: Leaf,      grad: "from-sky-ice to-sky-mist",    image: IMG2.bamboo,   synth: "bamboo",      tint: "#5c9a5f" },
  { id: "rain",         title: "Rain",           cat: "Rain",    duration: "∞", icon: CloudRain, grad: "from-sky-mist to-brand-soft", image: IMG.rain,      synth: "rain-light",  tint: "#6c8fb0" },
  { id: "heavy-rain",   title: "Heavy Rain",     cat: "Rain",    duration: "∞", icon: CloudRain, grad: "from-brand-soft to-brand",    image: IMG.heavyRain, synth: "rain-heavy",  tint: "#4b6c88" },
  { id: "rain-window",  title: "Rain on Window", cat: "Rain",    duration: "∞", icon: Droplets,  grad: "from-sky-ice to-sky-mist",    image: IMG.window,    synth: "rain-window", tint: "#7a9cba" },
  { id: "rain-tent",    title: "Rain on Tent",   cat: "Rain",    duration: "∞", icon: Tent,      grad: "from-sky-ice to-sky-mist",    image: IMG.forest,    synth: "rain-tent",   tint: "#5f7f6a" },
  { id: "forest",       title: "Forest",         cat: "Nature",  duration: "∞", icon: Trees,     grad: "from-sky-ice to-sky-mist",    image: IMG.forest,    synth: "forest",      tint: "#3d7a52" },
  { id: "stream",       title: "Gentle Stream",  cat: "Water",   duration: "∞", icon: Droplets,  grad: "from-sky-ice to-sky-mist",    image: IMG.river,     synth: "stream",      tint: "#4aa0a8" },
  { id: "ocean",        title: "Ocean Waves",    cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.ocean,     synth: "ocean",       tint: "#1f6a8a" },
  { id: "calm-sea",     title: "Calm Sea",       cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.beach,     synth: "calm-sea",    tint: "#4fb3c4" },
  { id: "ocean-sunset", title: "Ocean at Sunset",cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG2.oceanSunset, synth: "ocean-sunset", tint: "#e09a5e" },
  { id: "stormy-ocean", title: "Stormy Ocean",   cat: "Weather", duration: "∞", icon: Cloud,     grad: "from-brand-soft to-brand",    image: IMG.storm,     synth: "stormy-ocean", tint: "#334358" },
  { id: "beach",        title: "Beach Waves",    cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.beach,     synth: "beach",       tint: "#e0a86e" },
  { id: "waterfall",    title: "Waterfall",      cat: "Water",   duration: "∞", icon: Waves,     grad: "from-sky-ice to-sky-mist",    image: IMG.waterfall, synth: "waterfall",   tint: "#2c8fa8" },
  { id: "river",        title: "River",          cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.river,     synth: "river",       tint: "#4bb0b4" },
  { id: "wind",         title: "Wind",           cat: "Weather", duration: "∞", icon: Wind,      grad: "from-sky-ice to-sky-mist",    image: IMG.wind,      synth: "wind",        tint: "#8fadb8" },
  { id: "mountain-wind",title: "Mountain Wind",  cat: "Weather", duration: "∞", icon: Mountain,  grad: "from-sky-ice to-sky-mist",    image: IMG2.mountains, synth: "mountain-wind", tint: "#7f97a8" },
  { id: "storm",        title: "Thunderstorm",   cat: "Weather", duration: "∞", icon: Cloud,     grad: "from-brand-soft to-brand",    image: IMG.storm,     synth: "storm",       tint: "#2f3d55" },
  { id: "night-forest", title: "Night Forest",   cat: "Sleep",   duration: "∞", icon: Moon,      grad: "from-sky-mist to-brand-soft", image: IMG.night,     synth: "night-forest",tint: "#1a2540" },

  // ---------------- Fire & cozy ----------------
  { id: "fireplace",    title: "Fireplace",      cat: "Cozy",    duration: "∞", icon: Flame,     grad: "from-sky-mist to-brand-soft", image: IMG.fire,      synth: "fire",        tint: "#d17a2a" },
  { id: "campfire",     title: "Campfire",       cat: "Cozy",    duration: "∞", icon: Flame,     grad: "from-sky-mist to-brand-soft", image: IMG.night,     synth: "campfire",    tint: "#c96a2c" },
  { id: "crackling-fire", title: "Crackling Fire", cat: "Cozy",  duration: "∞", icon: Flame,     grad: "from-sky-mist to-brand-soft", image: IMG.fire,      synth: "crackling-fire", tint: "#e08a3c" },
  { id: "cozy-cabin",   title: "Cozy Cabin",     cat: "Cozy",    duration: "∞", icon: Home,      grad: "from-sky-ice to-sky-mist",    image: IMG.window,    synth: "cozy-cabin",  tint: "#a5794f" },

  // ---------------- Zen & meditation ----------------
  { id: "wind-chimes",  title: "Wind Chimes",    cat: "Zen",     duration: "∞", icon: Bell,      grad: "from-sky-ice to-sky-mist",    image: IMG2.quietRoom, synth: "wind-chimes", tint: "#8fb8c4" },
  { id: "temple-bells", title: "Temple Bells",   cat: "Zen",     duration: "∞", icon: Bell,      grad: "from-sky-mist to-brand-soft", image: IMG.zen,       synth: "temple-bells", tint: "#b08a4a" },
  { id: "tibetan-bowls",title: "Tibetan Singing Bowls", cat: "Zen", duration: "∞", icon: Sparkles, grad: "from-sky-ice to-sky-mist",  image: IMG.meditation, synth: "tibetan-bowls", tint: "#9a7f5a" },
  { id: "singing-bowls",title: "Singing Bowls",  cat: "Zen",     duration: "∞", icon: Sparkles,  grad: "from-sky-ice to-sky-mist",    image: IMG.meditation, synth: "singing-bowls", tint: "#6fa89a" },
  { id: "drone",        title: "Meditation Drone", cat: "Meditation", duration: "∞", icon: Radio, grad: "from-sky-ice to-sky-mist",    image: IMG2.mistForest, synth: "drone",     tint: "#5b8f9a" },
  { id: "piano",        title: "Gentle Piano",   cat: "Music",   duration: "∞", icon: Piano,     grad: "from-sky-ice to-sky-mist",    image: IMG2.piano,    synth: "piano",       tint: "#8e93a8" },
  { id: "soft-ambient", title: "Soft Ambient Music", cat: "Music", duration: "∞", icon: Music,   grad: "from-sky-mist to-brand-soft", image: IMG2.calmLake, synth: "soft-ambient", tint: "#79a8b8" },
  { id: "strings",      title: "Soft Strings",   cat: "Music",   duration: "∞", icon: Music,     grad: "from-sky-ice to-sky-mist",    image: IMG2.sunrise,  synth: "strings",     tint: "#b08fa8" },

  // ---------------- Noise ----------------
  { id: "white-noise",  title: "White Noise",    cat: "Focus",   duration: "∞", icon: Music,     grad: "from-sky-ice to-sky-mist",    image: IMG.noise,     synth: "white",       tint: "#9aa4ab" },
  { id: "pink-noise",   title: "Pink Noise",     cat: "Focus",   duration: "∞", icon: Music,     grad: "from-brand-soft to-brand",    image: IMG.noise,     synth: "pink",        tint: "#c98aa4" },
  { id: "brown-noise",  title: "Brown Noise",    cat: "Focus",   duration: "∞", icon: Music,     grad: "from-sky-mist to-brand-soft", image: IMG.noise,     synth: "brown",       tint: "#8a6a52" },
  { id: "green-noise",  title: "Green Noise",    cat: "Focus",   duration: "∞", icon: Music,     grad: "from-sky-ice to-sky-mist",    image: IMG.forest,    synth: "green",       tint: "#6f9a72" },

  // ---------------- Sessions ----------------
  { id: "meditation",   title: "Meditation",     cat: "Meditation", duration: "45m", icon: Leaf, grad: "from-sky-ice to-sky-mist",    image: IMG.meditation,synth: "meditation",  tint: "#4ba58a" },
  { id: "deep-sleep",   title: "Deep Sleep",     cat: "Sleep",   duration: "9h", icon: Moon,     grad: "from-brand-soft to-brand",    image: IMG.sleep,     synth: "sleep",       tint: "#2a3860" },
  { id: "focus",        title: "Focus",          cat: "Focus",   duration: "∞", icon: Zap,       grad: "from-sky-mist to-brand-soft", image: IMG.focus,     synth: "focus",       tint: "#6a8fbb" },
  { id: "zen-garden",   title: "Zen Garden",     cat: "Meditation", duration: "∞", icon: Mountain, grad: "from-sky-ice to-sky-mist",  image: IMG.zen,       synth: "zen",         tint: "#7aa872" },
  { id: "cafe",         title: "Cafe",           cat: "Ambient", duration: "4h", icon: Coffee,   grad: "from-sky-ice to-sky-mist",    image: IMG.focus,     synth: "cafe",        tint: "#a67a52" },

  // ---------------- Relaxation frequencies ----------------
  { id: "alpha",      title: "Alpha Range",     cat: "Frequencies", duration: "∞", icon: Activity, grad: "from-sky-ice to-sky-mist",   image: IMG2.calmLake, synth: "alpha",      tint: "#5f9ec4" },
  { id: "theta",      title: "Theta Range",     cat: "Frequencies", duration: "∞", icon: Activity, grad: "from-sky-mist to-brand-soft",image: IMG2.mistForest, synth: "theta",    tint: "#6f7fb8" },
  { id: "delta",      title: "Delta Range",     cat: "Frequencies", duration: "∞", icon: Activity, grad: "from-brand-soft to-brand",   image: IMG.night,     synth: "delta",      tint: "#3a4470" },
  { id: "binaural",   title: "Binaural Beats",  cat: "Frequencies", duration: "∞", icon: Radio,    grad: "from-sky-ice to-sky-mist",   image: IMG2.quietRoom, synth: "binaural",  tint: "#7f9ab8" },
  { id: "isochronic", title: "Isochronic Tones",cat: "Frequencies", duration: "∞", icon: Radio,    grad: "from-sky-mist to-brand-soft",image: IMG.focus,     synth: "isochronic", tint: "#8f8fb8" },
];

export const SOUND_BY_ID: Record<SoundId, SoundDef> = Object.fromEntries(
  SOUND_CATALOG.map((s) => [s.id, s]),
);

export interface PlaylistDef {
  id: string;
  title: string;
  description: string;
  tracks: { id: SoundId; volume: number }[];
}

export const PLAYLISTS: PlaylistDef[] = [
  { id: "deep-sleep",    title: "Deep Sleep",       description: "Gentle rain and distant thunder for a full night's rest.",
    tracks: [{ id: "rain", volume: 55 }, { id: "storm", volume: 15 }, { id: "wind", volume: 20 }] },
  { id: "morning-calm",  title: "Morning Calm",     description: "Birdsong and a bright forest to greet the day.",
    tracks: [{ id: "morning-birds", volume: 55 }, { id: "forest", volume: 35 }] },
  { id: "ocean-escape",  title: "Ocean Escape",     description: "Slow waves and a sea breeze.",
    tracks: [{ id: "ocean", volume: 65 }, { id: "wind", volume: 20 }, { id: "birds", volume: 10 }] },
  { id: "forest-med",    title: "Forest Meditation",description: "Deep woodland presence.",
    tracks: [{ id: "forest", volume: 60 }, { id: "birds", volume: 25 }, { id: "river", volume: 25 }] },
  { id: "focus-mode",    title: "Focus Mode",       description: "Steady rain — quiet, productive.",
    tracks: [{ id: "rain", volume: 60 }, { id: "brown-noise", volume: 20 }] },
  { id: "relax-evening", title: "Relax Evening",    description: "Fireplace with a soft breeze.",
    tracks: [{ id: "fireplace", volume: 65 }, { id: "wind", volume: 20 }] },
  { id: "stress-relief", title: "Stress Relief",    description: "Waterfall and forest — nature's reset.",
    tracks: [{ id: "waterfall", volume: 55 }, { id: "forest", volume: 30 }] },
  { id: "rainy-day",     title: "Rainy Day",        description: "Heavy rain on rooftops.",
    tracks: [{ id: "heavy-rain", volume: 70 }, { id: "wind", volume: 25 }] },
  { id: "zen-garden",    title: "Zen Garden",       description: "Trickling water and mountain quiet.",
    tracks: [{ id: "zen-garden", volume: 60 }, { id: "birds", volume: 15 }] },
  { id: "campfire-night",title: "Campfire Night",   description: "Crackling campfire under a still night sky.",
    tracks: [{ id: "campfire", volume: 60 }, { id: "night-forest", volume: 30 }] },
  { id: "zen-temple",    title: "Zen Temple",       description: "Temple bells and bamboo in the breeze.",
    tracks: [{ id: "temple-bells", volume: 45 }, { id: "bamboo", volume: 40 }] },
  { id: "piano-rain",    title: "Piano & Rain",     description: "Sparse piano over soft rainfall.",
    tracks: [{ id: "piano", volume: 55 }, { id: "rain", volume: 35 }] },
];

/** Relaxation frequency experiences — scientifically responsible copy, no medical claims. */
export interface FrequencyDef {
  id: SoundId;
  title: string;
  range: string;
  blurb: string;
  note?: string;
}

export const FREQUENCIES: FrequencyDef[] = [
  { id: "alpha", title: "Alpha Range", range: "8–12 Hz",
    blurb: "A gentle 10 Hz amplitude pulse over a soft tone. Alpha activity is commonly associated with relaxed wakefulness." },
  { id: "theta", title: "Theta Range", range: "4–8 Hz",
    blurb: "A slower 6 Hz pulse, commonly used in meditation and relaxation practices." },
  { id: "delta", title: "Delta Range", range: "0.5–4 Hz",
    blurb: "A deep, slow 2 Hz pulse. Delta activity is commonly associated with deep sleep and slow-wave brain activity." },
  { id: "binaural", title: "Binaural Beats", range: "200 Hz / 208 Hz",
    blurb: "Two slightly different tones are presented separately to the left and right ears, producing a perceived beat.",
    note: "Headphones required. Evidence for relaxation and cognitive effects is mixed, and individual responses vary." },
  { id: "isochronic", title: "Isochronic Tones", range: "8 Hz pulse",
    blurb: "A single tone switched on and off in a steady rhythm.",
    note: "Does not depend on stereo separation the way binaural beats do, so headphones are optional." },
];

/** Legacy shape kept for the existing SoundCard usage on the home page. */
export const SOUND_LIBRARY = SOUND_CATALOG;
export type SoundItem = SoundDef;