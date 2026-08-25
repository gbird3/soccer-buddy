import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import ParentGateButton from '../components/ParentGateButton';
import SpeakerButton from '../components/SpeakerButton';
import { COACHING_LINES } from '../constants/drills';
import { getLatestSticker, getStickerById } from '../constants/stickers';
import { colors, sizes } from '../constants/theme';
import { useCoachingSpeech } from '../hooks/useCoachingSpeech';

export default function HomeScreen({
  onStartPractice,
  onOpenParent,
  streak = 0,
  practicedToday = false,
  stickerIds = [],
}) {
  const replayCoaching = useCoachingSpeech(COACHING_LINES.HOME);
  const todaySticker = practicedToday ? getLatestSticker(stickerIds) : null;

  return (
    <View style={styles.container} testID="home-screen">
      <View style={styles.parentGateCorner}>
        <ParentGateButton onUnlock={onOpenParent} />
      </View>

      <SpeakerButton
        testID="replay-coaching-button"
        onPress={replayCoaching}
        accessibilityLabel="Hear again: Let's practice"
      />

      <Text style={styles.emoji} accessibilityLabel="Soccer ball">
        ⚽
      </Text>
      <Text style={styles.title}>Soccer Buddy</Text>
      <Text style={styles.subtitle}>Let's practice!</Text>

      <View style={styles.streakRow} testID="streak-display" accessibilityLabel={`${streak} day streak`}>
        <Text style={styles.streakIcon} accessibilityElementsHidden importantForAccessibility="no">
          🔥
        </Text>
        <Text style={styles.streakNumber}>{streak}</Text>
      </View>

      {stickerIds.length > 0 && (
        <View
          style={styles.stickerCollection}
          testID="sticker-collection"
          accessibilityLabel={`${stickerIds.length} stickers collected`}
        >
          {stickerIds.map((stickerId, index) => (
            <Text
              key={`${stickerId}-${index}`}
              style={styles.collectionSticker}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {getStickerById(stickerId).emoji}
            </Text>
          ))}
        </View>
      )}

      {practicedToday && todaySticker && (
        <View
          style={styles.practicedBadge}
          testID="practiced-today-badge"
          accessibilityLabel="You already practiced today"
        >
          <Text style={styles.practicedSticker} accessibilityElementsHidden importantForAccessibility="no">
            {todaySticker.emoji}
          </Text>
          <Text style={styles.practicedCheck} accessibilityElementsHidden importantForAccessibility="no">
            ✅
          </Text>
        </View>
      )}

      <View style={styles.buttonWrap}>
        <BigButton
          testID="start-practice-button"
          icon="▶️"
          label="Start!"
          accessibilityLabel="Start today's practice"
          onPress={onStartPractice}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fieldGreen,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emoji: {
    fontSize: sizes.emojiHero,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: '800',
    color: colors.white,
    marginTop: 12,
  },
  subtitle: {
    fontSize: sizes.subtitle,
    color: colors.textLight,
    marginTop: 8,
    marginBottom: 24,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  streakIcon: {
    fontSize: 48,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '800',
    color: colors.yellow,
    marginLeft: 8,
    minWidth: 40,
    textAlign: 'center',
  },
  practicedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  practicedSticker: {
    fontSize: 36,
  },
  practicedCheck: {
    fontSize: 28,
    marginLeft: 8,
  },
  stickerCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.yellow,
    gap: 6,
    maxWidth: '100%',
  },
  collectionSticker: {
    fontSize: 32,
  },
  buttonWrap: {
    marginTop: 8,
  },
  parentGateCorner: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 10,
  },
});
