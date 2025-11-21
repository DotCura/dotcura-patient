import React from 'react';
import { MyScreens } from '.';
import CustomBottomTabsContainer from '../container/bottomTabs/custom';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
// import * as Screen from '../index';
import * as Screen from '../index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTabsNavigation = () => {
  const BottomTabs = createBottomTabNavigator();

  //handleTabsScreens
  const handleBottomTabsScreens = ({ screenName, component }) => {
    return (
      <BottomTabs.Screen
        name={screenName}
        component={component}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    );
  };

  return (
    <BottomTabs.Navigator
      tabBar={props => <CustomBottomTabsContainer {...props} />}
    >
      {handleBottomTabsScreens({
        screenName: ScreenNames.HOMECONTAINER,
        component: Screen[ScreenNames.HOMECONTAINER],
      })}

      {handleBottomTabsScreens({
        screenName: ScreenNames.GETTESTEDCONTAINER,
        component: Screen[ScreenNames.GETTESTEDCONTAINER],
      })}

      {handleBottomTabsScreens({
        screenName: ScreenNames.YOURPROFILECONAINER,
        component: Screen[ScreenNames.YOURPROFILECONAINER],
      })}
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
