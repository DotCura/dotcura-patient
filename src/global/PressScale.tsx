import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

interface PressScaleProps {
  children: React.ReactNode;
  onPress?: () => void;
  scaleTo?: number;
}

const PressScale = ({
  children,
  onPress,
  scaleTo = 0.85,
}: PressScaleProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default PressScale;
