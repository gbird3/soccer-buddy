import { render, screen } from '@testing-library/react-native';
import SessionProgress from '../src/components/SessionProgress';
import { getSessionSteps } from '../src/sessionProgress';

describe('SessionProgress', () => {
  const steps = getSessionSteps();

  it('shows warm-up as the current step on step 1 of 5', async () => {
    await render(<SessionProgress currentStepIndex={0} steps={steps} />);

    expect(screen.getByTestId('session-progress')).toBeTruthy();
    expect(screen.getByLabelText('Step 1 of 5, Warm-up')).toBeTruthy();
    expect(screen.getByTestId('session-progress-step-0')).toHaveStyle({
      backgroundColor: '#fff9e6',
    });
    expect(screen.getByTestId('session-progress-step-1')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('marks earlier steps complete and highlights Toe Taps on step 2 of 5', async () => {
    await render(<SessionProgress currentStepIndex={1} steps={steps} />);

    expect(screen.getByLabelText('Step 2 of 5, Toe Taps')).toBeTruthy();
    expect(screen.getByTestId('session-progress-step-0')).toHaveStyle({
      backgroundColor: '#ffd700',
    });
    expect(screen.getByTestId('session-progress-step-1')).toHaveStyle({
      backgroundColor: '#fff9e6',
    });
    expect(screen.getByTestId('session-progress-step-2')).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('marks prior steps complete on the final drill step', async () => {
    await render(<SessionProgress currentStepIndex={4} steps={steps} />);

    expect(screen.getByLabelText('Step 5 of 5, Tick Tock')).toBeTruthy();
    expect(screen.getByTestId('session-progress-step-0')).toHaveStyle({
      backgroundColor: '#ffd700',
    });
    expect(screen.getByTestId('session-progress-step-3')).toHaveStyle({
      backgroundColor: '#ffd700',
    });
    expect(screen.getByTestId('session-progress-step-4')).toHaveStyle({
      backgroundColor: '#fff9e6',
    });
  });
});
