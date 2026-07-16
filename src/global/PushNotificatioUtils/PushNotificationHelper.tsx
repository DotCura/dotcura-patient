import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import { MmkvManager } from '../../constants/utils/MmkvManager';

export async function requestUserForNotificationPermission() {
  console.log('in request user for notification');

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    // Android 13+
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await getFCMToken();
    } else {
      console.log('Notification permission denied');
      await MmkvManager.setData(
        MmkvManager.Keys.notificationPermission,
        'false',
      );
    }
  } else {
    console.log('Checking iOS notification permission...');

    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      console.log('Registering device...');
      await messaging().registerDeviceForRemoteMessages();
    }

    const authStatus = await messaging().requestPermission();
    console.log('Authorization status:', authStatus);

    let enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      await new Promise((resolve: any) => setTimeout(resolve, 1000));

      const currentPermission = await messaging().hasPermission();
      enabled =
        currentPermission === messaging.AuthorizationStatus.AUTHORIZED ||
        currentPermission === messaging.AuthorizationStatus.PROVISIONAL;
    }

    // ✅ Store using MMKV
    await MmkvManager.setData(
      MmkvManager.Keys.notificationPermission,
      enabled ? 'true' : 'false',
    );

    if (enabled) {
      await getFCMToken();
    } else {
      console.log('Permission not enabled');
    }
  }
}

export const getFCMToken = async () => {
  try {
    console.log('Getting FCM token...');

    // ✅ Get from MMKV (sync)
    let token: string | null = null;

    await MmkvManager.getData(MmkvManager.Keys.fcmToken, value => {
      token = value as string | null;
    });

    console.log('Stored Token:', token);

    if (!token) {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        console.log('New FCM TOKEN ========>', fcmToken);

        // ✅ Store in MMKV
        await MmkvManager.setData(MmkvManager.Keys.fcmToken, fcmToken);

        return fcmToken;
      }
    } else {
      return token;
    }
  } catch (error) {
    console.log('Error getting FCM Token', error);
    return null;
  }
};
