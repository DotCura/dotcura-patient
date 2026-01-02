import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomButton from '../../../global/Buttons';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { activityOpacity } from '../../../constants/GConstant';
import { images } from '../../../constants/Images';

const IntroComponent = (props: any) => {
  return (
    <View style={styles.container}>
      {/* centerview */}
      <View style={{ flex: 1, marginTop: props.insets.top + getHeight(126) }}>
        <View style={styles.vwImgOnboarding}>
          <View style={styles.imageContainer}>
            <Image
              source={images.imgOmBoarding1}
              style={[
                styles.onboardingImage,
                {
                  resizeMode: 'stretch',
                },
              ]}
            />
          </View>

          <View style={[styles.contentContainer]}>
            <Text style={styles.txtTitle} numberOfLines={2}>
              {getTranslation('introtitle')}
            </Text>
            <Text style={styles.txtSubtitle} numberOfLines={4}>
              {getTranslation('introsubtitle')}
            </Text>
          </View>
        </View>
      </View>
      {/* next btn */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: props.insets.bottom + getHeight(10),
          },
        ]}
      >
        <CustomButton
          btnPress={props.handleNext}
          btnTitle={getTranslation('continue')}
        />
        <CustomButton
          style={{ backgroundColor: Colors.blueDC }}
          textStyle={{ color: Colors.gray0F }}
          btnPress={props.handleSkip}
          btnTitle={getTranslation('skip')}
        />
      </View>
    </View>
  );
};

export default IntroComponent;
