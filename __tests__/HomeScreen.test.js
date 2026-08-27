import { render, screen, userEvent } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import HomeScreen from '../src/screens/HomeScreen';
import { COACHING_LINES } from '../src/constants/drills';

describe('HomeScreen kid-first layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a playful mascot centerpiece and hero start zone', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    expect(screen.getByTestId('home-mascot')).toBeTruthy();
    expect(screen.getByTestId('home-start-zone')).toBeTruthy();
    expect(screen.getByLabelText("Start today's practice")).toBeTruthy();
    expect(screen.queryByText('Soccer Buddy')).toBeNull();
  });

  it('keeps coaching subtitle and speaker for first-open audio', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    expect(screen.getByText("Let's practice!")).toBeTruthy();
    expect(screen.getByTestId('replay-coaching-button')).toBeTruthy();
  });
});

describe('HomeScreen streak display', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the parent gate control on home', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    expect(screen.getByTestId('parent-gate-button')).toBeTruthy();
  });

  it('shows the current streak with a fire icon', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={5}
        practicedToday={false}
      />,
    );

    expect(screen.getByTestId('streak-display')).toHaveTextContent('5', { exact: false });
    expect(screen.getByTestId('streak-display')).toHaveTextContent('🔥', { exact: false });
  });

  it('shows a practiced-today badge when the child already finished today', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={2}
        practicedToday={true}
        stickerIds={['star', 'ball']}
      />,
    );

    expect(screen.getByTestId('practiced-today-badge')).toBeTruthy();
    expect(screen.getByTestId('practiced-today-badge')).toHaveTextContent('⚽', { exact: false });
    expect(screen.queryByTestId('start-practice-button')).toBeTruthy();
  });

  it('shows the sticker collection earned so far', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={2}
        practicedToday={true}
        stickerIds={['star', 'ball', 'trophy']}
      />,
    );

    const collection = screen.getByTestId('sticker-collection');
    expect(collection).toHaveTextContent('⭐', { exact: false });
    expect(collection).toHaveTextContent('⚽', { exact: false });
    expect(collection).toHaveTextContent('🏆', { exact: false });
  });
});

describe('HomeScreen audio coaching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('speaks the home coaching line on mount', async () => {
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      COACHING_LINES.HOME,
      expect.objectContaining({ language: 'en' }),
    );
  });

  it('replays coaching when the speaker button is pressed', async () => {
    const user = userEvent.setup();
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    jest.clearAllMocks();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith(
      COACHING_LINES.HOME,
      expect.objectContaining({ language: 'en' }),
    );
  });
});
