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
  // const isNativeTabs =
  // Platform.OS === 'ios' && Number(Platform.Version) >= 26;
  const isNativeTabs = false;
  const BottomTabs = isNativeTabs
    ? createNativeBottomTabNavigator()
    : createBottomTabNavigator();

  // console.log(isNativeTabs ? 'Yes' : 'No');

  //handleTabsScreens
  const handleBottomTabsScreens = ({ screenName, component, options }) => {
    {
      console.log('Tab bar renderer', isNativeTabs);
    }
    return (
      <BottomTabs.Screen
        name={screenName}
        component={component}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerShown: false,
          ...(options || {}),
        }}
      />
    );
  };

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.blue002,
        tabBarInactiveTintColor: Colors.gray75,
        //  ...(isNativeTabs && {
        //   freezeOnBlur: false,
        //   lazy: false,
        // }),
      }}
      tabBar={props => <CustomBottomTabsContainer {...props} />}
    >
      {handleBottomTabsScreens({
        screenName: ScreenNames.HOMECONTAINER,
        component: Screen[ScreenNames.HOMECONTAINER],
        options: {
          tabBarLabel: ScreenNames.HOME, // Display name: "Get Tested"
          tabBarIcon: ({ focused }) => ({
            type: 'image',
            source: focused ? images.imgFocusHome : images.imgUnFocusHome,
          }),
        },
      })}

      {handleBottomTabsScreens({
        screenName: ScreenNames.GETTESTEDCONTAINER,
        component: Screen[ScreenNames.GETTESTEDCONTAINER],
        options: {
          tabBarLabel: ScreenNames.GETTESTED, // Display name: "Get Tested"
          tabBarIcon: ({ focused }) => ({
            type: 'image',
            source: focused
              ? images.imgFocusGetTested
              : images.imgUnFocusGetTested,
          }),
        },
      })}

      {handleBottomTabsScreens({
        screenName: ScreenNames.YOURPROFILECONAINER,
        component: Screen[ScreenNames.YOURPROFILECONAINER],
        options: {
          tabBarLabel: ScreenNames.YOURPROFILE, // Display name: "Get Tested"
          tabBarIcon: ({ focused }) => ({
            type: 'image',

            source: focused ? images.imgFocusProfile : images.imgUnFocusProfile,
          }),
        },
      })}
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
