export const SCREENS = {
  HOME: 'home',
  DRILL: 'drill',
  CELEBRATION: 'celebration',
};

export function getNextScreen(currentScreen, action) {
  switch (action) {
    case 'START_PRACTICE':
      if (currentScreen === SCREENS.HOME) return SCREENS.DRILL;
      return currentScreen;
    case 'COMPLETE_DRILL':
      if (currentScreen === SCREENS.DRILL) return SCREENS.CELEBRATION;
      return currentScreen;
    case 'GO_HOME':
      return SCREENS.HOME;
    default:
      return currentScreen;
  }
}
