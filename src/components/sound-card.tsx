import { useState } from "react";
import { Play, Pause, Heart, CloudRain, Waves, Trees, Flame, Cloud, Wind, Bird, Music, Coffee, Mountain, Moon } from "lucide-react";

export const SOUND_LIBRARY = [
  { icon: CloudRain, title: "Rain", duration: "8h", cat: "Nature", grad: "from-sky-mist to-brand-soft" },
  { icon: Waves, title: "Ocean", duration: "10h", cat: "Nature", grad: "from-brand-soft to-brand" },
  { icon: Trees, title: "Forest", duration: "6h", cat: "Nature", grad: "from-sky-ice to-sky-mist" },
  { icon: Flame, title: "Fireplace", duration: "5h", cat: "Cozy", grad: "from-sky-mist to-brand-soft" },
  { icon: Cloud, title: "Thunderstorm", duration: "4h", cat: "Nature", grad: "from-brand-soft to-brand" },
  { icon: Wind, title: "Wind", duration: "6h", cat: "Nature", grad: "from-sky-ice to-sky-mist" },
  { icon: Waves, title: "River", duration: "8h", cat: "Nature", grad: "from-brand-soft to-brand" },
  { icon: Bird, title: "Birds", duration: "3h", cat: "Nature", grad: "from-sky-mist to-brand-soft" },
  { icon: Music, title: "White Noise", duration: "12h", cat: "Focus", grad: "from-sky-ice to-sky-mist" },
  { icon: Music, title: "Pink Noise", duration: "12h", cat: "Focus", grad: "from-brand-soft to-brand" },
  { icon: Music, title: "Brown Noise", duration: "12h", cat: "Focus", grad: "from-sky-mist to-brand-soft" },
  { icon: Coffee, title: "Cafe", duration: "4h", cat: "Ambient", grad: "from-sky-ice to-sky-mist" },
  { icon: Mountain, title: "Mountain", duration: "6h", cat: "Nature", grad: "from-brand-soft to-brand" },
  { icon: Moon, title: "Night Forest", duration: "8h", cat: "Sleep", grad: "from-sky-mist to-brand-soft" },
  { icon: Music, title: "Meditation Music", duration: "45m", cat: "Meditation", grad: "from-sky-ice to-sky-mist" },
  { icon: Moon, title: "Sleep Music", duration: "9h", cat: "Sleep", grad: "from-brand-soft to-brand" },
];

export type SoundItem = (typeof SOUND_LIBRARY)[number];

export function SoundCard({ icon: Icon, title, duration, cat, grad }: SoundItem) {
  const [fav, setFav] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group">
      <div className={`relative h-40 bg-gradient-to-br ${grad} overflow-hidden`}>
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
        </div>
        <button
          onClick={() => setFav(!fav)}
          aria-label="Favorite"
          className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full glass"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-red-400 text-red-400" : "text-ink-soft"}`} />
        </button>
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-ink-soft">{cat}</div>
          <div className="mt-0.5 text-lg font-semibold">{title}</div>
          <div className="text-xs text-ink-soft mt-0.5">{duration}</div>
        </div>
        <button
          onClick={() => setPlaying(!playing)}
          className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
      </div>
    </div>
  );
}