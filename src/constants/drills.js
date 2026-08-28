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

/** Default playable session: first two beginner drills (warm-up + 2 drills + celebration). */
export const SESSION_DRILLS = [TOE_TAPS_DRILL, KICK_TARGET_DRILL];
