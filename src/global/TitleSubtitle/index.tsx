import { View, Text } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';

interface PropsType {
  title: string | null;
  subtitle: string | null;
}

const TitleSubtitle = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwTitleSubtitles}>
      <Text style={constnatStyles.lblMainTitle} numberOfLines={2}>
        {props?.title}
      </Text>
      <Text style={constnatStyles.lblMainSubtitle} numberOfLines={4}>
        {props?.subtitle}
      </Text>
    </View>
  );
};

export default TitleSubtitle;
