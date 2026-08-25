import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function TickTockDemo() {
  const ballX = useRef(new Animated.Value(0)).current;
  const leftFootY = useRef(new Animated.Value(0)).current;
  const rightFootY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const tickTockSequence = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ballX, { toValue: -36, duration: 280, useNativeDriver: true }),
          Animated.timing(leftFootY, { toValue: -10, duration: 280, useNativeDriver: true }),
        ]),
        Animated.timing(leftFootY, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.parallel([
          Animated.timing(ballX, { toValue: 36, duration: 280, useNativeDriver: true }),
          Animated.timing(rightFootY, { toValue: -10, duration: 280, useNativeDriver: true }),
        ]),
        Animated.timing(rightFootY, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(ballX, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.delay(200),
      ]),
    );

    tickTockSequence.start();
    return () => tickTockSequence.stop();
  }, [ballX, leftFootY, rightFootY]);

  return (
    <View
      testID="tick-tock-demo"
      accessibilityLabel="Tick Tock demonstration"
      style={styles.container}
    >
      <View style={styles.stage}>
        <Animated.Text style={[styles.foot, { transform: [{ translateY: leftFootY }] }]}>
          🦶
        </Animated.Text>
        <Animated.Text style={[styles.ball, { transform: [{ translateX: ballX }] }]}>
          ⚽
        </Animated.Text>
        <Animated.Text style={[styles.foot, { transform: [{ translateY: rightFootY }] }]}>
          🦶
        </Animated.Text>
      </View>
      <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
        Pass the ball side to side between your feet!
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
  stage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
    minHeight: 120,
  },
  foot: {
    fontSize: sizes.emojiLarge,
  },
  ball: {
    fontSize: sizes.emojiHero,
    marginHorizontal: 4,
  },
  caption: {
    marginTop: 16,
    fontSize: sizes.body,
    fontWeight: '600',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
});
