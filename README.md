# ⚽ Soccer Buddy

A mobile app that helps young kids build soccer skills through short, playful, daily practice. The first release is designed for **preschool and early-elementary players (ages 4–6)**, with a roadmap to grow alongside them into older age groups.

## Vision

Make daily soccer practice feel like play. A 5-year-old should be able to open the app on their own, understand what to do without reading, complete a fun activity in a few minutes, and feel proud of their progress.

## Who It's For

- **Primary audience (v1):** Ages 4–6. Pre-readers who need big visuals, audio guidance, and simple taps.
- **Parents/guardians:** Set up the child, keep sessions short and safe, and follow along with progress.
- **Future audiences:** Older kids (7–10, then 11+) as skills, drills, and challenge difficulty scale up.

## Design Principles

1. **Pre-reader first.** Icons, illustrations, color, and voice over text. Anything required to play must be understandable without reading.
2. **Daily and bite-sized.** A complete session takes ~5 minutes so it fits into a young attention span and builds a daily habit.
3. **Movement over screen time.** The app coaches a real-world physical activity; screen time is the prompt, not the point.
4. **Encouragement always.** Positive reinforcement, no failure states, celebrate effort and streaks.
5. **Safe by default.** No ads, no open chat, no data selling. Parent-gated settings and purchases.

## Core Concepts (Starting Point)

These are the initial building blocks to iterate on:

- **Drills:** Single skills to practice (dribbling, passing against a wall, toe taps, kicking a target).
- **Daily Session:** A short, curated set of two drills with a warm-up and a celebration. The two drills rotate by local calendar day (Pair A: Toe Taps + Kick a Target; Pair B: Freeze! + Tick Tock) so tomorrow's session is different from today's.
- **Demonstrations:** Short looping animations or videos showing the move.
- **Rewards & Streaks:** Stickers, badges, and a daily streak to build the habit.
- **Player Profile:** Name, age, avatar, and progress — kept simple and private.
- **Parent Area:** Gated section for setup, session length (short vs full; default short), and progress review.

## Roadmap (Rough)

- **v1 — Ages 4–6 foundation:** Daily session flow, a handful of beginner drills with animated demos, audio coaching, stickers + streaks, basic parent area.
- **v2 — Progression:** More drills, difficulty tiers, simple skill tree, expanded rewards.
- **v3 — Older kids:** Ages 7–10 content, timed challenges, self-tracking, optional skill assessments.
- **Later:** Multiplayer/family challenges, coach/team mode, more sports skills.

## Tech Stack

- **React Native** via **Expo** (managed workflow) — one codebase for iOS and Android.
- **JavaScript** to start (TypeScript is an option we can adopt later).
- Currently a minimal blank scaffold; structure and libraries will grow as requirements firm up.

## Getting Started

Prerequisites: [Node.js](https://nodejs.org/) (LTS recommended) and the **Expo Go** app on your phone (or an iOS/Android simulator).

```bash
# Install dependencies
npm install

# Start the dev server
npm start
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `i` / `a` in the terminal to open a simulator. You can also run directly:

```bash
npm run ios      # iOS simulator (macOS + Xcode)
npm run android  # Android emulator
npm run web      # run in a browser
npm run export:web  # static production build (output in dist/)
```

## Try it on a phone

**Live preview:** [https://gbird3.github.io/soccer-buddy/](https://gbird3.github.io/soccer-buddy/)

Open that link on your phone's browser to try Soccer Buddy with your kids. This is a **browser preview** for family testing — you can install it to your home screen for quick access, but it is not the same as the native Expo Go / App Store experience.

### Add to Home Screen (family testing)

**Android Chrome (primary):**
1. Open [the live preview](https://gbird3.github.io/soccer-buddy/) in Chrome.
2. Tap the menu (⋮) → **Install app** or **Add to Home screen**.
3. Confirm — Soccer Buddy opens standalone with the app icon and field-green theme.

**iOS Safari:**
1. Open the preview in Safari → Share (□↑) → **Add to Home Screen** → **Add**.

- **Native iOS/Android** via Expo Go is unchanged (`npm start` and scan the QR code).
- **No accounts, analytics, or backend** — same local-first app, just exported for the web.
- Deploys automatically to GitHub Pages when changes merge to `main` (or run the **Deploy web preview to GitHub Pages** workflow manually).

## Project Structure

```
App.js                  # Root component — practice screen state machine
index.js                # Entry point — registers the root component
app.json                # Expo app config (name, icons, platforms)
assets/                 # Icons and images
src/
  practiceFlow.js       # Screen transitions (home → warm-up → drills → celebration → parent)
  streak.js             # Pure streak date math (calendar days, no double-count)
  storage/              # On-device progress persistence (AsyncStorage)
  screens/              # Home, WarmUp, Drill, Celebration, Parent screens
  components/          # BigButton, SpeakerButton, ParentGateButton, CelebrationConfetti, demos
  celebrationEffects.js # Pure confetti particle config for celebration polish
  hooks/               # useCoachingSpeech — auto-speak on mount, replay, cleanup
  audio/               # On-device TTS via expo-speech (speakCoaching / stopCoaching)
  constants/            # Theme colors/sizes, drill data, sticker catalog
__tests__/              # Jest + React Native Testing Library tests
REQUIREMENTS.md         # Living product requirements doc
```

## First Playable Slice

A child can:

1. Open the app and land on a **kid-first home** — a playful mascot with a big soccer ball, soft streak/sticker hints up top, and a huge **Start!** button that dominates the lower half (home speaks "Let's practice!" on appear; tap 🔊 to hear again).
2. Do a short **Warm-up** — march in place and roll the ball with your feet (looping demo, on-device audio coaching), then tap **Let's go!** During warm-up and each drill, a row of three step icons (warm-up + today's two drills) shows where they are in today's practice — no reading required.
3. Complete a two-drill session drawn from the beginner catalog — **Toe Taps** + **Kick a Target** on even local days, **Freeze!** + **Tick Tock** on odd local days — each with a looping demo, on-device audio coaching, and tap-to-complete.
4. Tap **I did it!** after each drill (no timer or motion detection).
5. After both drills, see a playful celebration — a brief confetti burst, a bouncy sticker pop, encouragement audio, and a warm **"See you tomorrow!"** invite to come back — and earn a distinct sticker per new practice day, then tap **Done** to go home.
6. Build a daily streak — finishing the full session once per calendar day counts; the home screen softly shows 🔥 + streak count, a row of earned stickers, and a badge when today's practice is already done without competing with the big **Start!** button (practice again anytime; streak and sticker collection won't double-count).

**Parent area (v1):** A small 🔒 control in the top-right corner of Home. Parents press and hold for ~3 seconds to enter. On first open (before any practice day is recorded), a prominent coaching card appears: **"Hand the phone to your kid, tap Start."** — hidden after the first completed session. Inside: a **this-week** calendar (Sun–Sat) showing which days the child practiced, review the current streak, toggle **short vs full session** (default short: warm-up + today's two rotating drills; full: warm-up + all four beginner drills), and toggle coaching audio on/off. Preferences persist on-device in `@soccer_buddy/progress`; when coaching is muted, auto-speak and 🔊 replay are silenced. The parent screen does not auto-speak.

**Audio (v1):** On-device text-to-speech via `expo-speech` — English only, auto-speaks once per screen, replayable via a large 🔊 button. No cloud TTS, no recording. Recorded voice talent is a possible later option.

Run unit tests:

```bash
npm test
```

## Requirements

Product requirements are being captured in [REQUIREMENTS.md](./REQUIREMENTS.md) — a living draft we're actively fleshing out.

## Status

🚧 Early development — warm-up plus two-drill daily session that rotates by local calendar day (Pair A: Toe Taps + Kick a Target; Pair B: Freeze! + Tick Tock), optional parent **full session** (all four drills), four beginner drills in the catalog, local streak/sticker persistence, on-device audio coaching, celebration come-back hook ("See you tomorrow!"), and a parent-gated settings area (first-open coaching card, week-at-a-glance practice view, streak review, session-length toggle, coaching mute).

## License

TBD.
