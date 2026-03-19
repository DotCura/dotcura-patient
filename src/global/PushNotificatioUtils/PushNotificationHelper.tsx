// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import { PermissionsAndroid, Platform } from 'react-native';
// import { MmkvManager } from '../../constants/utils/MmkvManager';

// export async function requestUserForNotificationPermission() {
//   console.log('in request user for notification');

//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     // Explicitly request notification permission for Android 13+
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );

//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // Permission granted, proceed with getting FCM token
//       await getFCMToken();
//     } else {
//       console.log('Notification permission denied');
//     }
//   } else {
//     // For older Android versions or iOS
//     console.log('enabled out');

//     console.log('Checking iOS notification permission...');

//     // Ensure device is registered for remote messages
//     if (!messaging().isDeviceRegisteredForRemoteMessages) {
//       console.log('Registering device for remote messages...');
//       await messaging().registerDeviceForRemoteMessages();
//     }

//     // Request permission from the user
//     const authStatus = await messaging().requestPermission();
//     console.log('Authorization status received:', authStatus);

//     // Check if permission is granted
//     let enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     console.log('Initial permission enabled:', enabled);

//     // **If first-time permission is still false, retry after a short delay**
//     if (!enabled) {
//       console.log('Checking permission again after 1 second...');
//       await new Promise((resolve:any) => setTimeout(resolve, 1000)); // Wait 1 second

//       const currentPermission = await messaging().hasPermission();
//       enabled =
//         currentPermission === messaging.AuthorizationStatus.AUTHORIZED ||
//         currentPermission === messaging.AuthorizationStatus.PROVISIONAL;

//       console.log('Final permission enabled after retry:', enabled);
//     }

//     // **Store permission status to prevent future inconsistencies**
//     await AsyncStorage.setItem(
//       MmkvManager.Keys.notificationPermission,
//       enabled ? 'true' : 'false',
//     );

//     if (enabled) {
//       console.log('Permission granted, proceeding to get FCM token...');
//       await getFCMToken();
//     } else {
//       console.log('Permission not enabled. Auth status:', authStatus);
//     }
//   }
// }

// export const getFCMToken = async () => {
//   try {
//     console.log('try ');

//     const token = await AsyncStorage.getItem(MmkvManager.Keys.fcmToken);
//     console.log('🚀 ~ getFCMToken ~ token:', token,!token);
//     if (!token) {
//       const fcmToken = await messaging().getToken();
//       console.log("=========== fcmToken:", fcmToken);
      
//       if (fcmToken) {
//         console.log('FCM TOKEN ========>', fcmToken);
//         await AsyncStorage.setItem(MmkvManager.Keys.fcmToken, fcmToken);
//         return fcmToken;
//       }
//     } else {
//       return token;
//     }
//   } catch (error) {
//     console.log('Error in getting FCM Token', error);
//     return null; // Return null or handle the error as needed
//   }
// };


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
      await new Promise((resolve:any) => setTimeout(resolve, 1000));

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
        await MmkvManager.setData(
          MmkvManager.Keys.fcmToken,
          fcmToken,
        );

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