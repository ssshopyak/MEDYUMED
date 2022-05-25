import messaging from '@react-native-firebase/messaging';
import { AppThunk } from '../../lib/types';

export const initNotifications = (): AppThunk => async () => {
  try {
    await messaging().requestPermission();
  } catch (ignore) {
  }
  messaging().subscribeToTopic('main');
};

export const getFirebaseToken = (): AppThunk<Promise<string>> => async () => {
  const token = await messaging().getToken();
  return token;
};
