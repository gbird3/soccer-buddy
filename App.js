import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CelebrationScreen from './src/screens/CelebrationScreen';
import DrillScreen from './src/screens/DrillScreen';
import HomeScreen from './src/screens/HomeScreen';
import { SCREENS, getNextScreen } from './src/practiceFlow';
import { loadProgress, saveProgress } from './src/storage/progressStorage';
import {
  EMPTY_PROGRESS,
  getEffectiveStreak,
  hasPracticedToday,
  recordSessionComplete,
  toDateKey,
} from './src/streak';

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [progress, setProgress] = useState(null);
  const [celebrationStreak, setCelebrationStreak] = useState(0);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const startPractice = () => setScreen((current) => getNextScreen(current, 'START_PRACTICE'));

  const completeDrill = useCallback(async () => {
    const currentProgress = progress ?? { ...EMPTY_PROGRESS };
    const updatedProgress = recordSessionComplete(currentProgress, toDateKey());

    setProgress(updatedProgress);
    setCelebrationStreak(getEffectiveStreak(updatedProgress));
    await saveProgress(updatedProgress);
    setScreen((current) => getNextScreen(current, 'COMPLETE_DRILL'));
  }, [progress]);

  const goHome = () => setScreen(SCREENS.HOME);

  if (progress === null) {
    return null;
  }

  const streak = getEffectiveStreak(progress);
  const practicedToday = hasPracticedToday(progress);

  return (
    <>
      {screen === SCREENS.HOME && (
        <HomeScreen
          onStartPractice={startPractice}
          streak={streak}
          practicedToday={practicedToday}
        />
      )}
      {screen === SCREENS.DRILL && <DrillScreen onCompleteDrill={completeDrill} />}
      {screen === SCREENS.CELEBRATION && (
        <CelebrationScreen onGoHome={goHome} streak={celebrationStreak} />
      )}
      <StatusBar style="light" />
    </>
  );
}
