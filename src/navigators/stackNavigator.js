import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
import * as Screen from '../index';
import { createBlankStackNavigator } from 'react-native-screen-transitions/blank-stack';
import Transition from 'react-native-screen-transitions';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../constants/utils/navigationRef';
import { useNavigationStore } from '../store/NavigationStore';

/* ---------------- STACKS ---------------- */

const NativeStack = createNativeStackNavigator(); // ✅ DEFAULT
const TransitionStack = createBlankStackNavigator(); // ✅ ANIMATED
const ModalStack = createNativeStackNavigator();

/* ---------------- MAIN NAVIGATION ---------------- */

const MainNavigation = props => {
  /* --------- YOUR SAME ADD SCREEN LOGIC --------- */
  const _addScreen = (StackRef, name, option, transition) => {
    const mergedOptions = {
      ...(transition ? transition : {}),
      ...option,
    };

    return (
      <StackRef.Screen
        name={name}
        component={Screen[name]}
        options={mergedOptions}
      />
    );
  };

  /* ---------------- TRANSITION STACK ---------------- */
  const TransitionStackScreen = () => {
    return (
      <TransitionStack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}
      >
        {_addScreen(
          TransitionStack,
          ScreenNames.KITDETAILSCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}
        {_addScreen(
          TransitionStack,
          ScreenNames.ANALITITESTDETAILSCONTAINER,
          { headerShown: false },
          Transition.Presets.ZoomIn(),
        )}
        {_addScreen(
          TransitionStack,
          ScreenNames.PROFILECONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}
        {_addScreen(
          TransitionStack,
          ScreenNames.HISTORICALANALYSISCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.ANALITIDETAILSCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}
      </TransitionStack.Navigator>
    );
  };

  /* ---------------- NATIVE STACK ---------------- */
  const NativeStackScreen = () => {
    return (
      <NativeStack.Navigator
        initialRouteName={props?.initialRouteName}
        screenOptions={{
          headerShown: false,
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: '',
          orientation: 'portrait',
        }}
      >
        {_addScreen(NativeStack, ScreenNames.CUSTOMSPLASHCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.BOTTOMTABNAVIGATION, {
          headerShown: false,
          gestureEnabled: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ONBOARDINGCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.LOGINCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.OTPCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.COMPLETEPROFILECONTAINER, {
          headerShown: false,
          gestureEnabled: false,
        })}
        {_addScreen(NativeStack, ScreenNames.INFOATIONCONASATNTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.INTROCONTAINER, {
          headerShown: false,
        })}

        {_addScreen(NativeStack, ScreenNames.ACCESSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.PAYMENTMETHODCONTAINER, {
          headerShown: true,
        })}
        {_addScreen(NativeStack, ScreenNames.NOTIFICATIONSWITCHCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ADDCARDCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ALLSETCONATINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.WELCOMECONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.CHECKOUTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.EDITORDERCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.TESTDETAILSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ADDRESSLISTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.CONSENTLISTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ADDFAMILYCONTAINER, {
          headerShown: false,
        })}

        {_addScreen(NativeStack, ScreenNames.ADDADDRESSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.COMPLETEADDRESSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ACCOUNTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ADDFAMILYMEMBERSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.RESULTOPENUPCONTAINER, {
          headerShown: false,
          gestureEnabled: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ADDCARDPROFILECONTAINER, {
          headerShown: true,
        })}
        {_addScreen(NativeStack, ScreenNames.FAVOURITESCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ORDERHISTORYCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.KITANALYSISCONTAINER, {
          headerShown: false,
          gestureEnabled: false,
        })}
        {_addScreen(NativeStack, ScreenNames.NOTIFICATIONLISTCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.RATEANDREVIEWCONTAINER, {
          headerShown: false,
          gestureEnabled: false,
        })}
        {_addScreen(NativeStack, ScreenNames.ANALITITESTDETAILSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.CMSPAGECONTAINER, {
          headerShown: true,
        })}
        {_addScreen(NativeStack, ScreenNames.CONTACTUSCONTAINER, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.PAYPALWEBVIEWSCREEN, {
          headerShown: false,
        })}
        {_addScreen(NativeStack, ScreenNames.REPORTWAITINGCONTAINER, {
          headerShown: false,
        })}

        {/* 🔥 TRANSITION ENTRY */}
        <NativeStack.Screen
          name="TransitionFlow"
          component={TransitionStackScreen}
          options={{ headerShown: false }}
        />
      </NativeStack.Navigator>
    );
  };

  /* ---------------- ROOT ---------------- */
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const route = navigationRef.getCurrentRoute()?.name;
        useNavigationStore.getState().setCurrentRoute(route);
      }}
      onStateChange={() => {
        const route = navigationRef.getCurrentRoute()?.name;
        useNavigationStore.getState().setCurrentRoute(route);
      }}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <ModalStack.Navigator screenOptions={{ headerShown: false }}>
        <ModalStack.Screen
          name="MainStackScreen"
          component={NativeStackScreen}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
