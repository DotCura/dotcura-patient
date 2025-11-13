import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CheckoutComponent from '../../components/Checkout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { activityOpacity, currency } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { ZustandStores } from '../../store';
import { ScreenNames } from '../../constants/AppConstants';
import RNRestart from 'react-native-restart';

const CheckoutContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  console.log("orderStatus in CheckoutContainer.tsx:", orderStatus);
  

  const testKits = [
    {
      id: '1',
      name: 'Diabete',
      price: 35,
      analyses: [
        'Glicemia',
        'Emoglobina glicata',
        'Microalbuminuria',
        'Urine',
        'Creatininemia',
        'Trigliceridi',
        'Colesterolo HDL–LDL',
      ],
    },
    {
      id: '2',
      name: 'Anemia',
      price: 35,
      analyses: [
        'Glicemia',
        'Emoglobina glicata',
        'Microalbuminuria',
        'Urine',
        'Creatininemia',
        'Trigliceridi',
        'Colesterolo HDL–LDL',
      ],
    },
  ];

  const familymembers = [
    { label: 'You', value: '1' },
    { label: 'Maria', value: '2' },
    { label: 'Pasquale', value: '3' },
  ];

  const [testkitsData, setTestsKitData] = useState(testKits);
  const [manageAddress, setManageAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [familyMemberData, setFamilyMemberData] = useState(familymembers);
  const [familymemberValue, setFamilyMemberValue] = useState<string | null>(
    '1',
  );
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState('Oggi');
  const [selectedTime, setSelectedTime] = useState('16:00 - 17:00');

  const handleBookSlot = () => {
    if (selectedDate && selectedTime) {
      setSelectedSlot({ day: selectedDate, time: selectedTime });
      setShowPicker(false);
    }
  };

  const homeServiceCharge = 20;

  // Compute subtotal & total dynamically
  const subtotal = useMemo(() => {
    return testkitsData.reduce((sum, item) => sum + item.price, 0);
  }, [testkitsData]);

  const total = useMemo(() => {
    return subtotal + homeServiceCharge - discountValue;
  }, [subtotal, discountValue]);

  const handleApplyDiscount = () => {
    // Just a sample logic
    if (discountCode === 'AA000000') {
      setDiscountValue(10);
      setDiscountCode('');
    } else {
      setDiscountValue(0);
    }
  };

  const handleSetFamilyMember = (item: any) => {
    setFamilyMemberValue(item.value);
  };

  const onChnageManageAddress = (text: any) => {
    setManageAddress(text);
  };

  const onChangeDiscountCode = (text: any) => {
    setDiscountCode(text);
  };

  const renderItemTestKits = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>
            {currency} {item.price.toFixed(2)}
          </Text>
        </View>
        <Text style={styles.cardDesc}>
          <Text style={styles.testedInlcuded}>
            {getTranslation('testincluded')}
          </Text>{' '}
          {item.analyses.join(', ')}
        </Text>
      </View>
    );
  };

  const handleOnPressSaveChanges = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION);
    setOrderStatus('order_sent');
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View style={{}}>
          <View
            style={[
              styles.vwMain,
              {
                paddingTop: orderStatus == '' ? insets.top + 10 : getHeight(25),
              },
            ]}
          >
            <View style={styles.vwHeaderLeft}>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                style={styles.btnBack}
                // onPress={startBtnOnPress}
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.vwHelp}
                activeOpacity={activityOpacity}
              >
                <Image source={images.imgHelp} />
                <Text style={styles.lblHelp}>{getTranslation('help')}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.vwSave}
              activeOpacity={activityOpacity}
            >
              <Text style={styles.lblSave}>{getTranslation('edit')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <CheckoutComponent
      insets={insets}
      testkitsData={testkitsData}
      renderItemTestKits={renderItemTestKits}
      manageAddress={manageAddress}
      onChnageManageAddress={onChnageManageAddress}
      subtotal={subtotal}
      total={total}
      discountCode={discountCode}
      setDiscountCode={setDiscountCode}
      onApplyDiscount={handleApplyDiscount}
      homeServiceCharge={homeServiceCharge}
      discountValue={discountValue}
      onChangeDiscountCode={onChangeDiscountCode}
      setFamilyMemberValue={setFamilyMemberValue}
      familymemberValue={familymemberValue}
      familyMemberData={familyMemberData}
      handleSetFamilyMember={handleSetFamilyMember}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      selectedSlot={selectedSlot}
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      setSelectedDate={setSelectedDate}
      setSelectedTime={setSelectedTime}
      onBookSlot={handleBookSlot}
      handleOnPressSaveChanges={handleOnPressSaveChanges}
    />
  );
};

export default CheckoutContainer;
