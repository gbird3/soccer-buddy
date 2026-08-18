import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import { TOE_TAPS_DRILL } from '../constants/drills';
import { colors, sizes } from '../constants/theme';

export default function CelebrationScreen({ onGoHome }) {
  return (
    <View style={styles.container} testID="celebration-screen">
      <Text style={styles.confetti} accessibilityElementsHidden importantForAccessibility="no">
        🎉✨🎊
      </Text>
      <Text style={styles.cheer}>Great job!</Text>

      <View
        style={styles.stickerCard}
        testID="sticker-reward"
        accessibilityLabel={`You earned a ${TOE_TAPS_DRILL.stickerLabel}`}
      >
        <Text style={styles.sticker}>{TOE_TAPS_DRILL.sticker}</Text>
        <Text style={styles.stickerLabel}>{TOE_TAPS_DRILL.stickerLabel}</Text>
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
  buttonWrap: {
    marginTop: 12,
  },
});
