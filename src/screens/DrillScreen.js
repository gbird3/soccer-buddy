import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import ToeTapDemo from '../components/ToeTapDemo';
import { TOE_TAPS_DRILL } from '../constants/drills';
import { colors, sizes } from '../constants/theme';

export default function DrillScreen({ onCompleteDrill }) {
  return (
    <View style={styles.container} testID="drill-screen">
      <Text style={styles.drillIcon} accessibilityLabel={TOE_TAPS_DRILL.name}>
        {TOE_TAPS_DRILL.icon}
      </Text>
      <Text style={styles.drillName}>{TOE_TAPS_DRILL.name}</Text>

      <ToeTapDemo />

      <Text style={styles.instruction}>{TOE_TAPS_DRILL.instruction}</Text>

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
