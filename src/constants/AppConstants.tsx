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
  ADDCARDPROFILECONTAINER: 'AddCardProfileContainer',
  INTROCONTAINER: 'IntroContainer',
  ACCESSCONTAINER: 'AccessContainer',
  NOTIFICATIONSWITCHCONTAINER: 'NotificationSwitchContainer',
  PAYMENTMETHODCONTAINER: 'PaymentMethodContainer',
  ADDRESSLISTCONTAINER:"AddressListContainer",
  FAVOURITESCONTAINER:"FavouritesContainer",

  //BOTTOMTAB
  HOMECONTAINER: 'HomeContainer',
  GETTESTEDCONTAINER: 'GetTestedContainer',
  YOURPROFILECONAINER: 'YourProfileContainer',
  BOTTOMTABNAVIGATION: 'BottomTabsNavigation',

  KITDETAILSCONTAINER: 'KitDetailsContainer',
  CHECKOUTCONTAINER: 'CheckoutContainer',
  HISTORICALANALYSISCONTAINER: 'HistoricalAnalysisContainer',
  KITANALYSISCONTAINER: 'KitAnalysisContainer',
  TESTDETAILSCONTAINER: 'TestDetailsContainer',
  ANALITIDETAILSCONTAINER:"AnalitiDetailsContainer",
  ANALITITESTDETAILSCONTAINER:"AnalitiTestDetailContainer",

  //FAMILY
  CONFIRMIDENTITYCONTAINER: 'ConfrimIdentityContainer',
  ADDFAMILYCONTAINER: 'AddFamilyContainer',
  PROFILECONTAINER: 'ProfileContainer',

  //ADDRESS
  ADDADDRESSCONTAINER: 'AddAddressContainer',
  COMPLETEADDRESSCONTAINER: 'CompleteAddressContainer',
  ACCOUNTCONTAINER: 'AccountContainer',
  ADDFAMILYMEMBERSCONTAINER: 'AddFamilyMemberContainer',
  RESULTOPENUPCONTAINER: 'ResultOpenUpContainers',
};

// <============================== IOS Condition ==============================>

export const isPlatformiOS = Platform.OS === 'ios';
