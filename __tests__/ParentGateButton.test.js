import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import ParentGateButton from '../src/components/ParentGateButton';

describe('ParentGateButton', () => {
  it('opens the parent area after a full hold', async () => {
    const onUnlock = jest.fn();
    await render(<ParentGateButton onUnlock={onUnlock} holdDurationMs={50} />);

    fireEvent(screen.getByTestId('parent-gate-button'), 'pressIn');

    await waitFor(() => {
      expect(onUnlock).toHaveBeenCalledTimes(1);
    });
  });

  it('does not open the parent area when released early', async () => {
    const onUnlock = jest.fn();
    await render(<ParentGateButton onUnlock={onUnlock} holdDurationMs={3000} />);

    fireEvent(screen.getByTestId('parent-gate-button'), 'pressIn');
    fireEvent(screen.getByTestId('parent-gate-button'), 'pressOut');

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(onUnlock).not.toHaveBeenCalled();
  });
});
