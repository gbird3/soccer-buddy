import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import { colors, sizes } from '../constants/theme';
import { buildWeekView } from '../streak';

export default function ParentScreen({
  streak = 0,
  practiceDates = [],
  todayKey,
  soundEnabled = true,
  onToggleSound,
  onGoHome,
}) {
  const weekDays = buildWeekView(practiceDates, todayKey);
  const hasPracticed = practiceDates.length > 0;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      testID="parent-screen"
    >
      <Text style={styles.title}>Parent Area</Text>

      {!hasPracticed ? (
        <View
          style={styles.firstOpenCard}
          testID="parent-first-open-card"
          accessibilityLabel="Hand the phone to your kid, tap Start."
        >
          <Text style={styles.firstOpenHeadline}>
            Hand the phone to your kid, tap Start.
          </Text>
          <Text style={styles.firstOpenSupporting}>
            The big Start button is on the home screen. That's all they need.
          </Text>
          <View style={styles.firstOpenIcons} accessibilityElementsHidden importantForAccessibility="no">
            <Text style={styles.firstOpenEmoji}>📱</Text>
            <Text style={styles.firstOpenEmoji}>👧</Text>
            <Text style={styles.firstOpenEmoji}>▶️</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>This week</Text>
        <View style={styles.weekRow} testID="parent-week-view">
          {weekDays.map((day) => (
            <View key={day.dateKey} style={styles.dayCell} testID={`week-day-${day.dateKey}`}>
              <Text style={styles.dayLabel}>{day.label}</Text>
              <View
                style={[
                  styles.dayMark,
                  day.practiced && styles.dayMarkPracticed,
                  day.isToday && styles.dayMarkToday,
                ]}
                accessibilityLabel={
                  day.practiced
                    ? `${day.label}, practiced`
                    : `${day.label}, no practice yet`
                }
              >
                {day.practiced ? (
                  <Text style={styles.checkmark} testID={`week-day-practiced-${day.dateKey}`}>
                    ✓
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Practice streak</Text>
        <View style={styles.streakRow} testID="parent-streak-display">
          <Text style={styles.streakIcon} accessibilityElementsHidden importantForAccessibility="no">
            🔥
          </Text>
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Coaching audio</Text>
          <Switch
            testID="mute-coaching-switch"
            accessibilityLabel="Coaching audio"
            accessibilityRole="switch"
            value={soundEnabled}
            onValueChange={onToggleSound}
            trackColor={{ false: '#767577', true: colors.yellow }}
            thumbColor={soundEnabled ? colors.white : '#f4f3f4'}
          />
        </View>
        <Text style={styles.toggleHint}>
          {soundEnabled ? 'Audio coaching is on' : 'Audio coaching is muted'}
        </Text>
      </View>

      <View style={styles.buttonWrap}>
        <BigButton
          testID="parent-done-button"
          icon="🏠"
          label="Done"
          variant="secondary"
          accessibilityLabel="Return to home"
          onPress={onGoHome}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.fieldGreenDark,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
  },
  firstOpenCard: {
    width: '100%',
    backgroundColor: colors.cream,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.yellow,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  firstOpenHeadline: {
    fontSize: sizes.subtitle,
    fontWeight: '800',
    color: colors.fieldGreenDark,
    textAlign: 'center',
  },
  firstOpenSupporting: {
    fontSize: sizes.body,
    fontWeight: '600',
    color: colors.fieldGreen,
    textAlign: 'center',
  },
  firstOpenIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  firstOpenEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: '800',
    color: colors.white,
  },
  section: {
    alignItems: 'center',
    gap: 8,
  },
  sectionLabel: {
    fontSize: sizes.body,
    color: colors.textLight,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  dayCell: {
    alignItems: 'center',
    gap: 6,
    minWidth: 36,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  dayMark: {
    width: sizes.minTapTarget / 2,
    height: sizes.minTapTarget / 2,
    borderRadius: sizes.minTapTarget / 4,
    borderWidth: 2,
    borderColor: colors.textLight,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayMarkPracticed: {
    backgroundColor: colors.cream,
    borderColor: colors.yellow,
  },
  dayMarkToday: {
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.fieldGreen,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toggleLabel: {
    fontSize: sizes.subtitle,
    fontWeight: '700',
    color: colors.white,
  },
  toggleHint: {
    fontSize: sizes.body,
    color: colors.textLight,
  },
  buttonWrap: {
    marginTop: 16,
  },
});
