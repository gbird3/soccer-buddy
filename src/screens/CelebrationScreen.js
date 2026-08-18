import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import SpeakerButton from '../components/SpeakerButton';
import { SESSION_REWARD, COACHING_LINES } from '../constants/drills';
import { colors, sizes } from '../constants/theme';
import { useCoachingSpeech } from '../hooks/useCoachingSpeech';

export default function CelebrationScreen({ onGoHome, streak = 0 }) {
  const replayCoaching = useCoachingSpeech(COACHING_LINES.CELEBRATION);

  return (
    <View style={styles.container} testID="celebration-screen">
      <SpeakerButton
        testID="replay-coaching-button"
        onPress={replayCoaching}
        accessibilityLabel="Hear again: Great job! You earned a sticker"
      />

      <Text style={styles.confetti} accessibilityElementsHidden importantForAccessibility="no">
        🎉✨🎊
      </Text>
      <Text style={styles.cheer}>Great job!</Text>

      <View
        style={styles.stickerCard}
        testID="sticker-reward"
        accessibilityLabel={`You earned a ${SESSION_REWARD.stickerLabel}`}
      >
        <Text style={styles.sticker}>{SESSION_REWARD.sticker}</Text>
        <Text style={styles.stickerLabel}>{SESSION_REWARD.stickerLabel}</Text>
      </View>

      <View style={styles.streakRow} testID="celebration-streak" accessibilityLabel={`${streak} day streak`}>
        <Text style={styles.streakIcon} accessibilityElementsHidden importantForAccessibility="no">
          🔥
        </Text>
        <Text style={styles.streakNumber}>{streak}</Text>
      </View>

      <View style={styles.buttonWrap}>
        <BigButton
          testID="go-home-button"
          icon="🏠"
          label="Done"
          variant="secondary"
          accessibilityLabel="Go back home"
          onPress={onGoHome}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  confetti: {
    fontSize: 48,
  },
  cheer: {
    fontSize: 44,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  stickerCard: {
    backgroundColor: colors.white,
    borderRadius: 28,
    borderWidth: 4,
    borderColor: colors.yellow,
    paddingVertical: 28,
    paddingHorizontal: 40,
    alignItems: 'center',
    minWidth: 220,
    shadowColor: colors.fieldGreenDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sticker: {
    fontSize: 80,
  },
  stickerLabel: {
    marginTop: 8,
    fontSize: sizes.subtitle,
    fontWeight: '700',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakIcon: {
    fontSize: 40,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.white,
    marginLeft: 8,
    minWidth: 36,
    textAlign: 'center',
  },
  buttonWrap: {
    marginTop: 12,
  },
});
