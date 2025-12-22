// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import { Easing, StatusBar, View } from 'react-native';
// import { ScreenNames } from '../constants/AppConstants';
// import { Colors } from '../constants/Colors';
// import * as Screen from '../index';
// import { createBlankStackNavigator } from 'react-native-screen-transitions/blank-stack';
// import Transition from 'react-native-screen-transitions';


// // const Stack = createStackNavigator();
// const Stack = createBlankStackNavigator();
// const ModalStack = createNativeStackNavigator();


// const MainNavigation = props => {
//   const _addScreen = (name, component, option,transition) => {
   

//     const mergedOptions = {
//       // ✅ DEFAULT transition
//       ...Transition.Presets.ElasticCard(),
  
//       // ✅ Override if transition is provided
//       ...(transition ? transition : {}),
  
//       ...option,
//       // ✅ Screen specific options (header, gesture etc.)
//     };
   
  
//     return (
//       <Stack.Screen name={name} component={Screen[name]} options={mergedOptions} />
//     );
//   };

//   const addModalScreen = (name, component, option) => {
//     return (
//       <ModalStack.Screen name={name} component={component} options={option} />
//     );
//   };

//   const MainStackScreen = () => {
//     // console.log("props?.initialRouteName::", props?.initialRouteName);
//     return (
//       <Stack.Navigator
//         initialRouteName={props?.initialRouteName}
//         // initialRouteName={"Account"}
//         screenOptions={{
//           headerShown: false,
//           headerTitleAlign: 'center',
//           headerBackVisible: false,
//           headerShadowVisible: false,
//           headerTitle: '',
//           orientation: 'portrait',
//         }}
//       >
//         {_addScreen(
//           ScreenNames.BOTTOMTABNAVIGATION,
//           {},
//           { headerShown: false, gestureEnabled: false },
//         )}
//         {_addScreen(
//           ScreenNames.ONBOARDINGCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//         {_addScreen(ScreenNames.INTROCONTAINER, {}, { headerShown: false })}
//         {_addScreen(
//           ScreenNames.LOGINCONTAINER,
//           {},
//           { headerShown: true},
//           Transition.Presets.SlideFromBottom(),
//         )}
//         {_addScreen(ScreenNames.ACCESSCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.PAYMENTMETHODCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(
//           ScreenNames.NOTIFICATIONSWITCHCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(ScreenNames.OTPCONTAINER, {}, { headerShown: true },Transition.Presets.ZoomIn(),)}
//         {_addScreen(
//           ScreenNames.COMPLETEPROFILECONTAINER,
//           {},
//           { headerShown: false },
//           Transition.Presets.SlideFromTop(),
//         )}
//         {_addScreen(
//           ScreenNames.INFOATIONCONASATNTCONTAINER,
//           {},
//           { headerShown: false },
//           Transition.Presets.ElasticCard(),
//         )}
//         {_addScreen(ScreenNames.ADDCARDCONTAINER, {}, { headerShown: false })}
//         {_addScreen(ScreenNames.ALLSETCONATINER, {}, { headerShown: false })}
//         {_addScreen(ScreenNames.WELCOMECONTAINER, {}, { headerShown: false })}
//         {_addScreen(ScreenNames.HOMECONTAINER, {}, { headerShown: true })}

//         {_addScreen(ScreenNames.KITDETAILSCONTAINER, {}, { headerShown: true }, Transition.Presets.DraggableCard(),)}
//         {_addScreen(ScreenNames.CHECKOUTCONTAINER, {}, { headerShown: true })}
//         {_addScreen(ScreenNames.EDITORDERCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.HISTORICALANALYSISCONTAINER,
//           {},
//           { headerShown: true },
//           Transition.Presets.ZoomIn(),
//         )}
//         {_addScreen(
//           ScreenNames.KITANALYSISCONTAINER,
//           {},
//           { headerShown: false },
//           Transition.Presets.SlideFromBottom(),
//         )}
//         {_addScreen(
//           ScreenNames.TESTDETAILSCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//         {_addScreen(
//           ScreenNames.ADDRESSLISTCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(ScreenNames.ADDFAMILYCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.CONFIRMIDENTITYCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//         {_addScreen(ScreenNames.PROFILECONTAINER, {}, { headerShown: true },Transition.Presets.DraggableCard(),)}
//         {_addScreen(ScreenNames.ADDADDRESSCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.COMPLETEADDRESSCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//         {_addScreen(ScreenNames.ACCOUNTCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.ADDFAMILYMEMBERSCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(
//           ScreenNames.RESULTOPENUPCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//         {_addScreen(
//           ScreenNames.ADDCARDPROFILECONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(ScreenNames.FAVOURITESCONTAINER, {}, { headerShown: true })}
//         {_addScreen(
//           ScreenNames.ANALITIDETAILSCONTAINER,
//           {},
//           { headerShown: true },
//           Transition.Presets.DraggableCard(),
//         )}
//         {_addScreen(
//           ScreenNames.ANALITITESTDETAILSCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(
//           ScreenNames.ORDERHISTORYCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(
//           ScreenNames.NOTIFICATIONLISTCONTAINER,
//           {},
//           { headerShown: true },
//         )}
//         {_addScreen(
//           ScreenNames.RATEANDREVIEWCONTAINER,
//           {},
//           { headerShown: false },
//         )}
//       </Stack.Navigator>
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.white }}>
//       <StatusBar
//         barStyle={'dark-content'}
//         translucent
//         backgroundColor={'transparent'}
//       />
//       <NavigationContainer>
//         <ModalStack.Navigator
//           initialRouteName="MainStackScreen"
//           screenOptions={{
//             headerShown: false,
//             headerBackVisible: false,
//             headerTitleAlign: 'center',
//             headerShadowVisible: false,
//             headerTitle: '',
//             orientation: 'portrait',
//           }}
//         >
//           {addModalScreen('MainStackScreen', MainStackScreen)}
//         </ModalStack.Navigator>
//       </NavigationContainer>
//     </View>
//   );
// };

// export default MainNavigation;



//check with effect diffrent diffrent

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
import * as Screen from '../index';
import { createBlankStackNavigator } from 'react-native-screen-transitions/blank-stack';
import Transition from 'react-native-screen-transitions';

/* ---------------- STACKS ---------------- */

const NativeStack = createNativeStackNavigator();      // ✅ DEFAULT
const TransitionStack = createBlankStackNavigator();   // ✅ ANIMATED
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
          ScreenNames.LOGINCONTAINER,
          { headerShown: true },
          Transition.Presets.SlideFromBottom(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.OTPCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.COMPLETEPROFILECONTAINER,
          { headerShown: false },
          Transition.Presets.SlideFromTop(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.INFOATIONCONASATNTCONTAINER,
          { headerShown: false },
          Transition.Presets.ZoomIn(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.KITDETAILSCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.HISTORICALANALYSISCONTAINER,
          { headerShown: true },
          Transition.Presets.SlideFromTop(),
        )}

        {_addScreen(
          TransitionStack,
          ScreenNames.KITANALYSISCONTAINER,
          { headerShown: false },
          Transition.Presets.SlideFromBottom(),
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
          ScreenNames.ANALITIDETAILSCONTAINER,
          { headerShown: true },
          Transition.Presets.ZoomIn(),
        )}
         {_addScreen(
          TransitionStack,
          ScreenNames.TESTDETAILSCONTAINER,
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
        {_addScreen(NativeStack, ScreenNames.BOTTOMTABNAVIGATION, { headerShown: false, gestureEnabled: false })}
        {_addScreen(NativeStack, ScreenNames.ONBOARDINGCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.INTROCONTAINER, { headerShown: false })}

        {_addScreen(NativeStack, ScreenNames.ACCESSCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.PAYMENTMETHODCONTAINER, { headerShown: true })}
        {_addScreen(NativeStack, ScreenNames.NOTIFICATIONSWITCHCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ADDCARDCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ALLSETCONATINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.WELCOMECONTAINER, { headerShown: false })}
        {/* {_addScreen(NativeStack, ScreenNames.HOMECONTAINER, { headerShown: true })} */}
        {_addScreen(NativeStack, ScreenNames.CHECKOUTCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.EDITORDERCONTAINER, { headerShown: false })}
        {/* {_addScreen(NativeStack, ScreenNames.TESTDETAILSCONTAINER, { headerShown: false })} */}
        {_addScreen(NativeStack, ScreenNames.ADDRESSLISTCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ADDFAMILYCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.CONFIRMIDENTITYCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ADDADDRESSCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.COMPLETEADDRESSCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ACCOUNTCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ADDFAMILYMEMBERSCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.RESULTOPENUPCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.ADDCARDPROFILECONTAINER, { headerShown: true })}
        {_addScreen(NativeStack, ScreenNames.FAVOURITESCONTAINER, { headerShown: false })}
        {/* {_addScreen(NativeStack, ScreenNames.ANALITITESTDETAILSCONTAINER, { headerShown: true })} */}
        {_addScreen(NativeStack, ScreenNames.ORDERHISTORYCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.NOTIFICATIONLISTCONTAINER, { headerShown: false })}
        {_addScreen(NativeStack, ScreenNames.RATEANDREVIEWCONTAINER, { headerShown: false })}

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
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <NavigationContainer>
        <ModalStack.Navigator screenOptions={{ headerShown: false }}>
          <ModalStack.Screen
            name="MainStackScreen"
            component={NativeStackScreen}
          />
        </ModalStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigation;

