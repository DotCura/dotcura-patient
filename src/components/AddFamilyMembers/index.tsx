import { Image, Text, TouchableOpacity, View } from 'react-native';
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
import TitleSubtitle from '../../global/TitleSubtitle';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../global/Buttons';
import CustomDropdown from '../../global/DropDown/CustomDropDown';
import { fontSize } from '../../constants/FontSizes';
import AppHeader from '../../global/Header';

const AddFamilyMemberComponent = (props: any) => {
  const today = new Date();
  return (
    <View style={{ backgroundColor: Colors.white, flex: 1 }}>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={true}
        showSubTitle={false}
        showEndBtn={false}
        centerTitle={getTranslation('family')}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: getHeight(22) }}>
          <TitleSubtitle
            title={
              props.isEdit
                ? getTranslation('editfamilymembertitle')
                : getTranslation('addfamilymembertitle')
            }
            subtitle={getTranslation('addfamilymembersubtitle')}
          />
        </View>
        <View style={{ marginTop: getHeight(43) }}>
          <Text style={[styles.lblTitleInput]}>
            {getTranslation('typeofrelationship')}
          </Text>
          <CustomDropdown
            data={props.AppTypeData}
            value={props.appTypeValue}
            onChange={item => props.handleSetRole(item)}
            placeholder={getTranslation('typeofrelationshipplaceholder') || ''}
          />
        </View>
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
            focusnext={() => props.taxCodeRef.current?.focus()} // ✅ Now this works
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
            <Text style={styles.label}>{getTranslation('gender')}</Text>
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
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleDeleteItem('medicazioni', item.deleteid)
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
                  <Image source={images.addblue} />
                  <Text style={styles.lblAgg}>{getTranslation('addgg')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: getHeight(8) }}>
                {props.patologie.map((item: any) => (
                  // <Text key={item}>• {item}</Text>
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleDeleteItem('patologie', item.deleteid)
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
                  <Image source={images.addblue} />
                  <Text style={styles.lblAgg}>{getTranslation('addgg')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: getHeight(8) }}>
                {props.allergie.map((item: any) => (
                  // <Text key={item}>• {item}</Text>
                  <View style={styles.vwCategory}>
                    <Text style={styles.lblCategory}>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleDeleteItem('allergie', item.deleteid)
                      }
                    >
                      <Image source={images.imgDeleteRound} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={{ marginTop: getHeight(20) }}>
            <Text style={[styles.lblTitleInput]}>
              {getTranslation('document')}
            </Text>
            <CustomDropdown
              data={props.IdentityData}
              value={props.identityValue}
              onChange={item => props.handleSetIdentity(item)}
              placeholder={getTranslation('selectdocument') || ''}
            />
          </View>

          <View style={styles.vwFrontSide}>
            {props.frontImageAdd == true ? (
              <View style={{}}>
                <Image
                  style={styles.imgFrontSide}
                  source={{ uri: props.frontSide }}
                ></Image>
                <TouchableOpacity
                  style={styles.btnRemove}
                  onPress={props.onRemoveFrontImage}
                  activeOpacity={0.8}
                >
                  <Image source={images.imgClose} tintColor={Colors.white} />
                </TouchableOpacity>
              </View>
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
                  <Text style={styles.txtUpload}>
                    {getTranslation('upload')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View
            style={[
              styles.vwFrontSide,
              { marginTop: getHeight(-4), marginBottom: getHeight(20) },
            ]}
          >
            {props.backImageAdd == true ? (
              <View style={{}}>
                <Image
                  style={styles.imgFrontSide}
                  source={{ uri: props.backSide }}
                ></Image>
                <TouchableOpacity
                  style={styles.btnRemove}
                  onPress={props.onRemoveBackImage}
                  activeOpacity={0.8}
                >
                  <Image source={images.imgClose} tintColor={Colors.white} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.txtFronSide}>
                  {getTranslation('uploadbacksidedoc')}
                </Text>
                <TouchableOpacity
                  onPress={props.onPressBackSide}
                  style={styles.btnFrontSide}
                >
                  <Image
                    source={images.upload}
                    tintColor={Colors.blue002}
                  ></Image>
                  <Text style={styles.txtUpload}>
                    {getTranslation('upload')}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

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
        <View
          style={{
            paddingBottom: props.insets.bottom + getHeight(10),
            backgroundColor: Colors.whiteF2,
            gap: getHeight(8),
          }}
        >
          <CustomButton
            btnPress={props.handlePressContinue}
            btnTitle={
              props.isEdit
                ? getTranslation('editinformationbtn')
                : getTranslation('saveinformation')
            }
          />
          {props.isEdit && (
            <CustomButton
              btnPress={props._removeFamilyMember}
              btnTitle={getTranslation('deletefamily')}
              style={{ backgroundColor: Colors.redFC }}
              textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
              btnicon={true}
              btnImage={images.imgDeleteRed}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddFamilyMemberComponent;
