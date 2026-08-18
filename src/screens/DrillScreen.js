import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import KickTargetDemo from '../components/KickTargetDemo';
import SpeakerButton from '../components/SpeakerButton';
import ToeTapDemo from '../components/ToeTapDemo';
import { colors, sizes } from '../constants/theme';
import { useCoachingSpeech } from '../hooks/useCoachingSpeech';

const DEMO_COMPONENTS = {
  'toe-taps': ToeTapDemo,
  'kick-target': KickTargetDemo,
};

export default function DrillScreen({ drill, onCompleteDrill }) {
  const DemoComponent = DEMO_COMPONENTS[drill.demo];
  const replayCoaching = useCoachingSpeech(drill.instruction);

  return (
    <View style={styles.container} testID="drill-screen">
      <SpeakerButton
        testID="replay-coaching-button"
        onPress={replayCoaching}
        accessibilityLabel={`Hear again: ${drill.instruction}`}
      />

      <Text style={styles.drillIcon} accessibilityLabel={drill.name}>
        {drill.icon}
      </Text>
      <Text style={styles.drillName}>{drill.name}</Text>

      <DemoComponent />

      <Text style={styles.instruction}>{drill.instruction}</Text>

      <View style={styles.buttonWrap}>
        <BigButton
          testID="complete-drill-button"
          icon="✅"
          label="I did it!"
          accessibilityLabel="I did the drill"
          onPress={onCompleteDrill}
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
  drillIcon: {
    fontSize: 56,
  },
  drillName: {
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
