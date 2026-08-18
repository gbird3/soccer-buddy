import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function KickTargetDemo() {
  const ballX = useRef(new Animated.Value(0)).current;
  const targetScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const kickSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(ballX, { toValue: 48, duration: 400, useNativeDriver: true }),
        Animated.parallel([
          Animated.timing(targetScale, { toValue: 1.15, duration: 150, useNativeDriver: true }),
          Animated.timing(ballX, { toValue: 56, duration: 150, useNativeDriver: true }),
        ]),
        Animated.timing(targetScale, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(ballX, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(400),
      ]),
    );

    kickSequence.start();
    return () => kickSequence.stop();
  }, [ballX, targetScale]);

  return (
    <View
      testID="kick-target-demo"
      accessibilityLabel="Kick a target demonstration"
      style={styles.container}
    >
      <View style={styles.fieldRow}>
        <Animated.Text style={[styles.ball, { transform: [{ translateX: ballX }] }]}>
          ⚽
        </Animated.Text>
        <Animated.Text style={[styles.target, { transform: [{ scale: targetScale }] }]}>
          🎯
        </Animated.Text>
      </View>
      <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
        Watch the ball hit the target!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: colors.white,
    paddingVertical: 28,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 340,
    minHeight: 220,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 24,
  },
  ball: {
    fontSize: sizes.emojiHero,
  },
  target: {
    fontSize: sizes.emojiLarge,
  },
  caption: {
    marginTop: 16,
    fontSize: sizes.body,
    fontWeight: '600',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
});
