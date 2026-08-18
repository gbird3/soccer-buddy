import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function BigButton({
  label,
  icon,
  onPress,
  testID,
  accessibilityLabel,
  variant = 'primary',
}) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: sizes.bigButtonHeight,
    minWidth: 260,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  primary: {
    backgroundColor: colors.yellow,
    borderColor: colors.orange,
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 6,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.fieldGreen,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  icon: {
    fontSize: 36,
  },
  label: {
    fontSize: sizes.subtitle,
    fontWeight: '800',
    textAlign: 'center',
  },
  primaryLabel: {
    color: colors.fieldGreenDark,
  },
  secondaryLabel: {
    color: colors.fieldGreenDark,
  },
});
