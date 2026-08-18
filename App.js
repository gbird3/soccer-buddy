import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CelebrationScreen from './src/screens/CelebrationScreen';
import DrillScreen from './src/screens/DrillScreen';
import HomeScreen from './src/screens/HomeScreen';
import { SCREENS, getNextScreen } from './src/practiceFlow';

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  const startPractice = () => setScreen((current) => getNextScreen(current, 'START_PRACTICE'));
  const completeDrill = () => setScreen((current) => getNextScreen(current, 'COMPLETE_DRILL'));
  const goHome = () => setScreen(SCREENS.HOME);

  return (
    <>
      {screen === SCREENS.HOME && <HomeScreen onStartPractice={startPractice} />}
      {screen === SCREENS.DRILL && <DrillScreen onCompleteDrill={completeDrill} />}
      {screen === SCREENS.CELEBRATION && <CelebrationScreen onGoHome={goHome} />}
      <StatusBar style="light" />
    </>
  );
}
