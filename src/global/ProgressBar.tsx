import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  current: number;
  total: number;
  height?: number;
  backgroundColor?: string;
  gradientColors?: string[];
}

const ProgressBar = ({
  current,
  total,
  height = 8,
  backgroundColor = '#EEF6FF',
  gradientColors = ['#0250FF', '#0022FF'],
}: Props) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 360,
        marginTop: 8,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 360,
        }}
      >
        <LinearGradient
          useAngle={true}
          angle={20}
          colors={gradientColors}
          style={{
            height,
            borderRadius: 100,
            width: `${progress}%`,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
