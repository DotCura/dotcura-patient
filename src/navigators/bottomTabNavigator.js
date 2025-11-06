import React from 'react';
import { MyScreens } from '.';
import CustomBottomTabsContainer from '../container/bottomTabs/custom';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
import * as Screen from '../index';

const BottomTabsNavigation = () => {
  const BottomTabs = createNativeBottomTabNavigator();

  //handleTabsScreens
  const handleBottomTabsScreens = ({ screenName, component }) => {
    return (
      <BottomTabs.Screen
        name={screenName}
        component={component}
        options={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.blue17 },
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
        component:Screen[ScreenNames.YOURPROFILECONAINER],
      })}
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigation;
