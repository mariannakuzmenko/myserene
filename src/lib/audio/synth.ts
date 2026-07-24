/**
 * Procedural ambient sound synthesis.
 *
 * Every sound in the catalog is generated on-the-fly as a seamless
 * stereo AudioBuffer. This removes all dependencies on remote audio
 * hosting (no CORS, no 404s, works offline).
 *
 * The catalog still exposes an optional `url` field — when a real
 * recording is provided (S3 / R2 / Supabase Storage) the provider
 * uses it in preference to synthesis, so the frontend never changes
 * when audio files are added.
 */

export type SynthKind =
  | "white" | "pink" | "brown"
  | "rain-light" | "rain-heavy" | "rain-window"
  | "ocean" | "beach" | "waterfall" | "river"
  | "forest" | "birds" | "night-forest"
  | "wind" | "storm" | "fire"
  | "meditation" | "sleep" | "focus" | "zen" | "cafe";

/** Seedable PRNG so buffers loop deterministically per session. */
function rng(seed: number) {
  let s = seed | 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) / 0xffffffff) * 2 - 1;
  };
}

/** Simple one-pole low-pass. */
function lp(prev: number, x: number, a: number) {
  return prev + a * (x - prev);
}

/** Crossfade the last `fade` samples with the first `fade` samples so the buffer loops seamlessly. */
function seamlessLoop(data: Float32Array, fade: number) {
  const n = data.length;
  for (let i = 0; i < fade; i++) {
    const t = i / fade;
    const head = data[i];
    const tail = data[n - fade + i];
    // ease in/out
    const w = 0.5 - 0.5 * Math.cos(Math.PI * t);
    data[i] = head * w + tail * (1 - w);
  }
  // trim the tail — it has been folded into the head
  return data.subarray(0, n - fade);
}

function fillNoise(
  data: Float32Array,
  kind: "white" | "pink" | "brown",
  seed: number,
  gain = 1,
) {
  const r = rng(seed);
  if (kind === "white") {
    for (let i = 0; i < data.length; i++) data[i] = r() * gain;
    return;
  }
  if (kind === "pink") {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < data.length; i++) {
      const w = r();
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11 * gain;
      b6 = w * 0.115926;
    }
    return;
  }
  // brown
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const w = r();
    last = (last + 0.02 * w) / 1.02;
    data[i] = last * 3.5 * gain;
  }
}

/** Band-pass-ish: high-passed pink noise via subtracting a heavily-smoothed copy. */
function bandPink(out: Float32Array, seed: number, cutoff: number, gain: number) {
  fillNoise(out, "pink", seed, 1);
  let s = 0;
  for (let i = 0; i < out.length; i++) {
    s = lp(s, out[i], cutoff);
    out[i] = (out[i] - s) * gain;
  }
}

/** Sprinkle short exponentially-decaying impulses (drops, crackle, chirps). */
function sprinkle(
  data: Float32Array,
  seed: number,
  density: number,       // events per second
  sampleRate: number,
  amp: number,
  decayMs: number,
  freq?: number,         // if provided, event is a decaying sine (chirp/tone)
) {
  const r = rng(seed);
  const totalEvents = Math.floor((data.length / sampleRate) * density);
  const decaySamples = Math.max(1, Math.floor((decayMs / 1000) * sampleRate));
  for (let e = 0; e < totalEvents; e++) {
    const start = Math.floor(((r() + 1) * 0.5) * (data.length - decaySamples));
    const level = amp * (0.4 + 0.6 * Math.abs(r()));
    const f = freq ? freq * (0.85 + 0.3 * Math.abs(r())) : 0;
    for (let i = 0; i < decaySamples; i++) {
      const env = Math.exp(-i / (decaySamples * 0.35));
      const s = freq
        ? Math.sin((2 * Math.PI * f * i) / sampleRate) * env * level
        : (r() * env * level);
      data[start + i] += s;
    }
  }
}

/** Add a slow amplitude envelope (waves, breathing wind). */
function amModulate(data: Float32Array, sampleRate: number, hz: number, depth: number, phase = 0) {
  const w = (2 * Math.PI * hz) / sampleRate;
  for (let i = 0; i < data.length; i++) {
    const m = 1 - depth + depth * (0.5 + 0.5 * Math.sin(i * w + phase));
    data[i] *= m;
  }
}

/** Add a soft continuous tone (meditation drone). */
function addTone(data: Float32Array, sampleRate: number, hz: number, amp: number, phase = 0) {
  const w = (2 * Math.PI * hz) / sampleRate;
  for (let i = 0; i < data.length; i++) data[i] += Math.sin(i * w + phase) * amp;
}

/**
 * Build a stereo AudioBuffer for the given synth kind.
 * Length ~18s + 2s crossfade tail so looping is seamless.
 */
export function buildSoundBuffer(ctx: AudioContext, kind: SynthKind): AudioBuffer {
  const sr = ctx.sampleRate;
  const seconds = 18;
  const fadeSec = 2;
  const rawLen = Math.floor(sr * (seconds + fadeSec));
  const finalLen = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, finalLen, sr);

  for (let ch = 0; ch < 2; ch++) {
    const raw = new Float32Array(rawLen);
    const seed = 0xC0FFEE + ch * 1337 + kindSeed(kind);

    switch (kind) {
      case "white":
        fillNoise(raw, "white", seed, 0.35);
        break;
      case "pink":
        fillNoise(raw, "pink", seed, 0.9);
        break;
      case "brown":
        fillNoise(raw, "brown", seed, 0.9);
        break;

      case "rain-light":
        bandPink(raw, seed, 0.02, 0.9);
        sprinkle(raw, seed + 11, 90, sr, 0.05, 15);
        break;
      case "rain-heavy":
        bandPink(raw, seed, 0.05, 1.2);
        sprinkle(raw, seed + 13, 260, sr, 0.08, 12);
        // low rumble
        {
          const rumble = new Float32Array(rawLen);
          fillNoise(rumble, "brown", seed + 5, 0.5);
          for (let i = 0; i < raw.length; i++) raw[i] += rumble[i] * 0.25;
        }
        break;
      case "rain-window":
        bandPink(raw, seed, 0.015, 0.7);
        sprinkle(raw, seed + 17, 45, sr, 0.11, 22);
        break;

      case "ocean":
        fillNoise(raw, "brown", seed, 1);
        amModulate(raw, sr, 0.11, 0.75, ch * 0.4);
        // spray on the crest
        {
          const spray = new Float32Array(rawLen);
          bandPink(spray, seed + 3, 0.04, 0.7);
          amModulate(spray, sr, 0.11, 0.9, ch * 0.4 + Math.PI * 0.15);
          for (let i = 0; i < raw.length; i++) raw[i] += spray[i] * 0.35;
        }
        break;
      case "beach":
        fillNoise(raw, "brown", seed, 0.9);
        amModulate(raw, sr, 0.14, 0.7, ch * 0.5);
        sprinkle(raw, seed + 91, 2, sr, 0.08, 350, 1200); // sparse gull
        break;
      case "waterfall":
        bandPink(raw, seed, 0.08, 1.4);
        // slow shimmer
        amModulate(raw, sr, 0.35, 0.08, ch * 0.3);
        break;
      case "river":
        bandPink(raw, seed, 0.04, 1.0);
        sprinkle(raw, seed + 21, 25, sr, 0.06, 40);
        amModulate(raw, sr, 0.25, 0.15);
        break;

      case "forest":
        fillNoise(raw, "pink", seed, 0.55);
        amModulate(raw, sr, 0.08, 0.4);
        // occasional distant chirps
        sprinkle(raw, seed + 43, 0.9, sr, 0.14, 140, 2600);
        sprinkle(raw, seed + 47, 0.6, sr, 0.12, 180, 3200);
        break;
      case "birds":
        fillNoise(raw, "pink", seed, 0.28);
        sprinkle(raw, seed + 61, 2.2, sr, 0.22, 120, 2800);
        sprinkle(raw, seed + 63, 1.4, sr, 0.18, 160, 3600);
        sprinkle(raw, seed + 65, 0.8, sr, 0.16, 220, 2100);
        break;
      case "night-forest":
        fillNoise(raw, "pink", seed, 0.22);
        // crickets = high-frequency ticks
        sprinkle(raw, seed + 71, 14, sr, 0.05, 30, 4800);
        sprinkle(raw, seed + 73, 9, sr, 0.04, 40, 5200);
        // occasional owl-like tone
        sprinkle(raw, seed + 79, 0.15, sr, 0.15, 500, 380);
        break;

      case "wind":
        fillNoise(raw, "brown", seed, 1);
        amModulate(raw, sr, 0.09, 0.7, ch * 0.3);
        {
          const gust = new Float32Array(rawLen);
          bandPink(gust, seed + 7, 0.03, 0.9);
          amModulate(gust, sr, 0.13, 0.85, ch * 0.3 + 0.6);
          for (let i = 0; i < raw.length; i++) raw[i] += gust[i] * 0.4;
        }
        break;
      case "storm":
        bandPink(raw, seed, 0.05, 1.1);
        sprinkle(raw, seed + 13, 240, sr, 0.08, 12);
        // thunder rumble events
        {
          const rumble = new Float32Array(rawLen);
          fillNoise(rumble, "brown", seed + 5, 1);
          const rr = rng(seed + 101);
          for (let e = 0; e < 3; e++) {
            const start = Math.floor(((rr() + 1) * 0.5) * (rawLen - sr * 3));
            const dur = Math.floor(sr * (2 + Math.abs(rr()) * 2));
            for (let i = 0; i < dur; i++) {
              const env = Math.pow(1 - i / dur, 2.2);
              raw[start + i] += rumble[start + i] * env * 1.4;
            }
          }
        }
        break;
      case "fire":
        fillNoise(raw, "brown", seed, 0.35);
        sprinkle(raw, seed + 31, 22, sr, 0.14, 45);
        sprinkle(raw, seed + 33, 6, sr, 0.22, 90);
        // very slow warm shimmer
        amModulate(raw, sr, 0.6, 0.08);
        break;

      case "meditation":
        fillNoise(raw, "pink", seed, 0.18);
        addTone(raw, sr, 110, 0.06, ch * 0.4);
        addTone(raw, sr, 165, 0.04, ch * 0.6);
        addTone(raw, sr, 220, 0.03, ch * 0.2);
        amModulate(raw, sr, 0.05, 0.25);
        break;
      case "sleep":
        fillNoise(raw, "brown", seed, 0.55);
        addTone(raw, sr, 70, 0.05);
        amModulate(raw, sr, 0.04, 0.2);
        break;
      case "focus":
        fillNoise(raw, "brown", seed, 0.75);
        bandPink(raw, seed + 3, 0.02, 0.15);
        break;
      case "zen":
        fillNoise(raw, "pink", seed, 0.22);
        addTone(raw, sr, 196, 0.05);
        addTone(raw, sr, 261.63, 0.03);
        sprinkle(raw, seed + 41, 6, sr, 0.05, 60);
        // occasional bell tone
        sprinkle(raw, seed + 49, 0.12, sr, 0.18, 900, 880);
        break;
      case "cafe":
        fillNoise(raw, "pink", seed, 0.35);
        amModulate(raw, sr, 0.3, 0.25);
        sprinkle(raw, seed + 51, 4, sr, 0.08, 200); // murmur clusters
        sprinkle(raw, seed + 55, 0.4, sr, 0.09, 120); // clinks
        break;
    }

    const looped = seamlessLoop(raw, Math.floor(sr * fadeSec));
    const out = buf.getChannelData(ch);
    out.set(looped.subarray(0, finalLen));
  }

  // Normalise so peaks sit around -6 dBFS
  let peak = 0;
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < d.length; i++) {
      const a = Math.abs(d[i]);
      if (a > peak) peak = a;
    }
  }
  if (peak > 0) {
    const gain = 0.5 / peak;
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < d.length; i++) d[i] *= gain;
    }
  }

  return buf;
}

function kindSeed(k: SynthKind) {
  let h = 0;
  for (let i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0;
  return h;
}

/** Cache buffers per (context, kind) so repeated plays don't re-synth. */
const cache = new WeakMap<AudioContext, Map<SynthKind, AudioBuffer>>();
export function getSoundBuffer(ctx: AudioContext, kind: SynthKind): AudioBuffer {
  let m = cache.get(ctx);
  if (!m) { m = new Map(); cache.set(ctx, m); }
  let b = m.get(kind);
  if (!b) { b = buildSoundBuffer(ctx, kind); m.set(kind, b); }
  return b;
}