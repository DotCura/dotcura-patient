import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
      fontFamily: fontsfamily.regular,
      borderColor: isFocused ? Colors.blue1C : Colors.grayD8, // Dynamic border color
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
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ marginHorizontal: getWidth(16) }}>
        <TopBar
          array={props.headerArray}
          currentIndex={0}
          onClickBack={() => props.navigation.goBack()}
        />
      </View>
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        style={{ flex: 1, backgroundColor: Colors.white }}
      >
        {/* HeaderView */}
        <View style={styles.vwHeader}>
          <TitleSubtitle
            title={getTranslation('addaddresstitle')}
            subtitle={getTranslation('addaddresssubtitle')}
          />
        </View>

        <View style={{ marginTop: getHeight(43), flex: 1 }}>
          <Text style={styles.lblTitleInput} numberOfLines={1}>
            {getTranslation('searchaddress')}
          </Text>
          <View style={{ marginTop: 1 }}>
            <GooglePlacesTextInput
              ref={props.searchRef}
              apiKey={''}
              placeHolderText={getTranslation('addaddressplacholder') || ''}
              onPlaceSelect={props.handlePlaceSelect}
              languageCode="en"
              style={customStylesTextInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              showClearButton={false}
              showLoadingIndicator={false}
            />
          </View>
        </View>
        <View style={{ marginBottom: props.insets.bottom + getHeight(16) }}>
          <CustomButton
            btnPress={props.handleNavigateConmpleAddress}
            btnTitle={getTranslation('continue')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAddressComponent;
