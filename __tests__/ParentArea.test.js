import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import App from '../App';
import { setCoachingEnabled } from '../src/audio/coachingSpeech';
import { COACHING_LINES } from '../src/constants/drills';
import HomeScreen from '../src/screens/HomeScreen';
import { loadProgress, saveProgress } from '../src/storage/progressStorage';
import { EMPTY_PROGRESS } from '../src/streak';

jest.mock('../src/storage/progressStorage', () => ({
  loadProgress: jest.fn(),
  saveProgress: jest.fn(),
}));

jest.mock('../src/components/ParentGateButton', () => {
  const Actual = jest.requireActual('../src/components/ParentGateButton');

  return function TestParentGateButton(props) {
    return <Actual.default {...props} holdDurationMs={50} />;
  };
});

describe('App parent area', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setCoachingEnabled(true);
    loadProgress.mockResolvedValue({ ...EMPTY_PROGRESS });
    saveProgress.mockResolvedValue(undefined);
  });

  it('enters the parent area after holding the gate on home', async () => {
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    fireEvent(screen.getByTestId('parent-gate-button'), 'pressIn');
    await waitFor(() => {
      expect(screen.getByTestId('parent-screen')).toBeTruthy();
    }, { timeout: 500 });
  });

  it('persists mute and silences coaching on home', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    expect(Speech.speak).toHaveBeenCalledWith(
      COACHING_LINES.HOME,
      expect.objectContaining({ language: 'en' }),
    );

    fireEvent(screen.getByTestId('parent-gate-button'), 'pressIn');
    await waitFor(() => {
      expect(screen.getByTestId('parent-screen')).toBeTruthy();
    });

    jest.clearAllMocks();

    fireEvent(screen.getByTestId('mute-coaching-switch'), 'valueChange', false);

    expect(saveProgress).toHaveBeenCalledWith({
      lastPracticeDate: null,
      streak: 0,
      soundEnabled: false,
    });

    await user.press(screen.getByTestId('parent-done-button'));

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    expect(Speech.speak).not.toHaveBeenCalled();

    jest.clearAllMocks();
    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.speak).not.toHaveBeenCalled();
  });

  it('reloads muted coaching preference from storage', async () => {
    loadProgress.mockResolvedValue({
      lastPracticeDate: null,
      streak: 0,
      soundEnabled: false,
    });

    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    expect(Speech.speak).not.toHaveBeenCalled();
  });
});

describe('HomeScreen muted coaching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setCoachingEnabled(false);
  });

  it('does not auto-speak or replay when coaching is muted', async () => {
    const user = userEvent.setup();
    await render(
      <HomeScreen
        onStartPractice={jest.fn()}
        onOpenParent={jest.fn()}
        streak={0}
        practicedToday={false}
      />,
    );

    expect(Speech.speak).not.toHaveBeenCalled();

    await user.press(screen.getByTestId('replay-coaching-button'));

    expect(Speech.speak).not.toHaveBeenCalled();
  });
});
