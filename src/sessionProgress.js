import { SESSION_DRILLS, WARM_UP } from './constants/drills';

export function getSessionStepCount(sessionDrills = SESSION_DRILLS) {
  return 1 + sessionDrills.length;
}

export function getWarmUpStepIndex() {
  return 0;
}

export function getDrillStepIndex(drillIndex) {
  return 1 + drillIndex;
}

export function getSessionSteps(sessionDrills = SESSION_DRILLS) {
  return [
    { id: WARM_UP.id, name: WARM_UP.name, icon: WARM_UP.icon },
    ...sessionDrills.map((drill) => ({
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
