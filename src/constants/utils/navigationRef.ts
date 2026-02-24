import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef :any= createNavigationContainerRef();

console.log("navigationRef",navigationRef);
console.log("navigationRef is ready",navigationRef.isReady());


export function getCurrentRouteName() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return null;
}
