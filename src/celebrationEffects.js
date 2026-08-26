/**
 * Pure config for celebration confetti / sparkle particles.
 * Kept separate from the component so layout math is easy to unit test.
 */

export const CONFETTI_BURST_DURATION_MS = 1600;
export const CONFETTI_PARTICLE_COUNT = 14;

const CONFETTI_EMOJIS = ['✨', '🎉', '⭐', '🎊', '💫'];

export const STICKER_POP_KEYFRAMES = {
  '0%': {
    transform: celebrationTransform({ scale: 0.2, rotate: '-12deg' }),
  },
  '55%': {
    transform: celebrationTransform({ scale: 1.12, rotate: '6deg' }),
  },
  '100%': {
    transform: celebrationTransform({ scale: 1, rotate: '0deg' }),
  },
};

function celebrationTransform({
  translateX = 0,
  translateY = 0,
  scale = 1,
  rotate = '0deg',
} = {}) {
  return `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate})`;
}

/**
 * @returns {Array<{ id: number, emoji: string, angleDeg: number, distance: number, size: number, delayMs: number }>}
 */
export function getConfettiParticleConfig(count = CONFETTI_PARTICLE_COUNT) {
  return Array.from({ length: count }, (_, index) => {
    const spread = 360 / count;
    const angleDeg = index * spread + (index % 2 === 0 ? 8 : -8);

    return {
      id: index,
      emoji: CONFETTI_EMOJIS[index % CONFETTI_EMOJIS.length],
      angleDeg,
      distance: 72 + (index % 4) * 18,
      size: 18 + (index % 3) * 6,
      delayMs: (index % 5) * 35,
    };
  });
}

export function polarToOffset(angleDeg, distance) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(radians) * distance,
    y: Math.sin(radians) * distance,
  };
}

/** Keyframes for react-native-web CSS burst animations. */
export function getConfettiBurstKeyframes(particle) {
  const { x, y } = polarToOffset(particle.angleDeg, particle.distance);
  const endY = y + 24;

  return {
    '0%': {
      opacity: 0,
      transform: celebrationTransform({ scale: 0.35 }),
    },
    '15%': {
      opacity: 1,
      transform: celebrationTransform({
        translateX: x * 0.2,
        translateY: endY * 0.2,
        scale: 0.95,
      }),
    },
    '85%': {
      opacity: 1,
      transform: celebrationTransform({
        translateX: x * 0.92,
        translateY: endY * 0.92,
        scale: 1.05,
      }),
    },
    '100%': {
      opacity: 0,
      transform: celebrationTransform({
        translateX: x,
        translateY: endY,
        scale: 0.75,
      }),
    },
  };
}
