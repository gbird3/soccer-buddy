import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { SESSION_DRILLS } from '../src/constants/drills';
import {
  SCREENS,
  getNextDrillIndex,
  getNextScreen,
  isSessionComplete,
} from '../src/practiceFlow';
import { loadProgress, saveProgress } from '../src/storage/progressStorage';
import { EMPTY_PROGRESS, toDateKey } from '../src/streak';

jest.mock('../src/storage/progressStorage', () => ({
  loadProgress: jest.fn(),
  saveProgress: jest.fn(),
}));

describe('practiceFlow', () => {
  const drillCount = SESSION_DRILLS.length;

  it('moves from home to drill when practice starts', () => {
    expect(getNextScreen(SCREENS.HOME, 'START_PRACTICE')).toBe(SCREENS.DRILL);
  });

  it('stays on drill screen after first drill completes', () => {
    expect(
      getNextScreen(SCREENS.DRILL, 'COMPLETE_DRILL', { drillIndex: 0, drillCount }),
    ).toBe(SCREENS.DRILL);
  });

  it('moves from drill to celebration after the final drill completes', () => {
    expect(
      getNextScreen(SCREENS.DRILL, 'COMPLETE_DRILL', {
        drillIndex: drillCount - 1,
        drillCount,
      }),
    ).toBe(SCREENS.CELEBRATION);
  });

  it('returns home from any screen via GO_HOME', () => {
    expect(getNextScreen(SCREENS.CELEBRATION, 'GO_HOME')).toBe(SCREENS.HOME);
    expect(getNextScreen(SCREENS.DRILL, 'GO_HOME')).toBe(SCREENS.HOME);
    expect(getNextScreen(SCREENS.PARENT, 'GO_HOME')).toBe(SCREENS.HOME);
  });

  it('opens the parent area from home', () => {
    expect(getNextScreen(SCREENS.HOME, 'OPEN_PARENT')).toBe(SCREENS.PARENT);
    expect(getNextScreen(SCREENS.DRILL, 'OPEN_PARENT')).toBe(SCREENS.DRILL);
  });

  it('ignores invalid transitions', () => {
    expect(getNextScreen(SCREENS.HOME, 'COMPLETE_DRILL')).toBe(SCREENS.HOME);
    expect(getNextScreen(SCREENS.CELEBRATION, 'START_PRACTICE')).toBe(SCREENS.CELEBRATION);
  });

  it('resets drill index on start and advances on complete', () => {
    expect(getNextDrillIndex(0, 'START_PRACTICE', drillCount)).toBe(0);
    expect(getNextDrillIndex(0, 'COMPLETE_DRILL', drillCount)).toBe(1);
    expect(getNextDrillIndex(1, 'COMPLETE_DRILL', drillCount)).toBe(2);
    expect(getNextDrillIndex(2, 'COMPLETE_DRILL', drillCount)).toBe(2);
  });

  it('knows when the session is complete', () => {
    expect(isSessionComplete(0, drillCount)).toBe(false);
    expect(isSessionComplete(1, drillCount)).toBe(false);
    expect(isSessionComplete(2, drillCount)).toBe(true);
  });
});

describe('App practice session flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loadProgress.mockResolvedValue({ ...EMPTY_PROGRESS });
    saveProgress.mockResolvedValue(undefined);
  });

  it('starts on the home screen', async () => {
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });
    expect(screen.getByTestId('start-practice-button')).toBeTruthy();
    expect(screen.getByTestId('streak-display')).toBeTruthy();
  });

  it('navigates home → toe taps → kick target → freeze → celebration with tap-to-complete', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    await user.press(screen.getByTestId('start-practice-button'));
    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByTestId('toe-tap-demo')).toBeTruthy();
    expect(screen.getByText('Toe Taps')).toBeTruthy();

    await user.press(screen.getByTestId('complete-drill-button'));
    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByTestId('kick-target-demo')).toBeTruthy();
    expect(screen.getByText('Kick a Target')).toBeTruthy();
    expect(saveProgress).not.toHaveBeenCalled();

    await user.press(screen.getByTestId('complete-drill-button'));
    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByTestId('freeze-demo')).toBeTruthy();
    expect(screen.getByText('Freeze!')).toBeTruthy();
    expect(saveProgress).not.toHaveBeenCalled();

    await user.press(screen.getByTestId('complete-drill-button'));
    expect(screen.getByTestId('celebration-screen')).toBeTruthy();
    expect(screen.getByTestId('sticker-reward')).toBeTruthy();
    expect(screen.getByText('Great job!')).toBeTruthy();
    expect(screen.getByText('Star Sticker')).toBeTruthy();
    expect(screen.getByTestId('celebration-streak')).toHaveTextContent('1', { exact: false });
    expect(saveProgress).toHaveBeenCalledTimes(1);
    expect(saveProgress).toHaveBeenCalledWith({
      lastPracticeDate: toDateKey(),
      streak: 1,
      soundEnabled: true,
    });
  });

  it('does not record streak after only the first drill', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));

    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByText('Kick a Target')).toBeTruthy();
    expect(saveProgress).not.toHaveBeenCalled();
    expect(screen.queryByTestId('celebration-screen')).toBeNull();
  });

  it('does not record streak after only the first two drills', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));

    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByText('Freeze!')).toBeTruthy();
    expect(saveProgress).not.toHaveBeenCalled();
    expect(screen.queryByTestId('celebration-screen')).toBeNull();
  });

  it('returns to home from celebration', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('go-home-button'));

    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });

  it('shows practiced-today badge after returning home', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeTruthy();
    });

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('go-home-button'));

    expect(screen.getByTestId('practiced-today-badge')).toBeTruthy();
    expect(screen.getByTestId('streak-display')).toHaveTextContent('1', { exact: false });
  });

  it('does not increment streak twice on same-day replays', async () => {
    const todayKey = toDateKey();
    loadProgress.mockResolvedValue({ lastPracticeDate: todayKey, streak: 3 });

    const user = userEvent.setup();
    await render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('practiced-today-badge')).toBeTruthy();
    });
    expect(screen.getByTestId('streak-display')).toHaveTextContent('3', { exact: false });

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('complete-drill-button'));

    expect(screen.getByTestId('celebration-streak')).toHaveTextContent('3', { exact: false });
    expect(saveProgress).toHaveBeenCalledWith({
      lastPracticeDate: toDateKey(),
      streak: 3,
      soundEnabled: true,
    });
  });
});
