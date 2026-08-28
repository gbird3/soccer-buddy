import { SESSION_DRILLS, WARM_UP } from '../src/constants/drills';
import {
  getDrillStepIndex,
  getSessionStepCount,
  getSessionSteps,
  getStepAccessibilityLabel,
  getWarmUpStepIndex,
} from '../src/sessionProgress';

describe('sessionProgress', () => {
  const drillCount = SESSION_DRILLS.length;

  it('counts warm-up plus drills as total steps', () => {
    expect(getSessionStepCount(drillCount)).toBe(3);
  });

  it('places warm-up at step index 0 (step 1 of 3)', () => {
    expect(getWarmUpStepIndex()).toBe(0);
    expect(getStepAccessibilityLabel(0, getSessionSteps(drillCount))).toBe(
      'Step 1 of 3, Warm-up',
    );
  });

  it('maps each default-session drill to steps 2 and 3', () => {
    expect(getDrillStepIndex(0)).toBe(1);
    expect(getDrillStepIndex(1)).toBe(2);

    const steps = getSessionSteps(drillCount);
    expect(getStepAccessibilityLabel(1, steps)).toBe('Step 2 of 3, Toe Taps');
    expect(getStepAccessibilityLabel(2, steps)).toBe('Step 3 of 3, Kick a Target');
  });

  it('builds session steps from warm-up then default drills in order', () => {
    const steps = getSessionSteps(drillCount);

    expect(steps).toHaveLength(3);
    expect(steps[0]).toEqual({
      id: WARM_UP.id,
      name: WARM_UP.name,
      icon: WARM_UP.icon,
    });
    expect(steps.slice(1).map((step) => step.id)).toEqual(
      SESSION_DRILLS.map((drill) => drill.id),
    );
  });
});
