// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState, useMemo, useEffect } from 'react';
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
// import { ZustandStores } from '../../store';

// const OrderStatusComponent = ({
//   orderStatus,
// }: {
//   orderStatus: string;
// }) => {
//   // Status configuration
//   const orderData :any = ZustandStores.OrderstatusStore(state => state.orderData);

//   let STATUS_CONFIG = {
//     Request: {
//       title: getTranslation('ordersent'),
//       subtitle: getTranslation('ordersentsubtitle'),
//       image: images.imgStepper,
//       currentStep: 0,
//       showEdit: true,
//       showSmallProgressBar: true,
//     },
//     Accept: {
//       title: getTranslation('visitconfirm'),
//       subtitle: getTranslation('visitconfirmsubtitle'),
//       image: images.imgvisitconfirmstepper,
//       currentStep: 1,
//       showEdit: true,
//       showSmallProgressBar: true,
//     },
//     start_visit: {
//       title: orderData?.time, // "20-30 minuti"
//       subtitle: getTranslation('minitarrivesubtitle'),
//       image: images.imgstartvisitstepper,
//       currentStep: 2,
//       showEdit: false,
//       showSmallProgressBar: true,
//     },
//     arrived: {
//       title:`${orderData?.name} + ${getTranslation('ishere')}`,
//       subtitle: getTranslation('isheresubtitle'),
//       image: images.imgstartvisitstepper,
//       currentStep: 3,
//       showEdit: false,
//       showSmallProgressBar: true,
//     },
//     Modified: {
//       title: getTranslation('visitmodified'),
//       subtitle: getTranslation('visitmodifiedsubtitle'),
//       image: images.imgeditorderstepper,
//       currentStep: 1,
//       showEdit: false,
//       showSmallProgressBar: false,
//     },
//     Rejected: {
//       title: getTranslation('canclevisit'),
//       subtitle: getTranslation('canclevisitsubtitle'),
//       image: images.imgcanclevisitstepper,
//       currentStep: 0,
//       showEdit: false,
//       showSmallProgressBar: false,
//     },
//   };

//   const insets = useSafeAreaInsets();
//   const [showBigView, setShowBigView] = useState(false);
//   console.log('orderdata', orderData);

//   // Get status config
//   const config = useMemo(() => {
//     const statusConfig =
//       STATUS_CONFIG[orderStatus as keyof typeof STATUS_CONFIG];
//     return statusConfig || STATUS_CONFIG.Request;
//   }, [orderStatus]);

//   // Animated values
//   const expandedHeight = useSharedValue(0);
//   const collapsedHeight = useSharedValue(0);
//   const animatedHeight = useSharedValue(-1);
//   const bigViewOpacity = useSharedValue(0);
//   const smallViewOpacity = useSharedValue(1);
//   const rotateValue = useSharedValue(0);

//   const toggleView = () => {
//     if (!showBigView) {
//       setShowBigView(true);
//       rotateValue.value = withSpring(1, { damping: 10, stiffness: 150 });
//       animatedHeight.value = withSpring(expandedHeight.value, {
//         damping: 80,
//         stiffness: 120,
//       });
//       smallViewOpacity.value = withTiming(0, { duration: 100 });
//       bigViewOpacity.value = withTiming(1, { duration: 100 });
//     } else {
//       rotateValue.value = withSpring(0, { damping: 10, stiffness: 150 });
//       animatedHeight.value = withSpring(collapsedHeight.value, {
//         damping: 80,
//         stiffness: 120,
//       });
//       bigViewOpacity.value = withTiming(0, { duration: 100 });
//       smallViewOpacity.value = withTiming(1, { duration: 100 }, () => {
//         runOnJS(setShowBigView)(false);
//       });
//     }
//   };

//   const containerAnimatedStyle = useAnimatedStyle(() => {
//     if (animatedHeight.value === -1) {
//       return { overflow: 'hidden' };
//     }
//     return {
//       height: animatedHeight.value,
//       overflow: 'hidden',
//     };
//   });

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

//   const ProgressBar = ({ currentStep, totalSteps = 4 }: any) => {
//     const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

//     return (
//       <View style={styles.progressBarContainer}>
//         {steps.map((step, index) => (
//           <View
//             key={index}
//             style={[
//               styles.progressStep,
//               index <= currentStep && styles.progressStepActive,

//               index <= currentStep && {
//                 backgroundColor:
//                   currentStep === 0
//                     ? Colors.goldenE8
//                     : currentStep === 1
//                     ? Colors.blue3C
//                     : currentStep === 2
//                     ? Colors.green3C
//                     : currentStep === 3
//                     ? Colors.green3C
//                     : '',
//               },
//             ]}
//           />
//         ))}
//       </View>
//     );
//   };

//   // Get title (handle function titles like for 'arrived')
//   // const getTitle = () => {
//   //   if (typeof config.title === 'function') {
//   //     return config.title(orderData?.name); // Replace with actual nurse name from orderData
//   //   }
//   //   return config.title;
//   // };

//   return (
//     <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
//       <TouchableOpacity
//         onPress={toggleView}
//         activeOpacity={activityOpacity}
//         style={styles.touchableArea}
//       >
//         <Animated.View style={containerAnimatedStyle}>
//           {/* SMALL VIEW */}
//           <Animated.View
//             style={[
//               styles.smallViewContainer,
//               smallViewAnimatedStyle,
//               showBigView && {
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//               },
//             ]}
//             onLayout={event => {
//               if (collapsedHeight.value === 0) {
//                 const height = event.nativeEvent.layout.height;
//                 collapsedHeight.value = height;
//                 if (animatedHeight.value === -1) {
//                   animatedHeight.value = height;
//                 }
//               }
//             }}
//             pointerEvents={!showBigView ? 'auto' : 'none'}
//           >
//             <View style={styles.headerRow}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.lblOrderTitleSmall}>{config.title}</Text>
//                 <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
//                   {config.subtitle}
//                 </Text>
//                 {config.showSmallProgressBar && (
//                   <ProgressBar currentStep={config.currentStep} />
//                 )}
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

//           {/* BIG VIEW */}
//           <Animated.View
//             style={[
//               styles.bigViewContainer,
//               bigViewAnimatedStyle,
//               !showBigView && {
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//               },
//             ]}
//             onLayout={event => {
//               if (expandedHeight.value === 0) {
//                 expandedHeight.value = event.nativeEvent.layout.height;
//               }
//             }}
//             pointerEvents={showBigView ? 'auto' : 'none'}
//           >
//             <View style={styles.headerRow}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.titleOrderStatus}>{config.title}</Text>
//                 <Text style={styles.titleOrderStatusDes}>
//                   {config.subtitle}
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

//             <Image source={config.image} style={styles.progressImage} />

//             {config.showEdit && (
//               <TouchableOpacity style={styles.editButton}>
//                 <Image source={images.pencilblue} tintColor={Colors.white} />
//                 <Text style={styles.lblEditOrder}>
//                   {getTranslation('editorder')}
//                 </Text>
//               </TouchableOpacity>
//             )}
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
//     width: '100%',
//   },
//   smallViewContainer: {
//     paddingHorizontal: 16,
//     width: '100%',
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
import React, { useState, useMemo, memo, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { ZustandStores } from '../../store';
import { ScreenNames } from '../../constants/AppConstants';
import { navigationRef } from '../../constants/utils/navigationRef';

interface OrderStatusComponentProps {
  orderStatus: string;
}

const OrderStatusComponent = memo(
  ({ orderStatus }: OrderStatusComponentProps) => {
    console.log('🎯 OrderStatusComponent render - status:', orderStatus);

    // Get order data from store
    const orderData: any = ZustandStores.OrderstatusStore(
      state => state.orderData,
    );
    console.log(
      '🚀 ~ file: index.tsx:75 ~ OrderStatusComponent ~ orderData:',
      orderData,
    );

    // Status configuration - memoized to prevent recalculation
    const STATUS_CONFIG = useMemo(
      () => ({
        Request: {
          title: getTranslation('ordersent'),
          subtitle: getTranslation('ordersentsubtitle'),
          image: images.imgStepper,
          currentStep: 0,
          showEdit: true,
          showSmallProgressBar: true,
        },
        Accept: {
          title: getTranslation('visitconfirm'),
          subtitle: getTranslation('visitconfirmsubtitle'),
          image: images.imgvisitconfirmstepper,
          currentStep: 1,
          showEdit: true,
          showSmallProgressBar: true,
        },
        start_visit: {
          title: orderData?.time || '20-30 minuti',
          subtitle: getTranslation('minitarrivesubtitle'),
          image: images.imgstartvisitstepper,
          currentStep: 2,
          showEdit: false,
          showSmallProgressBar: true,
        },
        arrived: {
          title: `${orderData?.name || 'Nurse'} ${getTranslation('ishere')}`,
          subtitle: getTranslation('isheresubtitle'),
          image: images.imgnursearrivedstepper,
          currentStep: 3,
          showEdit: false,
          showSmallProgressBar: true,
        },
        Modified: {
          title: getTranslation('visitmodified'),
          subtitle: getTranslation('visitmodifiedsubtitle'),
          image: images.imgeditorderstepper,
          currentStep: 1,
          showEdit: true,
          showSmallProgressBar: false,
        },
        Rejected: {
          title: getTranslation('canclevisit'),
          subtitle: getTranslation('canclevisitsubtitle'),
          image: images.imgcanclevisitstepper,
          currentStep: 0,
          showEdit: false,
          showSmallProgressBar: false,
        },
      }),
      [orderData?.time, orderData?.name],
    );

    const insets = useSafeAreaInsets();
    const [showBigView, setShowBigView] = useState(false);

    // Get status config - memoized
    const config = useMemo(() => {
      const statusConfig =
        STATUS_CONFIG[orderStatus as keyof typeof STATUS_CONFIG];
      return statusConfig || STATUS_CONFIG.Request;
    }, [orderStatus, STATUS_CONFIG]);

    // Animated values
    const expandedHeight = useSharedValue(0);

    // Reset expandedHeight when config changes when the show edit btn hide and show
    useEffect(() => {
      expandedHeight.value = 0;
    }, [config.showEdit]);

    const collapsedHeight = useSharedValue(0);
    const animatedHeight = useSharedValue(-1);
    const bigViewOpacity = useSharedValue(0);
    const smallViewOpacity = useSharedValue(1);
    const rotateValue = useSharedValue(0);

    const toggleView = () => {
      if (!showBigView) {
        setShowBigView(true);
        rotateValue.value = withSpring(1, { damping: 10, stiffness: 150 });
        animatedHeight.value = withSpring(expandedHeight.value, {
          damping: 80,
          stiffness: 120,
        });
        smallViewOpacity.value = withTiming(0, { duration: 100 });
        bigViewOpacity.value = withTiming(1, { duration: 100 });
      } else {
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

    const containerAnimatedStyle = useAnimatedStyle(() => {
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

    // Memoized ProgressBar component
    const ProgressBar = memo(({ currentStep, totalSteps = 4 }: any) => {
      const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

      return (
        <View style={styles.progressBarContainer}>
          {steps.map((step, index) => (
            <View
              key={index}
              style={[
                styles.progressStep,
                index <= currentStep && styles.progressStepActive,
                index <= currentStep && {
                  backgroundColor:
                    currentStep === 0
                      ? Colors.goldenE8
                      : currentStep === 1
                      ? Colors.blue3C
                      : currentStep === 2
                      ? Colors.green3C
                      : currentStep === 3
                      ? Colors.green3C
                      : Colors.goldenE8,
                },
              ]}
            />
          ))}
        </View>
      );
    });

    ProgressBar.displayName = 'ProgressBar';

    return (
      <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={toggleView}
          activeOpacity={activityOpacity}
          style={styles.touchableArea}
        >
          <Animated.View style={containerAnimatedStyle}>
            {/* SMALL VIEW */}
            <Animated.View
              style={[
                styles.smallViewContainer,
                smallViewAnimatedStyle,
                showBigView && {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                },
              ]}
              onLayout={event => {
                if (collapsedHeight.value === 0) {
                  const height = event.nativeEvent.layout.height;
                  collapsedHeight.value = height;
                  if (animatedHeight.value === -1) {
                    animatedHeight.value = height;
                  }
                }
              }}
              pointerEvents={!showBigView ? 'auto' : 'none'}
            >
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lblOrderTitleSmall}>{config.title}</Text>
                  <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
                    {config.subtitle}
                  </Text>
                  {config.showSmallProgressBar && (
                    <ProgressBar currentStep={config.currentStep} />
                  )}
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
                !showBigView && {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                },
              ]}
              onLayout={event => {
                if (expandedHeight.value === 0) {
                  expandedHeight.value = event.nativeEvent.layout.height;
                }
              }}
              pointerEvents={showBigView ? 'auto' : 'none'}
            >
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleOrderStatus}>{config.title}</Text>
                  <Text style={styles.titleOrderStatusDes}>
                    {config.subtitle}
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

              <Image
                source={config.image}
                style={
                  orderStatus === 'arrived'
                    ? styles.progressImage2
                    : styles.progressImage
                }
              />

              {config.showEdit && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    navigationRef.navigate(ScreenNames.EDITORDERCONTAINER, {
                      booking_order_id: orderData?.booking_id,
                    });
                  }}
                >
                  <Image source={images.pencilblue} tintColor={Colors.white} />
                  <Text style={styles.lblEditOrder}>
                    {getTranslation('editorder')}
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if orderStatus actually changes
    return prevProps.orderStatus === nextProps.orderStatus;
  },
);

OrderStatusComponent.displayName = 'OrderStatusComponent';

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
  progressImage2: {
    marginBottom: 20,
    resizeMode: 'stretch',
    width: '100%',
    height: 40,
    marginTop: 20,
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
