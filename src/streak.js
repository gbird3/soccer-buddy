export const EMPTY_PROGRESS = {
  lastPracticeDate: null,
  streak: 0,
};

export function toDateKey(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function diffCalendarDays(fromDateKey, toDateKey) {
  if (!fromDateKey || !toDateKey) {
    return null;
  }

  const from = new Date(`${fromDateKey}T12:00:00`);
  const to = new Date(`${toDateKey}T12:00:00`);
  const MS_PER_DAY = 86400000;
  return Math.round((to - from) / MS_PER_DAY);
}

export function getEffectiveStreak(progress, todayKey = toDateKey()) {
  const { lastPracticeDate, streak } = progress;

  if (!lastPracticeDate || streak <= 0) {
    return 0;
  }

  const daysSince = diffCalendarDays(lastPracticeDate, todayKey);
  if (daysSince === null || daysSince > 1) {
    return 0;
  }

  return streak;
}

export function hasPracticedToday(progress, todayKey = toDateKey()) {
  return progress.lastPracticeDate === todayKey;
}

export function recordSessionComplete(progress, todayKey = toDateKey()) {
  if (hasPracticedToday(progress, todayKey)) {
    return {
      lastPracticeDate: progress.lastPracticeDate,
      streak: getEffectiveStreak(progress, todayKey),
    };
  }

  const effectiveStreak = getEffectiveStreak(progress, todayKey);
  const daysSince = progress.lastPracticeDate
    ? diffCalendarDays(progress.lastPracticeDate, todayKey)
    : null;

  let newStreak = 1;
  if (daysSince === 1) {
    newStreak = effectiveStreak + 1;
  }

  return {
    lastPracticeDate: todayKey,
    streak: newStreak,
  };
}
