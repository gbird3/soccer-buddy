import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import DrillScreen from '../src/screens/DrillScreen';
import { TOE_TAPS_DRILL, KICK_TARGET_DRILL, FREEZE_DRILL, TICK_TOCK_DRILL } from '../src/constants/drills';
import { getDrillStepIndex, getSessionSteps } from '../src/sessionProgress';

const sessionSteps = getSessionSteps();

describe('DrillScreen audio coaching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('speaks the drill instruction on mount for toe taps', async () => {
    await render(
      <DrillScreen
        drill={TOE_TAPS_DRILL}
        currentStepIndex={getDrillStepIndex(0)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      TOE_TAPS_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('speaks the drill instruction on mount for kick target', async () => {
    await render(
      <DrillScreen
        drill={KICK_TARGET_DRILL}
        currentStepIndex={getDrillStepIndex(1)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      KICK_TARGET_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('speaks the drill instruction on mount for freeze', async () => {
    await render(
      <DrillScreen
        drill={FREEZE_DRILL}
        currentStepIndex={getDrillStepIndex(2)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      FREEZE_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('speaks the drill instruction on mount for tick tock', async () => {
    await render(
      <DrillScreen
        drill={TICK_TOCK_DRILL}
        currentStepIndex={getDrillStepIndex(3)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      TICK_TOCK_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('renders the freeze demo for the freeze drill', async () => {
    await render(
      <DrillScreen
        drill={FREEZE_DRILL}
        currentStepIndex={getDrillStepIndex(2)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(screen.getByTestId('freeze-demo')).toBeTruthy();
    expect(screen.getByText('Freeze!')).toBeTruthy();
  });

  it('renders the tick tock demo for the tick tock drill', async () => {
    await render(
      <DrillScreen
        drill={TICK_TOCK_DRILL}
        currentStepIndex={getDrillStepIndex(3)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(screen.getByTestId('tick-tock-demo')).toBeTruthy();
    expect(screen.getByText('Tick Tock')).toBeTruthy();
  });

  it('replays coaching when the speaker button is pressed', async () => {
    const user = userEvent.setup();
    await render(
      <DrillScreen
        drill={TOE_TAPS_DRILL}
        currentStepIndex={getDrillStepIndex(0)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    jest.clearAllMocks();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      TOE_TAPS_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('shows session progress for toe taps as step 2 of 5', async () => {
    await render(
      <DrillScreen
        drill={TOE_TAPS_DRILL}
        currentStepIndex={getDrillStepIndex(0)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(screen.getByTestId('session-progress')).toBeTruthy();
    expect(screen.getByLabelText('Step 2 of 5, Toe Taps')).toBeTruthy();
    expect(screen.getByTestId('session-progress-step-0')).toHaveStyle({
      backgroundColor: '#ffd700',
    });
  });

  it('shows session progress for tick tock as step 5 of 5', async () => {
    await render(
      <DrillScreen
        drill={TICK_TOCK_DRILL}
        currentStepIndex={getDrillStepIndex(3)}
        sessionSteps={sessionSteps}
        onCompleteDrill={jest.fn()}
      />,
    );

    expect(screen.getByLabelText('Step 5 of 5, Tick Tock')).toBeTruthy();
    expect(screen.getByTestId('session-progress-step-3')).toHaveStyle({
      backgroundColor: '#ffd700',
    });
    expect(screen.getByTestId('session-progress-step-4')).toHaveStyle({
      backgroundColor: '#fff9e6',
    });
  });
});
