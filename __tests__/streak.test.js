import {
  EMPTY_PROGRESS,
  addPracticeDate,
  buildWeekView,
  diffCalendarDays,
  getEffectiveStreak,
  getWeekDateKeys,
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

describe('getWeekDateKeys', () => {
  it('returns Sun–Sat for the week containing the given date', () => {
    expect(getWeekDateKeys('2026-08-20')).toEqual([
      '2026-08-16',
      '2026-08-17',
      '2026-08-18',
      '2026-08-19',
      '2026-08-20',
      '2026-08-21',
      '2026-08-22',
    ]);
  });

  it('starts on Sunday when the given date is Sunday', () => {
    expect(getWeekDateKeys('2026-08-16')).toEqual([
      '2026-08-16',
      '2026-08-17',
      '2026-08-18',
      '2026-08-19',
      '2026-08-20',
      '2026-08-21',
      '2026-08-22',
    ]);
  });
});

describe('buildWeekView', () => {
  it('marks practiced days within the current week', () => {
    const week = buildWeekView(['2026-08-17', '2026-08-19'], '2026-08-20');

    expect(week).toHaveLength(7);
    expect(week.map((day) => day.label)).toEqual([
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ]);
    expect(week.find((day) => day.dateKey === '2026-08-17')).toEqual({
      dateKey: '2026-08-17',
      label: 'Mon',
      practiced: true,
      isToday: false,
    });
    expect(week.find((day) => day.dateKey === '2026-08-18')).toEqual({
      dateKey: '2026-08-18',
      label: 'Tue',
      practiced: false,
      isToday: false,
    });
    expect(week.find((day) => day.dateKey === '2026-08-20')).toEqual({
      dateKey: '2026-08-20',
      label: 'Thu',
      practiced: false,
      isToday: true,
    });
  });
});

describe('addPracticeDate', () => {
  it('appends a date key once', () => {
    expect(addPracticeDate([], '2026-08-18')).toEqual(['2026-08-18']);
    expect(addPracticeDate(['2026-08-18'], '2026-08-18')).toEqual(['2026-08-18']);
    expect(addPracticeDate(['2026-08-17'], '2026-08-18')).toEqual([
      '2026-08-17',
      '2026-08-18',
    ]);
  });
});

describe('recordSessionComplete', () => {
  it('starts a streak at 1 on first completion', () => {
    expect(recordSessionComplete(EMPTY_PROGRESS, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 1,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
  });

  it('continues the streak on the next calendar day', () => {
    const yesterday = {
      lastPracticeDate: '2026-08-17',
      streak: 3,
      practiceDates: ['2026-08-17'],
      stickerIds: ['star'],
    };

    expect(recordSessionComplete(yesterday, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 4,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-17', '2026-08-18'],
      stickerIds: ['star', 'ball'],
    });
  });

  it('resets the streak after skipping a day', () => {
    const skipped = {
      lastPracticeDate: '2026-08-15',
      streak: 5,
      practiceDates: ['2026-08-15'],
      stickerIds: ['star'],
    };

    expect(recordSessionComplete(skipped, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 1,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-15', '2026-08-18'],
      stickerIds: ['star', 'ball'],
    });
  });

  it('does not double-count completions on the same day', () => {
    const alreadyToday = {
      lastPracticeDate: '2026-08-18',
      streak: 4,
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    };

    expect(recordSessionComplete(alreadyToday, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 4,
      soundEnabled: true,
      sessionLength: 'short',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
  });

  it('preserves soundEnabled when recording session completion', () => {
    const muted = {
      lastPracticeDate: '2026-08-17',
      streak: 2,
      soundEnabled: false,
      practiceDates: ['2026-08-17'],
      stickerIds: ['star'],
    };

    expect(recordSessionComplete(muted, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 3,
      soundEnabled: false,
      sessionLength: 'short',
      practiceDates: ['2026-08-17', '2026-08-18'],
      stickerIds: ['star', 'ball'],
    });
  });

  it('preserves sessionLength when recording session completion', () => {
    const fullSession = {
      ...EMPTY_PROGRESS,
      sessionLength: 'full',
    };

    expect(recordSessionComplete(fullSession, '2026-08-18')).toEqual({
      lastPracticeDate: '2026-08-18',
      streak: 1,
      soundEnabled: true,
      sessionLength: 'full',
      practiceDates: ['2026-08-18'],
      stickerIds: ['star'],
    });
  });
});
