import { render, screen, userEvent } from '@testing-library/react-native';
import App from '../App';
import { SCREENS, getNextScreen } from '../src/practiceFlow';

describe('practiceFlow', () => {
  it('moves from home to drill when practice starts', () => {
    expect(getNextScreen(SCREENS.HOME, 'START_PRACTICE')).toBe(SCREENS.DRILL);
  });

  it('moves from drill to celebration when drill is completed', () => {
    expect(getNextScreen(SCREENS.DRILL, 'COMPLETE_DRILL')).toBe(SCREENS.CELEBRATION);
  });

  it('returns home from any screen via GO_HOME', () => {
    expect(getNextScreen(SCREENS.CELEBRATION, 'GO_HOME')).toBe(SCREENS.HOME);
    expect(getNextScreen(SCREENS.DRILL, 'GO_HOME')).toBe(SCREENS.HOME);
  });

  it('ignores invalid transitions', () => {
    expect(getNextScreen(SCREENS.HOME, 'COMPLETE_DRILL')).toBe(SCREENS.HOME);
    expect(getNextScreen(SCREENS.CELEBRATION, 'START_PRACTICE')).toBe(SCREENS.CELEBRATION);
  });
});

describe('App practice session flow', () => {
  it('starts on the home screen', async () => {
    await render(<App />);
    expect(screen.getByTestId('home-screen')).toBeTruthy();
    expect(screen.getByTestId('start-practice-button')).toBeTruthy();
  });

  it('navigates home → drill → celebration with tap-to-complete', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await user.press(screen.getByTestId('start-practice-button'));
    expect(screen.getByTestId('drill-screen')).toBeTruthy();
    expect(screen.getByTestId('toe-tap-demo')).toBeTruthy();
    expect(screen.getByText('Toe Taps')).toBeTruthy();

    await user.press(screen.getByTestId('complete-drill-button'));
    expect(screen.getByTestId('celebration-screen')).toBeTruthy();
    expect(screen.getByTestId('sticker-reward')).toBeTruthy();
    expect(screen.getByText('Great job!')).toBeTruthy();
    expect(screen.getByText('Star Sticker')).toBeTruthy();
  });

  it('returns to home from celebration', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await user.press(screen.getByTestId('start-practice-button'));
    await user.press(screen.getByTestId('complete-drill-button'));
    await user.press(screen.getByTestId('go-home-button'));

    expect(screen.getByTestId('home-screen')).toBeTruthy();
  });
});
