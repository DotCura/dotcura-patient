import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import TopBar from '../../../global/TopBar/TopBar';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import CustomButton from '../../../global/Buttons';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import { ScreenNames } from '../../../constants/AppConstants';
import { GlobalVar } from '../../../constants/GlobalVar';

const InformationConasantComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
      <View style={{ marginHorizontal: getWidth(16) }}>
        {/* TopBar */}
        <TopBar
          array={props.headerArray}
          currentIndex={1}
          onClickBack={() => props.navigation.goBack()}
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {/* HeaderView */}
          <View style={styles.vwHeader}>
            <TitleSubtitle
              title={getTranslation('infotitle')}
              subtitle={getTranslation('infosubtitle')}
            />
          </View>

          {/* vwInfoConstant */}
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <TouchableOpacity
                onPress={() =>
                  props.setIsPrivacyAccepted(!props.isPrivacyAccepted)
                }
                style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
              >
                <Image
                  source={
                    props.isPrivacyAccepted
                      ? images.imgSelectRadio
                      : images.imgUnselectRadio
                  }
                />
              </TouchableOpacity>
              <Text style={styles.optionText}>
                {getTranslation('constant1')}
                <Text
                  style={styles.lblHighlight}
                  onPress={() =>
                    props.navigation.navigate(ScreenNames.CMSPAGECONTAINER, {
                      cmsUrl: GlobalVar.privacy_policy_es,
                    })
                  }
                >
                  {getTranslation('constant2')}
                </Text>
              </Text>
            </View>

            <View style={styles.option}>
              <TouchableOpacity
                onPress={() => props.setIsOtherAccepted(!props.isOtherAccepted)}
                style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
              >
                <Image
                  source={
                    props.isOtherAccepted
                      ? images.imgSelectRadio
                      : images.imgUnselectRadio
                  }
                />
              </TouchableOpacity>
              <Text style={styles.optionText}>
                {getTranslation('constant3')}
              </Text>
            </View>
          </View>
        </View>

        {/* vwBottomBtn */}
        <View
          style={[
            styles.vwBottom,
            { marginBottom: props.insets.bottom + getHeight(10) },
          ]}
        >
          <CustomButton
            btnPress={props.handlePressContinue}
            btnTitle={getTranslation('continue')}
            disabled={!props.isPrivacyAccepted}
            style={{ opacity: props.isPrivacyAccepted ? 1 : 0.5 }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InformationConasantComponent;
