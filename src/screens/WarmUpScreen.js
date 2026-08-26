import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import SessionProgress from '../components/SessionProgress';
import SpeakerButton from '../components/SpeakerButton';
import WarmUpDemo from '../components/WarmUpDemo';
import { WARM_UP } from '../constants/drills';
import { colors, sizes } from '../constants/theme';
import { useCoachingSpeech } from '../hooks/useCoachingSpeech';

export default function WarmUpScreen({ currentStepIndex, sessionSteps, onContinue }) {
  const replayCoaching = useCoachingSpeech(WARM_UP.instruction);

  return (
    <View style={styles.container} testID="warm-up-screen">
      <SessionProgress currentStepIndex={currentStepIndex} steps={sessionSteps} />

      <SpeakerButton
        testID="replay-coaching-button"
        onPress={replayCoaching}
        accessibilityLabel={`Hear again: ${WARM_UP.instruction}`}
      />

      <Text style={styles.icon} accessibilityLabel={WARM_UP.name}>
        {WARM_UP.icon}
      </Text>
      <Text style={styles.title}>{WARM_UP.name}</Text>

      <WarmUpDemo />

      <Text style={styles.instruction}>{WARM_UP.instruction}</Text>

      <View style={styles.buttonWrap}>
        <BigButton
          testID="continue-warm-up-button"
          icon="➡️"
          label="Let's go!"
          accessibilityLabel="Continue to drills"
          onPress={onContinue}
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
    paddingVertical: 32,
    gap: 20,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  instruction: {
    fontSize: sizes.body,
    color: colors.textLight,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 28,
  },
  buttonWrap: {
    marginTop: 8,
  },
});
