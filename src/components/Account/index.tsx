import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../constants/Styles';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ValidationConstant } from '../../constants/TextInputConstant';
import { images } from '../../constants/Images';
import { getHeight } from '../../constants/utils/Dimensions';
import { activityOpacity } from '../../constants/GConstant';
import AddItemModal from '../../global/AddItemModel/AddItemModal';
import AppHeader from '../../global/Header';

const AccountComponent = (props: any) => {
  const today = new Date();
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          props.navigation.pop();
        }}
        centerTitle={getTranslation('account')}
        dontShowStartBtn={false}
        showTitle={true}
        showSubTitle={true}
        centerSubTitle={`${props.fullName} (tu)`}
        showEndBtn={true}
        isSaveIcon={true}
        onClickSave={props.handlePressContinue}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.txtInformation}>
          {getTranslation('information')}
        </Text>
        <View style={{ gap: getHeight(12), marginTop: getHeight(12) }}>
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('fullnameplaceholder')}
            refs={props.fullNameRef}
            focusnext={() => props.surnameRef.current?.focus()} // ✅ Now this works
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
            placHolderLabel={getTranslation('surnameplaceholder')}
            refs={props.surnameRef}
            focusnext={() => props.emailRef.current?.focus()} // ✅ Now this works
            inputLabel={getTranslation('surnametitle')}
            blur={false}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.surname}
            onChangeFun={props.onChangeSurname}
            autoCapitalize={'none'}
            errorMessage={props.surnameError}
            setErrorMessage={props.setSurnameError} // ✅ Just pass this once
            maxlength={200}
            isMultiline={false}
            isBorder={false}
          />
          <PrimaryTitleTextInput
            placHolderLabel={getTranslation('emailplaceholder')}
            refs={props.emailRef}
            focusnext={() => props.placeOfBirthRef.current?.focus()}
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
            placHolderLabel={getTranslation('placeofbirthplaceholder')}
            refs={props.placeOfBirthRef}
            focusnext={() => props.taxCodeRef.current?.focus()}
            inputLabel={getTranslation('placeofbirthtitle')}
            blur={false}
            leftIcon={false}
            keyaboardType={'default'}
            value={props.placeOfBirth}
            onChangeFun={props.onChagePlaceOfBirth}
            autoCapitalize={'none'}
            errorMessage={props.placeOfBirthError}
            setErrorMessage={props.setPlaceOfBirthErrorError}
            isMultiline={false}
            isBorder={true}
          />

          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={props.onPressOpenDate}
              style={styles.vwDateOfBirth}
            >
              <Text style={styles.txtDateOfBirth}>
                {getTranslation('dateofbirth')}
              </Text>
              <View style={styles.vwinsideDate}>
                <Image source={images.imgCalenderDOB} />
                <Text
                  style={[
                    props.formattedDate == ''
                      ? styles.txtInsideDate
                      : styles.txtSelectedDate,
                  ]}
                >
                  {props.formattedDate == ''
                    ? 'gg/mm/aaaa'
                    : props.formattedDate}
                </Text>
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              locale="es"
              isVisible={props.isDatePickerVisible}
              mode="date"
              onConfirm={props.handleConfirm}
              onCancel={props.hideDatePicker}
              minimumDate={moment(today).subtract(18, 'years').toDate()}
              date={
                props.formattedDate && props.formattedDate !== ''
                  ? moment(props.formattedDate, 'DD/MM/YYYY').toDate()
                  : moment(today).subtract(18, 'years').toDate()
              }
            />
          </View>
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
            <View style={{ gap: getHeight(6) }}>
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

          <View
            style={{
              marginTop: getHeight(12),
              marginBottom: props.insets.bottom + getHeight(10),
            }}
          >
            {/* vwMedicazioni */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: getHeight(12),
                }}
              >
                <Text style={styles.lblMedica} numberOfLines={1}>
                  {getTranslation('medica')}
                </Text>
                <TouchableOpacity
                  style={styles.btnagg}
                  activeOpacity={activityOpacity}
                  onPress={() => props.openModal('medicazioni')}
                >
                  <Image source={images.imgPlusDark} />
                  <Text style={styles.lblAgg}>{getTranslation('addgg')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: getHeight(8) }}>
                {props.medicazioni.map((item: any) => (
                  // <Text key={item}>• {item}</Text>
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.onDeleteMedical(item.deleteid, 'medicazioni')
                      }
                    >
                      <Image source={images.imgDeleteRound} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ marginTop: getHeight(24) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: getHeight(12),
                }}
              >
                <Text style={styles.lblMedica}>{getTranslation('pato')}</Text>
                <TouchableOpacity
                  style={styles.btnagg}
                  activeOpacity={activityOpacity}
                  onPress={() => props.openModal('patologie')}
                >
                  <Image source={images.imgPlusDark} />
                  <Text style={styles.lblAgg}>{getTranslation('addgg')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: getHeight(8) }}>
                {props.patologie.map((item: any) => (
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.onDeleteMedical(item.deleteid, 'patologie')
                      }
                    >
                      <Image source={images.imgDeleteRound} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ marginTop: getHeight(24) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: getHeight(12),
                }}
              >
                <Text style={styles.lblMedica}>
                  {getTranslation('allergie')}
                </Text>
                <TouchableOpacity
                  style={styles.btnagg}
                  activeOpacity={activityOpacity}
                  onPress={() => props.openModal('allergie')}
                >
                  <Image source={images.imgPlusDark} />
                  <Text style={styles.lblAgg}>{getTranslation('addgg')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: getHeight(8) }}>
                {props.allergie.map((item: any) => (
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.onDeleteMedical(item.deleteid, 'allergie')
                      }
                    >
                      <Image source={images.imgDeleteRound} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Reusable Modal */}
          <AddItemModal
            visible={props.modalVisible}
            title={props.modalTitle}
            data={props.medicalList}
            selectedItems={props.modalSelected}
            onSave={props.handleSave}
            onClose={() => props.setModalVisible(false)}
            onSearch={(text: string) => {
              if (props.modalType === 'patologie')
                props._getMedicalHistory('P', text);
              if (props.modalType === 'medicazioni')
                props._getMedicalHistory('M', text);
              if (props.modalType === 'allergie')
                props._getMedicalHistory('A', text);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AccountComponent;
