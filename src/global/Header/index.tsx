import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { activityOpacity } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';

interface PropsType {
  dontShowStartBtn?: boolean;
  showTitle?: boolean;
  showEndBtn?: boolean;
  startBtnTitle?: string;
  centerSubTitle?: string | null;
  startBtnOnPress?: () => void;
  isBlackLeftBtn?: boolean;
  isSaveIcon?: boolean;
  isWhiteLeftBtn?: boolean;
  isHelpIcon?: boolean;
  showSubTitle?: boolean;
  endBtnTitle?: string;
  endBtnOnPress?: () => void;
  centerTitle?: string | null;
  endBtnImage?: ImageSourcePropType;
  headerTextStyle?: object;
  headerSubTextStyle?: object;
}

const AppHeader = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.vwMain, { paddingTop: insets.top + 10 }]}>
      {/* Start Button */}
      {props?.dontShowStartBtn ? (
        <Image source={images.imgDelete} style={{ opacity: 0 }} />
      ) : (
        <TouchableOpacity style={styles.btnBack} onPress={props.startBtnOnPress}>
          <Image source={images.imgLeftArrow} />
        </TouchableOpacity>
      )}

      {/* Center Title */}
      {props?.showTitle ? (
        <View>
          <Text
            style={[constnatStyles.lblHeaderTitle, props?.headerTextStyle]}
            numberOfLines={2}
          >
            {props?.centerTitle}
          </Text>
          {props?.showSubTitle ? (
            <Text
              style={[
                constnatStyles.lblSubHeaderTitle,
                props?.headerSubTextStyle,
              ]}
              numberOfLines={2}
            >
              {props?.centerSubTitle}
            </Text>
          ) : null}
        </View>
      ) : (
        <View />
      )}

      {/* End Button */}
      {props?.showEndBtn ? (
        <>
          {props.isSaveIcon && (
            <TouchableOpacity
              style={styles.vwSave}
              activeOpacity={activityOpacity}
            >
              <Text style={styles.lblSave}>{getTranslation("save")}</Text>
            </TouchableOpacity>
          )}
          {props.isHelpIcon && (
            <TouchableOpacity
              style={styles.vwHelp}
              activeOpacity={activityOpacity}
            >
              <Image source={images.imgHelp} />
              <Text style={styles.lblHelp}>{getTranslation('help')}</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Image source={images.imgDelete} style={{ opacity: 0 }} />
      )}
    </View>
  );
};

export default AppHeader;
