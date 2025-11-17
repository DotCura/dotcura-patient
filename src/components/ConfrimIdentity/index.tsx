import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { getHeight } from '../../constants/utils/Dimensions';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import CustomDropdown from '../../global/DropDown/CustomDropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import TopBar from '../../global/TopBar/TopBar';
import { constnatStyles } from '../../constants/Styles';
const ConfrimIdentityComponent = (props: any) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={constnatStyles.keyboardContainer}
    >
      <TopBar array={props.headerArray} currentIndex={1} />
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: getHeight(26) }}>
          <TitleSubtitle
            title={getTranslation('confirmidentitytitle')}
            subtitle={getTranslation('confirmidentitysubtutlee')}
          />
        </View>

        <View style={{ marginTop: getHeight(43) }}>
          <Text style={[styles.lblTitleInput, props.styleLblTitleInput]}>
            {getTranslation('document')}
          </Text>
          <CustomDropdown
            data={props.AppTypeData}
            value={props.appTypeValue}
            onChange={item => props.handleSetRole(item)}
            placeholder={getTranslation('selectdocument')}
          />
        </View>

        <View style={styles.vwFrontSide}>
          {props.frontImageAdd == true ? (
            <Image
              style={styles.imgFrontSide}
              source={{ uri: props.frontSide }}
            ></Image>
          ) : (
            <>
              <Text style={styles.txtFronSide}>
                {getTranslation('uploadfronsidedoc')}
              </Text>
              <TouchableOpacity
                onPress={props.onPressFrontSide}
                style={styles.btnFrontSide}
              >
                <Image source={images.upload}></Image>
                <Text style={styles.txtUpload}>{getTranslation('upload')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={[styles.vwFrontSide, { marginTop: getHeight(8) }]}>
          {props.backImageAdd == true ? (
            <Image
              style={styles.imgFrontSide}
              source={{ uri: props.backSide }}
            ></Image>
          ) : (
            <>
              <Text style={styles.txtFronSide}>
                {getTranslation('uploadbacksidedoc')}
              </Text>
              <TouchableOpacity
                onPress={props.onPressBackSide}
                style={styles.btnFrontSide}
              >
                <Image source={images.upload}></Image>
                <Text style={styles.txtUpload}>{getTranslation('upload')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <CustomButton
        style={{ marginBottom: props.insets.bottom + getHeight(10) }}
        btnPress={props.handleSubmit}
        btnTitle={getTranslation('continue')}
        btnicon={false}
      />
    </KeyboardAwareScrollView>
  );
};

export default ConfrimIdentityComponent;
