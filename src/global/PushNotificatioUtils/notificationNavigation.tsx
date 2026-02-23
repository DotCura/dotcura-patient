import * as React from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import { AppState } from "react-native";

// Create a reference for navigation
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

// Variable to detect if it's a fresh cold start
let isColdStart = true;

// After a small timeout, mark that app is now running (not cold start anymore)
setTimeout(() => {
  isColdStart = false;
}, 500); // You can adjust time

// Navigate to a specific screen using the ref
export function navigate(name: string, params?: Record<string, any>) {
  const appState = AppState.currentState;
  console.log("appstate",appState);
  
  if (navigationRef.current) {
    if (isColdStart) {
    setTimeout(() => {
      navigationRef.current?.navigate(name, params);
    }, 2000);
  } else {
    // App is running (foreground/background)
    navigationRef.current?.navigate(name, params);
  }
  } else {
    console.log("Navigation is not ready yet.");
  }
}
