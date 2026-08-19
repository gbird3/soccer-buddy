export const SCREENS = {
  HOME: 'home',
  DRILL: 'drill',
  CELEBRATION: 'celebration',
  PARENT: 'parent',
};

export function getNextScreen(currentScreen, action, { drillIndex = 0, drillCount = 1 } = {}) {
  switch (action) {
    case 'START_PRACTICE':
      if (currentScreen === SCREENS.HOME) return SCREENS.DRILL;
      return currentScreen;
    case 'COMPLETE_DRILL':
      if (currentScreen === SCREENS.DRILL) {
        if (drillIndex + 1 < drillCount) {
          return SCREENS.DRILL;
        }
        return SCREENS.CELEBRATION;
      }
      return currentScreen;
    case 'GO_HOME':
      return SCREENS.HOME;
    case 'OPEN_PARENT':
      if (currentScreen === SCREENS.HOME) return SCREENS.PARENT;
      return currentScreen;
    default:
      return currentScreen;
  }
}

export function getNextDrillIndex(currentIndex, action, drillCount) {
  if (action === 'START_PRACTICE') {
    return 0;
  }

  if (action === 'COMPLETE_DRILL' && currentIndex + 1 < drillCount) {
    return currentIndex + 1;
  }

  return currentIndex;
}

export function isSessionComplete(drillIndex, drillCount) {
  return drillIndex + 1 >= drillCount;
}
