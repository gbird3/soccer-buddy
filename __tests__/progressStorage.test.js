import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  STORAGE_KEY,
  loadProgress,
  normalizeProgress,
  saveProgress,
} from '../src/storage/progressStorage';
import { EMPTY_PROGRESS } from '../src/streak';

jest.mock('@react-native-async-storage/async-storage');

describe('normalizeProgress', () => {
  it('returns empty progress for invalid data', () => {
    expect(normalizeProgress(null)).toEqual(EMPTY_PROGRESS);
    expect(normalizeProgress({ lastPracticeDate: 123, streak: -1 })).toEqual(EMPTY_PROGRESS);
  });

  it('keeps valid progress fields', () => {
    expect(
      normalizeProgress({ lastPracticeDate: '2026-08-18', streak: 3, extra: 'ignored' })
    ).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 3,
    });
  });
});

describe('progressStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('loads empty progress when nothing is stored', async () => {
    await expect(loadProgress()).resolves.toEqual(EMPTY_PROGRESS);
  });

  it('persists and reloads progress', async () => {
    const progress = { lastPracticeDate: '2026-08-18', streak: 2 };

    await saveProgress(progress);
    await expect(loadProgress()).resolves.toEqual(progress);
    await expect(AsyncStorage.getItem(STORAGE_KEY)).resolves.toBe(JSON.stringify(progress));
  });

  it('returns empty progress when stored JSON is invalid', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, '{not json');

    await expect(loadProgress()).resolves.toEqual(EMPTY_PROGRESS);
  });
});
