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
- Session length is configurable by the parent _(target ~5 min default)_.

### 5.2 Drills
- A small starter library of beginner drills (e.g. toe taps, dribble between cones, pass against a wall, kick a target).
- Each drill has: name, icon/illustration, demo animation or video, audio cue, and a simple "done" interaction.
- **Decision (v1 slice 1):** The child marks a drill complete with a big **"I did it!"** tap. No timer or motion detection in this slice.

### 5.3 Rewards & Motivation
- Earn a sticker/badge per completed session or drill.
- Track a daily **streak**.
- Positive, celebratory feedback (sound + animation). No "you failed" states.

### 5.4 Player Profile
- Name, age, avatar. Stored locally _(open question: support multiple kids?)_.

### 5.5 Parent Area
- Gated entry (e.g. hold-to-enter or simple math/age gate).
- Configure session length, sound, and review progress.

## 6. Non-Functional Requirements (Draft)

- **Usability:** Operable by a 4–6 year old; pre-reader-friendly (icons + audio).
- **Accessibility:** Large tap targets, high contrast, clear audio, reduced-motion option _(TBD)_.
- **Platforms:** iOS and Android via React Native (Expo, managed workflow).
- **Offline:** Daily session should work without a network connection _(target)_.
- **Performance:** Fast cold start; smooth animations on mid-range devices.
- **Privacy & Safety:** No ads, no third-party tracking of children, no open chat. Comply with child-privacy norms (e.g. COPPA/GDPR-K considerations) _(needs review before launch)_.
- **Data:** Local-first storage for v1 _(open question: cloud backup/sync later?)_.

## 7. Content Scope (v1 Draft)

- ~4–6 beginner drills with demos and audio.
- 1 warm-up and 1 celebration flow.
- A starter set of stickers/badges.
- _(Open question: who creates the demo media — animation, filmed video, or stock?)_

## 8. Open Questions

- ~~How does the child mark a drill complete (tap, timer, motion detection)?~~ **Decided:** tap-to-complete ("I did it!") for v1.
- Single child profile or multiple?
- Audio: recorded voice vs. text-to-speech? What language(s)?
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

**Out of scope for this slice:** parent area, profile, audio, streaks, multiple drills, navigation library.

---

_Next steps: add audio coaching, more drills, streak tracking, and parent area._
