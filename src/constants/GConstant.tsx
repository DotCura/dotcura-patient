import { Alert, I18nManager, Platform, StatusBar } from 'react-native';
import { getTranslation } from '../localization/i18n/i18n.config';
import emojiRegex from 'emoji-regex';
import { showMessage } from 'react-native-flash-message';
import { PlatformVersion } from './utils/Platform';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Colors } from './Colors';
import { fontsfamily } from './FontFamily';
import { fontSize } from './FontSizes';
import { getHeight, getWidth } from './utils/Dimensions';
import { ScreenNames } from './AppConstants';
import { useEffect, useState } from 'react';

export const appName = getTranslation('appname') || 'DotCura';

// RTL Support
export const isRTLSupport = I18nManager.isRTL;

export const currency = '€';

// export const goToTabScreen = (
//   navigation:any,
//   tabScreen:any,
//   screenParams = {}
// ) => {
//   navigation.navigate('TransitionFlow', {
//     screen: ScreenNames.BOTTOMTABNAVIGATION,
//     params: {
//       screen: tabScreen,
//       params: screenParams,   // ✅ PASS PARAMS HERE
//     },
//   });
// };
export const goToTabScreen = (
  navigation:any,
  tabScreen:any,
  screenParams = {}
) => {
  const state = navigation.getState();

  const isAlreadyInTransitionFlow =
    state?.routes?.some((r:any) => r.name === 'TransitionFlow');

  if (isAlreadyInTransitionFlow) {
    // ✅ Already inside TransitionFlow → navigate normally
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: tabScreen,
      params: screenParams,
    });
  } else {
    // ✅ Coming from NativeStack → enter TransitionFlow
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.BOTTOMTABNAVIGATION,
      params: {
        screen: tabScreen,
        params: screenParams,
      },
    });
  }
};

export const useDelayedBg = (visible: boolean, delay = 500) => {
  const [bgColor, setBgColor] = useState('transparent');
 
  useEffect(() => {
    let timer: any;
 
    if (visible) {
      setBgColor('transparent');
      timer = setTimeout(() => {
        setBgColor('#00000060');
      }, delay);
    } else {
      setBgColor('transparent');
    }
 
    return () => clearTimeout(timer);
  }, [visible, delay]);
 
  return bgColor;
};


// Image Transform
export const imageTransform = isRTLSupport
  ? [{ rotate: '180deg' }]
  : [{ rotate: '0deg' }];

// Alert
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

// Buttons
export const activityOpacity = 0.8;
export const activityOpacitybtn = 1;
export const hitSlop = 10;
export const currencySymbol = 'KWD';

let flashMessageRef;

export function setFlashMessageRef(ref: any) {
  flashMessageRef = ref;
}

// Flash Messages
export const flashMessageSucess = (message: string | null) => {
  showMessage({
    message: message || '',
    type: 'success',
    backgroundColor: Colors.green17,
    color: Colors.white,
    duration: 3000,
    icon: 'success',
    iconProps: { tintColor: Colors.white },
    style: {
      marginTop: StatusBar.currentHeight,
      zIndex: 1,
    },
    titleStyle: {
      fontFamily: fontsfamily.semiBold,
      fontSize: fontSize.size16,
      lineHeight: getWidth(20),
      textAlign: 'left',
    },
  });
};

export const flashMessageWarning = (message: string | null) => {
  showMessage({
    message: message || '',
    backgroundColor: Colors.redCA,
    color: Colors.white,
    duration: 3000,
    icon: 'none',
    style: {
      marginTop: StatusBar.currentHeight,
      zIndex: 1,
    },
    titleStyle: {
      fontFamily: fontsfamily.semiBold,
      fontSize: fontSize.size16,
      lineHeight: getWidth(20),
      textAlign: 'left',
    },
  });
};

export const flashMessageBottomSucess = (message: string | null) => {
  showMessage({
    message: message || '',
    position:'bottom',
    backgroundColor: Colors.blue0019,
    color: Colors.white,
    duration: 1000,
    icon: 'none',
    style: {
      marginTop: StatusBar.currentHeight,
      zIndex: 1,
      bottom:20,
      alignSelf:'center',
      borderRadius:999,
      position:'absolute'
    },
    titleStyle: {
      fontFamily: fontsfamily.gmedium,
      fontSize: fontSize.size16,
      lineHeight: getWidth(20),
      textAlign: 'center',
    },
  });
};

export const flashMessageWarningBottom = (message: string | null) => {
  showMessage({
    message: message || '',
    backgroundColor: Colors.redCA,
    color: Colors.white,
    duration: 3000,
    icon: 'none',
    position:'bottom',
    style: {
      marginTop: StatusBar.currentHeight,
      zIndex: 1,
      bottom:20,
      alignSelf:'center',
      borderRadius:999,
      position:'absolute'
    },
    titleStyle: {
      fontFamily: fontsfamily.gmedium,
      fontSize: fontSize.size16,
      lineHeight: getWidth(20),
      textAlign: 'center',
    },
  });
};

// Camera-Gallery Permissions
export const messages = {
  cameraPermission: `${getTranslation(
    'allowTitle',
  )} ${appName} ${getTranslation('allowSubtitleForCamera')}`,
  galleryPermission: `${getTranslation(
    'allowTitle',
  )} ${appName} ${getTranslation('allowSubtitleForGallery')}`,
  documentPermission: `${getTranslation(
    'allowTitle',
  )} ${appName} ${getTranslation('allowSubtitleForDocuments')}`,
};
export const cameraPermission = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});
export const galleryPermission = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android:
    Number(Platform.Version) > 32
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
});
export const checkPermission = (permission: any, message: string) => {
  return new Promise(callback => {
    if (PlatformVersion.isIOS) {
      checkMultiple([permission]).then(status => {
        if (
          status[permission] === RESULTS.DENIED ||
          status[permission] === RESULTS.UNAVAILABLE
        ) {
          requestMultiple([permission]).then(status => {
            const data: any = Object.values(status);
            callback(data[0] === 'granted');

            if (data[0] === 'blocked' && Platform.OS === 'android') {
              Alert.alert(
                appName,
                message,
                [
                  {
                    text: getTranslation('cancelTitle') || 'Cancel',
                    onPress: () => __DEV__ && console.log('Cancel Pressed'),
                    style: 'destructive',
                  },
                  {
                    text: getTranslation('settingsTitle') || 'Settings',
                    onPress: () => openSettings(),
                  },
                ],
                { cancelable: false },
              );
            }
          });
        } else if (status[permission] === RESULTS.BLOCKED) {
          Alert.alert(
            appName,
            message,
            [
              {
                text: getTranslation('cancelTitle') || 'Cancel',
                onPress: () => __DEV__ && console.log('Cancel Pressed'),
                style: 'destructive',
              },
              {
                text: getTranslation('settingsTitle') || 'Settings',
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false },
          );
          callback(false);
        } else {
          callback(true);
        }
      });
    } else {
      callback(true);
    }
  });
};

// Intenert Connection
export const getConnection = (
  callback: (isConnected: boolean | null) => void,
) => {
  NetInfo.fetch().then((state: NetInfoState) => {
    callback(state.isConnected);
  });
};

// Loader
interface LoaderRef {
  toggleLoader: (show: boolean) => void;
}
export let loaderRef: LoaderRef | null = null;
export const setLoaderRef = (ref: LoaderRef | null) => {
  loaderRef = ref;
};
export const toggleLoader = (showLoader: boolean) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader);
  }
};

// Restrict Emojis in TextInput
export const containsEmoji = (str: string): boolean => {
  const regex = emojiRegex();
  return regex.test(str);
};

// Short Name
export const getInitialShortName = (name: string): string => {
  const words = name.trim().split(' ');
  const firstInitial = words[0]?.[0] || '';
  const secondInitial = words[1]?.[0] || '';
  return (firstInitial + secondInitial).toUpperCase();
};

export const addDashedToPhoneNumber = (input: string) => {
  // Remove all non-digit characters
  const cleaned = input.replace(/\D/g, '');

  // Slice to at most 10 digits
  const sliced = cleaned.slice(0, 18);

  // Format the phone number as (XXX) XXX-XXXX
  let formatted = '';
  for (let i = 0; i < sliced.length; i++) {
    if (i === 3 || i === 6 || i === 10) {
      formatted += '-';
    }
    formatted += sliced[i];
  }

  return formatted;
};

export const formatDuration = (minutes: number): string => {
  if (!minutes || minutes <= 0) {
    return `0 ${getTranslation('minTitle')}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} ${
      hours > 1 ? getTranslation('hrsTitle') : getTranslation('hrTitle')
    } ${remainingMinutes} ${
      remainingMinutes > 1
        ? getTranslation('minsTitle')
        : getTranslation('minTitle')
    }`;
  } else if (hours > 0) {
    return `${hours} ${
      hours > 1 ? getTranslation('hrsTitle') : getTranslation('hrTitle')
    }`;
  } else {
    return `${remainingMinutes} ${
      remainingMinutes > 1
        ? getTranslation('minsTitle')
        : getTranslation('minTitle')
    }`;
  }
};

export const getInitials = (name: any) => {
  const parts = name.trim().split(' ');
  const first = parts[0]?.charAt(0).toUpperCase() || '';
  return first;
};

export const getInitialsTwoDigit = (name:any) => {
  const parts = name.trim().split(' ');
  const first = parts[0]?.charAt(0).toUpperCase() || '';
  const last = parts[parts.length - 1]?.charAt(0).toUpperCase() || '';
  return first + last;
};

export const getRandomTheme = () => {
  const themes = [
    { backgroundColor: '#FCD9DE', textColor: '#400D14' }, // 1. Pink tone
    { backgroundColor: '#D9E7FC', textColor: '#0D1F40' }, // 2. Blue tone
    { backgroundColor: '#D9FCE0', textColor: '#0D4018' }, // 3. Green tone
  ];

  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

export const formatDateToSpanish = (dateString: string) => {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const [year, month, day] = dateString.split("-");

  const monthName = months[parseInt(month) - 1];

  return `${day} ${monthName} ${year}`;
};

export const formatDateToSpanishChart = (dateString: string) => {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  const [year, month, day] = dateString.split("-");

  const monthName = months[parseInt(month) - 1];

  return `${monthName}, ${year}`;
};



