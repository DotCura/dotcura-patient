import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Easing, StatusBar, View } from 'react-native';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
import * as Screen from '../index';
import { createBlankStackNavigator } from "react-native-screen-transitions/blank-stack";
import Transition from "react-native-screen-transitions";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'; // <--- CHANGE THIS LINE

const Stack = createStackNavigator();
// const Stack = createBlankStackNavigator();
const ModalStack = createNativeStackNavigator();

// // --- Define the NEW Zoom-In Elastic Card Transition ---
// const customZoomCardTransition = {
//   gestureEnabled: true,
//   cardStyleInterpolator: ({ current, next, layouts }) => {
    
//     // 1. Interpolation for the incoming screen (current): Zooms in from a smaller size.
//     const incomingScale = current.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0.8, 1], // Start small (80% size) and zoom to full size (100%)
//     });
    
//     // Optional: Add a slight vertical translation to give it a 'pop' from the bottom center
//     const incomingTranslateY = current.progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [20, 0], // Starts 20 units lower than final position
//     });

//     // 2. Interpolation for the outgoing screen (next): Recedes into the background.
//     const outgoingScale = next 
//       ? next.progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: [1, 0.9], // Scales down from 100% to 90% as the new screen appears
//         })
//       : 1;
      
//     // 3. Optional: Add a dark overlay that fades in
//     const overlayOpacity = current.progress.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 0.4], 
//     });

//     return {
//       cardStyle: {
//         // Incoming screen zooms in and shifts up slightly
//         transform: [{ scale: incomingScale }, { translateY: incomingTranslateY }],
//       },
//       overlayStyle: {
//         // Overlay darkens the background
//         opacity: overlayOpacity,
//         backgroundColor: 'black',
//       },
//       containerStyle: {
//         // Background screen scales down (recedes)
//         transform: [{ scale: outgoingScale }], 
//       },
//     };
//   },
//   // Use a slightly longer duration for a smoother, less abrupt elastic feel
//   transitionSpec: {
//     open: {
//       animation: 'timing',
//       config: { duration: 300 }, 
//     },
//     close: {
//       animation: 'timing',
//       config: { duration: 300 },
//     },
//   },
// };
// // --- End of Custom Zoom-In Elastic Card Transition ---

// --- Define the NEW Bouncy Elastic Card Transition ---
const customElasticSnapTransition = {
  gestureEnabled: true,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    
    // 1. Interpolation for the incoming screen (current): Zooms in quickly.
    const incomingScale = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1], // Start at 90% size and zoom to full size (100%)
    });
    
    // 2. Interpolation for the outgoing screen (next): Recedes and scales down significantly.
    const outgoingScale = next 
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85], // Scales down to 85% - giving a deep perspective
        })
      : 1;
      
    // // 3. Optional: Add a dark overlay that fades in
    // const overlayOpacity = current.progress.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 0.3], 
    // });

    return {
      cardStyle: {
        // Incoming screen zooms in
        transform: [{ scale: incomingScale }],
      },
      // overlayStyle: {
      //   // Overlay darkens the background
      //   opacity: overlayOpacity,
      //   backgroundColor: 'transparent',
      // },
      containerStyle: {
        // Background screen scales down (recedes)
        transform: [{ scale: outgoingScale }], 
      },
    };
  },
  // Use a SPRING animation for the "elastic" or "bouncy" effect
  transitionSpec: {
    open: {
      animation: 'spring',
      config: { 
        stiffness: 1000, 
        damping: 500, // Higher damping for less initial bounce, but a quick snap
        mass: 3, 
        overshootClamping: false,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.01,
      }, 
    },
    // IMPROVED: Longer duration and Easing for smoother close
    close: {
      animation: 'timing', 
      config: { 
        duration: 220, // Increased duration
        easing: Easing.out(Easing.ease), // Smooth deceleration
      }, 
    },
  },
};
// --- End of Custom Bouncy Elastic Card Transition ---

const MainNavigation = props => {
  const _addScreen = (name, component, option) => {
    // 1. Start with the custom Native Stack options
    // 2. Merge it with your required 'headerShown' and other specific options
    const mergedOptions = {
      ...customElasticSnapTransition, // Apply the custom transition properties
      ...option, // This preserves your { headerShown: true/false } setting
  };
    return (
      <Stack.Screen name={name} component={Screen[name]} options={mergedOptions} />
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
          // cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: '',
          orientation: 'portrait',
        }}
      >
        {_addScreen(
          ScreenNames.BOTTOMTABNAVIGATION,
          {},
          { headerShown: false, gestureEnabled: false ,},
        )}
        {_addScreen(
          ScreenNames.ONBOARDINGCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.INTROCONTAINER, {}, { headerShown: false })}
        {_addScreen(ScreenNames.LOGINCONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.ACCESSCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.PAYMENTMETHODCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.NOTIFICATIONSWITCHCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(ScreenNames.OTPCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.COMPLETEPROFILECONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(
          ScreenNames.INFOATIONCONASATNTCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.ADDCARDCONTAINER, {}, { headerShown: false })}
        {_addScreen(ScreenNames.ALLSETCONATINER, {}, { headerShown: false })}
        {_addScreen(ScreenNames.WELCOMECONTAINER, {}, { headerShown: false })}
        {_addScreen(ScreenNames.HOMECONTAINER, {}, { headerShown: true })}

        {_addScreen(ScreenNames.KITDETAILSCONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.CHECKOUTCONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.EDITORDERCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.HISTORICALANALYSISCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.KITANALYSISCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(
          ScreenNames.TESTDETAILSCONTAINER,
          {},
          { headerShown: false},
        )}
        {_addScreen(
          ScreenNames.ADDRESSLISTCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(ScreenNames.ADDFAMILYCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.CONFIRMIDENTITYCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.PROFILECONTAINER, {}, { headerShown: true })}
        {_addScreen(ScreenNames.ADDADDRESSCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.COMPLETEADDRESSCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.ACCOUNTCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.ADDFAMILYMEMBERSCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.RESULTOPENUPCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(
          ScreenNames.ADDCARDPROFILECONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(ScreenNames.FAVOURITESCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.ANALITIDETAILSCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.ANALITITESTDETAILSCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.ORDERHISTORYCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.NOTIFICATIONLISTCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.RATEANDREVIEWCONTAINER,
          {},
          { headerShown: false },
        )}
        

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
