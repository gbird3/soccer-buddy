import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useNativeAnimation } from '../animationDriver';

export default function CelebrationStickerPop({ children, style, testID }) {
  const stickerScale = useRef(new Animated.Value(0.2)).current;
  const stickerRotate = useRef(new Animated.Value(-0.12)).current;

  useEffect(() => {
    const popAnimation = Animated.sequence([
      Animated.delay(120),
      Animated.parallel([
        Animated.spring(stickerScale, {
          toValue: 1.12,
          friction: 4,
          tension: 160,
          useNativeDriver: useNativeAnimation,
        }),
        Animated.spring(stickerRotate, {
          toValue: 0.06,
          friction: 5,
          tension: 120,
          useNativeDriver: useNativeAnimation,
        }),
      ]),
      Animated.parallel([
        Animated.spring(stickerScale, {
          toValue: 1,
          friction: 5,
          tension: 90,
          useNativeDriver: useNativeAnimation,
        }),
        Animated.spring(stickerRotate, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: useNativeAnimation,
        }),
      ]),
    ]);

    popAnimation.start();
    return () => popAnimation.stop();
  }, [stickerRotate, stickerScale]);

  const stickerSpin = stickerRotate.interpolate({
    inputRange: [-0.12, 0, 0.06],
    outputRange: ['-12deg', '0deg', '6deg'],
  });

  return (
    <Animated.View
      style={[
        styles.pop,
        style,
        {
          transform: [{ scale: stickerScale }, { rotate: stickerSpin }],
        },
      ]}
      testID={testID}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pop: {
    zIndex: 2,
  },
});
