import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import { setCoachingEnabled } from '../src/audio/coachingSpeech';
import { WARM_UP, SESSION_DRILL_PAIR_A } from '../src/constants/drills';
import WarmUpScreen from '../src/screens/WarmUpScreen';
import { getSessionSteps, getWarmUpStepIndex } from '../src/sessionProgress';

const sessionSteps = getSessionSteps(SESSION_DRILL_PAIR_A);

describe('WarmUpScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setCoachingEnabled(true);
  });

  it('renders the warm-up demo and continue button', async () => {
    await render(
      <WarmUpScreen
        currentStepIndex={getWarmUpStepIndex()}
        sessionSteps={sessionSteps}
        onContinue={jest.fn()}
      />,
    );

    expect(screen.getByTestId('warm-up-screen')).toBeTruthy();
    expect(screen.getByTestId('session-progress')).toBeTruthy();
    expect(screen.getByLabelText('Step 1 of 3, Warm-up')).toBeTruthy();
    expect(screen.getByTestId('warm-up-demo')).toBeTruthy();
    expect(screen.getByTestId('continue-warm-up-button')).toBeTruthy();
    expect(screen.getByText('Warm-up')).toBeTruthy();
  });

  it('speaks the warm-up coaching line on mount', async () => {
    await render(
      <WarmUpScreen
        currentStepIndex={getWarmUpStepIndex()}
        sessionSteps={sessionSteps}
        onContinue={jest.fn()}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      WARM_UP.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('replays coaching when the speaker button is pressed', async () => {
    const user = userEvent.setup();
    await render(
      <WarmUpScreen
        currentStepIndex={getWarmUpStepIndex()}
        sessionSteps={sessionSteps}
        onContinue={jest.fn()}
      />,
    );

    jest.clearAllMocks();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      WARM_UP.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('is silent when coaching is muted', async () => {
    setCoachingEnabled(false);

    await render(
      <WarmUpScreen
        currentStepIndex={getWarmUpStepIndex()}
        sessionSteps={sessionSteps}
        onContinue={jest.fn()}
      />,
    );

    expect(Speech.speak).not.toHaveBeenCalled();
  });

  it('calls onContinue when the continue button is pressed', async () => {
    const onContinue = jest.fn();
    const user = userEvent.setup();
    await render(
      <WarmUpScreen
        currentStepIndex={getWarmUpStepIndex()}
        sessionSteps={sessionSteps}
        onContinue={onContinue}
      />,
    );

    await user.press(screen.getByTestId('continue-warm-up-button'));

    expect(onContinue).toHaveBeenCalledTimes(1);
  });
});
