import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMPTY_PROGRESS, addPracticeDate } from '../streak';

export const STORAGE_KEY = '@soccer_buddy/progress';

function normalizePracticeDates(data, lastPracticeDate) {
  const rawDates = Array.isArray(data.practiceDates)
    ? data.practiceDates.filter((dateKey) => typeof dateKey === 'string')
    : [];

  if (lastPracticeDate) {
    return addPracticeDate(rawDates, lastPracticeDate);
  }

  return rawDates;
}

export function normalizeProgress(data) {
  if (!data || typeof data !== 'object') {
    return { ...EMPTY_PROGRESS };
  }

  const lastPracticeDate = typeof data.lastPracticeDate === 'string' ? data.lastPracticeDate : null;

  return {
    lastPracticeDate,
    streak: typeof data.streak === 'number' && data.streak >= 0 ? data.streak : 0,
    soundEnabled: data.soundEnabled !== false,
    practiceDates: normalizePracticeDates(data, lastPracticeDate),
  };
}

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...EMPTY_PROGRESS };
    }

    return normalizeProgress(JSON.parse(raw));
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage may be unavailable (private browsing, tests) — fail silently.
  }
}
