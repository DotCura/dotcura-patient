// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Colors } from '../../constants/Colors';
// import { images } from '../../constants/Images';
// import { fontSize } from '../../constants/FontSizes';
// import { fontsfamily } from '../../constants/FontFamily';
// import { getHeight, getWidth } from '../../constants/utils/Dimensions';
// import { getTranslation } from '../../localization/i18n/i18n.config';
// import { activityOpacity } from '../../constants/GConstant';

// const OrderStatusComponent = (props: any) => {
//   const insets = useSafeAreaInsets();
//   const [showBigView, setShowBigView] = useState(false);

//   const ProgressBar = ({ currentStep, totalSteps = 5 }: any) => {
//     const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

//     return (
//       <View style={styles.progressBarContainer}>
//         {steps.map((step, index) => (
//           <View
//             key={index}
//             style={[
//               styles.progressStep,
//               index <= currentStep && styles.progressStepActive,
//             ]}
//           />
//         ))}
//       </View>
//     );
//   };

//   return (
//     <TouchableOpacity
//       onPress={() => setShowBigView(!showBigView)}
//       activeOpacity={activityOpacity}
//       style={[styles.container, { paddingTop: insets.top }]}
//     >
//       {/* BIG VIEW */}
//       {showBigView && (
//         <View style={styles.bigViewContainer}>
//           <View style={styles.headerRow}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.titleOrderStatus}>
//                 {props.orderStatus === 'order_sent'
//                   ? getTranslation('ordersent')
//                   : props.orderStatus === 'order_confirm'
//                   ? 'orderconfirm'
//                   : null}
//               </Text>
//               <Text style={styles.titleOrderStatusDes}>
//                 {getTranslation('ordersentsubtitle')}
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={styles.toggleButton}
//               onPress={() => setShowBigView(false)}
//             >
//               <Image
//                 source={images.imgLeftArrow}
//                 tintColor={Colors.white}
//                 style={{ transform: [{ rotate: '90deg' }] }}
//               />
//             </TouchableOpacity>
//           </View>

//           <Image source={images.imgStepper} style={styles.progressImage} />

//           <TouchableOpacity style={styles.editButton}>
//             <Image source={images.pencilblue} tintColor={Colors.white} />
//             <Text style={styles.lblEditOrder}>
//               {getTranslation('editorder')}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* SMALL VIEW */}
//       {!showBigView && (
//         <View style={styles.smallViewContainer}>
//           <View style={styles.headerRow}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.lblOrderTitleSmall}>Order sent</Text>
//               <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
//                 We are looking for a nurse for you...
//               </Text>
//               <ProgressBar currentStep={1} />
//             </View>

//             <TouchableOpacity
//               onPress={() => setShowBigView(true)}
//               style={styles.toggleButton}
//             >
//               <Image
//                 source={images.imgLeftArrow}
//                 tintColor={Colors.white}
//                 style={{ transform: [{ rotate: '270deg' }] }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// };

// export default OrderStatusComponent;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.black,
//     paddingBottom: getHeight(30),
//   },
//   bigViewContainer: {
//     paddingHorizontal: 16,
//   },
//   smallViewContainer: {
//     paddingHorizontal: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   toggleButton: {
//     height: 36,
//     width: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF14',
//     borderRadius: 100,
//     marginLeft: 12,
//   },
//   titleOrderStatus: {
//     fontSize: fontSize.size28,
//     fontFamily: fontsfamily.bold,
//     color: Colors.white,
//   },
//   titleOrderStatusDes: {
//     fontSize: fontSize.size16,
//     fontFamily: fontsfamily.regular,
//     color: Colors.grayAD,
//     marginTop: getHeight(4),
//   },
//   progressImage: {
//     width: '100%',
//     marginTop: 20,
//   },
//   editButton: {
//     backgroundColor: Colors.white08,
//     height: getHeight(48),
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: getHeight(16),
//     flexDirection: 'row',
//     gap: getWidth(6),
//   },
//   lblEditOrder: {
//     fontSize: fontSize.size16,
//     fontFamily: fontsfamily.medium,
//     color: Colors.white,
//   },
//   lblOrderTitleSmall: {
//     fontSize: fontSize.size14,
//     fontFamily: fontsfamily.bold,
//     color: Colors.lightBlurE4,
//   },
//   lblOrderDesSmall: {
//     fontSize: fontSize.size12,
//     fontFamily: fontsfamily.regular,
//     color: Colors.greyC5,
//   },
//   progressBarContainer: {
//     flexDirection: 'row',
//     marginTop: getHeight(8),
//     gap: 4,
//   },
//   progressStep: {
//     height: 4,
//     flex: 1,
//     backgroundColor: Colors.grey29,
//     borderRadius: 2,
//   },
//   progressStepActive: {
//     backgroundColor: Colors.goldenE8,
//   },
// });


//nice spring animation

// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';
// import { Colors } from '../../constants/Colors';
// import { images } from '../../constants/Images';
// import { fontSize } from '../../constants/FontSizes';
// import { fontsfamily } from '../../constants/FontFamily';
// import { getHeight, getWidth } from '../../constants/utils/Dimensions';
// import { getTranslation } from '../../localization/i18n/i18n.config';
// import { activityOpacity } from '../../constants/GConstant';

// const OrderStatusComponent = (props: any) => {
//   const insets = useSafeAreaInsets();
//   const [showBigView, setShowBigView] = useState(false);

//   // Animated values
//   const expandedHeight = useSharedValue(0);
//   const collapsedHeight = useSharedValue(0);
//   const animatedHeight = useSharedValue(0);
//   const bigViewOpacity = useSharedValue(0);
//   const smallViewOpacity = useSharedValue(1);
//   const rotateValue = useSharedValue(0);

//   const toggleView = () => {
//     if (!showBigView) {
//       // Expanding
//       rotateValue.value = withSpring(1, { damping: 15, stiffness: 150 });
//       animatedHeight.value = withSpring(expandedHeight.value, {
//         damping: 20,
//         stiffness: 120,
//       });
//       smallViewOpacity.value = withTiming(0, { duration: 200 });
//       bigViewOpacity.value = withTiming(1, { duration: 300 }, () => {
//         runOnJS(setShowBigView)(true);
//       });
//     } else {
//       // Collapsing
//       rotateValue.value = withSpring(0, { damping: 15, stiffness: 150 });
//       animatedHeight.value = withSpring(collapsedHeight.value, {
//         damping: 20,
//         stiffness: 120,
//       });
//       bigViewOpacity.value = withTiming(0, { duration: 200 });
//       smallViewOpacity.value = withTiming(1, { duration: 300 }, () => {
//         runOnJS(setShowBigView)(false);
//       });
//     }
//   };

//   // Animated styles
//   const containerAnimatedStyle = useAnimatedStyle(() => ({
//     height: animatedHeight.value > 0 ? animatedHeight.value : 'auto',
//     overflow: 'hidden',
//   }));

//   const bigViewAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: bigViewOpacity.value,
//     transform: [{ scale: 0.95 + bigViewOpacity.value * 0.05 }],
//   }));

//   const smallViewAnimatedStyle = useAnimatedStyle(() => ({
//     opacity: smallViewOpacity.value,
//     transform: [{ scale: 0.95 + smallViewOpacity.value * 0.05 }],
//   }));

//   const arrowAnimatedStyle = useAnimatedStyle(() => ({
//     transform: [{ rotate: `${rotateValue.value * 180}deg` }],
//   }));

//   const ProgressBar = ({ currentStep, totalSteps = 5 }: any) => {
//     const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

//     return (
//       <View style={styles.progressBarContainer}>
//         {steps.map((step, index) => (
//           <View
//             key={index}
//             style={[
//               styles.progressStep,
//               index <= currentStep && styles.progressStepActive,
//             ]}
//           />
//         ))}
//       </View>
//     );
//   };

//   return (
//     <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
//       <TouchableOpacity
//         onPress={toggleView}
//         activeOpacity={activityOpacity}
//         style={styles.touchableArea}
//       >
//         <Animated.View style={containerAnimatedStyle}>
//           {/* BIG VIEW */}
//           <Animated.View
//             style={[styles.bigViewContainer, bigViewAnimatedStyle]}
//             onLayout={(event) => {
//               if (expandedHeight.value === 0) {
//                 expandedHeight.value = event.nativeEvent.layout.height;
//                 if (!showBigView && animatedHeight.value === 0) {
//                   animatedHeight.value = collapsedHeight.value;
//                 }
//               }
//             }}
//             pointerEvents={showBigView ? 'auto' : 'none'}
//           >
//             <View style={styles.headerRow}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.titleOrderStatus}>
//                   {props.orderStatus === 'order_sent'
//                     ? getTranslation('ordersent')
//                     : props.orderStatus === 'order_confirm'
//                     ? 'orderconfirm'
//                     : null}
//                 </Text>
//                 <Text style={styles.titleOrderStatusDes}>
//                   {getTranslation('ordersentsubtitle')}
//                 </Text>
//               </View>

//               <View style={styles.toggleButton}>
//                 <Animated.View style={arrowAnimatedStyle}>
//                   <Image
//                     source={images.imgLeftArrow}
//                     tintColor={Colors.white}
//                     style={styles.arrowIcon}
//                   />
//                 </Animated.View>
//               </View>
//             </View>

//             <Image source={images.imgStepper} style={styles.progressImage} />

//             <TouchableOpacity style={styles.editButton}>
//               <Image source={images.pencilblue} tintColor={Colors.white} />
//               <Text style={styles.lblEditOrder}>
//                 {getTranslation('editorder')}
//               </Text>
//             </TouchableOpacity>
//           </Animated.View>

//           {/* SMALL VIEW */}
//           <Animated.View
//             style={[
//               styles.smallViewContainer,
//               smallViewAnimatedStyle,
//               { position: showBigView ? 'absolute' : 'relative' },
//             ]}
//             onLayout={(event) => {
//               if (collapsedHeight.value === 0) {
//                 collapsedHeight.value = event.nativeEvent.layout.height;
//                 animatedHeight.value = event.nativeEvent.layout.height;
//               }
//             }}
//             pointerEvents={!showBigView ? 'auto' : 'none'}
//           >
//             <View style={styles.headerRow}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.lblOrderTitleSmall}>Order sent</Text>
//                 <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
//                   We are looking for a nurse for you...
//                 </Text>
//                 <ProgressBar currentStep={1} />
//               </View>

//               <View style={styles.toggleButton}>
//                 <Animated.View style={arrowAnimatedStyle}>
//                   <Image
//                     source={images.imgLeftArrow}
//                     tintColor={Colors.white}
//                     style={styles.arrowIcon}
//                   />
//                 </Animated.View>
//               </View>
//             </View>
//           </Animated.View>
//         </Animated.View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// export default OrderStatusComponent;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.black,
//     paddingBottom: getHeight(30),
//   },
//   touchableArea: {
//     width: '100%',
//   },
//   bigViewContainer: {
//     paddingHorizontal: 16,
//   },
//   smallViewContainer: {
//     paddingHorizontal: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   toggleButton: {
//     height: 36,
//     width: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF14',
//     borderRadius: 100,
//     marginLeft: 12,
//   },
//   arrowIcon: {
//     transform: [{ rotate: '90deg' }],
//   },
//   titleOrderStatus: {
//     fontSize: fontSize.size28,
//     fontFamily: fontsfamily.bold,
//     color: Colors.white,
//   },
//   titleOrderStatusDes: {
//     fontSize: fontSize.size16,
//     fontFamily: fontsfamily.regular,
//     color: Colors.grayAD,
//     marginTop: getHeight(4),
//   },
//   progressImage: {
//     width: '100%',
//     marginTop: 20,
//   },
//   editButton: {
//     backgroundColor: Colors.white08,
//     height: getHeight(48),
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: getHeight(16),
//     flexDirection: 'row',
//     gap: getWidth(6),
//   },
//   lblEditOrder: {
//     fontSize: fontSize.size16,
//     fontFamily: fontsfamily.medium,
//     color: Colors.white,
//   },
//   lblOrderTitleSmall: {
//     fontSize: fontSize.size14,
//     fontFamily: fontsfamily.bold,
//     color: Colors.lightBlurE4,
//   },
//   lblOrderDesSmall: {
//     fontSize: fontSize.size12,
//     fontFamily: fontsfamily.regular,
//     color: Colors.greyC5,
//   },
//   progressBarContainer: {
//     flexDirection: 'row',
//     marginTop: getHeight(8),
//     gap: 4,
//   },
//   progressStep: {
//     height: 4,
//     flex: 1,
//     backgroundColor: Colors.grey29,
//     borderRadius: 2,
//   },
//   progressStepActive: {
//     backgroundColor: Colors.goldenE8,
//   },
// });

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { activityOpacity } from '../../constants/GConstant';

const OrderStatusComponent = (props: any) => {
  const insets = useSafeAreaInsets();
  const [showBigView, setShowBigView] = useState(false);
  const [isReady, setIsReady] = useState(false); // Track if heights are measured

  // Animated values
  const expandedHeight = useSharedValue(0);
  const collapsedHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(-1); // Start with -1 to indicate "not set"
  const bigViewOpacity = useSharedValue(0);
  const smallViewOpacity = useSharedValue(1);
  const rotateValue = useSharedValue(0);

  const toggleView = () => {
    if (!showBigView) {
      // Expanding
      setShowBigView(true);
      rotateValue.value = withSpring(1, { damping: 10, stiffness: 150 });
      animatedHeight.value = withSpring(expandedHeight.value, {
        damping: 80,
        stiffness: 120,
      });
      smallViewOpacity.value = withTiming(0, { duration: 100 });
      bigViewOpacity.value = withTiming(1, { duration: 100 });
    } else {
      // Collapsing
      rotateValue.value = withSpring(0, { damping: 10, stiffness: 150 });
      animatedHeight.value = withSpring(collapsedHeight.value, {
        damping: 80,
        stiffness: 120,
      });
      bigViewOpacity.value = withTiming(0, { duration: 100 });
      smallViewOpacity.value = withTiming(1, { duration: 100 }, () => {
        runOnJS(setShowBigView)(false);
      });
    }
  };

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Only apply height constraint after initial measurement
    if (animatedHeight.value === -1) {
      return { overflow: 'hidden' };
    }
    return {
      height: animatedHeight.value,
      overflow: 'hidden',
    };
  });

  const bigViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bigViewOpacity.value,
    transform: [{ scale: 0.95 + bigViewOpacity.value * 0.05 }],
  }));

  const smallViewAnimatedStyle = useAnimatedStyle(() => ({
    opacity: smallViewOpacity.value,
    transform: [{ scale: 0.95 + smallViewOpacity.value * 0.05 }],
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value * 180}deg` }],
  }));

  const ProgressBar = ({ currentStep, totalSteps = 5 }: any) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index <= currentStep && styles.progressStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        onPress={toggleView}
        activeOpacity={activityOpacity}
        style={styles.touchableArea}
      >
        <Animated.View style={containerAnimatedStyle}>
          {/* SMALL VIEW - Always render first to measure */}
          <Animated.View
            style={[
              styles.smallViewContainer,
              smallViewAnimatedStyle,
              showBigView && { position: 'absolute', top: 0, left: 0, right: 0 },
            ]}
            onLayout={(event) => {
              if (collapsedHeight.value === 0) {
                const height = event.nativeEvent.layout.height;
                collapsedHeight.value = height;
                if (animatedHeight.value === -1) {
                  animatedHeight.value = height;
                  setIsReady(true);
                }
              }
            }}
            pointerEvents={!showBigView ? 'auto' : 'none'}
          >
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.lblOrderTitleSmall}>Order sent</Text>
                <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
                  We are looking for a nurse for you...
                </Text>
                <ProgressBar currentStep={1} />
              </View>

              <View style={styles.toggleButton}>
                <Animated.View style={arrowAnimatedStyle}>
                  <Image
                    source={images.imgLeftArrow}
                    tintColor={Colors.white}
                    style={styles.arrowIcon}
                  />
                </Animated.View>
              </View>
            </View>
          </Animated.View>

          {/* BIG VIEW */}
          <Animated.View
            style={[
              styles.bigViewContainer,
              bigViewAnimatedStyle,
              !showBigView && { position: 'absolute', top: 0, left: 0, right: 0 },
            ]}
            onLayout={(event) => {
              if (expandedHeight.value === 0) {
                expandedHeight.value = event.nativeEvent.layout.height;
              }
            }}
            pointerEvents={showBigView ? 'auto' : 'none'}
          >
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.titleOrderStatus}>
                  {props.orderStatus === 'order_sent'
                    ? getTranslation('ordersent')
                    : props.orderStatus === 'order_confirm'
                    ? 'orderconfirm'
                    : null}
                </Text>
                <Text style={styles.titleOrderStatusDes}>
                  {getTranslation('ordersentsubtitle')}
                </Text>
              </View>

              <View style={styles.toggleButton}>
                <Animated.View style={arrowAnimatedStyle}>
                  <Image
                    source={images.imgLeftArrow}
                    tintColor={Colors.white}
                    style={styles.arrowIcon}
                  />
                </Animated.View>
              </View>
            </View>

            <Image source={images.imgStepper} style={styles.progressImage} />

            <TouchableOpacity style={styles.editButton}>
              <Image source={images.pencilblue} tintColor={Colors.white} />
              <Text style={styles.lblEditOrder}>
                {getTranslation('editorder')}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default OrderStatusComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingBottom: getHeight(30),
  },
  touchableArea: {
    width: '100%',
  },
  bigViewContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  smallViewContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  toggleButton: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF14',
    borderRadius: 100,
    marginLeft: 12,
  },
  arrowIcon: {
    transform: [{ rotate: '90deg' }],
  },
  titleOrderStatus: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.white,
  },
  titleOrderStatusDes: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.grayAD,
    marginTop: getHeight(4),
  },
  progressImage: {
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: Colors.white08,
    height: getHeight(48),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeight(16),
    flexDirection: 'row',
    gap: getWidth(6),
  },
  lblEditOrder: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.white,
  },
  lblOrderTitleSmall: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    color: Colors.lightBlurE4,
  },
  lblOrderDesSmall: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.greyC5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: getHeight(8),
    gap: 4,
  },
  progressStep: {
    height: 4,
    flex: 1,
    backgroundColor: Colors.grey29,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: Colors.goldenE8,
  },
});
