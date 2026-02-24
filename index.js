/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import { isPlatformiOS } from './src/constants/AppConstants';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   let notification = isPlatformiOS
//     ? remoteMessage.notification
//     : remoteMessage.data;

//   if (notification) {
//     const { title, body } = notification;
//     console.log('title', title);
//     console.log('body', body);

//     notifee.displayNotification({
//       title: title,
//       body: body,
//       data: notification,
//       android: {
//         smallIcon: 'ic_launcher_foreground',
//         channelId: 'default',
//         pressAction: {
//           id: 'default',
//         },
//         importance: AndroidImportance.DEFAULT,
//       },
//     });
//   }
// });

AppRegistry.registerComponent(appName, () => App);
