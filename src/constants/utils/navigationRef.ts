import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef :any= createNavigationContainerRef();

export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return null;
}
