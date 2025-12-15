import React from 'react';
import { MyScreens } from '.';
import CustomBottomTabsContainer from '../container/bottomTabs/custom';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
// import * as Screen from '../index';
import * as Screen from '../index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { images } from '../constants/Images';
import { getTranslation } from '../localization/i18n/i18n.config';
import { Platform } from 'react-native';

const BottomTabsNavigation = () => {
  const isNativeTabs =
  Platform.OS === 'ios' && Number(Platform.Version) >= 26;
  const BottomTabs = isNativeTabs
  ? createNativeBottomTabNavigator()
  : createBottomTabNavigator();

  //handleTabsScreens
  const handleBottomTabsScreens = ({ screenName, component,options }) => {
    return (
      <BottomTabs.Screen
      
        name={screenName}
        component={component}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerShown: false,
          ...(options || {})
        }}
      />
    );
  };

  return (
    <BottomTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor: Colors.blue002,
      tabBarInactiveTintColor: Colors.gray75,
     
    }}
      tabBar={props => <CustomBottomTabsContainer {...props} />
    }
    >
      {handleBottomTabsScreens({
        screenName: ScreenNames.HOME,
        component: Screen[ScreenNames.HOMECONTAINER],
        options: {
          tabBarIcon: ({ focused }) => ({
            type: 'image',
            source: focused
              ? images.imgFocusHome
              : images.imgUnFocusHome,
          }),
          
        },
      })}

      {handleBottomTabsScreens({
       screenName: ScreenNames.GETTESTED,
        component: Screen[ScreenNames.GETTESTEDCONTAINER],
        options: {
          tabBarIcon: ({ focused }) => ({
            type: 'image',
            source: focused
              ? images.imgFocusGetTested
              : images.imgUnFocusGetTested,
          }),
        },
      })}

      {handleBottomTabsScreens({
        screenName: ScreenNames.YOURPROFILE,
        component: Screen[ScreenNames.YOURPROFILECONAINER],
        options: {
          tabBarIcon: ({ focused }) => ({
            type: 'image',
            source: focused
              ? images.imgFocusProfile
              : images.imgUnFocusProfile,
          }),
        },
      })}
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
