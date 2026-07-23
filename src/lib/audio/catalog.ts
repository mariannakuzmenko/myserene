import type { LucideIcon } from "lucide-react";
import {
  CloudRain, Waves, Trees, Flame, Cloud, Wind, Bird, Music, Coffee,
  Mountain, Moon, Droplets, Zap, Leaf,
} from "lucide-react";

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
  cat: "Nature" | "Rain" | "Water" | "Focus" | "Cozy" | "Sleep" | "Ambient" | "Meditation" | "Weather";
  duration: string;
  icon: LucideIcon;
  grad: string;
  image: string;
  url: string;
  /** hex tint used by the immersive scene when this sound is active */
  tint: string;
}

const G = "https://actions.google.com/sounds/v1";

// Cinematic imagery per sound (Unsplash CDN)
const IMG = {
  rain:      "https://images.unsplash.com/photo-1493314894560-5c412a56c17c?auto=format&fit=crop&w=1600&q=70",
  heavyRain: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1600&q=70",
  window:    "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1600&q=70",
  forest:    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=70",
  birds:     "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1600&q=70",
  ocean:     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70",
  beach:     "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=70",
  waterfall: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=70",
  river:     "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=70",
  wind:      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=70",
  storm:     "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1600&q=70",
  fire:      "https://images.unsplash.com/photo-1493889104449-378abb43ad1a?auto=format&fit=crop&w=1600&q=70",
  night:     "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=70",
  noise:     "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?auto=format&fit=crop&w=1600&q=70",
  meditation:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=70",
  sleep:     "https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=1600&q=70",
  focus:     "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1600&q=70",
  zen:       "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=1600&q=70",
};

export const SOUND_CATALOG: SoundDef[] = [
  { id: "rain",         title: "Rain",           cat: "Rain",    duration: "∞", icon: CloudRain, grad: "from-sky-mist to-brand-soft", image: IMG.rain,      url: `${G}/ambiences/rain_on_roof.ogg`,             tint: "#6c8fb0" },
  { id: "heavy-rain",   title: "Heavy Rain",     cat: "Rain",    duration: "∞", icon: CloudRain, grad: "from-brand-soft to-brand",    image: IMG.heavyRain, url: `${G}/weather/heavy_rain.ogg`,                 tint: "#4b6c88" },
  { id: "rain-window",  title: "Rain on Window", cat: "Rain",    duration: "∞", icon: Droplets,  grad: "from-sky-ice to-sky-mist",    image: IMG.window,    url: `${G}/ambiences/rain_on_roof.ogg`,             tint: "#7a9cba" },
  { id: "forest",       title: "Forest",         cat: "Nature",  duration: "∞", icon: Trees,     grad: "from-sky-ice to-sky-mist",    image: IMG.forest,    url: `${G}/ambiences/forest_ambience.ogg`,          tint: "#3d7a52" },
  { id: "birds",        title: "Birds",          cat: "Nature",  duration: "∞", icon: Bird,      grad: "from-sky-mist to-brand-soft", image: IMG.birds,     url: `${G}/animals/birds_chirping.ogg`,             tint: "#7bb069" },
  { id: "ocean",        title: "Ocean",          cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.ocean,     url: `${G}/water/ocean_waves.ogg`,                  tint: "#1f6a8a" },
  { id: "beach",        title: "Beach Waves",    cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.beach,     url: `${G}/water/ocean_waves.ogg`,                  tint: "#e0a86e" },
  { id: "waterfall",    title: "Waterfall",      cat: "Water",   duration: "∞", icon: Waves,     grad: "from-sky-ice to-sky-mist",    image: IMG.waterfall, url: `${G}/water/waterfall.ogg`,                    tint: "#2c8fa8" },
  { id: "river",        title: "River",          cat: "Water",   duration: "∞", icon: Waves,     grad: "from-brand-soft to-brand",    image: IMG.river,     url: `${G}/water/creek_water_flowing.ogg`,          tint: "#4bb0b4" },
  { id: "wind",         title: "Wind",           cat: "Weather", duration: "∞", icon: Wind,      grad: "from-sky-ice to-sky-mist",    image: IMG.wind,      url: `${G}/weather/wind_blowing.ogg`,               tint: "#8fadb8" },
  { id: "storm",        title: "Thunderstorm",   cat: "Weather", duration: "∞", icon: Cloud,     grad: "from-brand-soft to-brand",    image: IMG.storm,     url: `${G}/weather/heavy_thunderstorm.ogg`,         tint: "#2f3d55" },
  { id: "fireplace",    title: "Fireplace",      cat: "Cozy",    duration: "∞", icon: Flame,     grad: "from-sky-mist to-brand-soft", image: IMG.fire,      url: `${G}/nature/campfire.ogg`,                    tint: "#d17a2a" },
  { id: "night-forest", title: "Night Forest",   cat: "Sleep",   duration: "∞", icon: Moon,      grad: "from-sky-mist to-brand-soft", image: IMG.night,     url: `${G}/ambiences/forest_ambience.ogg`,          tint: "#1a2540" },
  { id: "white-noise",  title: "White Noise",    cat: "Focus",   duration: "∞", icon: Music,     grad: "from-sky-ice to-sky-mist",    image: IMG.noise,     url: "",                                            tint: "#9aa4ab" },
  { id: "pink-noise",   title: "Pink Noise",     cat: "Focus",   duration: "∞", icon: Music,     grad: "from-brand-soft to-brand",    image: IMG.noise,     url: "",                                            tint: "#c98aa4" },
  { id: "brown-noise",  title: "Brown Noise",    cat: "Focus",   duration: "∞", icon: Music,     grad: "from-sky-mist to-brand-soft", image: IMG.noise,     url: "",                                            tint: "#8a6a52" },
  { id: "meditation",   title: "Meditation",     cat: "Meditation", duration: "45m", icon: Leaf, grad: "from-sky-ice to-sky-mist",    image: IMG.meditation,url: `${G}/ambiences/forest_ambience.ogg`,          tint: "#4ba58a" },
  { id: "deep-sleep",   title: "Deep Sleep",     cat: "Sleep",   duration: "9h", icon: Moon,     grad: "from-brand-soft to-brand",    image: IMG.sleep,     url: `${G}/ambiences/rain_on_roof.ogg`,             tint: "#2a3860" },
  { id: "focus",        title: "Focus",          cat: "Focus",   duration: "∞", icon: Zap,       grad: "from-sky-mist to-brand-soft", image: IMG.focus,     url: "",                                            tint: "#6a8fbb" },
  { id: "zen-garden",   title: "Zen Garden",     cat: "Meditation", duration: "∞", icon: Mountain, grad: "from-sky-ice to-sky-mist",  image: IMG.zen,       url: `${G}/water/creek_water_flowing.ogg`,          tint: "#7aa872" },
  { id: "cafe",         title: "Cafe",           cat: "Ambient", duration: "4h", icon: Coffee,   grad: "from-sky-ice to-sky-mist",    image: IMG.focus,     url: `${G}/ambiences/coffee_shop.ogg`,              tint: "#a67a52" },
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
    tracks: [{ id: "birds", volume: 55 }, { id: "forest", volume: 35 }] },
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
];

/** Legacy shape kept for the existing SoundCard usage on the home page. */
export const SOUND_LIBRARY = SOUND_CATALOG;
export type SoundItem = SoundDef;