import { render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';
import * as Speech from 'expo-speech';
import { useCoachingSpeech } from '../src/hooks/useCoachingSpeech';

function CoachingHarness({ line }) {
  useCoachingSpeech(line);
  return <View testID="coaching-harness" />;
}

describe('useCoachingSpeech', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('speaks the coaching line once on mount', async () => {
    await render(<CoachingHarness line="Let's practice!" />);

    await waitFor(() => {
      expect(Speech.stop).toHaveBeenCalled();
      expect(Speech.speak).toHaveBeenCalledWith(
        "Let's practice!",
        expect.objectContaining({ language: 'en' }),
      );
    });
  });

  it('stops speech when the harness unmounts', async () => {
    const { unmount } = await render(<CoachingHarness line="Great job!" />);

    await waitFor(() => {
      expect(Speech.speak).toHaveBeenCalled();
    });

    const stopCallsBeforeUnmount = Speech.stop.mock.calls.length;
    unmount();

    await waitFor(() => {
      expect(Speech.stop.mock.calls.length).toBeGreaterThan(stopCallsBeforeUnmount);
    });
  });
});
