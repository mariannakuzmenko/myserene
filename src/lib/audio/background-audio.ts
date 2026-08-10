/**
 * iOS / mobile background audio support.
 *
 * WHY THIS EXISTS
 * ---------------
 * The mixer needs the Web Audio API (per-track gain + procedural generators).
 * On iOS Safari an AudioContext on its own does NOT own a "now playing"
 * media session: there is no Lock Screen / Control Center entry and the
 * context is suspended shortly after the app is backgrounded.
 *
 * The supported workaround is to keep one real HTMLAudioElement playing for
 * the whole session. That element claims the platform media session, which
 *   1. shows the Lock Screen / Control Center transport + our metadata, and
 *   2. keeps the audio session (and therefore the AudioContext) alive while
 *      Safari is backgrounded or the screen is locked.
 *
 * The element itself carries a near-silent looping tone (-90 dBFS dither), so
 * it never colours the mix; everything audible still comes from the Web Audio
 * graph out of ctx.destination.
 *
 * LIMITATIONS (documented, not faked): iOS may still tear the audio session
 * down under memory pressure or when another app takes audio focus, and
 * Safari never guarantees indefinite background execution. When that happens
 * we resume on the next foreground/gesture instead of pretending nothing
 * changed.
 */

let el: HTMLAudioElement | null = null;

/** 1s of 8-bit near-silence, looped. Small enough to inline as a data URI. */
function silentLoopDataUri(): string {
  const sampleRate = 8000;
  const frames = sampleRate; // 1 second, mono, 8-bit
  const dataSize = frames;
  const buf = new Uint8Array(44 + dataSize);
  const view = new DataView(buf.buffer);
  const ascii = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  ascii(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  ascii(8, "WAVE");
  ascii(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true);
  view.setUint16(32, 1, true);
  view.setUint16(34, 8, true);
  ascii(36, "data");
  view.setUint32(40, dataSize, true);
  // 8-bit PCM midpoint = 128 (silence); ±1 dither keeps the session "live".
  for (let i = 0; i < frames; i++) buf[44 + i] = 128 + (i % 2);

  let binary = "";
  for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
  return `data:audio/wav;base64,${btoa(binary)}`;
}

export function getBackgroundAudioElement(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (el) return el;
  el = new Audio(silentLoopDataUri());
  el.loop = true;
  el.volume = 0.001;
  el.preload = "auto";
  el.setAttribute("playsinline", "true");
  el.setAttribute("aria-hidden", "true");
  el.dataset["sereneKeepalive"] = "true";
  // Attached to the DOM (hidden) — Safari is more reliable about keeping the
  // media session alive for elements that live in the document.
  el.style.display = "none";
  document.body.appendChild(el);
  // Safari 16.4+: tell the OS this is long-form playback, not a UI sound.
  const audioSession = (navigator as any).audioSession;
  if (audioSession) {
    try { audioSession.type = "playback"; } catch { /* unsupported */ }
  }
  return el;
}

/** Start/stop the session anchor. Must be called from a user gesture first. */
export function setBackgroundAudioActive(active: boolean) {
  const a = getBackgroundAudioElement();
  if (!a) return;
  if (active) {
    void a.play().catch(() => { /* needs a gesture; retried on next tap */ });
  } else {
    a.pause();
  }
}

export function isMediaSessionSupported() {
  return typeof navigator !== "undefined" && "mediaSession" in navigator;
}
