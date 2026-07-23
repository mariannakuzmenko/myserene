import { useState } from "react";
import { Play, Pause, Heart } from "lucide-react";
import { SOUND_CATALOG, type SoundDef } from "@/lib/audio/catalog";
import { useAudio } from "@/lib/audio/audio-provider";

export { SOUND_CATALOG as SOUND_LIBRARY };
export type SoundItem = SoundDef;

export function SoundCard(s: SoundDef) {
  const { icon: Icon, title, duration, cat, grad, image, id } = s;
  const [fav, setFav] = useState(false);
  const audio = useAudio();
  const playing = id in audio.active;
  return (
    <div className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group">
      <div className={`relative h-40 bg-gradient-to-br ${grad} overflow-hidden`}>
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1200ms]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="h-14 w-14 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
          aria-label="Favorite"
          className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full glass"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-red-400 text-red-400" : "text-ink-soft"}`} />
        </button>
        {playing && (
          <div className="absolute bottom-3 left-3 glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-shimmer" />
            <span className="text-[10px] font-medium">Playing</span>
          </div>
        )}
      </div>
      <div className="p-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-widest text-ink-soft">{cat}</div>
          <div className="mt-0.5 text-lg font-semibold truncate">{title}</div>
          <div className="text-xs text-ink-soft mt-0.5">{duration}</div>
        </div>
        <button
          onClick={() => audio.toggleTrack(id, 70)}
          className="grid place-items-center h-11 w-11 rounded-full btn-primary shrink-0"
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          aria-pressed={playing}
        >
          {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>
      </div>
    </div>
  );
}