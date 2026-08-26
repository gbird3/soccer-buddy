/**
 * Pure config for celebration confetti / sparkle particles.
 * Kept separate from the component so layout math is easy to unit test.
 */

export const CONFETTI_BURST_DURATION_MS = 1600;
export const CONFETTI_PARTICLE_COUNT = 14;

const CONFETTI_EMOJIS = ['✨', '🎉', '⭐', '🎊', '💫'];

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
