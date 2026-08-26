import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  CONFETTI_BURST_DURATION_MS,
  getConfettiParticleConfig,
  polarToOffset,
} from '../celebrationEffects';
import { useNativeAnimation } from '../animationDriver';

const PARTICLES = getConfettiParticleConfig();

function ConfettiParticle({ particle }) {
  const progress = useRef(new Animated.Value(0)).current;
  const { x, y } = polarToOffset(particle.angleDeg, particle.distance);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: CONFETTI_BURST_DURATION_MS,
      delay: particle.delayMs,
      useNativeDriver: useNativeAnimation,
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
    inputRange: [0, 0.12, 0.85, 1],
    outputRange: [0, 1, 1, 0],
  });
  const scale = progress.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.35, 1.15, 0.75],
  });

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        styles.particle,
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      <Text style={[styles.particleEmoji, { fontSize: particle.size }]}>{particle.emoji}</Text>
    </Animated.View>
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
    justifyContent: 'center',
    overflow: 'visible',
    zIndex: 1,
  },
  origin: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  particle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  particleEmoji: {
    textAlign: 'center',
  },
});
