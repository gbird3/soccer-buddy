import {
  FREEZE_DRILL,
  KICK_TARGET_DRILL,
  SESSION_DRILLS,
  TOE_TAPS_DRILL,
} from '../src/constants/drills';

describe('SESSION_DRILLS catalog', () => {
  it('includes three beginner drills in session order', () => {
    expect(SESSION_DRILLS).toHaveLength(3);
    expect(SESSION_DRILLS).toEqual([TOE_TAPS_DRILL, KICK_TARGET_DRILL, FREEZE_DRILL]);
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
});
