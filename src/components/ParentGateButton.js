import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export const HOLD_DURATION_MS = 3000;

export default function ParentGateButton({
  onUnlock,
  holdDurationMs = HOLD_DURATION_MS,
  testID = 'parent-gate-button',
}) {
  const holdTimerRef = useRef(null);
  const [holding, setHolding] = useState(false);

  const clearHold = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHolding(false);
  }, []);

  const handlePressIn = () => {
    setHolding(true);
    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      setHolding(false);
      onUnlock();
    }, holdDurationMs);
  };

  const handlePressOut = () => {
    if (holdTimerRef.current) {
      clearHold();
    }
  };

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel="Parent area. Press and hold to enter."
      accessibilityHint="Hold for three seconds to open parent settings."
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        (pressed || holding) && styles.buttonActive,
      ]}
    >
      {holding ? (
        <View style={styles.progressRing} testID="parent-gate-holding">
          <Text style={styles.lockIcon} accessibilityElementsHidden importantForAccessibility="no">
            🔒
          </Text>
        </View>
      ) : (
        <Text style={styles.lockIcon} accessibilityElementsHidden importantForAccessibility="no">
          🔒
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderColor: colors.yellow,
  },
  progressRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 22,
  },
});
