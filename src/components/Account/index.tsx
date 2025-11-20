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

const AccountComponent = (props: any) => {
  const today = new Date();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[constnatStyles.keyboardContainer]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.txtInformation}>{getTranslation('information')}</Text>
      <View style={{ gap: getHeight(12), marginTop: getHeight(12) }}>
        <PrimaryTitleTextInput
          placHolderLabel={getTranslation('fullnameplaceholder')}
          refs={props.fullNameRef}
          focusnext={() => props.taxCodeRef.current?.focus()} // ✅ Now this works
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
                {props.formattedDate == '' ? '30/09/1992' : props.formattedDate}
              </Text>
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={props.isDatePickerVisible}
            mode="date"
            onConfirm={props.handleConfirm}
            onCancel={props.hideDatePicker}
            minimumDate={moment(today).subtract(100, 'years').toDate()}
            maximumDate={moment(today).subtract(18, 'years').toDate()}
            date={moment(today).subtract(18, 'years').toDate()}
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
            marginBottom:
              props.insets.bottom > 0
                ? props.insets.bottom
                : props.insets.bottom + getHeight(50),
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
                <Image source={images.addblue} />
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
                  <TouchableOpacity onPress={() => props.handleDeleteItem('medicazioni', item.id)}>
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
                  <TouchableOpacity onPress={() => props.handleDeleteItem('patologie', item.id)}>
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
              <Text style={styles.lblMedica}>{getTranslation('allergie')}</Text>
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
              {props.allergie.map((item:any) => (
                // <Text key={item}>• {item}</Text>
                <View style={styles.vwCategory}>
                  <Text style={styles.lblCategory}>{item.name}</Text>
                  <TouchableOpacity onPress={() => props.handleDeleteItem('allergie', item.id)}>
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
          data={props.modalData}
          selectedItems={props.modalSelected}
          onSave={props.handleSave}
          onClose={() => props.setModalVisible(false)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AccountComponent;
