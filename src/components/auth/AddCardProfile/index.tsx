import {
  Image,
  StyleSheet,
  Switch,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import TopBar from '../../../global/TopBar/TopBar';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { styles } from './styles';
import CustomButton from '../../../global/Buttons';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import PrimaryTitleTextInput from '../../../global/PrimaryTitleTextInput';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants/Images';
import { activityOpacity } from '../../../constants/GConstant';
import { fontSize } from '../../../constants/FontSizes';

const AddCardProfileComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
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
              title={getTranslation('addcardtitle')}
              subtitle={getTranslation('addcardsubtitle')}
            />
          </View>

          <View style={styles.vwInputsMain}>
            <PrimaryTitleTextInput
              placHolderLabel={getTranslation('cardnumberplaceholder')}
              refs={props.cardNumberRef}
              focusnext={() => props.expiryDateRef.current?.focus()}
              inputLabel={getTranslation('cardnumberinputlabel')}
              blur={false}
              leftIcon={false}
              keyaboardType={'number-pad'}
              value={props.cardNumber}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'cardNumber')
              }
              errorMessage={props.cardNumberError}
              setErrorMessage={props.setCardNumberError}
              maxlength={19}
              isMultiline={false}
              isBorder={false}
            />

            <View style={styles.vwInputsInner}>
              <PrimaryTitleTextInput
                flex={1}
                placHolderLabel={getTranslation('expiredateplaceholder')}
                refs={props.expiryDateRef}
                focusnext={() => props.cvvRef.current?.focus()}
                inputLabel={getTranslation('expiredateinput')}
                blur={false}
                leftIcon={false}
                keyaboardType={'number-pad'}
                value={props.expiryDate}
                onChangeFun={(text: any) =>
                  props.handleOnChangeText(text, 'expiryDate')
                }
                errorMessage={props.expiryDateError}
                setErrorMessage={props.setExpiryDateError}
                maxlength={5}
                isMultiline={false}
                isBorder={false}
                isflexstart={true}
              />
              <PrimaryTitleTextInput
                flex={1}
                placHolderLabel={getTranslation('cvvplaceholder')}
                inputLabel={getTranslation('cvvinputlabel')}
                refs={props.cvvRef}
                focusnext={() => props.cardHolderNameRef.current?.focus()}
                blur={false}
                leftIcon={false}
                keyaboardType={'number-pad'}
                value={props.cvv}
                onChangeFun={(text: any) =>
                  props.handleOnChangeText(text, 'cvv')
                }
                errorMessage={props.cvvError}
                setErrorMessage={props.setCvvError}
                maxlength={3}
                isflexstart={true}
                isMultiline={false}
                isBorder={false}
              />
            </View>

            <PrimaryTitleTextInput
              placHolderLabel={getTranslation('cardholdernameplaceholder')}
              refs={props.cardHolderNameRef}
              inputLabel={getTranslation('cardholdernameinputlabel')}
              blur={true}
              leftIcon={false}
              keyaboardType={'default'}
              value={props.cardHolderName}
              onChangeFun={(text: any) =>
                props.handleOnChangeText(text, 'cardHolderName')
              }
              errorMessage={props.cardHolderNameError}
              setErrorMessage={props.setCardHolderNameError}
              maxlength={200}
              isMultiline={false}
              isBorder={false}
            />

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
                {getTranslation('switchlabel')}
              </Text>
              {/* <View style={{}}>
                <Switch
                  trackColor={{ false: Colors.grayE7, true: Colors.blue1C }}
                  ios_backgroundColor="#ccc"
                  onValueChange={props.toggleSwitch}
                  value={props.isEnabled}
                />
              </View> */}
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
            btnPress={props.handleOnPressAddCard}
            btnTitle={getTranslation('save')}
          />
          <CustomButton
            btnicon={true}
            btnImage={images.imgDeleteRed}
            style={{ backgroundColor: Colors.redFC, marginTop: getHeight(8) }}
            textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
            btnTitle={getTranslation('editcardtext')}
            //   btnPress={props.handlePressAddCardProfile}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddCardProfileComponent;
