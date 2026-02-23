import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import { navigate } from './notificationNavigation';
import {
  AppStates,
  isPlatformiOS,
  NotificationTypes,
  ScreenNames,
} from '../../constants/AppConstants';

const useNotificationService = () => {
  console.log("call useNotificationService");
  
  const showNotificationWithAlert = (remoteMessage: any) => {
    console.log('Show Notification', remoteMessage);

    let notification = isPlatformiOS
      ? remoteMessage.data
      : JSON.parse(remoteMessage.data.data);

    if (notification) {
      const { title, body } = notification;
      console.log('title', title);
      console.log('body', body);

      notifee.displayNotification({
        title: title,
        body: body,

        data: notification,
        android: {
          smallIcon: 'ic_launcher_foreground',
          channelId: 'default',
          // sound: "hollow",
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.DEFAULT,
        },
      });
    }
  };

  const configureLocalNotification = () => {
    notifee.createChannel({
      id: 'default',
      name: 'Default channel',
      sound: 'hollow',
      importance: AndroidImportance.DEFAULT,
    });
  };

  const handleForegroundNotification = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      showNotificationWithAlert(remoteMessage);
      // incCountOfNotificationBadge();
    });

    notifee.onForegroundEvent(event => {
      console.log(
        JSON.stringify(event),
        '🚀 ~ handleForegroundNotification ~ event:',
      );
      const { type, detail }: any = event;
      if (type === EventType.PRESS) {
        onNotificationPress(
          isPlatformiOS ? detail.notification : detail.notification.data,
          AppStates.FOREGROUND,
        );
      }
    });
  };

  const handleBackgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background notification received:', remoteMessage);
      showNotificationWithAlert(remoteMessage);
      // incCountOfNotificationBadge();
    });

    notifee.onBackgroundEvent(async event => {
      console.log(
        JSON.stringify(event),
        '🚀 ~ handleBackgroundNotification ~ event:',
      );
      const { type, detail }: any = event;
      if (type === EventType.PRESS) {
        onNotificationPress(
          isPlatformiOS ? detail.notification : detail.notification.data,
          AppStates.BACKGROUND,
        );
      }
    });
  };

  const handleNotificationOpenedApp = () => {
    console.log('app kill state press');

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          '🚀 ~ handleNotificationOpenedApp ~ remoteMessage:',
          remoteMessage,
        );
        if (remoteMessage) {
          console.log(
            '🚀🚀🚀 App opened from quit state with notification: 🚀🚀🚀',
            remoteMessage,
          );
          onNotificationPress(remoteMessage.data, AppStates.KILL);
        }
      })
      .catch(err =>
        console.log('FCM error in getting initial notification', err),
      );

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        '🚀🚀🚀 App opened from background state with notification: 🚀🚀🚀',
        remoteMessage,
      );
      onNotificationPress(
        isPlatformiOS ? remoteMessage : remoteMessage.data,
        AppStates.BACKGROUND,
      );
      // incCountOfNotificationBadge();
    });
  };

  const onNotificationPress = (notification: any, appState: any) => {
    console.log('notification press', notification);
    console.log('typeof notification before', typeof notification);

    if (!notification) return;
    console.log('typeof notification', typeof notification);

    if (typeof notification === 'string') {
      notification = JSON.parse(notification);
    }

    console.log(
      '🚀 ~ onNotificationPress ~ notification:',
      notification,
      appState,
      typeof notification,
    );

    var notificationType = '';

    if (appState === AppStates.BACKGROUND) {
      notificationType = isPlatformiOS
        ? notification?.data?.notification_tag
        : notification?.notification_tag;
    } else if (appState === AppStates.FOREGROUND) {
      notificationType = isPlatformiOS
        ? notification.tag || notification?.data?.notification_tag
        : notification.notification_tag;
    } else if (appState === AppStates.KILL) {
      notificationType = notification?.notification_tag;
    }

    switch (notificationType) {
      case NotificationTypes.ADMIN_NOTIFICATIONS:
        navigate(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;

      default:
        console.log('Unhandled notification type:', notificationType);
        break;
    }
  };

  useEffect(() => {
    configureLocalNotification();
    handleForegroundNotification();
    handleBackgroundNotification();
    handleNotificationOpenedApp();

    return () => {
      // Clean up listeners when the component unmounts
      messaging().onMessage(() => null);
      messaging().setBackgroundMessageHandler(() => null);
      messaging().onNotificationOpenedApp(() => null);
    };
  }, []);
};

export default useNotificationService;
