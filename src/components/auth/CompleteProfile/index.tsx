import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { styles } from './styles';
import CustomButton from '../../../global/Buttons';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import TopBar from '../../../global/TopBar/TopBar';
import PrimaryTitleTextInput from '../../../global/PrimaryTitleTextInput';
import { ValidationConstant } from '../../../constants/TextInputConstant';
import { images } from '../../../constants/Images';

const CompleteProfileComponent = (props: any) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[constnatStyles.keyboardContainer]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {/* TopBar */}
        <TopBar array={props.headerArray} currentIndex={0} />

        {/* HeaderView */}
        <View style={styles.vwHeader}>
          <TitleSubtitle
            title={getTranslation('completeprofiletitle')}
            subtitle={getTranslation('completeprofilesubtitle')}
          />
        </View>

        {/* inputView */}
        <View style={styles.vwInput}>
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('fullnameplaceholder')}
            refs={props.fullNameRef}
            focusnext={() => props.emailRef.current?.focus()} // ✅ Now this works
            inputLabel={getTranslation('fullnametitle')}
            blur={false}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.fullName}
            onChangeFun={props.onChangeFullName}
            autoCapitalize={'none'}
            errorMessage={props.fullNameError}
            setErrorMessage={props.setFullNameError} // ✅ Just pass this once
            maxlength={200}
            isMultiline={false}
            isBorder={false}
          />
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('emailplaceholder')}
            refs={props.emailRef}
            focusnext={() => props.taxCodeRef.current?.focus()}
            inputLabel={getTranslation('emailtitle')}
            blur={false}
            leftIcon={false}
            keyaboardType={'email-address'}
            value={props.email}
            onChangeFun={props.onChangeEmail}
            autoCapitalize={'none'}
            errorMessage={props.emailError}
            setErrorMessage={props.setEmailError}
            isMultiline={false}
            isBorder={true}
          />
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('taxcodeplaceholder')}
            refs={props.taxCodeRef}
            inputLabel={getTranslation('taxcodetitle')}
            blur={true}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.taxCode}
            onChangeFun={props.onChangeTaxCode}
            autoCapitalize={'none'}
            errorMessage={props.taxCodeError}
            setErrorMessage={props.setTaxCodeError}
            maxlength={ValidationConstant.maxTaxCode}
            isMultiline={false}
            isBorder={true}
          />
          <View>
            <Text style={styles.label}>Genere</Text>

            {props.genders.map((item: any) => (
              <View key={item.id} style={styles.option}>
                <TouchableOpacity
                  onPress={() => props.setSelectedGender(item.id)}
                >
                  <Image
                    source={
                      props.selectedGender === item.id
                        ? images.imgSelectRadio
                        : images.imgUnselectRadio
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.optionText}>{item.label}</Text>
              </View>
            ))}
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
  );
};

export default CompleteProfileComponent;
