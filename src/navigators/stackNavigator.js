import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import * as Screen from '../index';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

const MainNavigation = props => {
  const _addScreen = (name, component, option) => {
    return (
      <Stack.Screen name={name} component={Screen[name]} options={option} />
    );
  };

  const addModalScreen = (name, component, option) => {
    return (
      <ModalStack.Screen name={name} component={component} options={option} />
    );
  };

  const MainStackScreen = () => {
    // console.log("props?.initialRouteName::", props?.initialRouteName);
    return (
      <Stack.Navigator
        initialRouteName={props?.initialRouteName}
        // initialRouteName={"Account"}
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: '',
          orientation: 'portrait',
        }}
      >
        {_addScreen(ScreenNames.ONBOARDINGCONTAINER, {}, { headerShown: false })}
        {_addScreen(ScreenNames.LOGINCONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.OTPCONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.COMPLETEPROFILECONTAINER, {}, { headerShown: false })}
      

      </Stack.Navigator>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <NavigationContainer>
        <ModalStack.Navigator
          initialRouteName="MainStackScreen"
          screenOptions={{
            headerShown: false,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitle: '',
            orientation: 'portrait',
          }}
        >
          {addModalScreen('MainStackScreen', MainStackScreen)}
        </ModalStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigation;
