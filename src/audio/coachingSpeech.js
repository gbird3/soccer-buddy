import * as Speech from 'expo-speech';

export function speakCoaching(line) {
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
