import { StyleSheet, Text, View } from 'react-native';
import BigButton from '../components/BigButton';
import { colors, sizes } from '../constants/theme';

export default function HomeScreen({ onStartPractice }) {
  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.emoji} accessibilityLabel="Soccer ball">
        ⚽
      </Text>
      <Text style={styles.title}>Soccer Buddy</Text>
      <Text style={styles.subtitle}>Let's practice!</Text>

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
    marginBottom: 40,
  },
  buttonWrap: {
    marginTop: 8,
  },
});
