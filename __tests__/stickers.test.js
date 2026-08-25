import {
  STICKERS,
  getLatestSticker,
  getStickerById,
  stickerForPracticeCount,
} from '../src/constants/stickers';

describe('stickerForPracticeCount', () => {
  it('returns the star on the first practice day', () => {
    expect(stickerForPracticeCount(1)).toEqual(STICKERS[0]);
  });

  it('cycles through the sticker catalog by unique practice days', () => {
    expect(stickerForPracticeCount(2).id).toBe('ball');
    expect(stickerForPracticeCount(3).id).toBe('trophy');
    expect(stickerForPracticeCount(7).id).toBe('goal');
    expect(stickerForPracticeCount(8).id).toBe('star');
  });

  it('falls back to the star for invalid counts', () => {
    expect(stickerForPracticeCount(0).id).toBe('star');
    expect(stickerForPracticeCount(-1).id).toBe('star');
  });
});

describe('getStickerById', () => {
  it('returns the matching sticker', () => {
    expect(getStickerById('rainbow')).toEqual(STICKERS[3]);
  });

  it('falls back to the star for unknown ids', () => {
    expect(getStickerById('missing')).toEqual(STICKERS[0]);
  });
});

describe('getLatestSticker', () => {
  it('returns the last earned sticker', () => {
    expect(getLatestSticker(['star', 'ball', 'trophy']).id).toBe('trophy');
  });

  it('falls back to the star when the collection is empty', () => {
    expect(getLatestSticker([]).id).toBe('star');
  });
});
