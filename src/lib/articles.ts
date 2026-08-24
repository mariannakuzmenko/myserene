import { HERO, IMG } from "@/lib/images";

export type ArticleSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  key?: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  read: string;
  intro: string;
  image: string;
  card: string;
  sections: ArticleSection[];
  relatedSounds: string[];
  relatedExperience?: { label: string; to: string };
};

export const ARTICLES: Article[] = [
  {
    slug: "calm-your-mind-in-five-minutes",
    title: "How to Calm Your Mind in Five Minutes",
    category: "Reset",
    read: "4 min read",
    intro:
      "A short, repeatable routine for the moments when your head feels full and the next task still needs your attention.",
    image: HERO.sunrise,
    card: IMG.sunrise,
    sections: [
      {
        paragraphs: [
          "Five minutes is not much, but it is often enough to change how the next hour feels. The point of this routine is not to fix everything — it is simply to put a small gap between what just happened and what comes next.",
        ],
      },
      {
        heading: "1. Stop",
        paragraphs: [
          "Close the tab you were about to open. Put the phone face down. A reset only works if you actually stop for a moment, so let this first step be deliberately unproductive.",
        ],
      },
      {
        heading: "2. Breathe",
        paragraphs: [
          "Breathe in slowly through the nose, hold briefly, then let the out-breath be a little longer than the in-breath. Six or seven rounds is plenty. Counting helps, because it gives your attention something small and finite to hold.",
        ],
      },
      {
        heading: "3. Listen",
        paragraphs: [
          "Start a sound you like — rain, a stream, a quiet forest — and give it your full attention for a minute. Listening is a gentle way to occupy the part of your mind that would otherwise keep rehearsing your to-do list.",
        ],
      },
      {
        heading: "4. Relax your body",
        paragraphs: [
          "Move down from the top: jaw, shoulders, hands, back. Most of us hold tension in places we stopped noticing hours ago. Let each area soften as you pass through it.",
        ],
        key: "Tension is easier to release when you name where it is.",
      },
      {
        heading: "5. Return to the task",
        paragraphs: [
          "Before you open anything, decide on the one thing you will do next, then begin with the sound still playing if you like. Ending the reset with a clear next step is what keeps it from turning into a longer break.",
        ],
      },
    ],
    relatedSounds: ["Rain", "Gentle Stream", "Forest"],
    relatedExperience: { label: "Try a short meditation", to: "/meditation" },
  },
  {
    slug: "ambient-sounds-and-focus",
    title: "How Ambient Sounds Can Help You Focus",
    category: "Focus",
    read: "5 min read",
    intro:
      "Why a steady background atmosphere can make a noisy room easier to work in — and what to expect from it.",
    image: HERO.sunlitForest,
    card: IMG.sunlitForest,
    sections: [
      {
        paragraphs: [
          "Ambient sound does not make you smarter or faster. What it can do is make your environment more consistent. Sudden noises — a door, a conversation, a notification — pull attention away, and a steady sound layer softens those contrasts.",
        ],
        key: "Consistency, not stimulation, is what makes a good focus sound.",
      },
      {
        heading: "Rain",
        paragraphs: [
          "Dense and even, with enough variation to stay interesting. Rain works well in shared spaces because it covers a wide range of frequencies without a strong rhythm.",
        ],
      },
      {
        heading: "Forest",
        paragraphs: [
          "Quieter and more textured. Good for reading and writing, when you want the feeling of being somewhere calm rather than a wall of sound.",
        ],
      },
      {
        heading: "Ocean",
        paragraphs: [
          "Slow, cyclical waves. Some people find the long rise and fall grounding; others find it too rhythmic for detailed work. It is worth trying both ways.",
        ],
      },
      {
        heading: "Brown and white noise",
        paragraphs: [
          "Brown noise is deeper and softer at the top end; white noise is brighter and flatter. Both are useful when you mainly want to mask an unpredictable environment rather than listen to something.",
        ],
      },
      {
        heading: "How to use it",
        list: [
          "Keep the volume just loud enough to smooth over interruptions.",
          "Pick one sound and stay with it — switching is its own distraction.",
          "Use the same sound for the same kind of work, so it becomes a cue.",
        ],
        paragraphs: [
          "Responses to sound vary a lot from person to person. If silence works better for you, that is a perfectly good answer too.",
        ],
      },
    ],
    relatedSounds: ["Brown Noise", "Rain", "Focus"],
    relatedExperience: { label: "Browse the sound library", to: "/sounds" },
  },
  {
    slug: "better-evening-routine",
    title: "How to Create a Better Evening Routine",
    category: "Evening",
    read: "5 min read",
    intro:
      "Winding down is mostly about lowering stimulation and repeating the same few signals each night.",
    image: HERO.oceanSunset,
    card: IMG.oceanSunset,
    sections: [
      {
        paragraphs: [
          "Evenings tend to be the busiest quiet hours of the day: messages, screens, one more episode, one last email. A routine helps not because it is strict, but because repetition makes the transition easier to recognise.",
        ],
      },
      {
        heading: "Lower the stimulation first",
        paragraphs: [
          "Dim the lights, close the loud tabs, put work out of sight. Reducing input is usually more effective than adding a new evening activity.",
        ],
      },
      {
        heading: "Keep the same order",
        list: [
          "Pick a rough time to begin winding down.",
          "Do the same two or three small things in the same order.",
          "Start a quiet sound and let it run in the background.",
          "Set a sleep timer so nothing needs switching off later.",
        ],
        key: "The order matters more than the length.",
      },
      {
        heading: "Give your mind somewhere to land",
        paragraphs: [
          "If your thoughts keep returning to tomorrow, write the list down once and close the notebook. A short breathing practice or a calm soundscape can then hold your attention without asking anything of you.",
        ],
      },
      {
        paragraphs: [
          "Sleep is affected by many things beyond a routine. If sleep is a persistent difficulty for you, it is worth speaking with a healthcare professional.",
        ],
      },
    ],
    relatedSounds: ["Rain on Window", "Night Forest", "Fireplace"],
    relatedExperience: { label: "Open the sleep experiences", to: "/sleep" },
  },
  {
    slug: "meditation-for-beginners",
    title: "Meditation for Beginners",
    category: "Meditation",
    read: "5 min read",
    intro: "What meditation actually is, in plain language, plus a five-minute practice to start with.",
    image: HERO.zenGarden,
    card: IMG.zen,
    sections: [
      {
        paragraphs: [
          "Meditation is the practice of placing your attention somewhere on purpose and noticing, without frustration, when it wanders. That is the whole skill. The wandering is not failure — noticing it is the practice.",
        ],
        key: "You are not trying to empty your mind. You are practising noticing.",
      },
      {
        heading: "A five-minute practice",
        list: [
          "Sit comfortably, with your back supported and hands resting.",
          "Close your eyes or soften your gaze downward.",
          "Follow your breath in and out, without changing it.",
          "When you notice a thought, name it quietly — 'thinking' — and return to the breath.",
          "After five minutes, open your eyes and sit still for a few seconds before moving.",
        ],
      },
      {
        heading: "If it feels difficult",
        paragraphs: [
          "Most people find the first sessions restless. Shorter is better than longer: three honest minutes will teach you more than twenty frustrated ones. A quiet background sound can make it easier to stay put.",
        ],
      },
      {
        paragraphs: [
          "Meditation is a practice, not a treatment. It is not a substitute for professional care.",
        ],
      },
    ],
    relatedSounds: ["Meditation Drone", "Singing Bowls", "Zen Garden"],
    relatedExperience: { label: "Start a guided session", to: "/meditation" },
  },
  {
    slug: "what-is-brown-noise",
    title: "What Is Brown Noise?",
    category: "Sound",
    read: "4 min read",
    intro: "A short guide to the deepest of the coloured noises, and how it differs from white and pink.",
    image: HERO.deepForest,
    card: IMG.brownHush,
    sections: [
      {
        paragraphs: [
          "Coloured noises are all random sound, distinguished by how their energy is spread across frequencies. Brown noise puts most of its energy in the low end, which is why it is often described as sounding like distant thunder, a waterfall behind a wall, or an aircraft cabin.",
        ],
      },
      {
        heading: "How it differs",
        list: [
          "White noise: energy spread evenly — bright, hissy, like untuned static.",
          "Pink noise: energy falls off gradually — softer, closer to steady rainfall.",
          "Brown noise: energy falls off more steeply — deep, warm, with very little brightness.",
        ],
        key: "Same randomness, different balance of high and low.",
      },
      {
        heading: "Why some people like it",
        paragraphs: [
          "Because the high frequencies are quiet, brown noise tends to feel less fatiguing over long periods, and it masks low rumbling sounds — traffic, machinery, muffled voices — better than brighter noise.",
        ],
      },
      {
        paragraphs: [
          "Individual responses vary. Some people find brown noise settling and others find it heavy or distracting, so treat it as a preference to test rather than a recommendation to follow.",
        ],
      },
    ],
    relatedSounds: ["Brown Noise", "White Noise", "Pink Noise"],
    relatedExperience: { label: "Compare them in the library", to: "/sounds" },
  },
  {
    slug: "rain-ocean-or-forest",
    title: "Rain, Ocean or Forest?",
    category: "Sound",
    read: "5 min read",
    intro: "A practical comparison of five familiar soundscapes, and the moments each one tends to suit.",
    image: HERO.mountainLake,
    card: IMG.calmLake,
    sections: [
      {
        paragraphs: [
          "There is no best relaxation sound. There are only sounds that fit what you are doing. Here is how these five usually behave.",
        ],
      },
      {
        heading: "Rain",
        paragraphs: [
          "Even and enveloping. A dependable choice for focused work and for masking an unpredictable room.",
        ],
      },
      {
        heading: "Ocean",
        paragraphs: [
          "Slow cycles with clear peaks. Often better for winding down or breathing practice than for detailed reading.",
        ],
      },
      {
        heading: "Forest",
        paragraphs: [
          "Sparse, with small details — birds, leaves, distant movement. Pleasant in the morning and for gentle, reflective work.",
        ],
      },
      {
        heading: "Fireplace",
        paragraphs: [
          "Irregular crackle over a low hum. Cosy in the evening; the sudden pops can be distracting during concentration.",
        ],
      },
      {
        heading: "Wind",
        paragraphs: [
          "Broad and airy, with long swells. Works well layered underneath another sound rather than on its own.",
        ],
        key: "Layering two quiet sounds often works better than one loud one.",
      },
    ],
    relatedSounds: ["Rain", "Ocean Waves", "Forest", "Fireplace", "Wind"],
    relatedExperience: { label: "Build your own mix", to: "/sounds" },
  },
  {
    slug: "the-science-of-relaxation",
    title: "The Science of Relaxation",
    category: "Understanding",
    read: "6 min read",
    intro:
      "An accessible look at breathing, attention and environment — and at what the evidence does and does not say.",
    image: HERO.alpineMorning,
    card: IMG.alpineMorning,
    sections: [
      {
        paragraphs: [
          "Relaxation is not one thing. It is a collection of small changes — in breathing, attention, posture and surroundings — that tend to happen together when we stop bracing.",
        ],
      },
      {
        heading: "Breathing",
        paragraphs: [
          "Slow breathing with a longer exhale is one of the few things we can consciously adjust that also influences less voluntary systems, such as heart rate variability. This is well studied, though effects differ between people and situations.",
        ],
      },
      {
        heading: "Attention",
        paragraphs: [
          "Much of what makes stress persist is repeated attention to it. Practices that give attention a simple anchor — a breath, a sound, a body scan — interrupt that loop for a while.",
        ],
      },
      {
        heading: "Environmental cues",
        paragraphs: [
          "Light, temperature, clutter and noise all shape how easily we settle. Changing the environment is often the least effortful place to start.",
        ],
        key: "Adjusting the room is usually easier than adjusting the mind directly.",
      },
      {
        heading: "Routines",
        paragraphs: [
          "Repetition builds association. When the same sound and the same few minutes precede focused work or sleep, they begin to act as a signal rather than a task.",
        ],
      },
      {
        heading: "Sound and atmosphere",
        paragraphs: [
          "Evidence suggests people often report feeling calmer in pleasant, predictable sound environments, and that natural sounds are frequently preferred. That is a reasonable claim. Claims that particular frequencies or tones treat medical conditions are not supported, and MySerene does not make them.",
        ],
      },
    ],
    relatedSounds: ["Alpha Range", "Ocean Waves", "Deep Forest"],
    relatedExperience: { label: "Explore relaxation frequencies", to: "/frequencies" },
  },
  {
    slug: "build-a-focus-ritual",
    title: "How to Build a Focus Ritual",
    category: "Focus",
    read: "4 min read",
    intro:
      "A short, repeated sequence before work can become a personal cue that it is time to concentrate.",
    image: HERO.meadow,
    card: IMG.focus,
    sections: [
      {
        paragraphs: [
          "A focus ritual is deliberately boring. Its value comes from being identical each time, so that starting it already means something to you.",
        ],
      },
      {
        heading: "The sequence",
        list: [
          "Choose a sound — the same one, every session.",
          "Remove distractions: close tabs, silence notifications, clear the desk.",
          "Set a timer for a length you can honestly finish.",
          "Work in one focused block, on one thing only.",
          "Take a short break away from the screen.",
          "Repeat, or stop for the day.",
        ],
        key: "Same sound, same order, same length. That is the whole ritual.",
      },
      {
        heading: "Keep it small",
        paragraphs: [
          "Twenty-five minutes is a common block, but any length you will actually complete is better than an ambitious one you abandon. Consistency is what turns a sequence into a cue.",
        ],
      },
      {
        heading: "Let the break be a real break",
        paragraphs: [
          "Stand up, look further than your screen, breathe. If you like, leave the sound running so returning feels like continuing rather than starting again.",
        ],
      },
    ],
    relatedSounds: ["Focus", "Brown Noise", "Cafe"],
    relatedExperience: { label: "Find your focus sound", to: "/sounds" },
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
