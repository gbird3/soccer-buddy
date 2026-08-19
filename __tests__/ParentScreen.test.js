import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import ParentScreen from '../src/screens/ParentScreen';

describe('ParentScreen', () => {
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
