import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function ToeTapDemo() {
  const leftFootY = useRef(new Animated.Value(0)).current;
  const rightFootY = useRef(new Animated.Value(0)).current;
  const ballScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const tapSequence = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(leftFootY, { toValue: -18, duration: 220, useNativeDriver: true }),
          Animated.timing(ballScale, { toValue: 0.92, duration: 220, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(leftFootY, { toValue: 0, duration: 220, useNativeDriver: true }),
          Animated.timing(ballScale, { toValue: 1, duration: 220, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(rightFootY, { toValue: -18, duration: 220, useNativeDriver: true }),
          Animated.timing(ballScale, { toValue: 0.92, duration: 220, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(rightFootY, { toValue: 0, duration: 220, useNativeDriver: true }),
          Animated.timing(ballScale, { toValue: 1, duration: 220, useNativeDriver: true }),
        ]),
      ]),
    );

    tapSequence.start();
    return () => tapSequence.stop();
  }, [ballScale, leftFootY, rightFootY]);

  return (
    <View
      testID="toe-tap-demo"
      accessibilityLabel="Toe tap demonstration"
      style={styles.container}
    >
      <View style={styles.feetRow}>
        <Animated.Text style={[styles.foot, { transform: [{ translateY: leftFootY }] }]}>
          👟
        </Animated.Text>
        <View style={styles.ballSpace} />
        <Animated.Text style={[styles.foot, { transform: [{ translateY: rightFootY }] }]}>
          👟
        </Animated.Text>
      </View>
      <Animated.Text style={[styles.ball, { transform: [{ scale: ballScale }] }]}>
        ⚽
      </Animated.Text>
      <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
        Watch the toes tap the ball!
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
  feetRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 8,
  },
  foot: {
    fontSize: sizes.emojiLarge,
  },
  ballSpace: {
    width: 72,
  },
  ball: {
    fontSize: sizes.emojiHero,
    marginTop: -12,
  },
  caption: {
    marginTop: 16,
    fontSize: sizes.body,
    fontWeight: '600',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
});
