import { SESSION_DRILLS, WARM_UP } from './constants/drills';

export function getSessionStepCount(drillCount = SESSION_DRILLS.length) {
  return 1 + drillCount;
}

export function getWarmUpStepIndex() {
  return 0;
}

export function getDrillStepIndex(drillIndex) {
  return 1 + drillIndex;
}

export function getSessionSteps(drillCount = SESSION_DRILLS.length) {
  return [
    { id: WARM_UP.id, name: WARM_UP.name, icon: WARM_UP.icon },
    ...SESSION_DRILLS.slice(0, drillCount).map((drill) => ({
      id: drill.id,
      name: drill.name,
      icon: drill.icon,
    })),
  ];
}

export function getStepAccessibilityLabel(currentStepIndex, steps) {
  const stepNumber = currentStepIndex + 1;
  const total = steps.length;
  const name = steps[currentStepIndex]?.name ?? '';
  return `Step ${stepNumber} of ${total}, ${name}`;
}
