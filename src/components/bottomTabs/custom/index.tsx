// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import { styles } from './styles';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { getHeight, getWidth, ScreenDimensions } from '../../../constants/utils/Dimensions';
// import { Colors } from '../../../constants/Colors';
// import { images } from '../../../constants/Images';
// import { fontsfamily } from '../../../constants/FontFamily';
// import { getTranslation } from '../../../localization/i18n/i18n.config';
// import { activityOpacity } from '../../../constants/GConstant';

// const CustomBottomTabsComponent = (props: any) => {
//   const insets = useSafeAreaInsets();

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'center',
//         position: 'absolute',
//         bottom: 0,
//         alignSelf: 'center',
//       }}
//     >
//       <View
//         style={[
//           styles.vwTabs,
//           {
//             marginBottom:
//               insets.bottom > 0
//                 ? insets.bottom + getHeight(5)
//                 : insets.bottom + getHeight(10),
//           },
//           ,
//         ]}
//       >
//         {props?.tabs?.map((route: any, index: number) =>
//           props?.onPressBottomTab(route, index),
//         )}
//       </View>
//       {props.state.index === 1 && (
//         <TouchableOpacity
//           activeOpacity={0.9}
//           style={{
//             // paddingVertical: getHeight(8),
//             paddingHorizontal: getWidth(18),
//             height: getHeight(62),
//             backgroundColor: Colors.white,
//             alignItems: 'center',
//             alignSelf: 'center',
//             marginBottom:
//               insets.bottom > 0
//                 ? insets.bottom + getHeight(5)
//                 : insets.bottom + getHeight(10),
//             marginLeft: getWidth(20),
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.15,
//             shadowRadius: 6,
//             elevation: 8,
//             gap: getWidth(4),
//             borderRadius: 999,
//             justifyContent: 'center',
//           }}
//         >
//           <Image source={images.imgSupport} />
//           <Text
//             style={[
//               styles.lbl,
//               {
//                 color: Colors.gray75,
//                 fontFamily: fontsfamily.gmedium,
//               },
//             ]}
//           >
//             {getTranslation('support')}
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default CustomBottomTabsComponent;

import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { activityOpacity } from '../../../constants/GConstant';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants/Images';
import { fontsfamily } from '../../../constants/FontFamily';
import { getTranslation } from '../../../localization/i18n/i18n.config';

const TAB_WIDTH = getWidth(250) / 3; // 👈 3 tabs

const CustomBottomTabsComponent = (props: any) => {
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(0);

  const mapTranslateX = useSharedValue(-40); // start hidden (right)
  const mapOpacity = useSharedValue(0);

  useEffect(() => {
    if (props.state.index === 1) {
      mapTranslateX.value = withTiming(0, { duration: 400 });
      mapOpacity.value = withTiming(1, { duration: 200 });
    } else {
      mapTranslateX.value = withTiming(-40, { duration: 400 });
      mapOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [props.state.index]);

  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: mapTranslateX.value }],
      opacity: mapOpacity.value,
    };
  });

  useEffect(() => {
    translateX.value = withTiming(props.state.index * TAB_WIDTH, {
      duration: 400,
    });
  }, [props.state.index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

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
            marginBottom:
              insets.bottom > 0
                ? insets.bottom + getHeight(5)
                : insets.bottom + getHeight(10),
          },
        ]}
      >
        {/* 🔵 Animated Sliding Background */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: TAB_WIDTH,
              height: getHeight(54),
              borderRadius: 100,
              backgroundColor: Colors.grayF3,
              left: getWidth(4),
            },
            animatedStyle,
          ]}
        />

        {props.tabs.map((route: any, index: number) =>
          props.onPressBottomTab(route, index),
        )}
      </View>

      {props.state.index === 1 && (
        <Animated.View style={mapAnimatedStyle}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              // paddingVertical: getHeight(8),
              paddingHorizontal: getWidth(18),
              height: getHeight(62),
              backgroundColor: Colors.white,
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom:
                insets.bottom > 0
                  ? insets.bottom + getHeight(5)
                  : insets.bottom + getHeight(10),
              marginLeft: getWidth(8),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 8,
              gap: getWidth(4),
              borderRadius: 999,
              justifyContent: 'center',
            }}
          >
            <Image source={images.imgSupport} />
            <Text
              style={[
                styles.lbl,
                {
                  color: Colors.gray75,
                  fontFamily: fontsfamily.gmedium,
                },
              ]}
            >
              {getTranslation('support')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default CustomBottomTabsComponent;
