# Soccer Buddy — Requirements

> **Status:** 🌱 Draft / living document. This is a starting point to flesh out together. Items marked _(TBD)_ or _(open question)_ need decisions. Nothing here is locked.

## 1. Product Summary

A mobile app that helps a young child (initially **ages 4–6**) practice real-world soccer skills through short, playful, daily sessions. The child should be able to operate it largely on their own; a parent sets things up and checks progress.

## 2. Goals & Non-Goals

### Goals
- Build a **daily habit** of short soccer practice (~5 minutes/session).
- Be **usable by a pre-reader** — visuals + audio, minimal/no text required to play.
- Coach **real physical movement**, not on-screen games.
- Make the child feel **encouraged and proud** (rewards, streaks, no failure states).

### Non-Goals (for v1)
- No social features, chat, or user-generated content.
- No competitive leaderboards against strangers.
- No account system beyond a simple local profile _(open question: cloud sync later?)_.
- Not a full coaching/curriculum platform yet — start with a small, high-quality set of drills.

## 3. Target Users / Personas

- **Child (primary, ages 4–6):** Pre-reader, short attention span, motivated by fun, characters, sounds, and rewards. Needs large tap targets and audio instructions.
- **Parent/guardian:** Sets up the profile, controls session length and settings, reviews progress, gates purchases/settings.
- **Future:** Older children (7–10, then 11+) with harder drills and self-tracking.

## 4. Key User Stories (Draft)

- As a **child**, I can open the app and start today's practice with one obvious tap.
- As a **child**, I can see and hear how to do a drill via a short demo.
- As a **child**, I get a fun celebration and a reward when I finish.
- As a **child**, I can see my streak / stickers so I want to come back.
- As a **parent**, I can set my child's name, age, and avatar.
- As a **parent**, I can adjust how long a daily session is.
- As a **parent**, I can review what my child practiced and their streak.
- As a **parent**, I can access settings behind a simple gate the child can't easily pass.

## 5. Functional Requirements (Draft)

### 5.1 Daily Session
- A single, prominent "Start" entry point on the home screen.
- A session is a short sequence: warm-up → 2–3 drills → celebration.
- Each step has a visual demo and audio coaching.
- **Audio (v1):** On-device text-to-speech (`expo-speech`), English only. Each screen auto-speaks a short coaching line once on appear; a large 🔊 control replays it. Speech stops when leaving the screen. No cloud TTS, no child voice recording. Recorded voice talent remains an open later option.
- Session length is configurable by the parent _(target ~5 min default)_.

### 5.2 Drills
- A small starter library of beginner drills (e.g. toe taps, kick a target, freeze/trap control).
- Each drill has: name, icon/illustration, demo animation or video, audio cue, and a simple "done" interaction.
- **Decision (v1 slice 1):** The child marks a drill complete with a big **"I did it!"** tap. No timer or motion detection in this slice.

### 5.3 Rewards & Motivation
- Earn a sticker/badge per completed session or drill.
- Track a daily **streak** (calendar days with at least one completed session).
- Streak persists on-device only (AsyncStorage); no accounts or cloud sync in this increment.
- Completing the session again the same day is allowed but does not increment the streak twice.
- Home shows current streak (🔥 + number) and a visual badge when today's practice is already done.
- Positive, celebratory feedback (sound + animation). No "you failed" states.

### 5.4 Player Profile
- Name, age, avatar. Stored locally _(open question: support multiple kids?)_.

### 5.5 Parent Area
- Gated entry via press-and-hold (~3 seconds) on a small lock control in a corner of Home — not a math quiz, not as large as Start.
- Inside (v1 slice): review current streak (🔥 + number) and a mute toggle for coaching audio.
- Mute persists locally in `@soccer_buddy/progress` (`soundEnabled` field). When muted, `speakCoaching`, auto-speak, and replay no-op.
- Parent screen does not auto-speak.
- Done/back returns to Home.
- **Out of scope for this slice:** child name/age/profile, session-length slider, purchases.

## 6. Non-Functional Requirements (Draft)

- **Usability:** Operable by a 4–6 year old; pre-reader-friendly (icons + audio).
- **Accessibility:** Large tap targets, high contrast, clear audio, reduced-motion option _(TBD)_.
- **Platforms:** iOS and Android via React Native (Expo, managed workflow). A **web browser preview** is also published to GitHub Pages for family testing — not a v1 store target.
- **Offline:** Daily session should work without a network connection _(target)_.
- **Performance:** Fast cold start; smooth animations on mid-range devices.
- **Privacy & Safety:** No ads, no third-party tracking of children, no open chat. Comply with child-privacy norms (e.g. COPPA/GDPR-K considerations) _(needs review before launch)_.
- **Data:** Local-first storage for v1 _(open question: cloud backup/sync later?)_.
- **Web preview (family testing):** Static export hosted at [https://gbird3.github.io/soccer-buddy/](https://gbird3.github.io/soccer-buddy/) via GitHub Pages. Browser-only distribution for trying the app with kids; native Expo builds remain the primary path. No accounts, analytics, or backend added for web.

## 7. Content Scope (v1 Draft)

- ~4–6 beginner drills with demos and audio.
- 1 warm-up and 1 celebration flow.
- A starter set of stickers/badges.
- _(Open question: who creates the demo media — animation, filmed video, or stock?)_

## 8. Open Questions

- ~~How does the child mark a drill complete (tap, timer, motion detection)?~~ **Decided:** tap-to-complete ("I did it!") for v1.
- Single child profile or multiple?
- ~~Audio: recorded voice vs. text-to-speech? What language(s)?~~ **Decided (v1):** On-device TTS (`expo-speech`), English only, replayable via speaker control. Recorded voice is a later option.
- Demo media format and source?
- Local-only data for v1, or cloud sync from the start?
- Monetization model (free, one-time, subscription) — and how parent gating works?
- What does "improvement" mean — do we measure skill, or just consistency/streaks, in v1?

## 9. Success Metrics (Draft)

- Child completes a session most days (streak retention).
- Sessions are short enough to finish (completion rate per started session).
- Parent reports the child enjoys it and returns voluntarily.

---

## 10. First Buildable Slice (implemented)

**Flow:** Home → one drill (Toe Taps) → celebration + sticker.

| Step | Screen | Child action |
|------|--------|--------------|
| 1 | Home | Tap **Start!** |
| 2 | Drill | Watch toe-tap demo, practice in real life, tap **I did it!** |
| 3 | Celebration | See sticker reward, tap **Done** to return home |

**Out of scope for this slice:** parent area, profile, audio, multiple drills, navigation library.

---

## 11. Local Habit Loop (implemented)

**Flow additions:** completing a session saves progress locally and updates the streak.

| Behavior | Rule |
|----------|------|
| First completion ever | Streak = 1, today's sticker earned |
| Practice yesterday, complete today | Streak increments by 1 |
| Skip one or more calendar days | Streak resets to 1 on next completion |
| Second completion same day | Sticker still shown; streak unchanged |
| Reload app | Progress survives via AsyncStorage |

**Home screen:** 🔥 + streak count; practiced-today badge (⭐✅) when applicable; **Start!** always available.

**Celebration screen:** shows earned sticker and updated streak count.

**Storage:** `@soccer_buddy/progress` JSON in AsyncStorage (`lastPracticeDate`, `streak`, `soundEnabled`). No network, no child PII.

---

## 12. On-Device Audio Coaching (implemented)

**Behavior:** Each screen speaks a short encouraging coaching line when it appears; a large 🔊 button replays it. Speech stops on screen exit.

| Screen | Coaching line |
|--------|---------------|
| Home | "Let's practice!" |
| Toe Taps | "Tap the ball with your toes, one foot at a time!" |
| Kick a Target | "Kick the ball at the target!" |
| Freeze! | "Roll the ball, then freeze with your foot on top!" |
| Celebration | "Great job! You earned a sticker!" |

**Tech:** `expo-speech` on-device TTS, English only. Fails silently when speech is unavailable (tests, web). No cloud TTS, no voice recording, no parent mute in this slice.

---

_Next steps: parent area polish, more drills, recorded voice option._

**v1 beginner drills (3):** Toe Taps (footwork), Kick a Target (striking), Freeze! (first-touch trap/control).
