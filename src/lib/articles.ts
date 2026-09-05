import { HERO, IMG } from "@/lib/images";

export type ArticleSection = {
  heading?: string;
  subheading?: string;
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
  description: string;
  keywords: string[];
  image: string;
  card: string;
  sections: ArticleSection[];
  relatedSounds: string[];
  relatedExperience?: { label: string; to: "/sounds" | "/meditation" | "/sleep" | "/frequencies" };
};

export const ARTICLES: Article[] = [
  {
    slug: "calm-your-mind-in-five-minutes",
    title: "How to Calm Your Mind in Five Minutes",
    category: "Reset",
    read: "6 min read",
    intro:
      "A short, repeatable routine for the moments when your head feels full and the next task still needs your attention.",
    description:
      "A practical five-minute reset for a busy day: how to stop, breathe slowly, use a calming background sound and return to work with a clearer head.",
    keywords: ["five minute reset", "calm your mind", "short break", "breathing", "ambient sound"],
    image: HERO.sunrise,
    card: IMG.sunrise,
    sections: [
      {
        paragraphs: [
          "Most days do not fall apart in one dramatic moment. They fill up slowly — one message, one meeting, one interruption at a time — until your attention feels stretched thin and everything takes longer than it should. By mid-afternoon you are still working, but with a mind that keeps drifting between six unfinished things.",
          "Five minutes will not empty your inbox or solve anything complicated. What it can do is put a small gap between one state and another, so the next hour does not simply inherit the tension of the last one. That gap is the whole point.",
        ],
      },
      {
        heading: "Why short pauses are worth taking",
        paragraphs: [
          "Attention behaves a little like a muscle you keep contracting. Hold it in the same position long enough and it stops responding well: you reread the same paragraph, you open a tab and forget why, you feel busy without moving forward. A short pause is not a reward for finishing something — it is maintenance.",
          "Short pauses are also easier to actually take. A twenty-minute practice needs planning and permission. Five minutes fits between two calls, in a stairwell, at a kitchen table, or in a parked car. Something small that you do often will always beat something ideal that you never start.",
        ],
      },
      {
        heading: "Noticing when your mind is overloaded",
        paragraphs: [
          "Overload rarely announces itself. It shows up as small physical and behavioural signals long before you consciously decide you need a break. Learning your own signals is what turns this routine from a nice idea into something you use.",
        ],
        list: [
          "Your shoulders have crept up and your jaw is tight.",
          "You are switching between tasks every minute or two without finishing anything.",
          "You feel a background urgency that does not match what you are actually doing.",
          "You are reading the same sentence for the third time.",
          "You are reaching for your phone without any reason.",
        ],
      },
      {
        heading: "Step one: stop",
        paragraphs: [
          "Close the tab you were about to open. Put the phone face down, screen away from you. If you are wearing headphones with something spoken or lyrical playing, pause it.",
          "This first step feels deliberately unproductive, and it should. A reset only works if you genuinely interrupt what you were doing. Half-stopping — glancing at notifications while you breathe — keeps you exactly where you were.",
        ],
      },
      {
        heading: "Step two: put the distractions somewhere else",
        paragraphs: [
          "Physically move the things pulling at you. Phone into a drawer or the far side of the desk. Notifications silenced for five minutes. A notebook nearby if it helps to park a thought that keeps returning.",
          "Writing down the one thought that will not leave you alone is not avoidance. It is a way of telling yourself you have not lost it, so you can stop rehearsing it.",
        ],
      },
      {
        heading: "Step three: let the shoulders and jaw go",
        paragraphs: [
          "Start at the top and work down: forehead, jaw, tongue, throat, shoulders, hands, lower back. Do not try to force anything. Simply notice where you are holding, and let that area become slightly heavier.",
          "The jaw and shoulders are worth naming specifically because they are where most people carry a day without noticing. Softening them often changes how the breath moves on its own.",
        ],
        key: "Tension is easier to release once you name where it is.",
      },
      {
        heading: "Step four: breathe slowly and comfortably",
        paragraphs: [
          "Breathe in through the nose, unhurried. Pause briefly. Let the out-breath be a little longer and softer than the in-breath. Six or seven rounds is plenty for five minutes.",
          "Comfortable matters more than correct. If holding the breath feels strained, skip the pause. If counting helps, count — it gives your attention something small and finite to hold instead of the day. Some people find a longer exhale settling; if it makes you feel light-headed, return to your normal rhythm.",
        ],
      },
      {
        heading: "Step five: add a calming background sound",
        paragraphs: [
          "A steady sound gives the room a different character and covers the small noises that keep pulling your head around. Rain, a stream, distant ocean, a quiet forest — anything without words or sudden changes.",
          "Keep the volume low. The sound is not the event; it is the background the event happens in. Loud enough to smooth over the room, quiet enough that you could still hear someone say your name.",
        ],
      },
      {
        heading: "Step six: hold one sensory detail",
        paragraphs: [
          "Choose one small thing and stay with it: the texture of the rain, the warmth of a cup, the feeling of your feet on the floor, one repeating note in the sound.",
          "Your mind will wander. That is not failure — it is what minds do. The practice is simply noticing that you drifted and coming back to the same detail, as many times as needed, without commentary.",
        ],
      },
      {
        heading: "Step seven: return gradually",
        paragraphs: [
          "Do not jump straight back into everything. Decide on the single thing you will do next, say it to yourself, then open only what that task needs.",
          "You can leave the sound playing. Many people find the transition easier when the background stays the same while the activity changes.",
        ],
      },
      {
        heading: "The 5-Minute Reset, minute by minute",
        list: [
          "Minute 1 — Stop. Screen down, notifications off, sound on low.",
          "Minute 2 — Soften. Jaw, shoulders, hands, back. Let each one go.",
          "Minute 3 — Breathe. Slow in, brief pause, longer out. Count if it helps.",
          "Minute 4 — Listen. One detail in the sound or the room, returning whenever you drift.",
          "Minute 5 — Decide. Name the one next task, then begin gently.",
        ],
        key: "Five minutes, the same five steps, in the same order — familiarity is what makes it fast.",
      },
      {
        heading: "A gentle reminder",
        paragraphs: [
          "The goal is not to force yourself to feel calm. Some resets end with a genuinely quieter head; others simply end, and that is fine too. Pressuring yourself to relax is just another task.",
          "What you are really building is a small, reliable transition between one state and another. Done often enough, that transition becomes something your day can lean on — and five minutes is a very low price for it.",
        ],
      },
    ],
    relatedSounds: ["Rain", "Gentle Stream", "Forest", "Ocean"],
    relatedExperience: { label: "Try guided breathing", to: "/meditation" },
  },
  {
    slug: "ambient-sounds-and-focus",
    title: "How Ambient Sounds Can Help You Focus",
    category: "Focus",
    read: "6 min read",
    intro:
      "Why a steady background atmosphere can make a noisy room easier to work in — and how to choose one without turning it into another distraction.",
    description:
      "How rain, ocean, forest and noise colours change the atmosphere of a workspace, plus a practical way to choose and use one background sound for focused work.",
    keywords: ["ambient sound", "focus sounds", "brown noise", "white noise", "study sounds"],
    image: HERO.sunlitForest,
    card: IMG.sunlitForest,
    sections: [
      {
        paragraphs: [
          "Ask a room full of people what they listen to while they work and you will get completely different answers. Some need silence. Some play the same rain recording every day for years. Some cannot concentrate without a café in the background. All of them are describing the same thing from different angles: the atmosphere a space has, and how much of their attention it takes.",
          "Ambient sound is a way of choosing that atmosphere instead of accepting whatever the room gives you.",
        ],
      },
      {
        heading: "What background sound actually changes",
        paragraphs: [
          "A room is rarely silent. There are footsteps, a door, a conversation two desks away, traffic, a fridge. What makes these difficult is not their volume but their irregularity — each new sound is slightly unexpected, and unexpected sounds pull attention.",
          "A steady ambient layer smooths that landscape out. The door still opens, but it arrives against a continuous background rather than sudden quiet, so it stands out less. Many people describe the result as feeling more enclosed, as if the workspace got smaller and more private.",
        ],
      },
      {
        heading: "Why some people prefer constant sound",
        paragraphs: [
          "Constant sound is predictable, and predictable things stop asking for attention. That is very different from music with words or dynamics, which keeps offering something to follow — a lyric, a chorus, a change of key.",
          "There is also a habit element. If you always start focused work with the same sound, the sound eventually stops being neutral and starts acting as a cue: this is the part of the day where I work on one thing. That cue is often more valuable than any acoustic effect.",
          "None of this is universal. Some people work best in real quiet, and some find any background layer intrusive. Preference here is genuinely personal, and worth testing rather than assuming.",
        ],
      },
      {
        heading: "The main options, and how they feel",
        subheading: "Rain",
        paragraphs: [
          "Rain is the most popular choice for a reason: it is dense enough to cover a room, varied enough not to feel mechanical, and it carries a cosy, indoors association for many people. Light rain suits reading and writing; heavier rain covers more noise.",
        ],
      },
      {
        heading: "Ocean",
        paragraphs: [
          "Ocean waves are slower and more spacious, with a rise and fall that some people find settling and others find slightly distracting because it never stays level. It tends to suit thinking, planning and winding down more than detailed detail-heavy work.",
        ],
      },
      {
        heading: "Forest",
        paragraphs: [
          "A forest bed — leaves, wind, occasional distant birds — feels open and natural rather than enclosed. It is lighter than rain, so it covers less noise, which makes it a good match for an already quiet room.",
        ],
      },
      {
        heading: "Brown noise",
        paragraphs: [
          "Brown noise emphasises the low end of the spectrum, which many people describe as deep, soft and rumbling — closer to distant thunder or a plane cabin than to static. Because it is smooth and has no events at all, it can be the least distracting option available.",
        ],
      },
      {
        heading: "White noise",
        paragraphs: [
          "White noise spreads energy evenly across frequencies, which makes it bright and hissy. It is very effective at covering speech, but some people find it fatiguing over long stretches, especially at higher volumes.",
        ],
      },
      {
        heading: "Pink noise",
        paragraphs: [
          "Pink noise sits between the two: still broad, but with the harsh top end softened. People who find white noise too sharp and brown noise too heavy often land here.",
          "Preferences vary a great deal, and no sound guarantees productivity or concentration. Think of these as different atmospheres to try, not as tools with fixed effects.",
        ],
      },
      {
        heading: "How to choose a sound for focused work",
        list: [
          "Choose one consistent sound and stay with it for a whole session — the choosing is itself a distraction.",
          "Keep the volume low. If you notice the sound rather than the work, it is too loud.",
          "Avoid switching sounds every few minutes; a background you keep changing is no longer a background.",
          "Match density to the room: busy space, denser sound (rain, brown noise); quiet space, lighter sound (forest, stream).",
          "Set a timer and work in defined blocks, so the sound marks a session rather than running all day.",
          "Pair it with a distraction-free workspace — sound cannot compensate for twelve open tabs.",
          "Prefer sounds without words, melodies or sudden changes when the task needs language or precision.",
        ],
        key: "One sound, low volume, unchanged for the whole session.",
      },
      {
        heading: "A simple way to test what works for you",
        paragraphs: [
          "Pick three candidates — for example rain, brown noise and forest. Use one per day, for the same type of task, at the same time of day, for a week. Note in one line afterwards how the session went.",
          "You are not looking for a dramatic difference. You are looking for the option you resist least and return to most naturally. That one is your default; the others are there for when the room or the task changes.",
        ],
      },
      {
        heading: "When silence is the better answer",
        paragraphs: [
          "If you are already tired, or the task is verbally demanding, or you notice yourself listening instead of working, silence or something much lighter may serve you better. Ambient sound is one option among several, not an obligation.",
          "The useful question is never which sound is best. It is which atmosphere makes this particular piece of work easier to stay with today.",
        ],
      },
    ],
    relatedSounds: ["Focus", "Brown Noise", "Rain", "Forest"],
    relatedExperience: { label: "Browse the sound library", to: "/sounds" },
  },
  {
    slug: "better-evening-routine",
    title: "How to Create a Calmer Evening Routine",
    category: "Evening",
    read: "6 min read",
    intro:
      "The end of the day rarely needs more discipline. It usually needs fewer inputs — and a simple sequence you can repeat without thinking.",
    description:
      "A practical guide to a calmer evening: lowering stimulation, softening light, putting work away, choosing quiet sounds and following a simple twenty-minute wind-down.",
    keywords: ["evening routine", "wind down", "bedtime routine", "sleep sounds", "sleep timer"],
    image: HERO.oceanSunset,
    card: IMG.oceanSunset,
    sections: [
      {
        paragraphs: [
          "Evenings often disappear. You finish work later than planned, deal with a few more things, sit down with a screen, and then suddenly it is late and you feel simultaneously tired and wide awake. Nothing went wrong exactly — the day simply never ended, it just got quieter.",
          "An evening routine is not a rulebook or a self-improvement project. It is a transition: a short, familiar sequence that separates the busy part of the day from the quiet part.",
        ],
      },
      {
        heading: "Why a transition helps",
        paragraphs: [
          "Your mind takes cues from your surroundings. Bright light, notifications, open work tabs and unresolved conversations all say the same thing: something still needs your attention. Change those cues and the evening starts to feel different, even if nothing about your workload has changed.",
          "Consistency matters more than content. A modest sequence you repeat most nights becomes a signal. An elaborate ritual you manage twice a month stays a novelty.",
        ],
      },
      {
        heading: "Lower the stimulation",
        paragraphs: [
          "Stimulation is anything that keeps asking for a response: news feeds, group chats, competitive games, difficult admin, intense drama. None of these are bad; they are simply poor company for the last part of the day.",
          "You do not have to eliminate screens to reduce stimulation. Choosing something slower, quieter and less reactive already does most of the work.",
        ],
      },
      {
        heading: "Soften the light",
        paragraphs: [
          "Bright overhead light keeps a room feeling like the middle of the day. Turning it off and using one or two low, warm lamps changes the atmosphere immediately, and costs nothing.",
          "If you can, do it in stages: full light while you tidy up, half light while you read, one small lamp before bed. The gradual dimming is itself part of the transition.",
        ],
      },
      {
        heading: "Put work away properly",
        paragraphs: [
          "Closing work means closing it: the laptop shut, the tabs gone, the notebook in a drawer. A visible pile of unfinished work keeps a room feeling like an office.",
          "If your mind keeps returning to tomorrow, write the first three things down and stop there. A short list is easier to put aside than an open loop you are trying to hold in your head.",
        ],
      },
      {
        heading: "Trim the notifications",
        paragraphs: [
          "You do not need to be unreachable. You need fewer unnecessary interruptions. Silence group chats, marketing alerts and anything that has never once been urgent.",
          "Keep whatever genuinely matters — a family member, an on-call alert — and let everything else wait until morning.",
        ],
      },
      {
        heading: "Choose a calm sound",
        paragraphs: [
          "A steady, gentle sound helps the room settle and covers the small noises of a building at night. Rain on a window, a fireplace, distant ocean, a quiet night forest.",
          "Keep it low and unchanging, and use a sleep timer so it fades out on its own rather than running until morning. A slow fade is far less disruptive than an abrupt stop.",
        ],
        key: "Same sound, low volume, timer set — the evening should not need any more decisions.",
      },
      {
        heading: "Breathe for a couple of minutes",
        paragraphs: [
          "Sit or lie down and let the out-breath be slightly longer than the in-breath for a few minutes. There is no target to hit; if it feels effortful, breathe normally.",
          "This is less about physiology than about giving yourself a moment where nothing else is happening. Two quiet minutes is often enough to notice how tired you actually are.",
        ],
      },
      {
        heading: "Do something quiet with your hands or eyes",
        paragraphs: [
          "Reading a physical book, stretching, tidying one surface, sketching, making tea, listening to something instrumental — anything slow and undemanding.",
          "The purpose is not enrichment. It is occupying yourself gently so you are not simply waiting to be sleepy.",
        ],
      },
      {
        heading: "Keep the ending consistent",
        paragraphs: [
          "The last ten minutes are worth keeping identical: same order, same lamp, same sound, roughly the same time. Familiarity is what lets you stop thinking about it.",
          "Aim for most nights, not every night. A routine that survives an unusual evening is a routine you will still have next month.",
        ],
      },
      {
        heading: "A simple 20-minute evening reset",
        list: [
          "0–3 min — Close work. Laptop shut, tabs gone, tomorrow's three things written down.",
          "3–5 min — Change the light. Overhead off, one warm lamp on.",
          "5–7 min — Trim notifications and put the phone somewhere else.",
          "7–9 min — Start a calm sound at low volume and set a sleep timer.",
          "9–12 min — Breathe slowly, letting the exhale lengthen a little.",
          "12–18 min — Something quiet: read, stretch, tidy one surface.",
          "18–20 min — Dim to the last lamp and go to bed at roughly the usual time.",
        ],
      },
      {
        heading: "Keep expectations modest",
        paragraphs: [
          "None of these habits guarantee better sleep, and treating them as a promise tends to backfire — nothing keeps you awake quite like monitoring whether a routine is working.",
          "What a routine can reliably do is make the evening feel less like an extension of the working day. That alone is worth the twenty minutes.",
        ],
      },
    ],
    relatedSounds: ["Rain on Window", "Fireplace", "Ocean", "Night Forest"],
    relatedExperience: { label: "Open the sleep experiences", to: "/sleep" },
  },
  {
    slug: "meditation-for-beginners",
    title: "Meditation for Beginners",
    category: "Meditation",
    read: "6 min read",
    intro:
      "No incense, no cushion, no special beliefs. Just a few minutes of sitting still and paying attention to something simple.",
    description:
      "A friendly introduction to meditation for complete beginners: what it is, what it is not, how to sit, what to do with thoughts, and a simple five-minute practice.",
    keywords: ["meditation for beginners", "how to meditate", "breathing meditation", "five minute meditation"],
    image: HERO.zenGarden,
    card: IMG.zenGarden,
    sections: [
      {
        paragraphs: [
          "Meditation has collected a lot of decoration over the years — imagery, vocabulary, apps, expectations. Underneath all of it sits something very ordinary: you sit down, you pick one thing to pay attention to, and when you notice you have wandered off, you come back.",
          "That is genuinely the whole practice. Everything else is preference.",
        ],
      },
      {
        heading: "What meditation is",
        paragraphs: [
          "Meditation is deliberately practising attention. You choose an anchor — usually the breath — and you keep returning to it. Over time, noticing that you have drifted becomes quicker and less dramatic.",
          "Think of it as reps, not as a state to achieve. The moment you notice you were somewhere else and come back is the rep. That moment is the practice working, not the practice failing.",
        ],
      },
      {
        heading: "What meditation is not",
        list: [
          "It is not emptying your mind. Thoughts keep arriving; that is normal.",
          "It is not about feeling blissful. Some sessions are pleasant, many are unremarkable.",
          "It is not a performance you can be bad at. There is no score.",
          "It is not religious unless you want it to be.",
          "It is not a treatment for a medical condition, and it does not replace professional care.",
        ],
        key: "If you sat down and kept coming back to your breath, the session worked.",
      },
      {
        heading: "Finding a comfortable position",
        paragraphs: [
          "Sit on a chair with your feet on the floor, hands resting wherever they are comfortable, back upright but not rigid. A cushion on the floor is fine if you like it; it is not required.",
          "Comfort beats posture. If you spend five minutes managing an aching knee, you are practising discomfort, not attention. Lying down is allowed too, though many beginners find it sends them to sleep.",
        ],
      },
      {
        heading: "Focusing on the breath",
        paragraphs: [
          "Breathe normally. You are not controlling the breath, you are watching it. Pick one clear point — the air at the nostrils, the movement of the belly, the small pause at the top — and rest your attention there.",
          "If the breath feels awkward to watch, use something else: the sound of rain, the weight of your hands, or a quiet count from one to ten and back again. The anchor matters less than having one.",
        ],
      },
      {
        heading: "What to do when thoughts appear",
        paragraphs: [
          "They will. Plans, replays of conversations, an itch, a shopping list, the strong conviction that you are doing this wrong. None of that needs solving.",
          "The instruction is small: notice, and return. No arguing with the thought, no grading yourself, no starting over. If you drift fifty times in five minutes and return fifty times, you have had a good session.",
        ],
      },
      {
        heading: "Returning gently",
        paragraphs: [
          "The tone of the return matters more than people expect. Snapping back with irritation trains a habit of self-criticism; coming back calmly trains something kinder and more sustainable.",
          "A useful phrase: 'ah, thinking' — then back to the breath. Neutral, unhurried, no commentary.",
        ],
      },
      {
        heading: "Start with five minutes",
        paragraphs: [
          "Five minutes is short enough that you cannot really talk yourself out of it, which is exactly why it works. Twenty minutes on day one usually leads to nothing on day three.",
          "Attach it to something you already do — after brushing your teeth, before opening your laptop, once the house is quiet. Existing habits make good hooks.",
        ],
      },
      {
        heading: "A simple 5-minute meditation",
        list: [
          "1. Sit down somewhere reasonably quiet and set a five-minute timer.",
          "2. Let your eyes close, or soften your gaze towards the floor.",
          "3. Take three slower breaths to arrive, then let the breath return to normal.",
          "4. Choose one point to watch: nostrils, chest or belly.",
          "5. Follow ten breaths there, without changing them.",
          "6. When you notice you have drifted, note it lightly and come back to the same point.",
          "7. If the mind is very busy, count breaths one to ten, then start again at one.",
          "8. When the timer sounds, sit for a few seconds before you move.",
        ],
      },
      {
        heading: "Building a regular practice",
        paragraphs: [
          "Frequency beats duration. Five minutes on six days does more for the habit than half an hour once a week. Keep the same time and place if you can, and let the length grow only when sitting down feels easy.",
          "Expect uneven sessions. Some will feel spacious, some restless, most somewhere in between. Variation is not a sign that you are doing it wrong — it is a sign that you are a person with different days.",
          "Missing days is part of it too. The practice is not a streak to protect; you can always start again tonight, at five minutes, exactly as before.",
        ],
      },
      {
        heading: "One last thing",
        paragraphs: [
          "Meditation does not promise specific outcomes, and it is worth being sceptical of anyone who says otherwise. What many people report is modest and useful: noticing tension sooner, reacting a little more slowly, having a place to put the mind when the day is loud.",
          "If that sounds worth five minutes, you already know everything you need to begin.",
        ],
      },
    ],
    relatedSounds: ["Singing Bowls", "Zen Garden", "Forest", "Gentle Stream"],
    relatedExperience: { label: "Start a guided session", to: "/meditation" },
  },
  {
    slug: "what-is-brown-noise",
    title: "What Is Brown Noise?",
    category: "Sound",
    read: "5 min read",
    intro:
      "Deeper and softer than white noise, and increasingly people's default background sound. Here is what it actually is.",
    description:
      "A plain explanation of brown noise: how it differs from white and pink noise, why many people find it softer and deeper, and how to try it at a comfortable volume.",
    keywords: ["brown noise", "white noise", "pink noise", "noise colours", "background sound"],
    image: HERO.deepForest,
    card: IMG.deepForest,
    sections: [
      {
        paragraphs: [
          "Brown noise has quietly become one of the most requested background sounds of the last few years. People describe it as a low rumble — distant thunder, a waterfall behind a hill, the inside of a plane at cruising altitude.",
          "The name has nothing to do with colour in any visual sense. It is a label for how sound energy is distributed across frequencies, borrowed from the same convention that gives us white and pink noise.",
        ],
      },
      {
        heading: "What brown noise actually is",
        paragraphs: [
          "Noise, in this context, means a signal containing many frequencies at once rather than distinct notes. What distinguishes the colours is the balance between low and high frequencies.",
          "Brown noise weights the low frequencies heavily and rolls the high frequencies off steeply. Because our hearing is very sensitive in the upper-mid range, removing that brightness is what makes brown noise feel deep, thick and smooth instead of hissy.",
        ],
      },
      {
        heading: "How it is produced, conceptually",
        paragraphs: [
          "One way to picture it: start with completely random noise where every frequency is equally represented, then progressively turn down the higher frequencies. The steeper the reduction, the deeper the result.",
          "White noise applies no reduction. Pink noise applies a gentle one. Brown noise applies a steeper one again. In practice this is generated mathematically rather than recorded, which is why it never repeats and has no events in it at all.",
        ],
      },
      {
        heading: "White, pink and brown compared",
        list: [
          "White noise — equal energy across the spectrum. Bright and hissy, similar to untuned radio static or a strong shower. Very effective at covering speech; some find it sharp over time.",
          "Pink noise — the high end softened. Fuller and more natural, often compared to steady rain or wind in trees. A common middle ground.",
          "Brown noise — low frequencies dominant. Deep and rumbling, like distant thunder or a large waterfall far away. Usually described as the gentlest of the three.",
        ],
        key: "White is bright, pink is balanced, brown is deep. Same family, different weighting.",
      },
      {
        heading: "Why some people enjoy it",
        paragraphs: [
          "Brown noise is completely uneventful. There is no melody, no words, no rise and fall, nothing that resolves. For some people that makes it the least attention-grabbing background available.",
          "It is also good at masking low-frequency intrusions — traffic rumble, a neighbour's bass, machinery — that lighter sounds do not cover well. And because it has no bright top end, many people can leave it on for long stretches without feeling worn down by it.",
        ],
      },
      {
        heading: "Why it can feel softer than white noise",
        paragraphs: [
          "Human hearing is disproportionately sensitive around 2–5 kHz, roughly where consonants and squeaks live. White noise puts plenty of energy there, so it registers as bright and slightly abrasive.",
          "Brown noise mostly sits below that band. Two sounds can measure similarly and still feel very different, simply because of where their energy lands relative to our sensitivity.",
        ],
      },
      {
        heading: "How to experiment with it",
        list: [
          "Try it during one focused work session rather than all day, and notice whether you forget it is playing — a good sign.",
          "Start quieter than feels right; brown noise is easy to creep upwards because it is not harsh.",
          "Compare it directly with pink noise and rain on the same task, on different days.",
          "In a noisy room, brown noise plus a slightly lighter layer such as rain often covers more than either alone.",
          "For evenings, pair it with a timer so it fades rather than continuing all night.",
        ],
      },
      {
        heading: "Keeping the volume comfortable",
        paragraphs: [
          "Because it is smooth, it is easy to raise brown noise well beyond what you need. Sensible practice: set it just loud enough to soften the room, then leave it alone. If you find yourself turning it up repeatedly, take a break from listening instead.",
          "Headphones make this trickier still, since there is no room to give you a reference. Long sessions at high volume are worth avoiding regardless of the sound.",
        ],
      },
      {
        heading: "What it is not",
        paragraphs: [
          "Brown noise is not a treatment. It does not treat ADHD, anxiety, tinnitus, insomnia or any other medical condition, and claims that it does go well beyond the evidence.",
          "What can be said honestly is that many people find it a comfortable, unobtrusive background for work, rest or sleep — and that preferences differ enough that the only real test is trying it yourself.",
        ],
      },
    ],
    relatedSounds: ["Brown Noise", "White Noise", "Pink Noise", "Focus"],
    relatedExperience: { label: "Compare them in the library", to: "/sounds" },
  },
  {
    slug: "rain-ocean-or-forest",
    title: "Rain, Ocean or Forest?",
    category: "Sound",
    read: "6 min read",
    intro:
      "Every soundscape creates a different kind of room. A short guide to choosing the atmosphere you actually want.",
    description:
      "Rain, ocean, forest, fireplace or wind — how each soundscape changes the atmosphere of a space, and a simple way to pick which one to try first.",
    keywords: ["rain sounds", "ocean sounds", "forest sounds", "fireplace", "nature sounds"],
    image: HERO.mountainLake,
    card: IMG.mountainLake,
    sections: [
      {
        paragraphs: [
          "People usually ask which nature sound is best. A more useful question is what kind of space you want to be in for the next hour: enclosed or open, warm or airy, indoors or outdoors.",
          "Soundscapes are set design. None of them is better than the others; they simply build different rooms.",
        ],
      },
      {
        heading: "Rain — cosy and enclosed",
        paragraphs: [
          "Rain draws the walls in. It is dense, slightly irregular and strongly associated with being inside while something happens outside, which is why it is the most popular ambient sound by a wide margin.",
          "It suits reading, writing, admin and evenings. Light rain leaves room to think; heavy rain and rain on a window cover more of a noisy building. If you want to feel tucked away, start here.",
        ],
      },
      {
        heading: "Ocean — open and spacious",
        paragraphs: [
          "Waves do the opposite: they push the horizon outwards. The slow swell gives the room a sense of distance and scale, and the repeated rise and fall is what many people find settling.",
          "Ocean tends to suit thinking, planning, stretching and winding down. Because it is never quite level, some people find it less suitable for detailed work — and others find that same movement is exactly what helps.",
        ],
      },
      {
        heading: "Forest — natural and outdoors",
        paragraphs: [
          "A forest bed of leaves, soft wind and occasional distant birds feels alive without being busy. It reads as outdoors rather than sheltered, and it is lighter than rain or noise.",
          "That lightness makes it a good match for a room that is already quiet, or for a morning when you want the space to feel fresh rather than enclosed. Birdsong is worth watching: sparse is pleasant, constant can become an event.",
        ],
      },
      {
        heading: "Fireplace — warm and evening",
        paragraphs: [
          "Crackling logs are the warmest option, and the most obviously indoor. There is a small irregular event every second or two, which some people love and others find too textured for concentration.",
          "It belongs to late evenings, cold weather, quiet company and slow tasks. Layered underneath rain, it makes a room feel unmistakably like shelter.",
        ],
      },
      {
        heading: "Wind — airy and spacious",
        paragraphs: [
          "Wind is the most abstract of the five: broad, moving, and almost featureless. It suggests altitude and open ground — a ridge, a field, somewhere with nothing in the way.",
          "Steady wind can be a good neutral background when rain feels too busy and noise feels too synthetic. Gustier recordings are more evocative but less consistent.",
        ],
      },
      {
        heading: "Which sound should you try first?",
        list: [
          "You want to feel cosy and shut in → Rain.",
          "You want space to think or unwind → Ocean.",
          "You want the room to feel fresh and outdoors → Forest.",
          "You want warmth on a dark evening → Fireplace.",
          "You want something neutral and airy → Wind.",
          "You want the least distracting option possible → Brown noise, or steady wind.",
          "Your room is noisy → Rain or brown noise; the lighter scenes will not cover enough.",
        ],
        key: "Pick by the atmosphere you want, not by which sound sounds most impressive.",
      },
      {
        heading: "Layering two scenes",
        paragraphs: [
          "Most of the character comes from combinations. Rain plus fireplace is the classic cabin. Ocean plus wind opens a room right up. Forest plus a stream feels like standing still somewhere green.",
          "Two layers is usually plenty, one clearly quieter than the other. Beyond that, the mix stops being background and starts competing with whatever you are doing.",
        ],
      },
      {
        heading: "Matching the sound to the moment",
        paragraphs: [
          "The same person often wants different rooms at different hours. Mornings tend to suit lighter, brighter scenes — forest, a stream, soft wind — because the day is still opening up and a heavy background can feel like a blanket too early.",
          "Middle of the day, when there is work to hold on to, denser and more uniform scenes usually win: steady rain, brown noise, distant surf. There is enough happening in the task already.",
          "Evenings invite warmth and slowness. Fireplace, rain on a window, a slow ocean at low volume. And late at night, when you want as little as possible to notice, the plainest option is often the best one.",
        ],
      },
      {
        heading: "Volume changes the scene more than you think",
        paragraphs: [
          "A soundscape at low volume and the same soundscape turned up are almost two different environments. Quiet rain sits in the background of a room; loud rain becomes the room, and starts asking for attention.",
          "As a rule, set it just loud enough to soften the space and then stop. If you catch yourself listening rather than working or resting, come down a notch rather than changing scene — very often the sound was right and the level was not.",
        ],
      },
      {
        heading: "A note on expectations",
        paragraphs: [
          "These are atmospheres, not treatments. No soundscape is a medical intervention, and reactions differ — the ocean that settles one person keeps another alert.",
          "Try one for a full session before judging it, keep the volume low, and treat the whole thing as decorating a room rather than solving a problem. The right answer is simply the one you keep coming back to.",
        ],
      },
    ],
    relatedSounds: ["Rain", "Ocean Waves", "Forest", "Fireplace", "Wind"],
    relatedExperience: { label: "Build your own mix", to: "/sounds" },
  },
  {
    slug: "the-science-of-relaxation",
    title: "The Science of Relaxation",
    category: "Understanding",
    read: "7 min read",
    intro:
      "What is reasonably well understood about winding down, what is still uncertain, and where wellness marketing tends to overreach.",
    description:
      "An accessible look at relaxation: the stress response, breathing, attention, environmental cues and routines — with a careful line between research and wellness claims.",
    keywords: ["science of relaxation", "stress response", "breathing", "attention", "routines"],
    image: HERO.alpineMorning,
    card: IMG.alpineMorning,
    sections: [
      {
        paragraphs: [
          "Relaxation is an unusually noisy subject. Somewhere between genuine physiology and confident marketing sits a large grey area where plausible ideas get stated as established fact.",
          "This article stays deliberately careful. Where something is reasonably well supported, it says so. Where it is a common experience rather than a proven mechanism, it says that instead.",
        ],
      },
      {
        heading: "The stress response, briefly",
        paragraphs: [
          "When your body treats a situation as demanding, a familiar set of changes follows: heart rate rises, breathing quickens and shallows, muscles tense, attention narrows onto whatever seems most urgent. This is useful and short-term by design.",
          "The difficulty with modern days is not that the response exists but that it is triggered repeatedly by things that never resolve — messages, deadlines, half-finished tasks. Nothing dramatic happens, and the system never fully stands down.",
          "Winding down is largely about giving that system a clear signal that the demand has passed.",
        ],
      },
      {
        heading: "Breathing: the most direct lever",
        paragraphs: [
          "Breathing is the part of this system you can influence deliberately, which is why almost every relaxation practice starts there. Research suggests that slow breathing — particularly with a longer, unforced exhale — is associated with measurable shifts towards a calmer physiological state.",
          "What is less clear is how much any specific pattern matters. Precise ratios are popular online, but the evidence for one exact count over another is thin. Slow, comfortable and unforced covers most of the benefit.",
          "It is also worth saying that breathing exercises can feel unpleasant if pushed. Light-headedness or straining is a signal to return to normal breathing, not to try harder.",
        ],
        key: "Slow and comfortable matters more than any specific count.",
      },
      {
        heading: "Attention and rumination",
        paragraphs: [
          "A large part of feeling wound up is cognitive rather than physical: replaying a conversation, rehearsing tomorrow, checking whether you have forgotten something. The body follows the story the mind keeps telling.",
          "Giving attention a simple, concrete anchor — the breath, a sound, a physical sensation — interrupts that loop, which is the common thread across meditation, focused listening and many breathing practices.",
          "This is not the same as clearing your mind, and it does not require the loop to stop. It only requires somewhere else to put attention when you notice it has drifted.",
        ],
      },
      {
        heading: "Environmental cues",
        paragraphs: [
          "Surroundings carry meaning. Bright light, visible work, an active screen and constant notifications all imply ongoing demand; dim warm light, a tidy surface and a steady quiet sound imply the opposite.",
          "Some of the individual effects here — how light influences alertness, for instance — are studied areas with real findings, though popular summaries often overstate how strong or predictable they are. As practical advice it is still sound: change the cues and the room feels different.",
        ],
      },
      {
        heading: "Repetition and routine",
        paragraphs: [
          "Doing the same short sequence at roughly the same time makes it easier to begin, because you are no longer deciding each night whether to bother. Habit research consistently points at context and repetition as the important ingredients rather than motivation.",
          "There is also a learned-association element: a sequence you always use before resting can start to feel like resting. That is a modest, believable effect — not evidence that a particular sound switches your nervous system.",
        ],
      },
      {
        heading: "Sound and atmosphere",
        paragraphs: [
          "Steady background sound demonstrably masks irregular noise, and irregular noise demonstrably interrupts attention. That part is straightforward.",
          "Beyond masking, things get less certain quickly. Some people find nature sounds settling and there is research pointing in that direction, but effects vary between individuals and studies are often small. Personal preference plausibly matters as much as acoustics.",
          "Claims about specific frequencies retuning your brain, healing tissue or treating conditions go well past what the evidence supports. Binaural beats and similar approaches are studied, results are mixed, and no responsible reading of that literature yields a guarantee.",
        ],
      },
      {
        heading: "Breaks and transitions",
        paragraphs: [
          "Sustained attention degrades over time, and short breaks are generally associated with better performance afterwards — a reasonably well-supported and unglamorous finding.",
          "Transitions matter too. Moving straight from an intense task into rest tends not to work, because the previous state carries over. A brief, deliberate gap between activities is one of the cheapest interventions available.",
        ],
      },
      {
        heading: "Reading claims carefully",
        list: [
          "Careful language sounds like: research suggests, may help, some people find, is associated with.",
          "Overreach sounds like: scientifically proven, clinically shown to cure, rewires your brain, treats anxiety.",
          "Be sceptical of anything promising a specific outcome in a specific number of minutes.",
          "Individual variation is normal; a practice that helps someone else may do nothing for you.",
          "Nothing in this area substitutes for medical advice when something is genuinely wrong.",
        ],
      },
      {
        heading: "What holds up",
        paragraphs: [
          "Strip out the overclaiming and a short list remains: breathe more slowly, give your attention something simple, change the cues in your environment, repeat it often, and put a real gap between activities.",
          "It is not a spectacular list, which is probably why it needs so much decoration to sell. But it is honest, it is cheap, and most people can test it in a week and see for themselves.",
        ],
      },
    ],
    relatedSounds: ["Ocean Waves", "Deep Forest", "Brown Noise"],
    relatedExperience: { label: "Explore relaxation frequencies", to: "/frequencies" },
  },
  {
    slug: "build-a-focus-ritual",
    title: "How to Build a Focus Ritual",
    category: "Focus",
    read: "6 min read",
    intro:
      "The same nine steps, in the same order, every time. A ritual is easier to keep than a system — and that is exactly the point.",
    description:
      "A simple, repeatable nine-step focus ritual: clear the desk, choose one sound, silence notifications, pick one task, set a timer and work without switching.",
    keywords: ["focus ritual", "deep work", "concentration", "timer", "focus sounds"],
    image: HERO.meadow,
    card: IMG.focus,
    sections: [
      {
        paragraphs: [
          "Most people do not struggle to focus once they have started. They struggle to start. The first ten minutes go on tidying, checking, deciding, and by the time the real work begins the good part of the morning has gone.",
          "A ritual removes that gap. Not by making you more disciplined, but by making the beginning identical every time, so there is nothing left to decide.",
        ],
      },
      {
        heading: "Why a ritual beats a system",
        paragraphs: [
          "Productivity systems tend to grow. They add categories, tags, reviews and rules until maintaining the system becomes its own project — and the day you feel worst is the day you abandon it.",
          "A ritual is short, fixed and physical. Five to eight steps you can do half-asleep. Because it never changes, it becomes a cue: once you are three steps in, your head has already started shifting into work.",
          "Consistency is doing the work here, not cleverness. The same modest sequence repeated hundreds of times beats an elegant framework you follow for a fortnight.",
        ],
        key: "The ritual is not the work. It is the doorway into the work.",
      },
      {
        heading: "The ritual, step by step",
        list: [
          "1. Clear the workspace. Everything unrelated off the desk — a visible mess is a list of other jobs.",
          "2. Choose one background sound and start it low. Decide once, then leave it alone.",
          "3. Put notifications away. Phone in a drawer, chat closed, badges silenced for the session.",
          "4. Take a few comfortable breaths, letting the exhale lengthen slightly. Thirty seconds is enough.",
          "5. Choose ONE task and write it in a single line. Specific enough to finish or clearly advance.",
          "6. Set a timer — 25, 40 or 50 minutes depending on the work and your energy.",
          "7. Work without switching. No tabs, no quick checks, no second task.",
          "8. Take a short break away from the screen. Stand up, look out of a window, drink something.",
          "9. Repeat if needed, or stop. Two good blocks is a good day.",
        ],
      },
      {
        heading: "Why each step is there",
        paragraphs: [
          "Clearing the desk and silencing notifications reduce the number of things competing for you. Choosing the sound first prevents ten minutes of browsing for the perfect track. The breaths mark the boundary between before and during.",
          "Writing one task is the step people skip and the one that matters most. Vague intentions invite drift; a single named task gives the session an obvious success condition. The timer converts an open-ended obligation into a defined block that ends whether or not you are finished.",
        ],
      },
      {
        heading: "Choosing the sound",
        paragraphs: [
          "Pick something steady without words or sudden changes: brown noise, rain, forest, a focus mix. Keep it quiet enough that you stop noticing it.",
          "Use the same sound for the same kind of work if you can. Repetition is what turns it from pleasant background into a signal that this is a working block.",
        ],
      },
      {
        heading: "Handling interruptions",
        paragraphs: [
          "Interruptions are certain, so plan for them instead of hoping. Keep a scrap of paper for anything that surfaces mid-session: the thought gets recorded and you keep working.",
          "For genuine interruptions from other people, restart the ritual rather than the timer — sound, breaths, task line. Three steps is a much easier re-entry than trying to remember where you were.",
        ],
      },
      {
        heading: "Ending the session properly",
        paragraphs: [
          "When the timer sounds, write one line about where you got to and what comes next. Tomorrow's version of you starts from that line instead of from a blank screen.",
          "Then actually break. A break spent scrolling is not much of a break; standing up, moving and looking at something distant restores more.",
        ],
      },
      {
        heading: "Keeping it alive",
        paragraphs: [
          "Resist the urge to improve the ritual. If you find yourself adding steps, you are building a system again. When something genuinely does not fit, remove a step rather than adding two.",
          "Aim for most working days, not all of them. A ritual that survives a bad week is worth far more than a perfect one that lasts nine days — and unlike a system, you can rebuild it in about a minute.",
        ],
      },
    ],
    relatedSounds: ["Focus", "Brown Noise", "Rain", "Cafe"],
    relatedExperience: { label: "Find your focus sound", to: "/sounds" },
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
