import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

describe('HomeScreen streak display', () => {
  it('shows the current streak with a fire icon', async () => {
    await render(<HomeScreen onStartPractice={jest.fn()} streak={5} practicedToday={false} />);

    expect(screen.getByTestId('streak-display')).toHaveTextContent('5', { exact: false });
    expect(screen.getByTestId('streak-display')).toHaveTextContent('🔥', { exact: false });
  });

  it('shows a practiced-today badge when the child already finished today', async () => {
    await render(<HomeScreen onStartPractice={jest.fn()} streak={2} practicedToday={true} />);

    expect(screen.getByTestId('practiced-today-badge')).toBeTruthy();
    expect(screen.queryByTestId('start-practice-button')).toBeTruthy();
  });
});
