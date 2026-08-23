# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deploying to Netlify

1. Connect the repo on Netlify — `netlify.toml` already sets the build
   (`npm run build`), the publish dir (`dist`) and `NITRO_PRESET=netlify`,
   which makes Nitro emit the SSR handler as an internal Netlify Function
   (`.netlify/functions-internal/server`) registered for `/*`.
2. Optional: set `VITE_SITE_URL=https://your-domain` so social preview images
   use a fully absolute URL. See `.env.example`; no secrets are required.
3. Routing: the SSR function is registered with `path = "/*"` and
   `preferStatic = true`, so static files win and every other path (including
   deep links and refreshes) is server-rendered. Do not add a `_redirects`
   catch-all or `public/_redirects` — it would shadow SSR.

## Local development (VS Code)

```sh
npm install     # package-lock.json is committed
npm run dev     # http://localhost:5173
npm run build   # production build (Cloudflare/Node default, Netlify on CI)
npx tsc --noEmit  # TypeScript check
npm run lint
```

No environment variables are required; see `.env.example` for the optional ones.

## Audio & background playback

Ambient audio is generated procedurally in the browser (Web Audio API), so
there are no audio files to host and nothing can 404. Mixing and per-track
volume run through the Web Audio graph; a single hidden, near-silent
`HTMLAudioElement` anchors the platform media session so iOS shows Lock Screen
/ Control Center controls and keeps playing when Safari is backgrounded.
Supported Media Session actions: play, pause, stop, nexttrack, previoustrack.
Seek actions are registered but inert — soundscapes are endless loops with no
timeline. iOS can still drop the audio session under memory pressure or when
another app takes audio focus; playback re-arms on the next foreground/gesture.
