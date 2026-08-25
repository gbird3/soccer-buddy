import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function WarmUpDemo() {
  const leftFootY = useRef(new Animated.Value(0)).current;
  const rightFootY = useRef(new Animated.Value(0)).current;
  const marchOpacity = useRef(new Animated.Value(1)).current;
  const rollOpacity = useRef(new Animated.Value(0)).current;
  const ballX = useRef(new Animated.Value(-24)).current;
  const leftRollFootX = useRef(new Animated.Value(-8)).current;
  const rightRollFootX = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const marchPhase = Animated.sequence([
      Animated.parallel([
        Animated.timing(leftFootY, { toValue: -14, duration: 200, useNativeDriver: true }),
        Animated.timing(rightFootY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(leftFootY, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(rightFootY, { toValue: -14, duration: 200, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(leftFootY, { toValue: -14, duration: 200, useNativeDriver: true }),
        Animated.timing(rightFootY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(leftFootY, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(rightFootY, { toValue: -14, duration: 200, useNativeDriver: true }),
      ]),
    ]);

    const rollPhase = Animated.sequence([
      Animated.parallel([
        Animated.timing(marchOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(rollOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]),
      Animated.timing(ballX, { toValue: 24, duration: 500, useNativeDriver: true }),
      Animated.timing(ballX, { toValue: -24, duration: 500, useNativeDriver: true }),
      Animated.timing(ballX, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(marchOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(rollOpacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]),
    ]);

    const warmUpSequence = Animated.loop(Animated.sequence([marchPhase, rollPhase]));

    warmUpSequence.start();
    return () => warmUpSequence.stop();
  }, [ballX, leftFootY, leftRollFootX, marchOpacity, rightFootY, rightRollFootX, rollOpacity]);

  return (
    <View
      testID="warm-up-demo"
      accessibilityLabel="Warm-up demonstration"
      style={styles.container}
    >
      <Animated.View style={[styles.phase, { opacity: marchOpacity }]}>
        <View style={styles.marchRow}>
          <Animated.Text style={[styles.foot, { transform: [{ translateY: leftFootY }] }]}>
            👟
          </Animated.Text>
          <Animated.Text style={[styles.foot, { transform: [{ translateY: rightFootY }] }]}>
            👟
          </Animated.Text>
        </View>
        <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
          March in place!
        </Text>
      </Animated.View>

      <Animated.View style={[styles.phase, styles.rollPhase, { opacity: rollOpacity }]}>
        <View style={styles.rollStage}>
          <Animated.Text style={[styles.rollFoot, { transform: [{ translateX: leftRollFootX }] }]}>
            👟
          </Animated.Text>
          <Animated.Text style={[styles.ball, { transform: [{ translateX: ballX }] }]}>
            ⚽
          </Animated.Text>
          <Animated.Text style={[styles.rollFoot, { transform: [{ translateX: rightRollFootX }] }]}>
            👟
          </Animated.Text>
        </View>
        <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
          Roll the ball with your feet!
        </Text>
      </Animated.View>
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
  phase: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  rollPhase: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  marchRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 40,
    minHeight: 96,
  },
  foot: {
    fontSize: sizes.emojiLarge,
  },
  rollStage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 96,
  },
  rollFoot: {
    fontSize: sizes.emojiLarge,
  },
  ball: {
    fontSize: sizes.emojiHero,
  },
  caption: {
    marginTop: 16,
    fontSize: sizes.body,
    fontWeight: '600',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
});
