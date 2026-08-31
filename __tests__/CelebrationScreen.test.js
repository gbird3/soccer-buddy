import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import CelebrationScreen from '../src/screens/CelebrationScreen';
import { COACHING_LINES } from '../src/constants/drills';

describe('CelebrationScreen sticker reward', () => {
  it('shows the latest earned sticker', async () => {
    await render(
      <CelebrationScreen onGoHome={jest.fn()} streak={2} stickerIds={['star', 'ball']} />,
    );

    expect(screen.getByTestId('sticker-reward')).toHaveTextContent('⚽', { exact: false });
    expect(screen.getByTestId('sticker-reward')).toHaveTextContent('Soccer Ball', { exact: false });
  });
});

describe('CelebrationScreen celebration polish', () => {
  it('renders confetti burst and sticker pop animation targets', async () => {
    await render(<CelebrationScreen onGoHome={jest.fn()} streak={3} stickerIds={['trophy']} />);

    expect(
      screen.getByTestId('celebration-confetti', { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(screen.getByTestId('sticker-pop-animation')).toBeTruthy();
  });

  it('shows a come-back hook inviting the kid to return tomorrow', async () => {
    await render(<CelebrationScreen onGoHome={jest.fn()} streak={3} stickerIds={['trophy']} />);

    const comeBackHook = screen.getByTestId('come-back-hook');
    expect(comeBackHook).toHaveTextContent('👋', { exact: false });
    expect(comeBackHook).toHaveTextContent('See you tomorrow!', { exact: false });
  });

  it('still shows streak and done button alongside animations', async () => {
    await render(<CelebrationScreen onGoHome={jest.fn()} streak={5} stickerIds={['star']} />);

    expect(screen.getByTestId('celebration-streak')).toHaveTextContent('5', { exact: false });
    expect(screen.getByTestId('go-home-button')).toBeTruthy();
  });
});

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
