import { Platform } from 'react-native';
import KitAnalysisComponent from '../components/KitAnlaysis';

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
  WELCOMECONTAINER: 'WelcomeContainer',
  ALLSETCONATINER: 'AllSetContainer',

  //BOTTOMTAB
  HOMECONTAINER: 'HomeContainer',
  GETTESTEDCONTAINER: 'GetTestedContainer',
  YOURPROFILECONAINER: 'YourProfileContainer',
  BOTTOMTABNAVIGATION: 'BottomTabsNavigation',

  KITDETAILSCONTAINER: 'KitDetailsContainer',
  CHECKOUTCONTAINER: 'CheckoutContainer',
  ORDERHISTORYCONTAINER: 'OrderHistoryContainer',
  KITANALYSISCONTAINER: 'KitAnalysisContainer',
  TESTDETAILSCONTAINER:"TestDetailsContainer",
  ADDFAMILYMEMBERCONTAINER:"AddFamilyContainer",
};

// <============================== IOS Condition ==============================>

export const isPlatformiOS = Platform.OS === 'ios';
