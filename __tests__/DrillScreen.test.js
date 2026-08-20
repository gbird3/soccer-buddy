import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import DrillScreen from '../src/screens/DrillScreen';
import { TOE_TAPS_DRILL, KICK_TARGET_DRILL, FREEZE_DRILL } from '../src/constants/drills';

describe('DrillScreen audio coaching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('speaks the drill instruction on mount for toe taps', async () => {
    await render(<DrillScreen drill={TOE_TAPS_DRILL} onCompleteDrill={jest.fn()} />);

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      TOE_TAPS_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('speaks the drill instruction on mount for kick target', async () => {
    await render(<DrillScreen drill={KICK_TARGET_DRILL} onCompleteDrill={jest.fn()} />);

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      KICK_TARGET_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('speaks the drill instruction on mount for freeze', async () => {
    await render(<DrillScreen drill={FREEZE_DRILL} onCompleteDrill={jest.fn()} />);

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      FREEZE_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('renders the freeze demo for the freeze drill', async () => {
    await render(<DrillScreen drill={FREEZE_DRILL} onCompleteDrill={jest.fn()} />);

    expect(screen.getByTestId('freeze-demo')).toBeTruthy();
    expect(screen.getByText('Freeze!')).toBeTruthy();
  });

  it('replays coaching when the speaker button is pressed', async () => {
    const user = userEvent.setup();
    await render(<DrillScreen drill={TOE_TAPS_DRILL} onCompleteDrill={jest.fn()} />);

    jest.clearAllMocks();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      TOE_TAPS_DRILL.instruction,
      expect.objectContaining({ language: 'en' }),
    );
  });
});
