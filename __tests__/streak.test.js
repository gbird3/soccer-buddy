import {
  EMPTY_PROGRESS,
  diffCalendarDays,
  getEffectiveStreak,
  hasPracticedToday,
  recordSessionComplete,
  toDateKey,
} from '../src/streak';

describe('toDateKey', () => {
  it('formats a date as YYYY-MM-DD in local time', () => {
    expect(toDateKey(new Date('2026-08-18T15:30:00'))).toBe('2026-08-18');
  });
});

describe('diffCalendarDays', () => {
  it('returns the number of calendar days between two date keys', () => {
    expect(diffCalendarDays('2026-08-17', '2026-08-18')).toBe(1);
    expect(diffCalendarDays('2026-08-15', '2026-08-18')).toBe(3);
  });

  it('returns null when either date key is missing', () => {
    expect(diffCalendarDays(null, '2026-08-18')).toBeNull();
  });
});

describe('getEffectiveStreak', () => {
  it('returns 0 when there is no practice history', () => {
    expect(getEffectiveStreak(EMPTY_PROGRESS, '2026-08-18')).toBe(0);
  });

  it('returns the stored streak when practice was today', () => {
    expect(getEffectiveStreak({ lastPracticeDate: '2026-08-18', streak: 4 }, '2026-08-18')).toBe(4);
  });

  it('returns the stored streak when practice was yesterday', () => {
    expect(getEffectiveStreak({ lastPracticeDate: '2026-08-17', streak: 4 }, '2026-08-18')).toBe(4);
  });

  it('returns 0 when a day was skipped', () => {
    expect(getEffectiveStreak({ lastPracticeDate: '2026-08-15', streak: 5 }, '2026-08-18')).toBe(0);
  });
});

describe('hasPracticedToday', () => {
  it('is true only when last practice matches today', () => {
    expect(hasPracticedToday({ lastPracticeDate: '2026-08-18', streak: 2 }, '2026-08-18')).toBe(true);
    expect(hasPracticedToday({ lastPracticeDate: '2026-08-17', streak: 2 }, '2026-08-18')).toBe(false);
  });
});

describe('recordSessionComplete', () => {
  it('starts a streak at 1 on first completion', () => {
    expect(recordSessionComplete(EMPTY_PROGRESS, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 1,
      soundEnabled: true,
    });
  });

  it('continues the streak on the next calendar day', () => {
    const yesterday = { lastPracticeDate: '2026-08-17', streak: 3 };

    expect(recordSessionComplete(yesterday, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 4,
      soundEnabled: true,
    });
  });

  it('resets the streak after skipping a day', () => {
    const skipped = { lastPracticeDate: '2026-08-15', streak: 5 };

    expect(recordSessionComplete(skipped, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 1,
      soundEnabled: true,
    });
  });

  it('does not double-count completions on the same day', () => {
    const alreadyToday = { lastPracticeDate: '2026-08-18', streak: 4 };

    expect(recordSessionComplete(alreadyToday, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 4,
      soundEnabled: true,
    });
  });

  it('preserves soundEnabled when recording session completion', () => {
    const muted = { lastPracticeDate: '2026-08-17', streak: 2, soundEnabled: false };

    expect(recordSessionComplete(muted, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 3,
      soundEnabled: false,
    });
  });
});
