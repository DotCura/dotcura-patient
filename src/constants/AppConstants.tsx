import { Platform } from 'react-native';
import KitAnalysisComponent from '../components/KitAnlaysis';
import { getTranslation } from '../localization/i18n/i18n.config';

// <============================== App State Keys ==============================>

export const AppStates = {
  FOREGROUND: 'FOREGROUND',
  BACKGROUND: 'BACKGROUND',
  KILL: 'KILL',
};

// <============================== Notification Types ==============================>

export const NotificationTypes = {
  ADMIN_NOTIFICATIONS: 'admin-notification',
  REPORT_NOTIFICATIONS:'report_notification',
  BOOKING_CANCLE:'booking_cancelled',
  BOOKING_ACCEPT:'booking_accepted',
  BOOKING_STARTED:'booking_started',
  PAYMNET_CAPTURED:'payment_captured',
  SAMPLE_DELIVERED:'samples_delivered',

};

// <============================== Screen Name ==============================>

export const ScreenNames = {
  //auth
  ONBOARDINGCONTAINER: 'OnBoardingContainer',
  CMSPAGECONTAINER:"CMSPagesContainer",
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
  CUSTOMSPLASHCONTAINER:"CustomSplashContainer",

  //BOTTOMTAB
  HOMECONTAINER: 'HomeContainer',
  GETTESTEDCONTAINER: 'GetTestedContainer',
  YOURPROFILECONAINER: 'YourProfileContainer',
  BOTTOMTABNAVIGATION: 'BottomTabsNavigation',

  HOME:getTranslation('home'),
  GETTESTED:getTranslation('gettested'),
  YOURPROFILE:getTranslation('yourprofile'),

  KITDETAILSCONTAINER: 'KitDetailsContainer',
  CHECKOUTCONTAINER: 'CheckoutContainer',
  HISTORICALANALYSISCONTAINER: 'HistoricalAnalysisContainer',
  KITANALYSISCONTAINER: 'KitAnalysisContainer',
  TESTDETAILSCONTAINER: 'TestDetailsContainer',
  ANALITIDETAILSCONTAINER:"AnalitiDetailsContainer",
  ANALITITESTDETAILSCONTAINER:"AnalitiTestDetailContainer",
  ORDERHISTORYCONTAINER:"OrderHistoryContainer",
  NOTIFICATIONLISTCONTAINER:"NotificationListContainer",
  RATEANDREVIEWCONTAINER:"RateAndReviewContainer",
  EDITORDERCONTAINER:"EditOrderContainer",
  CONTACTUSCONTAINER:"ContactUsContainer",

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

  PAYPALWEBVIEWSCREEN:"PayPalWebViewScreen",
};

// <============================== IOS Condition ==============================>

export const isPlatformiOS = Platform.OS === 'ios';
