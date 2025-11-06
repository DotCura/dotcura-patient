import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight } from '../../../constants/utils/Dimensions';

const CustomBottomTabsComponent = (props: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.vwTabs,
        {
          marginBottom: insets.bottom + getHeight(5),
        },
        ,
      ]}
    >
      {props?.tabs?.map((route: any, index: number) =>
        props?.onPressBottomTab(route, index),
      )}
    </View>
  );
};

export default CustomBottomTabsComponent;
