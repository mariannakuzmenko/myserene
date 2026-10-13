import { useEffect, useRef, useState } from "react";
import oceanVideo from "@/assets/hero-premium.mp4.asset.json";
import oceanWebm from "@/assets/hero-premium.webm.asset.json";
import oceanPoster from "@/assets/hero-premium.jpg.asset.json";
import emergencyOcean from "@/assets/ocean-emergency-fallback.jpg";

// The asset gateway lives on Lovable, not on an exported Netlify deployment.
const assetUrl = (path: string) => new URL(path, "https://myserene.lovable.app").href;

export function HeroOceanBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    // A cached image failure can happen before React hydrates its error handler.
    const poster = posterRef.current;
    if (poster?.complete && poster.naturalWidth === 0) setPosterFailed(true);
    const video = videoRef.current;
    if (!video) return;
    // Set the property too: Safari must see muted before a programmatic play.
    video.muted = true;
    video.defaultMuted = true;
    const resume = () => {
      if (document.hidden || video.error) return;
      void video.play().catch(() => setPlaying(false));
    };
    resume();
    let previousTime = video.currentTime;
    let unchanged = 0;
    const watchdog = window.setInterval(() => {
      const advanced = video.currentTime !== previousTime;
      unchanged = advanced ? 0 : unchanged + 1;
      previousTime = video.currentTime;
      if (advanced && !video.paused && video.readyState >= 2) setPlaying(true);
      if (unchanged >= 3 || video.paused || video.error) setPlaying(false);
    }, 1000);
    document.addEventListener("visibilitychange", resume);
    return () => {
      window.clearInterval(watchdog);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Bundled, independent ocean image remains behind both CDN resources. */}
      <img src={emergencyOcean} alt="" width={1600} height={912} fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center" />
      {!posterFailed && <img ref={posterRef} src={assetUrl(oceanPoster.url)} alt="" width={1600} height={900}
        fetchPriority="high" onError={() => setPosterFailed(true)}
        className="absolute inset-0 h-full w-full object-cover object-center [filter:saturate(1.1)_contrast(1.05)]" />}
      {!failed && <video ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover object-center [filter:saturate(1.1)_contrast(1.05)] ${playing ? "visible" : "invisible"}`}
        poster={assetUrl(oceanPoster.url)} autoPlay loop muted playsInline preload="auto"
        onPlaying={() => setPlaying(true)}
        onWaiting={() => setPlaying(false)} onStalled={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setFailed(true); }}
      >
        <source src={assetUrl(oceanVideo.url)} type={'video/mp4; codecs="avc1.640028"'} />
        <source src={assetUrl(oceanWebm.url)} type="video/webm" />
      </video>}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,30,24,0.72)] via-[rgba(4,30,24,0.38)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[rgba(4,30,24,0.45)] to-transparent" />
    </div>
  );
}