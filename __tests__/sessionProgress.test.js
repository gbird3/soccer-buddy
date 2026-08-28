import {
  FREEZE_DRILL,
  KICK_TARGET_DRILL,
  SESSION_DRILL_PAIR_A,
  SESSION_DRILL_PAIR_B,
  TICK_TOCK_DRILL,
  TOE_TAPS_DRILL,
  WARM_UP,
} from '../src/constants/drills';
import {
  getDrillStepIndex,
  getSessionStepCount,
  getSessionSteps,
  getStepAccessibilityLabel,
  getWarmUpStepIndex,
} from '../src/sessionProgress';

describe('sessionProgress', () => {
  describe('with Pair A (Toe Taps + Kick a Target)', () => {
    const sessionDrills = SESSION_DRILL_PAIR_A;

    it('counts warm-up plus drills as total steps', () => {
      expect(getSessionStepCount(sessionDrills)).toBe(3);
    });

    it('places warm-up at step index 0 (step 1 of 3)', () => {
      expect(getWarmUpStepIndex()).toBe(0);
      expect(getStepAccessibilityLabel(0, getSessionSteps(sessionDrills))).toBe(
        'Step 1 of 3, Warm-up',
      );
    });

    it('maps each drill to steps 2 and 3', () => {
      expect(getDrillStepIndex(0)).toBe(1);
      expect(getDrillStepIndex(1)).toBe(2);

      const steps = getSessionSteps(sessionDrills);
      expect(getStepAccessibilityLabel(1, steps)).toBe('Step 2 of 3, Toe Taps');
      expect(getStepAccessibilityLabel(2, steps)).toBe('Step 3 of 3, Kick a Target');
    });

    it('builds session steps from warm-up then drills in order', () => {
      const steps = getSessionSteps(sessionDrills);

      expect(steps).toHaveLength(3);
      expect(steps[0]).toEqual({
        id: WARM_UP.id,
        name: WARM_UP.name,
        icon: WARM_UP.icon,
      });
      expect(steps.slice(1).map((step) => step.id)).toEqual(
        sessionDrills.map((drill) => drill.id),
      );
    });
  });

  describe('with Pair B (Freeze! + Tick Tock)', () => {
    const sessionDrills = SESSION_DRILL_PAIR_B;

    it('counts warm-up plus drills as total steps', () => {
      expect(getSessionStepCount(sessionDrills)).toBe(3);
    });

    it('maps each drill to steps 2 and 3 with today\'s pair labels', () => {
      const steps = getSessionSteps(sessionDrills);
      expect(getStepAccessibilityLabel(1, steps)).toBe('Step 2 of 3, Freeze!');
      expect(getStepAccessibilityLabel(2, steps)).toBe('Step 3 of 3, Tick Tock');
    });

    it('builds session steps from warm-up then Pair B drills in order', () => {
      const steps = getSessionSteps(sessionDrills);

      expect(steps).toHaveLength(3);
      expect(steps[1]).toEqual({
        id: FREEZE_DRILL.id,
        name: FREEZE_DRILL.name,
        icon: FREEZE_DRILL.icon,
      });
      expect(steps[2]).toEqual({
        id: TICK_TOCK_DRILL.id,
        name: TICK_TOCK_DRILL.name,
        icon: TICK_TOCK_DRILL.icon,
      });
    });
  });
});
