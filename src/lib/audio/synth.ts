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
  | "meditation" | "sleep" | "focus" | "zen" | "cafe"
  // Phase 5 additions
  | "green"
  | "birds-morning" | "deep-forest" | "bamboo"
  | "rain-tent" | "stream" | "calm-sea" | "ocean-sunset" | "stormy-ocean"
  | "mountain-wind"
  | "campfire" | "crackling-fire" | "cozy-cabin"
  | "wind-chimes" | "temple-bells" | "singing-bowls" | "tibetan-bowls"
  | "drone" | "piano" | "soft-ambient" | "strings"
  // Relaxation frequencies
  | "alpha" | "theta" | "delta" | "binaural" | "isochronic";

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
 * Real-feeling birdsong: short phrases of 2–6 warbled notes with pitch
 * sweeps, breathy attack and natural spacing. Nothing bell-like.
 */
function birdsong(
  data: Float32Array,
  seed: number,
  sampleRate: number,
  phrasesPerMinute: number,
  amp: number,
  baseHz: number,
) {
  const r = rng(seed);
  const phrases = Math.max(1, Math.floor((data.length / sampleRate) * (phrasesPerMinute / 60)));
  for (let p = 0; p < phrases; p++) {
    const notes = 2 + Math.floor(Math.abs(r()) * 5);
    let cursor = Math.floor(((r() + 1) * 0.5) * (data.length * 0.92));
    const voice = baseHz * (0.85 + Math.abs(r()) * 0.5);
    for (let n = 0; n < notes; n++) {
      const durMs = 55 + Math.abs(r()) * 110;
      const dur = Math.floor((durMs / 1000) * sampleRate);
      if (cursor + dur >= data.length) break;
      const f0 = voice * (0.9 + Math.abs(r()) * 0.5);
      // rising or falling sweep — this is what makes it read as a bird
      const f1 = f0 * (r() > 0 ? 1.35 + Math.abs(r()) * 0.5 : 0.6 + Math.abs(r()) * 0.3);
      const level = amp * (0.45 + 0.55 * Math.abs(r()));
      const warbleHz = 22 + Math.abs(r()) * 34;
      let phase = 0;
      for (let i = 0; i < dur; i++) {
        const t = i / dur;
        const f = f0 + (f1 - f0) * t;
        const warble = 1 + 0.05 * Math.sin((2 * Math.PI * warbleHz * i) / sampleRate);
        phase += (2 * Math.PI * f * warble) / sampleRate;
        // soft attack + decay envelope, no click
        const env = Math.sin(Math.PI * Math.pow(t, 0.75));
        const body = Math.sin(phase) + 0.22 * Math.sin(phase * 2) + 0.08 * Math.sin(phase * 3);
        data[cursor + i] += body * env * level;
      }
      cursor += dur + Math.floor((0.03 + Math.abs(r()) * 0.14) * sampleRate);
    }
  }
}

/** Struck metal/wood resonator: inharmonic partials with a long decay. */
function strike(
  data: Float32Array,
  seed: number,
  sampleRate: number,
  perMinute: number,
  amp: number,
  baseHz: number,
  decaySec: number,
  partials: number[],
) {
  const r = rng(seed);
  const events = Math.max(1, Math.floor((data.length / sampleRate) * (perMinute / 60)));
  const dur = Math.floor(decaySec * sampleRate);
  for (let e = 0; e < events; e++) {
    const start = Math.floor(((r() + 1) * 0.5) * Math.max(1, data.length - dur));
    const f = baseHz * (0.94 + Math.abs(r()) * 0.14);
    const level = amp * (0.5 + 0.5 * Math.abs(r()));
    for (let i = 0; i < dur; i++) {
      const env = Math.exp(-i / (dur * 0.3)) * (1 - Math.exp(-i / (sampleRate * 0.004)));
      let s = 0;
      for (let k = 0; k < partials.length; k++) {
        s += Math.sin((2 * Math.PI * f * partials[k] * i) / sampleRate) / (k + 1.4);
      }
      data[start + i] += s * env * level;
    }
  }
}

/** Sparse piano-like notes drawn from a pentatonic scale. */
function pianoNotes(data: Float32Array, seed: number, sampleRate: number, perMinute: number, amp: number) {
  const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
  const r = rng(seed);
  const events = Math.max(1, Math.floor((data.length / sampleRate) * (perMinute / 60)));
  const dur = Math.floor(2.6 * sampleRate);
  for (let e = 0; e < events; e++) {
    const start = Math.floor(((r() + 1) * 0.5) * Math.max(1, data.length - dur));
    const f = scale[Math.floor(Math.abs(r()) * scale.length) % scale.length] * (r() > 0.6 ? 0.5 : 1);
    const level = amp * (0.55 + 0.45 * Math.abs(r()));
    for (let i = 0; i < dur; i++) {
      const env = Math.exp(-i / (dur * 0.28)) * (1 - Math.exp(-i / (sampleRate * 0.003)));
      const s =
        Math.sin((2 * Math.PI * f * i) / sampleRate) +
        0.35 * Math.sin((2 * Math.PI * f * 2 * i) / sampleRate) +
        0.12 * Math.sin((2 * Math.PI * f * 3 * i) / sampleRate);
      data[start + i] += s * env * level * 0.5;
    }
  }
}

/** Rhythmic amplitude pulses (isochronic tones). */
function pulse(data: Float32Array, sampleRate: number, hz: number, depth = 1) {
  const period = sampleRate / hz;
  for (let i = 0; i < data.length; i++) {
    const t = (i % period) / period;
    const g = t < 0.5 ? Math.pow(Math.sin(Math.PI * t * 2), 2) : 0;
    data[i] *= 1 - depth + depth * g;
  }
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

      // ---------- Nature ----------
      case "green":
        // noise energy concentrated around 500 Hz — "green noise"
        fillNoise(raw, "pink", seed, 1);
        {
          let s1 = 0, s2 = 0;
          for (let i = 0; i < raw.length; i++) {
            s1 = lp(s1, raw[i], 0.06);
            s2 = lp(s2, s1, 0.008);
            raw[i] = (s1 - s2) * 2.4;
          }
        }
        break;
      case "birds-morning":
        fillNoise(raw, "pink", seed, 0.16);
        amModulate(raw, sr, 0.06, 0.3);
        birdsong(raw, seed + 301, sr, 70, 0.16, 2400);
        birdsong(raw, seed + 307, sr, 40, 0.11, 3200);
        birdsong(raw, seed + 311, sr, 18, 0.09, 1750);
        break;
      case "deep-forest":
        fillNoise(raw, "pink", seed, 0.42);
        amModulate(raw, sr, 0.05, 0.45);
        birdsong(raw, seed + 321, sr, 14, 0.07, 2600);
        sprinkle(raw, seed + 325, 0.5, sr, 0.05, 260);
        break;
      case "bamboo":
        fillNoise(raw, "pink", seed, 0.34);
        amModulate(raw, sr, 0.1, 0.55, ch * 0.4);
        strike(raw, seed + 331, sr, 26, 0.05, 320, 0.5, [1, 2.7, 4.1]);
        break;
      case "rain-tent":
        bandPink(raw, seed, 0.03, 0.85);
        sprinkle(raw, seed + 341, 130, sr, 0.09, 18);
        sprinkle(raw, seed + 343, 18, sr, 0.13, 34);
        break;
      case "stream":
        bandPink(raw, seed, 0.03, 0.8);
        sprinkle(raw, seed + 351, 40, sr, 0.05, 28);
        amModulate(raw, sr, 0.3, 0.12, ch * 0.3);
        break;
      case "calm-sea":
        fillNoise(raw, "brown", seed, 0.8);
        amModulate(raw, sr, 0.07, 0.55, ch * 0.4);
        break;
      case "ocean-sunset":
        fillNoise(raw, "brown", seed, 0.85);
        amModulate(raw, sr, 0.09, 0.6, ch * 0.4);
        birdsong(raw, seed + 361, sr, 6, 0.05, 1400);
        break;
      case "stormy-ocean":
        fillNoise(raw, "brown", seed, 1.1);
        amModulate(raw, sr, 0.16, 0.55, ch * 0.5);
        {
          const spray = new Float32Array(rawLen);
          bandPink(spray, seed + 371, 0.06, 1);
          amModulate(spray, sr, 0.16, 0.8, ch * 0.5 + 0.4);
          for (let i = 0; i < raw.length; i++) raw[i] += spray[i] * 0.5;
        }
        break;
      case "mountain-wind":
        fillNoise(raw, "brown", seed, 1);
        amModulate(raw, sr, 0.06, 0.8, ch * 0.3);
        {
          const gust = new Float32Array(rawLen);
          bandPink(gust, seed + 381, 0.02, 1);
          amModulate(gust, sr, 0.1, 0.9, ch * 0.3 + 1.1);
          for (let i = 0; i < raw.length; i++) raw[i] += gust[i] * 0.5;
        }
        break;

      // ---------- Fire & cozy ----------
      case "campfire":
        fillNoise(raw, "brown", seed, 0.3);
        sprinkle(raw, seed + 391, 16, sr, 0.16, 50);
        sprinkle(raw, seed + 393, 4, sr, 0.24, 110);
        // night air around the fire
        sprinkle(raw, seed + 395, 8, sr, 0.02, 30, 4800);
        break;
      case "crackling-fire":
        fillNoise(raw, "brown", seed, 0.22);
        sprinkle(raw, seed + 401, 42, sr, 0.18, 32);
        sprinkle(raw, seed + 403, 10, sr, 0.26, 70);
        break;
      case "cozy-cabin":
        fillNoise(raw, "brown", seed, 0.3);
        sprinkle(raw, seed + 411, 14, sr, 0.12, 55);
        bandPink(raw, seed + 413, 0.015, 0.35);
        sprinkle(raw, seed + 415, 40, sr, 0.05, 20);
        break;

      // ---------- Zen & meditation ----------
      case "wind-chimes":
        fillNoise(raw, "pink", seed, 0.14);
        amModulate(raw, sr, 0.08, 0.5, ch * 0.4);
        strike(raw, seed + 421, sr, 46, 0.10, 1046.5, 2.6, [1, 2.76, 5.4, 8.9]);
        strike(raw, seed + 423, sr, 32, 0.08, 1318.5, 2.2, [1, 2.76, 5.4]);
        strike(raw, seed + 425, sr, 20, 0.07, 880, 3.0, [1, 2.76, 5.4]);
        break;
      case "temple-bells":
        fillNoise(raw, "pink", seed, 0.08);
        strike(raw, seed + 431, sr, 5, 0.30, 220, 8, [1, 2.0, 2.98, 4.2, 5.9]);
        strike(raw, seed + 433, sr, 3, 0.22, 165, 9, [1, 2.0, 3.01, 4.1]);
        break;
      case "singing-bowls":
      case "tibetan-bowls":
        fillNoise(raw, "pink", seed, 0.07);
        addTone(raw, sr, kind === "tibetan-bowls" ? 136.1 : 174.6, 0.10, ch * 0.5);
        addTone(raw, sr, kind === "tibetan-bowls" ? 272.2 : 349.2, 0.055, ch * 0.2);
        addTone(raw, sr, kind === "tibetan-bowls" ? 408.3 : 523.3, 0.03);
        amModulate(raw, sr, 0.045, 0.35, ch * 0.6);
        strike(raw, seed + 441, sr, 2, 0.18, kind === "tibetan-bowls" ? 136.1 : 174.6, 9, [1, 2.4, 3.8]);
        break;
      case "drone":
        fillNoise(raw, "pink", seed, 0.1);
        addTone(raw, sr, 98, 0.10, ch * 0.4);
        addTone(raw, sr, 147, 0.06, ch * 0.7);
        addTone(raw, sr, 196, 0.035);
        amModulate(raw, sr, 0.035, 0.3, ch * 0.5);
        break;
      case "piano":
        fillNoise(raw, "pink", seed, 0.06);
        pianoNotes(raw, seed + 451, sr, 26, 0.22);
        break;
      case "soft-ambient":
        fillNoise(raw, "pink", seed, 0.1);
        addTone(raw, sr, 220, 0.05, ch * 0.4);
        addTone(raw, sr, 329.6, 0.035, ch * 0.9);
        addTone(raw, sr, 440, 0.02);
        amModulate(raw, sr, 0.06, 0.4, ch * 0.5);
        pianoNotes(raw, seed + 461, sr, 10, 0.10);
        break;
      case "strings":
        fillNoise(raw, "pink", seed, 0.08);
        addTone(raw, sr, 130.8, 0.07, ch * 0.3);
        addTone(raw, sr, 196, 0.05, ch * 0.8);
        addTone(raw, sr, 261.6, 0.035, ch * 0.2);
        addTone(raw, sr, 392, 0.02);
        amModulate(raw, sr, 0.09, 0.35, ch * 0.6);
        break;

      // ---------- Relaxation frequencies ----------
      case "alpha":
        fillNoise(raw, "pink", seed, 0.12);
        addTone(raw, sr, 200, 0.09, ch * 0.3);
        amModulate(raw, sr, 10, 0.35);
        break;
      case "theta":
        fillNoise(raw, "pink", seed, 0.12);
        addTone(raw, sr, 160, 0.09, ch * 0.3);
        amModulate(raw, sr, 6, 0.35);
        break;
      case "delta":
        fillNoise(raw, "brown", seed, 0.3);
        addTone(raw, sr, 90, 0.09);
        amModulate(raw, sr, 2, 0.3);
        break;
      case "binaural":
        // left 200 Hz, right 208 Hz → 8 Hz perceived beat (headphones required)
        addTone(raw, sr, ch === 0 ? 200 : 208, 0.16);
        fillNoiseInto(raw, seed, 0.05);
        break;
      case "isochronic":
        addTone(raw, sr, 210, 0.18);
        pulse(raw, sr, 8, 0.85);
        {
          const bed = new Float32Array(rawLen);
          fillNoise(bed, "pink", seed + 3, 0.5);
          for (let i = 0; i < raw.length; i++) raw[i] += bed[i] * 0.12;
        }
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

/** Mix a quiet pink-noise bed into an existing buffer. */
function fillNoiseInto(data: Float32Array, seed: number, gain: number) {
  const bed = new Float32Array(data.length);
  fillNoise(bed, "pink", seed + 977, gain);
  for (let i = 0; i < data.length; i++) data[i] += bed[i];
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