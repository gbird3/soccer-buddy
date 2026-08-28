import {
  ALL_DRILLS,
  FREEZE_DRILL,
  KICK_TARGET_DRILL,
  SESSION_DRILLS,
  TICK_TOCK_DRILL,
  TOE_TAPS_DRILL,
} from '../src/constants/drills';

describe('ALL_DRILLS catalog', () => {
  it('includes four beginner drills in catalog order', () => {
    expect(ALL_DRILLS).toHaveLength(4);
    expect(ALL_DRILLS).toEqual([
      TOE_TAPS_DRILL,
      KICK_TARGET_DRILL,
      FREEZE_DRILL,
      TICK_TOCK_DRILL,
    ]);
  });

  it('defines freeze as the third trap/control drill', () => {
    expect(FREEZE_DRILL).toMatchObject({
      id: 'freeze',
      name: 'Freeze!',
      icon: '🦶',
      demo: 'freeze',
      instruction: 'Roll the ball, then freeze with your foot on top!',
    });
  });

  it('defines tick tock as the fourth footwork drill', () => {
    expect(TICK_TOCK_DRILL).toMatchObject({
      id: 'tick-tock',
      name: 'Tick Tock',
      icon: '⏱️',
      demo: 'tick-tock',
      instruction: 'Pass the ball from foot to foot, side to side!',
    });
  });
});

describe('SESSION_DRILLS default session', () => {
  it('plays the first two beginner drills in the default short session', () => {
    expect(SESSION_DRILLS).toHaveLength(2);
    expect(SESSION_DRILLS).toEqual([TOE_TAPS_DRILL, KICK_TARGET_DRILL]);
  });
});
