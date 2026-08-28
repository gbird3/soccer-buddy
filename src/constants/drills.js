import { toDateKey } from '../streak';

export const COACHING_LINES = {
  HOME: "Let's practice!",
  WARM_UP: 'March in place to wake up your body, then roll the ball with your feet!',
  CELEBRATION: 'Great job! You earned a sticker!',
};

export const WARM_UP = {
  id: 'warm-up',
  name: 'Warm-up',
  icon: '🏃',
  instruction: COACHING_LINES.WARM_UP,
};

export const TOE_TAPS_DRILL = {
  id: 'toe-taps',
  name: 'Toe Taps',
  icon: '👟',
  demo: 'toe-taps',
  instruction: 'Tap the ball with your toes, one foot at a time!',
};

export const KICK_TARGET_DRILL = {
  id: 'kick-target',
  name: 'Kick a Target',
  icon: '🎯',
  demo: 'kick-target',
  instruction: 'Kick the ball at the target!',
};

export const FREEZE_DRILL = {
  id: 'freeze',
  name: 'Freeze!',
  icon: '🦶',
  demo: 'freeze',
  instruction: 'Roll the ball, then freeze with your foot on top!',
};

export const TICK_TOCK_DRILL = {
  id: 'tick-tock',
  name: 'Tick Tock',
  icon: '⏱️',
  demo: 'tick-tock',
  instruction: 'Pass the ball from foot to foot, side to side!',
};

export const ALL_DRILLS = [
  TOE_TAPS_DRILL,
  KICK_TARGET_DRILL,
  FREEZE_DRILL,
  TICK_TOCK_DRILL,
];

/** Pair A: first two beginner drills (catalog order). */
export const SESSION_DRILL_PAIR_A = [TOE_TAPS_DRILL, KICK_TARGET_DRILL];

/** Pair B: trap/control + footwork drills (catalog order). */
export const SESSION_DRILL_PAIR_B = [FREEZE_DRILL, TICK_TOCK_DRILL];

const MS_PER_DAY = 86400000;

function epochDayNumber(dateKey) {
  const date = new Date(`${dateKey}T12:00:00`);
  return Math.floor(date.getTime() / MS_PER_DAY);
}

/**
 * Returns today's two playable drills based on the device's local calendar day.
 * Even epoch days → Pair A; odd → Pair B. Adjacent local days always alternate pairs.
 */
export function getSessionDrills(date = new Date()) {
  const dateKey = toDateKey(date);
  const dayNumber = epochDayNumber(dateKey);
  return dayNumber % 2 === 0 ? SESSION_DRILL_PAIR_A : SESSION_DRILL_PAIR_B;
}

/** Compatibility alias: today's playable drill pair (warm-up + 2 drills + celebration). */
export const SESSION_DRILLS = getSessionDrills();
