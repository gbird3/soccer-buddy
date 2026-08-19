import * as Speech from 'expo-speech';

let coachingEnabled = true;

export function setCoachingEnabled(enabled) {
  coachingEnabled = enabled !== false;
}

export function isCoachingEnabled() {
  return coachingEnabled;
}

export function speakCoaching(line) {
  if (!coachingEnabled) {
    return;
  }

  try {
    Speech.stop();
    Speech.speak(line, {
      language: 'en',
      rate: 0.95,
    });
  } catch {
    // Platform may not support speech (tests, web quirks) — fail silently.
  }
}

export function stopCoaching() {
  try {
    Speech.stop();
  } catch {
    // Fail silently.
  }
}
