import { Play, Pause, Heart } from "lucide-react";
import { SOUND_CATALOG, type SoundDef } from "@/lib/audio/catalog";
import { useAudio } from "@/lib/audio/audio-provider";
import { SmartImage } from "@/components/smart-image";

export { SOUND_CATALOG as SOUND_LIBRARY };
export type SoundItem = SoundDef;

export function SoundCard(s: SoundDef) {
  const { icon: Icon, title, duration, cat, grad, image, id } = s;
  const audio = useAudio();
  const fav = audio.isFavorite(id);
  const playing = id in audio.active;
  return (
    <div className="glass-card rounded-3xl overflow-hidden transition-all hover:-translate-y-1 group flex h-full flex-col">
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${grad} overflow-hidden`}>
        <SmartImage
          src={image}
          alt={`${title} — ${cat} soundscape`}
          className="group-hover:scale-105 transition-transform duration-[1200ms]"
        />
        <div className="absolute inset-0 scrim-bottom" />
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="h-12 w-12 sm:h-14 sm:w-14 sound-icon-on-image group-hover:scale-110 transition-transform duration-500" />
        </div>
        {/* Inset overlay layer keeps every badge/icon clear of the card border */}
        <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-end">
            <button
              onClick={(e) => { e.stopPropagation(); audio.toggleFavorite(id); }}
              aria-label={fav ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
              aria-pressed={fav}
              className="pointer-events-auto grid place-items-center h-11 w-11 rounded-full icon-control transition hover:scale-105"
            >
              <Heart className={`h-4 w-4 ${fav ? "fill-red-500 text-red-500" : "text-ink"}`} />
            </button>
          </div>
          {playing && (
            <div className="glass rounded-full px-2.5 py-1 flex items-center gap-1.5 self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-shimmer" />
              <span className="text-[10px] font-semibold text-ink">Playing</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">{cat}</div>
          <div className="mt-0.5 text-base sm:text-lg font-semibold text-ink truncate">{title}</div>
          <div className="text-xs font-medium text-ink-soft mt-0.5">{duration}</div>
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