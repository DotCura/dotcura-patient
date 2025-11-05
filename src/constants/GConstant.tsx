import {Alert, I18nManager, Platform, StatusBar} from 'react-native';
import {getTranslation} from '../localization/i18n/i18n.config';
import emojiRegex from 'emoji-regex';
import {showMessage} from 'react-native-flash-message';
import {PlatformVersion} from './utils/Platform';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import { Colors } from './Colors';
import { fontsfamily } from './FontFamily';
import { fontSize } from './FontSizes';
import { getWidth } from './utils/Dimensions';

export const appName = getTranslation('appname') || 'DotCura';

// RTL Support
export const isRTLSupport = I18nManager.isRTL;

// Image Transform
export const imageTransform = isRTLSupport
  ? [{rotate: '180deg'}]
  : [{rotate: '0deg'}];

// Alert
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

// Buttons
export const activityOpacity = 0.8;
export const hitSlop = 10;
export const currencySymbol = 'KWD';

let flashMessageRef;

export function setFlashMessageRef(ref:any) {
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
    iconProps: {tintColor: Colors.white},
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
                {cancelable: false},
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
            {cancelable: false},
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
