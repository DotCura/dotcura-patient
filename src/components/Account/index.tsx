import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { getTranslation } from '../../localization/i18n/i18n.config';
import PrimaryTitleTextInput from '../../global/PrimaryTitleTextInput';
import { images } from '../../constants/Images';
import { getHeight } from '../../constants/utils/Dimensions';
import { ValidationConstant } from '../../constants/TextInputConstant';
const AccountComponent = (props: any) => {
  const today = new Date();

  return (
    <View style={styles.vwMain}>
      <Text style={styles.txtInformation}>{getTranslation('information')}</Text>

      <View style={styles.vwInput}>
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
      </View>
      <View style={{ marginTop: getHeight(12) }}>
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
    </View>
  );
};
export default AccountComponent;
