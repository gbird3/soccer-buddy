import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, sizes } from '../constants/theme';

export default function FreezeDemo() {
  const ballX = useRef(new Animated.Value(0)).current;
  const footY = useRef(new Animated.Value(-48)).current;
  const footOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const freezeSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(ballX, { toValue: 32, duration: 500, useNativeDriver: true }),
        Animated.parallel([
          Animated.timing(footOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(footY, { toValue: -8, duration: 280, useNativeDriver: true }),
        ]),
        Animated.delay(900),
        Animated.parallel([
          Animated.timing(footOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(footY, { toValue: -48, duration: 200, useNativeDriver: true }),
        ]),
        Animated.timing(ballX, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(300),
      ]),
    );

    freezeSequence.start();
    return () => freezeSequence.stop();
  }, [ballX, footOpacity, footY]);

  return (
    <View
      testID="freeze-demo"
      accessibilityLabel="Freeze demonstration"
      style={styles.container}
    >
      <View style={styles.stage}>
        <Animated.Text style={[styles.foot, { opacity: footOpacity, transform: [{ translateY: footY }] }]}>
          🦶
        </Animated.Text>
        <Animated.Text style={[styles.ball, { transform: [{ translateX: ballX }] }]}>
          ⚽
        </Animated.Text>
      </View>
      <Text style={styles.caption} accessibilityElementsHidden importantForAccessibility="no">
        Roll the ball, then freeze your foot on top!
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 120,
  },
  foot: {
    fontSize: sizes.emojiLarge,
    marginBottom: -8,
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
