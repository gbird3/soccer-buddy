import * as Speech from 'expo-speech';
import {
  isCoachingEnabled,
  setCoachingEnabled,
  speakCoaching,
  stopCoaching,
} from '../src/audio/coachingSpeech';

describe('coachingSpeech', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setCoachingEnabled(true);
  });

  it('stops any current speech and speaks the coaching line', () => {
    speakCoaching('Tap the ball!');

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      'Tap the ball!',
      expect.objectContaining({ language: 'en', rate: 0.95 }),
    );
  });

  it('stops speech without throwing', () => {
    stopCoaching();

    expect(Speech.stop).toHaveBeenCalled();
  });

  it('does not throw when speak fails', () => {
    Speech.speak.mockImplementationOnce(() => {
      throw new Error('Speech unavailable');
    });

    expect(() => speakCoaching('Hello')).not.toThrow();
  });

  it('does not throw when stop fails', () => {
    Speech.stop.mockImplementationOnce(() => {
      throw new Error('Stop unavailable');
    });

    expect(() => stopCoaching()).not.toThrow();
  });

  it('does not speak when coaching is disabled', () => {
    setCoachingEnabled(false);

    speakCoaching('Tap the ball!');

    expect(Speech.stop).not.toHaveBeenCalled();
    expect(Speech.speak).not.toHaveBeenCalled();
    expect(isCoachingEnabled()).toBe(false);
  });
});
