import { StyleSheet, View } from 'react-native';
import { STICKER_POP_KEYFRAMES } from '../celebrationEffects';

export default function CelebrationStickerPop({ children, style, testID }) {
  return (
    <View
      style={[styles.pop, style, styles.popAnimation]}
      testID={testID}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  pop: {
    zIndex: 2,
  },
  popAnimation: {
    animationDuration: '720ms',
    animationFillMode: 'both',
    animationKeyframes: STICKER_POP_KEYFRAMES,
  },
});
