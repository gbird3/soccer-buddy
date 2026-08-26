import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import CelebrationConfetti from '../components/CelebrationConfetti';
import SpeakerButton from '../components/SpeakerButton';
import { useNativeAnimation } from '../animationDriver';
import { COACHING_LINES } from '../constants/drills';
import { getLatestSticker } from '../constants/stickers';
import { colors, sizes } from '../constants/theme';
import { useCoachingSpeech } from '../hooks/useCoachingSpeech';

export default function CelebrationScreen({ onGoHome, streak = 0, stickerIds = [] }) {
  const replayCoaching = useCoachingSpeech(COACHING_LINES.CELEBRATION);
  const sticker = getLatestSticker(stickerIds);
  const stickerScale = useRef(new Animated.Value(0.2)).current;
  const stickerRotate = useRef(new Animated.Value(-0.12)).current;

  useEffect(() => {
    const popAnimation = Animated.sequence([
      Animated.delay(120),
      Animated.parallel([
        Animated.spring(stickerScale, {
          toValue: 1.12,
          friction: 4,
          tension: 160,
          useNativeDriver: useNativeAnimation,
        }),
        Animated.spring(stickerRotate, {
          toValue: 0.06,
          friction: 5,
          tension: 120,
          useNativeDriver: useNativeAnimation,
        }),
      ]),
      Animated.parallel([
        Animated.spring(stickerScale, {
          toValue: 1,
          friction: 5,
          tension: 90,
          useNativeDriver: useNativeAnimation,
        }),
        Animated.spring(stickerRotate, {
          toValue: 0,
          friction: 6,
          tension: 80,
          useNativeDriver: useNativeAnimation,
        }),
      ]),
    ]);

    popAnimation.start();
    return () => popAnimation.stop();
  }, [stickerScale, stickerRotate]);

  const stickerSpin = stickerRotate.interpolate({
    inputRange: [-0.12, 0, 0.06],
    outputRange: ['-12deg', '0deg', '6deg'],
  });

  return (
    <View style={styles.container} testID="celebration-screen">
      <CelebrationConfetti />

      <SpeakerButton
        testID="replay-coaching-button"
        onPress={replayCoaching}
        accessibilityLabel="Hear again: Great job! You earned a sticker"
      />

      <Text style={styles.confetti} accessibilityElementsHidden importantForAccessibility="no">
        🎉✨🎊
      </Text>
      <Text style={styles.cheer}>Great job!</Text>

      <Animated.View
        style={[
          styles.stickerCard,
          {
            transform: [{ scale: stickerScale }, { rotate: stickerSpin }],
          },
        ]}
        testID="sticker-pop-animation"
      >
        <View
          style={styles.stickerCardInner}
          testID="sticker-reward"
          accessibilityLabel={`You earned a ${sticker.label}`}
        >
          <Text style={styles.sticker}>{sticker.emoji}</Text>
          <Text style={styles.stickerLabel}>{sticker.label}</Text>
        </View>
      </Animated.View>

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
    zIndex: 2,
  },
  stickerCardInner: {
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
