import { TransitionPresets } from '@react-navigation/stack';

export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};
