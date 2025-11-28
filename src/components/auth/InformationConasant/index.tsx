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
                onPress={() => props.setSelectedInfo(1)}
                style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
              >
                <Image
                  source={
                    props.selectedInfo === 1
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
                    Linking.openURL(
                      'https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-a-privacy-policy',
                    )
                  }
                >
                  {getTranslation('constant2')}
                </Text>
              </Text>
            </View>

            <View style={styles.option}>
              <TouchableOpacity
                onPress={() => props.setSelectedInfo(2)}
                style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}
              >
                <Image
                  source={
                    props.selectedInfo === 2
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
            { marginBottom: props.insets.bottom + getHeight(16) },
          ]}
        >
          <CustomButton
            btnPress={props.handlePressContinue}
            btnTitle={getTranslation('continue')}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InformationConasantComponent;
