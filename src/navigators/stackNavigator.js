import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenNames } from '../constants/AppConstants';
import { Colors } from '../constants/Colors';
import * as Screen from '../index';

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
        {_addScreen(
          ScreenNames.BOTTOMTABNAVIGATION,
          {},
          { headerShown: false, gestureEnabled: false },
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
        {_addScreen(
          ScreenNames.ORDERHISTORYCONTAINER,
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
          { headerShown: true },
        )}
        {_addScreen(ScreenNames.ADDFAMILYCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.CONFIRMIDENTITYCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.PROFILECONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.ADDADDRESSCONTAINER,
          {},
          { headerShown: true },
        )}
        {_addScreen(
          ScreenNames.COMPLETEADDRESSCONTAINER,
          {},
          { headerShown: false },
        )}
        {_addScreen(ScreenNames.ACCOUNTCONTAINER, {}, { headerShown: true })}
        {_addScreen(
          ScreenNames.ADDFAMILYMEMBERSCONTAINER,
          {},
          { headerShown: false },
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
