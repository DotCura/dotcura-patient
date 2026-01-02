// import { Image, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import { styles } from './styles';
// import { activityOpacity } from '../../constants/GConstant';

// const CustomButton = (props: any) => {
//   const { style, textStyle, imgstyle } = props;
//   return (
//     <TouchableOpacity
//       onPress={props.btnPress}
//       activeOpacity={activityOpacity}
//       style={[styles.btn, style]}
//     >
//       <View style={styles.vwBtn}>
//         <View>
//           {props.btnicon && (
//             <Image
//               source={props.btnImage}
//               style={[styles.imgIcon, imgstyle]}
//             ></Image>
//           )}
//         </View>
//         <Text numberOfLines={1} style={[styles.lblTitle, textStyle]}>
//           {props.btnTitle}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;
import { Image, Text, TouchableOpacity, View, Animated } from 'react-native';
import React, { useRef } from 'react';
import { styles } from './styles';
import { activityOpacity, activityOpacitybtn } from '../../constants/GConstant';

const CustomButton = (props: any) => {
  const { style, textStyle, imgstyle } = props;

  // 👇 Scale value
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85, // 👈 resize smaller
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // 👈 back to normal
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={props.btnPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={activityOpacitybtn}
        style={[styles.btn, style]}
      >
        <View style={styles.vwBtn}>
          <View>
          {props.btnicon && (
            <Image
              source={props.btnImage}
              style={[styles.imgIcon, imgstyle]}
            />
          )}
          </View>

          <Text numberOfLines={1} style={[styles.lblTitle, textStyle]}>
            {props.btnTitle}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;
