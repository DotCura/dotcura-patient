import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants/Images';
import { fontsfamily } from '../../../constants/FontFamily';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { activityOpacity } from '../../../constants/GConstant';

const CustomBottomTabsComponent = (props: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
      }}
    >
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
      {props.state.index === 1 && (
        <TouchableOpacity
        activeOpacity={activityOpacity}
          style={{
            paddingVertical:getHeight(8),
            paddingHorizontal:getWidth(18),
            backgroundColor: Colors.white,
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: insets.bottom + getHeight(5),
            marginLeft: getWidth(20),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 8,
            gap: getWidth(4),
            borderRadius: 999,
            justifyContent:'center',
          }}
        >
          <Image
          source={
            images.imgSupport
          }
        />
        <Text
          style={[
            styles.lbl,
            {
              color: Colors.gray75,
              fontFamily:  fontsfamily.medium,
            },
          ]}
        >
          {getTranslation("support")}
        </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomBottomTabsComponent;
