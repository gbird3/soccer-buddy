export const STICKERS = [
  { id: 'star', emoji: '⭐', label: 'Star Sticker' },
  { id: 'ball', emoji: '⚽', label: 'Soccer Ball' },
  { id: 'trophy', emoji: '🏆', label: 'Trophy' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
  { id: 'sparkle', emoji: '✨', label: 'Sparkle' },
  { id: 'medal', emoji: '🎖️', label: 'Medal' },
  { id: 'goal', emoji: '🥅', label: 'Goal' },
];

const STICKER_BY_ID = Object.fromEntries(STICKERS.map((sticker) => [sticker.id, sticker]));

export function stickerForPracticeCount(practiceCount) {
  if (!practiceCount || practiceCount < 1) {
    return STICKERS[0];
  }

  return STICKERS[(practiceCount - 1) % STICKERS.length];
}

export function getStickerById(stickerId) {
  return STICKER_BY_ID[stickerId] ?? STICKERS[0];
}

export function getLatestSticker(stickerIds = []) {
  if (!Array.isArray(stickerIds) || stickerIds.length === 0) {
    return STICKERS[0];
  }

  return getStickerById(stickerIds[stickerIds.length - 1]);
}
