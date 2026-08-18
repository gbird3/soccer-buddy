import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import CelebrationScreen from '../src/screens/CelebrationScreen';
import { COACHING_LINES } from '../src/constants/drills';

describe('CelebrationScreen audio coaching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('speaks the celebration coaching line on mount', async () => {
    await render(<CelebrationScreen onGoHome={jest.fn()} streak={1} />);

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      COACHING_LINES.CELEBRATION,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('replays coaching when the speaker button is pressed', async () => {
    const user = userEvent.setup();
    await render(<CelebrationScreen onGoHome={jest.fn()} streak={1} />);

    jest.clearAllMocks();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      COACHING_LINES.CELEBRATION,
      expect.objectContaining({ language: 'en' }),
    );
  });
});
