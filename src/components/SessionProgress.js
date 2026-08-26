import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';
import { getStepAccessibilityLabel } from '../sessionProgress';

export default function SessionProgress({ currentStepIndex, steps }) {
  return (
    <View
      style={styles.container}
      testID="session-progress"
      accessibilityRole="progressbar"
      accessibilityLabel={getStepAccessibilityLabel(currentStepIndex, steps)}
      accessibilityValue={{
        min: 1,
        max: steps.length,
        now: currentStepIndex + 1,
        text: steps[currentStepIndex]?.name,
      }}
    >
      {steps.map((step, index) => {
        const isComplete = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <View
            key={step.id}
            testID={`session-progress-step-${index}`}
            style={[
              styles.step,
              isComplete && styles.stepComplete,
              isCurrent && styles.stepCurrent,
              !isComplete && !isCurrent && styles.stepUpcoming,
            ]}
          >
            <Text
              style={[
                styles.icon,
                isCurrent && styles.iconCurrent,
                !isComplete && !isCurrent && styles.iconUpcoming,
              ]}
            >
              {step.icon}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingHorizontal: 8,
  },
  step: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.textLight,
    backgroundColor: 'transparent',
  },
  stepComplete: {
    backgroundColor: colors.yellow,
    borderColor: colors.cream,
  },
  stepCurrent: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cream,
    borderColor: colors.yellow,
    borderWidth: 4,
    shadowColor: colors.buttonShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 4,
  },
  stepUpcoming: {
    opacity: 0.55,
  },
  icon: {
    fontSize: 22,
  },
  iconCurrent: {
    fontSize: 28,
  },
  iconUpcoming: {
    fontSize: 20,
  },
});
