import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../constants/Styles';
import TopBar from '../../global/TopBar/TopBar';
import TitleSubtitle from '../../global/TitleSubtitle';
import { styles } from './styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import CustomButton from '../../global/Buttons';
import { getHeight } from '../../constants/utils/Dimensions';

const CompleteAddressComponent = (props: any) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[constnatStyles.keyboardContainer]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {/* TopBar */}
        <TopBar
          array={props.headerArray}
          currentIndex={1}
          onClickBack={() => props.navigation.goBack()}
        />

        {/* HeaderView */}
        <View style={styles.vwHeader}>
          <TitleSubtitle
            title={getTranslation('completeaddresstitle')}
            subtitle={getTranslation('completeaddressssubtitle')}
          />
        </View>

        <View style={styles.vwInputsMain}>
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('typeplaceholder')}
            refs={props.typeRef}
            focusnext={() => props.floorRef.current?.focus()}
            inputLabel={getTranslation('type')}
            blur={false}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.type}
            onChangeFun={(text: any) =>
              props.handleOnChangeText(text, 'address')
            }
            errorMessage={props.typeError}
            setErrorMessage={props.setTypeError}
            isMultiline={false}
            isBorder={false}
          />

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
              onChangeFun={(text: any) => props.handleOnChangeText(text, 'stairs')}
              errorMessage={props.stairsError}
              setErrorMessage={props.setStairsError}
              isflexstart={true}
              isMultiline={false}
              isBorder={false}
            />
          </View>

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
      </View>

      {/* vwBottomBtn */}
      <View
        style={[
          styles.vwBottom,
          { marginBottom: props.insets.bottom + getHeight(16) },
        ]}
      >
        <CustomButton
          btnPress={props.handleOnPressSaveAddress}
          btnTitle={getTranslation('continue')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CompleteAddressComponent;
