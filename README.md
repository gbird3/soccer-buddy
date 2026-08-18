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
- **Daily Session:** A short, curated set of 2–3 drills with a warm-up and a celebration.
- **Demonstrations:** Short looping animations or videos showing the move.
- **Rewards & Streaks:** Stickers, badges, and a daily streak to build the habit.
- **Player Profile:** Name, age, avatar, and progress — kept simple and private.
- **Parent Area:** Gated section for setup, session length, and progress review.

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
```

## Project Structure

```
App.js                  # Root component — practice screen state machine
index.js                # Entry point — registers the root component
app.json                # Expo app config (name, icons, platforms)
assets/                 # Icons and images
src/
  practiceFlow.js       # Screen transitions (home → drills → celebration)
  streak.js             # Pure streak date math (calendar days, no double-count)
  storage/              # On-device progress persistence (AsyncStorage)
  screens/              # Home, Drill, Celebration screens
  components/          # BigButton, SpeakerButton, ToeTapDemo, KickTargetDemo
  hooks/               # useCoachingSpeech — auto-speak on mount, replay, cleanup
  audio/               # On-device TTS via expo-speech (speakCoaching / stopCoaching)
  constants/            # Theme colors/sizes, drill data
__tests__/              # Jest + React Native Testing Library tests
REQUIREMENTS.md         # Living product requirements doc
```

## First Playable Slice

A child can:

1. Open the app and tap **Start!** on the home screen (home speaks "Let's practice!" on appear; tap 🔊 to hear again).
2. Complete a two-drill session: **Toe Taps** then **Kick a Target** — each with a looping demo, on-device audio coaching, and tap-to-complete.
3. Tap **I did it!** after each drill (no timer or motion detection).
4. After both drills, see a celebration and earn one star sticker per session (celebration speaks encouragement), then tap **Done** to go home.
5. Build a daily streak — finishing the full session once per calendar day counts; the home screen shows 🔥 + streak count, and a badge when today's practice is already done (practice again anytime; streak won't double-count).

**Audio (v1):** On-device text-to-speech via `expo-speech` — English only, auto-speaks once per screen, replayable via a large 🔊 button. No cloud TTS, no recording. Recorded voice talent is a possible later option.

Run unit tests:

```bash
npm test
```

## Requirements

Product requirements are being captured in [REQUIREMENTS.md](./REQUIREMENTS.md) — a living draft we're actively fleshing out.

## Status

🚧 Early development — two-drill daily session with local streak/sticker persistence and on-device audio coaching. Parent area not yet implemented.

## License

TBD.
