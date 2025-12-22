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

// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect } from 'react';
// import { styles } from './styles';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { Colors } from '../../../constants/Colors';
// import { images } from '../../../constants/Images';
// import { fontsfamily } from '../../../constants/FontFamily';
// import { getTranslation } from '../../../localization/i18n/i18n.config';
// import { BlurView } from '@react-native-community/blur';
// import LinearGradient from 'react-native-linear-gradient';
// import MaskedView from '@react-native-masked-view/masked-view';
// import { useIsFocused } from '@react-navigation/native';

// const TAB_WIDTH = getWidth(250) / 3; // 👈 3 tabs

// const CustomBottomTabsComponent = (props: any) => {
//   const insets = useSafeAreaInsets();
//   const translateX = useSharedValue(0);

//   const mapTranslateX = useSharedValue(-40); // start hidden (right)
//   const mapOpacity = useSharedValue(0);

//   useEffect(() => {
//     if (props.state.index === 1) {
//       mapTranslateX.value = withTiming(0, { duration: 400 });
//       mapOpacity.value = withTiming(1, { duration: 200 });
//     } else {
//       mapTranslateX.value = withTiming(-40, { duration: 400 });
//       mapOpacity.value = withTiming(1, { duration: 200 });
//     }
//   }, [props.state.index]);

//   const mapAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: mapTranslateX.value }],
//       opacity: mapOpacity.value,
//     };
//   });

//   useEffect(() => {
//     translateX.value = withTiming(props.state.index * TAB_WIDTH, {
//       duration: 400,
//     });
//   }, [props.state.index]);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: translateX.value }],
//     };
//   });

//   const isFocused = useIsFocused();
//   return (
//     <>
//       {/* 🔹 PERFECT MASKED BLUR (NO TOP LINE) */}
//       {isFocused && (
//         <MaskedView
//           pointerEvents="none"
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             width: '100%',
//             height: getHeight(150),
//           }}
//           maskElement={
//             <LinearGradient
//               colors={[
//                 'transparent', // ❌ fully cut blur
//                 'white', // ✅ full blur
//               ]}
//               locations={[0.15, 0.9]}
//               style={{ flex: 1 }}
//             />
//           }
//         >
//           <BlurView
//             style={{ flex: 1 }}
//             blurType="light"
//             blurAmount={100}
//             blurRadius={15}
//             reducedTransparencyFallbackColor="transparent"
//           />
//         </MaskedView>
//       )}

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           position: 'absolute',
//           bottom: 0,
//           alignSelf: 'center',
//         }}
//       >
//         <View
//           style={[
//             styles.vwTabs,
//             {
//               marginBottom:
//                 insets.bottom > 0
//                   ? insets.bottom + getHeight(5)
//                   : insets.bottom + getHeight(10),
//             },
//           ]}
//         >
//           {/* 🔵 Animated Sliding Background */}
//           <Animated.View
//             style={[
//               {
//                 position: 'absolute',
//                 width: TAB_WIDTH,
//                 height: getHeight(54),
//                 borderRadius: 100,
//                 backgroundColor: Colors.grayF3,
//                 left: getWidth(4),
//               },
//               animatedStyle,
//             ]}
//           />

//           {props.tabs.map((route: any, index: number) =>
//             props.onPressBottomTab(route, index),
//           )}
//         </View>

//         {props.state.index === 1 && (
//           <Animated.View style={mapAnimatedStyle}>
//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={{
//                 // paddingVertical: getHeight(8),
//                 paddingHorizontal: getWidth(18),
//                 height: getHeight(62),
//                 backgroundColor: Colors.white,
//                 alignItems: 'center',
//                 alignSelf: 'center',
//                 marginBottom:
//                   insets.bottom > 0
//                     ? insets.bottom + getHeight(5)
//                     : insets.bottom + getHeight(10),
//                 marginLeft: getWidth(8),
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 4 },
//                 shadowOpacity: 0.15,
//                 shadowRadius: 6,
//                 elevation: 8,
//                 gap: getWidth(4),
//                 borderRadius: 999,
//                 justifyContent: 'center',
//               }}
//             >
//               <Image source={images.imgSupport} />
//               <Text
//                 style={[
//                   styles.lbl,
//                   {
//                     color: Colors.gray75,
//                     fontFamily: fontsfamily.gmedium,
//                   },
//                 ]}
//               >
//                 {getTranslation('support')}
//               </Text>
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//       </View>
//     </>
//   );
// };

// export default CustomBottomTabsComponent;

import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants/Images';
import { fontsfamily } from '../../../constants/FontFamily';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useIsFocused } from '@react-navigation/native';

const TAB_WIDTH = getWidth(250) / 3; // 👈 3 tabs

const CustomBottomTabsComponent = (props: any) => {
  const insets = useSafeAreaInsets();
  
  // === 1. Tab Indicator Animation ===
  const translateX = useSharedValue(0);

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

  // === 2. Support Button Animation Setup ===
  const mapTranslateX = useSharedValue(-40); // Slide from left
  const mapOpacity = useSharedValue(0);      // Fade
  const mapMaxWidth = useSharedValue(0);     // Collapse width
  const mapMarginLeft = useSharedValue(0);   // Collapse margin

  useEffect(() => {
    if (props.state.index === 1) {
      // === SHOW (Expand) ===
      mapTranslateX.value = withTiming(0, { duration: 400 });
      mapOpacity.value = withTiming(1, { duration: 300 });
      // Set max width large enough to fit content (e.g. 150-200)
      mapMaxWidth.value = withTiming(getWidth(200), { duration: 400 });
      mapMarginLeft.value = withTiming(getWidth(8), { duration: 400 });
    } else {
      // === HIDE (Collapse) ===
      mapTranslateX.value = withTiming(-40, { duration: 400 });
      mapOpacity.value = withTiming(0, { duration: 200 });
      mapMaxWidth.value = withTiming(0, { duration: 400 });
      mapMarginLeft.value = withTiming(0, { duration: 400 });
    }
  }, [props.state.index]);

  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: mapTranslateX.value }],
      opacity: mapOpacity.value,
      maxWidth: mapMaxWidth.value,
      marginLeft: mapMarginLeft.value,
    };
  });

  const isFocused = useIsFocused();

  return (
    <>
      {/* 🔹 PERFECT MASKED BLUR (NO TOP LINE) */}
      {isFocused && (
        <MaskedView
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: getHeight(150),
          }}
          maskElement={
            <LinearGradient
              colors={['transparent', 'white']}
              locations={[0.15, 0.9]}
              style={{ flex: 1 }}
            />
          }
        >
          <BlurView
            style={{ flex: 1 }}
            blurType="light"
            blurAmount={100}
            blurRadius={15}
            reducedTransparencyFallbackColor="transparent"
          />
        </MaskedView>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}
      >
        {/* === TABS CONTAINER === */}
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

        {/* === SUPPORT BUTTON === */}
        {/* Removed conditional check so animation can run on exit */}
        <Animated.View 
            style={[mapAnimatedStyle, { overflow: 'hidden' }]}
            pointerEvents={props.state.index === 1 ? 'auto' : 'none'}
        >
                      <TouchableOpacity
              activeOpacity={0.9}
              style={{
                // paddingVertical: getHeight(8),
                // paddingHorizontal: getWidth(18),
                width:getWidth(80),
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
              numberOfLines={1} // Prevents text wrap during collapse
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
      </View>
    </>
  );
};

export default CustomBottomTabsComponent;
