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

      <View style={styles.statsBar} testID="home-stats-bar">
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
      </View>

      <View style={styles.playZone}>
        <View style={styles.mascot} testID="home-mascot" accessibilityLabel="Soccer Buddy mascot with ball">
          <Text style={styles.mascotKid} accessibilityElementsHidden importantForAccessibility="no">
            🧒
          </Text>
          <View style={styles.ballBadge}>
            <Text style={styles.mascotBall} accessibilityElementsHidden importantForAccessibility="no">
              ⚽
            </Text>
          </View>
        </View>

        <View style={styles.coachingRow}>
          <Text style={styles.subtitle}>Let's practice!</Text>
          <SpeakerButton
            testID="replay-coaching-button"
            onPress={replayCoaching}
            accessibilityLabel="Hear again: Let's practice"
          />
        </View>
      </View>

      <View style={styles.startZone} testID="home-start-zone">
        <BigButton
          testID="start-practice-button"
          icon="▶️"
          label="Start!"
          accessibilityLabel="Start today's practice"
          onPress={onStartPractice}
          hero
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fieldGreen,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  parentGateCorner: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 10,
  },
  statsBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.72,
    paddingHorizontal: 8,
    minHeight: 36,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  streakIcon: {
    fontSize: 20,
  },
  streakNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.yellow,
    marginLeft: 4,
    minWidth: 20,
    textAlign: 'center',
  },
  practicedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 249, 230, 0.85)',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.6)',
  },
  practicedSticker: {
    fontSize: 18,
  },
  practicedCheck: {
    fontSize: 14,
    marginLeft: 4,
  },
  stickerCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 249, 230, 0.85)',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.6)',
    gap: 4,
    maxWidth: '100%',
  },
  collectionSticker: {
    fontSize: 16,
  },
  playZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mascot: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mascotKid: {
    fontSize: sizes.emojiMascot,
    lineHeight: sizes.emojiMascot + 8,
  },
  ballBadge: {
    position: 'absolute',
    right: -28,
    bottom: 4,
    backgroundColor: colors.cream,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.yellow,
    padding: 6,
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  mascotBall: {
    fontSize: 56,
    lineHeight: 60,
  },
  coachingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  subtitle: {
    fontSize: sizes.subtitle,
    fontWeight: '700',
    color: colors.white,
  },
  startZone: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
});
