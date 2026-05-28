# TwoMinds — Codex Handoff Context

## What this app is
A wisdom game for couples called **TwoMinds**. Each session is 5 questions. Players pick the correct answer, see if they're right, then discuss a conversation prompt with their partner.

## Tech stack
- React + TypeScript
- Tailwind CSS v4
- Motion (motion/react) for animations
- react-router (createBrowserRouter)
- pnpm

## Current file structure
```
src/app/
  App.tsx                         — router only
  data/
    questions.ts                  — all question data (3 modes × 5 questions)
  components/
    LandingPage.tsx               — hero, mode selector, game preview
    PlayPage.tsx                  — STUB: just says "Game coming soon..."
    GamePreview.tsx               — static preview shown on landing page
    Character.tsx                 — animated SVG character (moods: idle/happy/thinking)
    FloatingChip.tsx              — floating animated pill chip
    figma/ImageWithFallback.tsx   — safe img wrapper
    ui/                           — shadcn UI components (button, card, etc.)
```

## What still needs to be built

### 1. PlayPage (`src/app/components/PlayPage.tsx`)
This is the main task. Full game flow for `/play/:mode`.

**Route:** `/play/:mode` — reads `mode` param (values: `"date-night"`, `"deep-dive"`, `"long-distance"`)

**Game flow:**
1. Show question 1 of 5 (scenario text + 3 answer options)
2. Player taps an option → reveal correct answer, show conversation prompt
3. "Next Question →" button becomes active after answering
4. Repeat for 5 questions
5. Show end screen with score (X/5) and a recap CTA

**State to manage:**
- `currentIndex` (0–4)
- `selected` (null | option id string)
- `score` (number of correct answers)
- `done` (boolean — true after completing all 5)

**Character moods:**
- `"idle"` — before answer is selected
- `"happy"` — after correct answer
- `"thinking"` — after wrong answer

**Data import:**
```ts
import { QUESTIONS, MODE_CONFIG, type ModeId } from "../data/questions";
import { useParams, useNavigate } from "react-router";
```

**Question data shape:**
```ts
interface Question {
  scenario: string;
  prompt: string;           // e.g. "What does this represent?"
  options: { id: string; label: string; correct: boolean }[];
  conversationPrompt: string; // shown after answering
}
```

**MODE_CONFIG shape:**
```ts
{
  label: string;   // "Deep Dive"
  emoji: string;   // "🧠"
  color: string;   // "#ff4d7e"
  bg: string;      // "rgba(255,77,126,0.15)"
  glow: string;    // "rgba(255,77,126,0.3)"
}
```

**Design tokens / colors:**
- Background gradient: `linear-gradient(160deg, #fff0f5 0%, #f8f4ff 50%, #fff5f0 100%)`
- Dark text: `#1a0a2e`
- Muted text: `#9d8aaa` / `#6b5b7b`
- Pink accent: `#ff4d7e`
- Purple accent: `#7c3aed`
- Correct answer: green bg `#f0fdf4`, border `#34d399`, text `#065f46`
- Wrong answer: keep white bg, border `rgba(0,0,0,0.08)`, text `#9d8aaa`
- Card border: `rgba(255,77,126,0.12)`, shadow: `0 4px 20px rgba(255,77,126,0.08)`

**Fonts:**
- Headings / labels: `Fredoka, sans-serif`
- Body / options: `Nunito, sans-serif`

**Animations:** Use `motion` from `"motion/react"` for option reveal (staggered fade-in), character mood transition, and the "Next" button sliding in after answer.

**End screen ideas:**
- Show score: "You got X/5!"
- Subtext based on score (e.g. 5/5 → "Perfect wisdom! 🎉", 3-4 → "Great minds think alike 💡", <3 → "Keep exploring together 💌")
- Two buttons: "Play again" (same mode) and "Back to home"

### 2. Router update (`src/app/App.tsx`)
Change the play route from `/play` to `/play/:mode`:
```ts
{ path: "play/:mode", element: <PlayPage /> }
```

### 3. LandingPage navigate call (`src/app/components/LandingPage.tsx`, line 98)
Change:
```ts
onClick={() => navigate("/play")}
```
To:
```ts
onClick={() => navigate(`/play/${activeMode}`)}
```

## Design reference — GamePreview component
The `GamePreview.tsx` component shows a static snapshot of the in-game UI. Use it as the visual reference for how the PlayPage should look (same card styles, same option row styles, same character placement).

## Notes
- Never use `"transparent"` as an animated value in Motion — use `"rgba(0,0,0,0)"` instead (already fixed in LandingPage).
- Do NOT create `.html`, `.js`, or `.jsx` files — only `.tsx`.
- Do NOT run `vite build` or start the dev server.
- Use `pnpm` not `npm`.
