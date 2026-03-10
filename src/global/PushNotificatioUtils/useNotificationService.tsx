import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

import {
  AppStates,
  isPlatformiOS,
  NotificationTypes,
  ScreenNames,
} from '../../constants/AppConstants';
import { navigationRef } from '../../constants/utils/navigationRef';
import { setOpenedFromNotification } from '../../constants/GConstant';

const useNotificationService = () => {
  console.log('call useNotificationService');

  const showNotificationWithAlert = (remoteMessage: any) => {
    console.log('Show Notification', remoteMessage);

    let notification = isPlatformiOS ? remoteMessage.data : remoteMessage.data;

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
          setOpenedFromNotification(true);
          // onNotificationPress(remoteMessage.data, AppStates.KILL);
          onNotificationPress(remoteMessage, AppStates.KILL);
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
      setOpenedFromNotification(true);
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
      notificationType = notification?.data?.notification_tag;
    }

    console.log('notificationType', notificationType);

    const navigateWhenReady = (routeName: string, params?: any) => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(routeName, params);
      } else {
        // If not ready, wait 100ms and check again
        const interval = setInterval(() => {
          if (navigationRef.isReady()) {
            navigationRef.navigate(routeName, params);
            clearInterval(interval);
          }
        }, 100);

        // Safety timeout: stop trying after 5 seconds so you don't leak memory
        setTimeout(() => clearInterval(interval), 5000);
      }
    };

    switch (notificationType) {
      case NotificationTypes.ADMIN_NOTIFICATIONS:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;
      case NotificationTypes.BOOKING_CANCLE:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;
      case NotificationTypes.BOOKING_ACCEPT:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;
      case NotificationTypes.BOOKING_STARTED:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;
      case NotificationTypes.PAYMNET_CAPTURED:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;
      case NotificationTypes.SAMPLE_DELIVERED:
        navigateWhenReady(ScreenNames.NOTIFICATIONLISTCONTAINER);
        break;

      case NotificationTypes.REPORT_NOTIFICATIONS: {
        const currentRoute = navigationRef.getCurrentRoute();

        if (currentRoute?.name !== ScreenNames.RESULTOPENUPCONTAINER) {
          navigateWhenReady(ScreenNames.RESULTOPENUPCONTAINER, {
            booking_id: notification?.data?.action_id,
          });
        }

        break;
      }
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
