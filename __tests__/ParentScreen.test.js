import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import ParentScreen from '../src/screens/ParentScreen';

describe('ParentScreen', () => {
  it('shows the first-open coaching card when no practice history exists', async () => {
    await render(
      <ParentScreen
        streak={0}
        practiceDates={[]}
        todayKey="2026-08-20"
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByTestId('parent-first-open-card')).toBeTruthy();
    expect(screen.getByText('Hand the phone to your kid, tap Start.')).toBeTruthy();
    expect(
      screen.getByText('The big Start button is on the home screen. That\'s all they need.'),
    ).toBeTruthy();
  });

  it('hides the first-open coaching card after at least one practice day', async () => {
    await render(
      <ParentScreen
        streak={1}
        practiceDates={['2026-08-19']}
        todayKey="2026-08-20"
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.queryByTestId('parent-first-open-card')).toBeNull();
    expect(screen.queryByText('Hand the phone to your kid, tap Start.')).toBeNull();
  });

  it('shows the current week with practiced days marked', async () => {
    await render(
      <ParentScreen
        streak={3}
        practiceDates={['2026-08-17', '2026-08-19']}
        todayKey="2026-08-20"
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByTestId('parent-week-view')).toBeTruthy();
    expect(screen.getByTestId('week-day-practiced-2026-08-17')).toBeTruthy();
    expect(screen.getByTestId('week-day-practiced-2026-08-19')).toBeTruthy();
    expect(screen.queryByTestId('week-day-practiced-2026-08-18')).toBeNull();
    expect(screen.getByTestId('week-day-2026-08-20')).toBeTruthy();
  });

  it('shows an empty week when there is no practice history', async () => {
    await render(
      <ParentScreen
        streak={0}
        practiceDates={[]}
        todayKey="2026-08-20"
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByTestId('parent-week-view')).toBeTruthy();
    expect(screen.queryByTestId(/week-day-practiced-/)).toBeNull();
    expect(screen.getByTestId('week-day-2026-08-16')).toBeTruthy();
    expect(screen.getByTestId('week-day-2026-08-22')).toBeTruthy();
  });

  it('shows the current streak with a fire icon', async () => {
    await render(
      <ParentScreen
        streak={7}
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByTestId('parent-streak-display')).toHaveTextContent('7', { exact: false });
    expect(screen.getByTestId('parent-streak-display')).toHaveTextContent('🔥', { exact: false });
  });

  it('reflects the coaching audio switch state', async () => {
    const { rerender } = await render(
      <ParentScreen
        streak={2}
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByText('Audio coaching is on')).toBeTruthy();
    expect(screen.getByTestId('mute-coaching-switch').props.value).toBe(true);

    await rerender(
      <ParentScreen
        streak={2}
        soundEnabled={false}
        onToggleSound={jest.fn()}
        onGoHome={jest.fn()}
      />,
    );

    expect(screen.getByText('Audio coaching is muted')).toBeTruthy();
    expect(screen.getByTestId('mute-coaching-switch').props.value).toBe(false);
  });

  it('calls onToggleSound when the mute switch changes', async () => {
    const onToggleSound = jest.fn();
    await render(
      <ParentScreen
        streak={1}
        soundEnabled={true}
        onToggleSound={onToggleSound}
        onGoHome={jest.fn()}
      />,
    );

    fireEvent(screen.getByTestId('mute-coaching-switch'), 'valueChange', false);

    expect(onToggleSound).toHaveBeenCalledWith(false);
  });

  it('returns home when Done is pressed', async () => {
    const onGoHome = jest.fn();
    const user = userEvent.setup();
    await render(
      <ParentScreen
        streak={1}
        soundEnabled={true}
        onToggleSound={jest.fn()}
        onGoHome={onGoHome}
      />,
    );

    await user.press(screen.getByTestId('parent-done-button'));

    expect(onGoHome).toHaveBeenCalledTimes(1);
  });
});
