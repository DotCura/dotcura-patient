import { Platform } from "react-native";

// <============================== App State Keys ==============================>

export const AppStates = {
  FOREGROUND: "FOREGROUND",
  BACKGROUND: "BACKGROUND",
  KILL: "KILL",
};

// <============================== Notification Types ==============================>

export const NotificationTypes = {
  ADMIN_NOTIFICATIONS: "admin_notification",
};

// <============================== Screen Name ==============================>

export const ScreenNames = {
  //customer
  ONBOARDINGCONTAINER: "OnBoardingContainer",
  LOGINCONTAINER:"LoginContainer",

};

// <============================== IOS Condition ==============================>

export const isPlatformiOS = Platform.OS === "ios";
