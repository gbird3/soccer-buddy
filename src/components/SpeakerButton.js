import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function SpeakerButton({ onPress, testID, accessibilityLabel = 'Hear again' }) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.icon} accessibilityElementsHidden importantForAccessibility="no">
        🔊
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: sizes.minTapTarget,
    minHeight: sizes.minTapTarget,
    borderRadius: sizes.minTapTarget / 2,
    backgroundColor: colors.cream,
    borderWidth: 4,
    borderColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 4,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
  icon: {
    fontSize: 36,
  },
});
