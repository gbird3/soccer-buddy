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
    expect(getSessionStepCount(drillCount)).toBe(5);
  });

  it('places warm-up at step index 0 (step 1 of 5)', () => {
    expect(getWarmUpStepIndex()).toBe(0);
    expect(getStepAccessibilityLabel(0, getSessionSteps(drillCount))).toBe(
      'Step 1 of 5, Warm-up',
    );
  });

  it('maps each drill to steps 2 through 5', () => {
    expect(getDrillStepIndex(0)).toBe(1);
    expect(getDrillStepIndex(1)).toBe(2);
    expect(getDrillStepIndex(2)).toBe(3);
    expect(getDrillStepIndex(3)).toBe(4);

    const steps = getSessionSteps(drillCount);
    expect(getStepAccessibilityLabel(1, steps)).toBe('Step 2 of 5, Toe Taps');
    expect(getStepAccessibilityLabel(2, steps)).toBe('Step 3 of 5, Kick a Target');
    expect(getStepAccessibilityLabel(3, steps)).toBe('Step 4 of 5, Freeze!');
    expect(getStepAccessibilityLabel(4, steps)).toBe('Step 5 of 5, Tick Tock');
  });

  it('builds session steps from warm-up then drills in order', () => {
    const steps = getSessionSteps(drillCount);

    expect(steps).toHaveLength(5);
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
