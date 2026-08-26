import { Platform } from 'react-native';

/** RN Web is more reliable with the JS animation driver for celebration effects. */
export const useNativeAnimation = Platform.OS !== 'web';
