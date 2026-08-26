import { StyleSheet, Text, View } from 'react-native';
import {
  CONFETTI_BURST_DURATION_MS,
  getConfettiParticleConfig,
  getConfettiBurstKeyframes,
} from '../celebrationEffects';

const PARTICLES = getConfettiParticleConfig();

const particleStyles = StyleSheet.create(
  Object.fromEntries(
    PARTICLES.map((particle) => [
      `particle_${particle.id}`,
      {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        animationDuration: `${CONFETTI_BURST_DURATION_MS}ms`,
        animationDelay: `${particle.delayMs}ms`,
        animationFillMode: 'forwards',
        animationKeyframes: getConfettiBurstKeyframes(particle),
      },
    ]),
  ),
);

function ConfettiParticle({ particle }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={particleStyles[`particle_${particle.id}`]}
    >
      <Text style={[styles.particleEmoji, { fontSize: particle.size }]}>{particle.emoji}</Text>
    </View>
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
  particleEmoji: {
    textAlign: 'center',
  },
});
