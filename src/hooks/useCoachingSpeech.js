import { useCallback, useEffect } from 'react';
import { speakCoaching, stopCoaching } from '../audio/coachingSpeech';

export function useCoachingSpeech(line) {
  const replay = useCallback(() => {
    speakCoaching(line);
  }, [line]);

  useEffect(() => {
    speakCoaching(line);
    return () => stopCoaching();
  }, [line]);

  return replay;
}
