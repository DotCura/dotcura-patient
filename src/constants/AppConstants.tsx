import { Platform } from 'react-native';

// <============================== App State Keys ==============================>

export const AppStates = {
  FOREGROUND: 'FOREGROUND',
  BACKGROUND: 'BACKGROUND',
  KILL: 'KILL',
};

// <============================== Notification Types ==============================>

export const NotificationTypes = {
  ADMIN_NOTIFICATIONS: 'admin_notification',
};

// <============================== Screen Name ==============================>

export const ScreenNames = {
  //auth
  ONBOARDINGCONTAINER: 'OnBoardingContainer',
  LOGINCONTAINER: 'LoginContainer',
  OTPCONTAINER: 'OTPContainer',
  COMPLETEPROFILECONTAINER: 'CompleteProfileContainer',
  INFOATIONCONASATNTCONTAINER: 'InformationConasantContainer',
  ADDCARDCONTAINER: 'AddCardContainer',

  //BOTTOMTAB
  HOMECONTAINER: 'HomeContainer',
  GETTESTEDCONTAINER: 'GetTestedContainer',
  YOURPROFILECONAINER: 'YourProfileContainer',
  BOTTOMTABNAVIGATION: 'BottomTabsNavigation',
};

// <============================== IOS Condition ==============================>

export const isPlatformiOS = Platform.OS === 'ios';
