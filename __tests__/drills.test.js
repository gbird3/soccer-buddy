import {
  ALL_DRILLS,
  FREEZE_DRILL,
  getSessionDrills,
  getPlayableSessionDrills,
  KICK_TARGET_DRILL,
  SESSION_DRILL_PAIR_A,
  SESSION_DRILL_PAIR_B,
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

describe('getSessionDrills', () => {
  it('returns the same pair for the same local date', () => {
    const date = new Date('2026-08-29T09:00:00');
    expect(getSessionDrills(date)).toEqual(getSessionDrills(date));
  });

  it('returns different pairs on consecutive local calendar days', () => {
    const friday = new Date('2026-08-28T23:59:00');
    const saturday = new Date('2026-08-29T00:01:00');
    expect(getSessionDrills(friday)).not.toEqual(getSessionDrills(saturday));
  });

  it('always returns exactly two drills from ALL_DRILLS', () => {
    const dates = [
      new Date('2026-08-28T12:00:00'),
      new Date('2026-08-29T12:00:00'),
      new Date('2026-08-31T12:00:00'),
      new Date('2026-09-01T12:00:00'),
    ];

    for (const date of dates) {
      const drills = getSessionDrills(date);
      expect(drills).toHaveLength(2);
      drills.forEach((drill) => {
        expect(ALL_DRILLS).toContainEqual(drill);
      });
    }
  });

  it('never mixes drills across pairs', () => {
    const pairADates = [new Date('2026-08-29T12:00:00'), new Date('2026-08-31T12:00:00')];
    const pairBDates = [new Date('2026-08-28T12:00:00'), new Date('2026-09-01T12:00:00')];

    pairADates.forEach((date) => {
      expect(getSessionDrills(date)).toEqual(SESSION_DRILL_PAIR_A);
    });
    pairBDates.forEach((date) => {
      expect(getSessionDrills(date)).toEqual(SESSION_DRILL_PAIR_B);
    });
  });

  it('alternates pairs across a month boundary', () => {
    const aug31 = new Date('2026-08-31T12:00:00');
    const sep1 = new Date('2026-09-01T12:00:00');

    expect(getSessionDrills(aug31)).toEqual(SESSION_DRILL_PAIR_A);
    expect(getSessionDrills(sep1)).toEqual(SESSION_DRILL_PAIR_B);
    expect(getSessionDrills(aug31)).not.toEqual(getSessionDrills(sep1));
  });
});

describe('getPlayableSessionDrills', () => {
  it('returns the rotating pair for short sessions', () => {
    const date = new Date('2026-08-31T12:00:00');
    expect(getPlayableSessionDrills('short', date)).toEqual(getSessionDrills(date));
    expect(getPlayableSessionDrills(undefined, date)).toEqual(getSessionDrills(date));
  });

  it('returns all drills in catalog order for full sessions', () => {
    expect(getPlayableSessionDrills('full')).toEqual(ALL_DRILLS);
    expect(getPlayableSessionDrills('full')).toHaveLength(4);
  });

  it('treats invalid session length as short', () => {
    const date = new Date('2026-08-31T12:00:00');
    expect(getPlayableSessionDrills('bogus', date)).toEqual(getSessionDrills(date));
  });
});

describe('SESSION_DRILLS compatibility alias', () => {
  it('matches getSessionDrills() for today', () => {
    expect(SESSION_DRILLS).toEqual(getSessionDrills());
    expect(SESSION_DRILLS).toHaveLength(2);
  });
});
