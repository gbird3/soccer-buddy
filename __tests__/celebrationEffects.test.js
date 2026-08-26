import {
  CONFETTI_PARTICLE_COUNT,
  getConfettiParticleConfig,
  polarToOffset,
} from '../src/celebrationEffects';

describe('celebrationEffects', () => {
  it('builds the expected number of confetti particles', () => {
    const particles = getConfettiParticleConfig();

    expect(particles).toHaveLength(CONFETTI_PARTICLE_COUNT);
    expect(particles[0]).toEqual(
      expect.objectContaining({
        id: 0,
        emoji: expect.any(String),
        angleDeg: expect.any(Number),
        distance: expect.any(Number),
        size: expect.any(Number),
        delayMs: expect.any(Number),
      }),
    );
  });

  it('converts polar coordinates to x/y offsets', () => {
    expect(polarToOffset(0, 10)).toEqual({ x: 10, y: 0 });
    expect(polarToOffset(90, 10).y).toBeCloseTo(10, 5);
    expect(polarToOffset(90, 10).x).toBeCloseTo(0, 5);
  });
});
