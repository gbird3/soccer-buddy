import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CelebrationScreen from './src/screens/CelebrationScreen';
import DrillScreen from './src/screens/DrillScreen';
import HomeScreen from './src/screens/HomeScreen';
import { SESSION_DRILLS } from './src/constants/drills';
import {
  SCREENS,
  getNextDrillIndex,
  getNextScreen,
  isSessionComplete,
} from './src/practiceFlow';
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
  const [drillIndex, setDrillIndex] = useState(0);
  const [progress, setProgress] = useState(null);
  const [celebrationStreak, setCelebrationStreak] = useState(0);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const startPractice = () => {
    setDrillIndex(0);
    setScreen((current) => getNextScreen(current, 'START_PRACTICE'));
  };

  const completeDrill = useCallback(async () => {
    const drillCount = SESSION_DRILLS.length;
    const sessionFinished = isSessionComplete(drillIndex, drillCount);

    if (sessionFinished) {
      const currentProgress = progress ?? { ...EMPTY_PROGRESS };
      const updatedProgress = recordSessionComplete(currentProgress, toDateKey());

      setProgress(updatedProgress);
      setCelebrationStreak(getEffectiveStreak(updatedProgress));
      await saveProgress(updatedProgress);
    }

    const nextDrillIndex = getNextDrillIndex(drillIndex, 'COMPLETE_DRILL', drillCount);
    setDrillIndex(nextDrillIndex);
    setScreen((current) =>
      getNextScreen(current, 'COMPLETE_DRILL', { drillIndex, drillCount }),
    );
  }, [drillIndex, progress]);

  const goHome = () => {
    setDrillIndex(0);
    setScreen(SCREENS.HOME);
  };

  if (progress === null) {
    return null;
  }

  const streak = getEffectiveStreak(progress);
  const practicedToday = hasPracticedToday(progress);
  const currentDrill = SESSION_DRILLS[drillIndex];

  return (
    <>
      {screen === SCREENS.HOME && (
        <HomeScreen
          onStartPractice={startPractice}
          streak={streak}
          practicedToday={practicedToday}
        />
      )}
      {screen === SCREENS.DRILL && currentDrill && (
        <DrillScreen drill={currentDrill} onCompleteDrill={completeDrill} />
      )}
      {screen === SCREENS.CELEBRATION && (
        <CelebrationScreen onGoHome={goHome} streak={celebrationStreak} />
      )}
      <StatusBar style="light" />
    </>
  );
}
