import {
  FREEZE_DRILL,
  KICK_TARGET_DRILL,
  SESSION_DRILLS,
  TICK_TOCK_DRILL,
  TOE_TAPS_DRILL,
} from '../src/constants/drills';

describe('SESSION_DRILLS catalog', () => {
  it('includes four beginner drills in session order', () => {
    expect(SESSION_DRILLS).toHaveLength(4);
    expect(SESSION_DRILLS).toEqual([
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
