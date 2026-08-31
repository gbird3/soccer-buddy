import { stickerForPracticeCount } from './constants/stickers';

export const EMPTY_PROGRESS = {
  lastPracticeDate: null,
  streak: 0,
  soundEnabled: true,
  sessionLength: 'short',
  practiceDates: [],
  stickerIds: [],
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export function addPracticeDate(practiceDates, dateKey) {
  const dates = Array.isArray(practiceDates) ? [...practiceDates] : [];

  if (!dates.includes(dateKey)) {
    dates.push(dateKey);
  }

  return dates;
}

export function getWeekDateKeys(todayKey = toDateKey()) {
  const today = new Date(`${todayKey}T12:00:00`);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const keys = [];
  for (let offset = 0; offset < 7; offset += 1) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + offset);
    keys.push(toDateKey(day));
  }

  return keys;
}

export function buildWeekView(practiceDates = [], todayKey = toDateKey()) {
  const practicedSet = new Set(
    Array.isArray(practiceDates) ? practiceDates : [],
  );

  return getWeekDateKeys(todayKey).map((dateKey, index) => ({
    dateKey,
    label: WEEKDAY_LABELS[index],
    practiced: practicedSet.has(dateKey),
    isToday: dateKey === todayKey,
  }));
}

function normalizeStickerIds(stickerIds) {
  return Array.isArray(stickerIds)
    ? stickerIds.filter((id) => typeof id === 'string')
    : [];
}

function normalizeSessionLength(sessionLength) {
  return sessionLength === 'full' ? 'full' : 'short';
}

export function recordSessionComplete(progress, todayKey = toDateKey()) {
  const soundEnabled = progress.soundEnabled !== false;
  const sessionLength = normalizeSessionLength(progress.sessionLength);
  const practiceDates = addPracticeDate(progress.practiceDates, todayKey);
  const stickerIds = normalizeStickerIds(progress.stickerIds);

  if (hasPracticedToday(progress, todayKey)) {
    return {
      lastPracticeDate: progress.lastPracticeDate,
      streak: getEffectiveStreak(progress, todayKey),
      soundEnabled,
      sessionLength,
      practiceDates,
      stickerIds,
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

  const newSticker = stickerForPracticeCount(practiceDates.length);

  return {
    lastPracticeDate: todayKey,
    streak: newStreak,
    soundEnabled,
    sessionLength,
    practiceDates,
    stickerIds: [...stickerIds, newSticker.id],
  };
}
