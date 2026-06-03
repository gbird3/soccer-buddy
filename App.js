import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚽</Text>
      <Text style={styles.title}>Soccer Buddy</Text>
      <Text style={styles.subtitle}>Let's practice!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a7d2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 22,
    color: '#d9f5e1',
    marginTop: 4,
  },
});
