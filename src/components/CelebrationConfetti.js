import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  CONFETTI_BURST_DURATION_MS,
  getConfettiParticleConfig,
  polarToOffset,
} from '../celebrationEffects';

const PARTICLES = getConfettiParticleConfig();

function ConfettiParticle({ particle }) {
  const progress = useRef(new Animated.Value(0)).current;
  const { x, y } = polarToOffset(particle.angleDeg, particle.distance);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: CONFETTI_BURST_DURATION_MS,
      delay: particle.delayMs,
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [particle.delayMs, progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y + 24],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.15, 0.85, 1],
    outputRange: [0, 1, 1, 0],
  });
  const scale = progress.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.2, 1.1, 0.7],
  });

  return (
    <Animated.Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        styles.particle,
        {
          fontSize: particle.size,
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      {particle.emoji}
    </Animated.Text>
  );
}

export default function CelebrationConfetti() {
  return (
    <View
      pointerEvents="none"
      style={styles.overlay}
      testID="celebration-confetti"
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <View style={styles.origin}>
        {PARTICLES.map((particle) => (
          <ConfettiParticle key={particle.id} particle={particle} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 72,
    zIndex: 1,
  },
  origin: {
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
  },
});
