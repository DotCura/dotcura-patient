import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import { constnatStyles } from '../../constants/Styles';
import TopBar from '../../global/TopBar/TopBar';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import GooglePlacesTextInput from 'react-native-google-places-textinput';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import CustomButton from '../../global/Buttons';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import { images } from '../../constants/Images';
import { activityOpacity } from '../../constants/GConstant';
import CustomDropdown from '../../global/DropDown/CustomDropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import AppHeader from '../../global/Header';

const AddAddressComponent = (props: any) => {
  const [isFocused, setIsFocused] = useState(false); // Add focus state
 

  // 🔥 Moved styles here (no global style)
  const customStylesTextInput = {
    container: {
      flex: 1,
      borderRadius: 12,
    },
    input: {
      overflow: 'hidden',
      height: getHeight(56),
      borderWidth: 2,
      borderRadius: 12,
      fontSize: fontSize.size16,
      fontFamily: fontsfamily.gregular,
      borderColor: isFocused ? Colors.blue002 : Colors.grayD8, // Dynamic border color
      color: Colors.black,
    },
    inputFocused: {
      borderColor: Colors.blue1C,
    },
    suggestionsContainer: {
      backgroundColor: '#ffffff',
      maxHeight: 250,
      position: 'absolute',
      top: 50,
      left: -35,
      right: 0,
      width: '120%',
      zIndex: 1000,
    },
    suggestionItem: {
      padding: 15,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
      <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            props.navigation.goBack();
          }}
          centerTitle={getTranslation('addresss')}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
        />
      <KeyboardAwareScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
      >
        {/* HeaderView */}
        <View style={styles.vwHeader}>
          <TitleSubtitle
            title={getTranslation('addaddresstitle')}
            subtitle={getTranslation('addaddresssubtitle')}
          />
        </View>

        <View style={{ marginTop: getHeight(43), flex: 1, gap: getHeight(12) }}>
          {/* dropdownfamilymember */}
          <View>
            <Text style={styles.lblwhodothetest}>
              {getTranslation('typology')}
            </Text>
            <View style={{ marginTop: getHeight(6) }}>
              <CustomDropdown
                data={props.addressTypeData}
                value={props.addressTypeValue}
                onChange={item => props.handleSetAddressType(item)}
                placeholder={getTranslation('selectfamilymember') || ''}
                dropdownPosition="auto"
                isRenderLeftIcon={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.lblTitleInput} numberOfLines={1}>
              {getTranslation('searchaddress')}
            </Text>
            <View style={{ marginTop: 1 }}>
              <GooglePlacesTextInput
                ref={props.searchRef}
                apiKey={''}
                placeHolderText={getTranslation('addaddressplacholder') || ''}
                onPlaceSelect={(place: any) => {
                  props.handlePlaceSelect(place);
                  props.setSearchAddress(place?.fullText || ''); // Store selected address
                }}
                onChangeText={(text: any) => {
                  props.setSearchAddress(text); // store every typed change
                }}
                cursorColor={Colors.blue002}
                selectionColor={Colors.blue002}
                languageCode="en"
                style={customStylesTextInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                showClearButton={false}
                showLoadingIndicator={false}
              />
            </View>
          </View>
          <View style={styles.vwInputsInner}>
            <PrimaryTitleTextInput
              flex={1}
              placHolderLabel={getTranslation('florrplaceholder')}
              refs={props.floorRef}
              focusnext={() => props.stairsRef.current?.focus()}
              inputLabel={getTranslation('florr')}
              blur={false}
              leftIcon={false}
              keyaboardType={'default'}
              value={props.floor}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'floor')
              }
              errorMessage={props.floorError}
              setErrorMessage={props.setFloorError}
              isMultiline={false}
              isBorder={false}
              isflexstart={true}
            />
            <PrimaryTitleTextInput
              flex={1}
              placHolderLabel={getTranslation('stairsplaceholder')}
              inputLabel={getTranslation('stairs')}
              refs={props.stairsRef}
              focusnext={() => props.instructionRef.current?.focus()}
              blur={false}
              leftIcon={false}
              keyaboardType={'default'}
              value={props.stairs}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'stairs')
              }
              errorMessage={props.stairsError}
              setErrorMessage={props.setStairsError}
              isflexstart={true}
              isMultiline={false}
              isBorder={false}
            />
          </View>

          <View>
            <PrimaryTitleTextInput
              placHolderLabel={getTranslation('instructionplaceholder')}
              refs={props.instructionRef}
              inputLabel={getTranslation('instruction')}
              blur={true}
              leftIcon={false}
              keyaboardType={'default'}
              value={props.instructions}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'instruction')
              }
              errorMessage={props.instructionsError}
              setErrorMessage={props.setInstructionNameError}
              isMultiline={false}
              isBorder={false}
            />
          </View>
          <View style={styles.vwSwitchcontainer}>
            <TouchableOpacity
              activeOpacity={activityOpacity}
              onPress={props.toggleisDefault}
            >
              <Image
                source={
                  props.isdefaultsave === true
                    ? images.imgSelectRadio
                    : images.imgUnselectRadio
                }
              />
            </TouchableOpacity>
            <Text style={styles.lblSwitchTitle} numberOfLines={1}>
              {getTranslation('addfavouriteaddresslabel')}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginBottom: props.insets.bottom + getHeight(16),
          marginHorizontal: getWidth(16),
        }}
      >
        <CustomButton
          btnPress={props.handleOnPressSaveAddress}
          btnTitle={getTranslation('saveaddress')}
        />
      </View>
    </View>
  );
};

export default AddAddressComponent;
