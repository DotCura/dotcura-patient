import {View, Text, ImageSourcePropType, Image} from 'react-native';
import React from 'react';
import {getWidth} from '../../constants/utils/Dimensions';
import BackButton from '../BackButton';
import {images} from '../../constants/Images';
import {constnatStyles} from '../../constants/Styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../constants/Colors';
import {styles} from './styles';

interface PropsType {
  dontShowStartBtn?: boolean;
  showTitle?: boolean;
  showEndBtn?: boolean;
  startBtnTitle?: string;
  startBtnOnPress?: () => void;
  isBlackLeftBtn?: boolean;
  isWhiteLeftBtn?: boolean;
  endBtnTitle?: string;
  endBtnOnPress?: () => void;
  centerTitle?: string | null;
  endBtnImage?: ImageSourcePropType;
}

const AppHeader = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.vwMain, {paddingTop: insets.top + 10}]}>
      {/* Start Button */}
      {props?.dontShowStartBtn ? (
        <Image source={images.back} style={{opacity: 0}} />
      ) : (
        <BackButton
          onPress={props?.startBtnOnPress ? props?.startBtnOnPress : () => {}}
          isBlack={props?.isBlackLeftBtn}
          isWhite={props?.isWhiteLeftBtn}
        />
      )}

      {/* Center Title */}
      {props?.showTitle ? (
        <Text
          style={[
            constnatStyles.lblHeaderTitle,
            {
              lineHeight: getWidth(24),
              color: props?.isBlackLeftBtn ? colors.black33 : colors.blue81,
            },
          ]}
          numberOfLines={2}>
          {props?.centerTitle}
        </Text>
      ) : (
        <View />
      )}

      {/* End Button */}
      {props?.showEndBtn ? (
        <BackButton
          onPress={props?.endBtnOnPress ? props?.endBtnOnPress : () => {}}
          image={props?.endBtnImage ? props?.endBtnImage : undefined}
          dontRotate
        />
      ) : (
        <Image source={images.back} style={{opacity: 0}} />
      )}
    </View>
  );
};

export default AppHeader;
