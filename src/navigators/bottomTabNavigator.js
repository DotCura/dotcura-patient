import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import * as Screen from '../index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '../global/assets/Icons';
import { Colors } from '../global/constants/Colors';
import { getHeight, getWidth } from '../global/constants/StylesConstants';
import { ScreenNames } from '../global/constants/AppConstants';
import { ImageConstants } from '../global/constants/ImageConstants';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';

const BottomTab = createNativeBottomTabNavigator();

const MyTabBar = props => {
  const instes = useSafeAreaInsets();
  // console.log("BottomTabb :", props);
  return (
    <View
      style={{
        width: '85%',
        height: getWidth(60),
        borderRadius: 40,
        position: 'absolute',
        backgroundColor: Colors.white,
        bottom: getHeight(20),
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          borderRadius: 40,
          shadowColor: '#000',
          overflow:'visible',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          backgroundColor: Colors.white,
          paddingHorizontal: getWidth(27),
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {props.tabValue.slice(0, 5).map((item, index) => {
            var selectedIndex = index;
            var propsIndex = props.state.index;

            if (
              (props.state.index == 5 ||
                props.state.index == 6 ||
                props.state.index == 7 ||
                props.state.index == 8) &&
              index == 1
            ) {
              selectedIndex = 1;
              propsIndex = 1;
            } else if (props.state.index == 9 && index == 2) {
              selectedIndex = 2;
              propsIndex = 2;
            }
            return (
              <TouchableOpacity
                key={item.screen}
                onPress={() => props.navigation.navigate(item.screen)}
                style={{
                  alignItems: 'center',
                  // width: "20%",
                  flex: 1,
                  paddingVertical: getHeight(5),
                  borderRadius: 10,
                }}
              >
                {propsIndex == selectedIndex && (
                  <Image
                    source={ImageConstants.imgBottomShadow}
                    style={{
                      position: 'absolute',
                      top: -12,
                      // width: getWidth(56),
                      // height: getHeight(18),
                      // resizeMode: 'stretch',
                    }}
                  />
                )}
                {propsIndex == selectedIndex ? (
                  <Image
                    source={Icons[item.icon + 'Selected']}
                    style={{
                      marginTop: 0,
                      marginBottom: getHeight(3),
                      height: getHeight(24),
                      aspectRatio: 1,
                      // height: getHeight(24),
                      resizeMode: 'contain',
                      // tintColor: propsIndex == selectedIndex ? Colors.orangeFF : Colors.grey53,
                    }}
                  />
                ) : (
                  <Image
                    source={Icons[item.icon]}
                    style={{
                      marginTop: 0,
                      // marginBottom: getHeight(8),
                      width: getWidth(24),
                      // aspectRatio:1,
                      height: getHeight(24),
                      resizeMode: 'contain',
                      // resizeMode: 'contain',
                    }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

class bottomTabNavigationCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: [
        { icon: 'icnHome', text: 'Home', screen: ScreenNames.HOMECONTAINER },
        {
          icon: 'icnOrder',
          text: 'Quiz',
          screen: ScreenNames.MYORDERCONTAINER,
        },
        {
          icon: 'icnCart',
          text: 'Analytics',
          screen: ScreenNames.MYCARTCONTAINER,
        },
        {
          icon: 'icnProfile',
          text: 'Profile',
          screen: ScreenNames.PROFILECONTAINER,
        },
      ],
    };
  }

  _addScreen(name, component, option) {
    return (
      <BottomTab.Screen name={name} component={Screen[name]} options={option} />
    );
  }

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.gradiantBlue,
          }}
        >
          <BottomTab.Navigator
            backBehavior="history"
            tabBar={props => {
              var tabValue = { ...props, ...this.state };
              return <MyTabBar {...tabValue} />;
            }}
            sceneContainerStyle={{ paddingBottom: '0%' }}
            screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center',
              headerBackVisible: false,
              headerShadowVisible: false,
              headerTitle: '',
            }}
            // initialRouteName={""}
          >
            {this._addScreen(
              ScreenNames.HOMECONTAINER,
              {},
              { headerShown: false },
            )}
            {this._addScreen(
              ScreenNames.MYORDERCONTAINER,
              {},
              { headerShown: true },
            )}
            {this._addScreen(
              ScreenNames.MYCARTCONTAINER,
              {},
              { headerShown: true },
            )}
            {this._addScreen(
              ScreenNames.PROFILECONTAINER,
              {},
              { headerShown: true },
            )}
          </BottomTab.Navigator>
        </View>
      </>
    );
  }
}

export default bottomTabNavigationCustomer;
