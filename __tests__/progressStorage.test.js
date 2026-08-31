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
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
  });

  it('preserves soundEnabled when muted', () => {
    expect(
      normalizeProgress({ lastPracticeDate: '2026-08-18', streak: 3, soundEnabled: false })
    ).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 3,
      soundEnabled: false,
      sessionLength: 'short',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
  });

  it('keeps stored practice dates and backfills last practice date', () => {
    expect(
      normalizeProgress({
        lastPracticeDate: '2026-08-18',
        streak: 2,
        practiceDates: ['2026-08-17', '2026-08-18'],
      })
    ).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 2,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-17', '2026-08-18'],
      stickerIds: ['star'],
    });
  });

  it('keeps stored sticker ids', () => {
    expect(
      normalizeProgress({
        lastPracticeDate: '2026-08-18',
        streak: 2,
        practiceDates: ['2026-08-17', '2026-08-18'],
        stickerIds: ['star', 'ball'],
      })
    ).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 2,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-17', '2026-08-18'],
      stickerIds: ['star', 'ball'],
    });
  });

  it('defaults sessionLength to short when missing or invalid', () => {
    expect(normalizeProgress({ lastPracticeDate: '2026-08-18', streak: 1 }).sessionLength).toBe('short');
    expect(normalizeProgress({ lastPracticeDate: '2026-08-18', streak: 1, sessionLength: 'bogus' }).sessionLength).toBe('short');
    expect(normalizeProgress({ lastPracticeDate: '2026-08-18', streak: 1, sessionLength: 'full' }).sessionLength).toBe('full');
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
    const progress = {
      lastPracticeDate: '2026-08-18',
      streak: 2,
      practiceDates: ['2026-08-18'],
    };

    await saveProgress(progress);
    await expect(loadProgress()).resolves.toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 2,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
    await expect(AsyncStorage.getItem(STORAGE_KEY)).resolves.toBe(JSON.stringify(progress));
  });

  it('returns empty progress when stored JSON is invalid', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, '{not json');

    await expect(loadProgress()).resolves.toEqual(EMPTY_PROGRESS);
  });

  it('saveProgress fails silently when storage is unavailable', async () => {
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('QuotaExceededError'));

    await expect(
      saveProgress({ lastPracticeDate: '2026-08-18', streak: 1 })
    ).resolves.toBeUndefined();
  });
});
