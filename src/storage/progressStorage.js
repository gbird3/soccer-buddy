import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMPTY_PROGRESS } from '../streak';

export const STORAGE_KEY = '@soccer_buddy/progress';

export function normalizeProgress(data) {
  if (!data || typeof data !== 'object') {
    return { ...EMPTY_PROGRESS };
  }

  return {
    lastPracticeDate: typeof data.lastPracticeDate === 'string' ? data.lastPracticeDate : null,
    streak: typeof data.streak === 'number' && data.streak >= 0 ? data.streak : 0,
    soundEnabled: data.soundEnabled !== false,
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
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
