import {
  CONFETTI_PARTICLE_COUNT,
  getConfettiBurstKeyframes,
  getConfettiParticleConfig,
  polarToOffset,
  STICKER_POP_KEYFRAMES,
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

  it('builds web burst keyframes and sticker pop keyframes', () => {
    const [particle] = getConfettiParticleConfig(1);
    const keyframes = getConfettiBurstKeyframes(particle);

    expect(keyframes['0%']).toEqual(expect.objectContaining({ opacity: 0 }));
    expect(keyframes['100%']).toEqual(expect.objectContaining({ opacity: 0 }));
    expect(STICKER_POP_KEYFRAMES['55%']).toEqual(
      expect.objectContaining({
        transform: expect.stringContaining('scale(1.12)'),
      }),
    );
  });
});
