import React from 'react';
import { images } from '../../../constants/Images';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomBottomTabsComponent from '../../../components/bottomTabs/custom';
import { styles } from './styles';
import { hitSlop } from '../../../constants/GConstant';
import { Colors } from '../../../constants/Colors';
import { fontsfamily } from '../../../constants/FontFamily';
import { getTranslation } from '../../../localization/i18n/i18n.config';

interface TabsArray {
  key: string;
  name: string;
  params: undefined | object;
}

const CustomBottomTabsContainer = ({ navigation, state, descriptors }: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const bottomTabs = state.routes;

  const logosArray = [
    {
      focusImg: images.imgFocusHome,
      unFocusImg: images.imgUnFocusHome,
      tabName: getTranslation('home'),
    },
    {
      focusImg: images.imgFocusGetTested,
      unFocusImg: images.imgUnFocusGetTested,
      tabName: getTranslation('gettested'),
    },
    {
      focusImg: images.imgFocusProfile,
      unFocusImg: images.imgUnFocusProfile,
      tabName: getTranslation('yourprofile'),
    },
  ];

  const onPressBottomTab = (route: TabsArray, index: number) => {
    const isFocused = state.index === index;
    const onPress = () => {
      setTimeout(() => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }, 500);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        key={index}
        style={[
          styles.btn,
          { backgroundColor: isFocused ? Colors.grayED : Colors.white },
        ]}
        activeOpacity={0.9}
        hitSlop={hitSlop}
      >
        <Image
          source={
            isFocused
              ? logosArray[index].focusImg
              : logosArray[index].unFocusImg
          }
        />
        <Text
          style={[
            styles.lbl,
            {
              color: isFocused ? Colors.blue1C : Colors.gray75,
              fontFamily: isFocused ? fontsfamily.bold : fontsfamily.medium,
            },
          ]}
        >
          {logosArray[index].tabName}
        </Text>

      </TouchableOpacity>
    );
  };

  return (
    <CustomBottomTabsComponent
      tabs={bottomTabs}
      onPressBottomTab={onPressBottomTab}
      state={state} // 👈 important
    />
  );
};

export default CustomBottomTabsContainer;
