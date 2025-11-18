import { View, Text } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';

interface PropsType {
  title: string | null;
  subtitle: string | null;
  subtitleTwo?: string | null;
  isAdd?: boolean | false;
}

const ModalTitleSubtitle = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwTitleSubtitles}>
      <Text style={constnatStyles.lblModalTitle}>{props?.title}</Text>
      {props.subtitle && (
        <Text style={constnatStyles.lblModalSubTitle}>
          {props?.subtitle + ' '}
          {props?.isAdd === true && props?.subtitleTwo}
        </Text>
      )}
    </View>
  );
};

export default ModalTitleSubtitle;
