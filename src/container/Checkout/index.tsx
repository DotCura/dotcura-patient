import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CheckoutComponent from '../../components/Checkout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  activityOpacity,
  currency,
  getRandomTheme,
} from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { ZustandStores } from '../../store';
import { ScreenNames } from '../../constants/AppConstants';
import RNRestart from 'react-native-restart';

const CheckoutContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  // console.log('orderStatus in CheckoutContainer.tsx:', orderStatus);

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

  const kitListInCart = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Alta richiesta',
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
    {
      id: '3',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
  ];

  const kitListAddMore = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Alta richiesta',
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
    {
      id: '3',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
    {
      id: '4',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
    {
      id: '5',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
    },
  ];

  const familymembers = [
    { label: 'You', value: '1' },
    { label: 'Maria', value: '2' },
    { label: 'Pasquale', value: '3' },
  ];

  const [testkitsData, setTestsKitData] = useState(testKits);
  const [kitDataInCart, setKitDataInCart] = useState(kitListInCart);
  const [kitDataAddMore, setKitDataAddMore] = useState(kitListAddMore);
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
  const [showIsModifyOrder, setShowIsModifyOrder] = useState(false);

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

  const funOpenIsModifyOrder = () => {
    setShowIsModifyOrder(true);
  };

  const funCloseIsModifyOrder = () => {
    setShowIsModifyOrder(false);
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

  const renderKitDataInCart = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(32),
          borderRadius: 20,
          marginRight: 12,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <View style={styles.vwGrey}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity>
            {item.status != null && (
              <View
                style={{
                  backgroundColor: backgroundColor,
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  paddingVertical: getHeight(4),
                  paddingHorizontal: getWidth(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 999,
                  marginRight: getWidth(20),
                }}
              >
                <Text
                  style={[styles.lblStatus, { color: textColor }]}
                  numberOfLines={2}
                >
                  {item.status}
                </Text>
              </View>
            )}
          </View>

          {/* veProductDetails */}
          <View>
            <Text style={styles.lblPrice} numberOfLines={1}>
              {currency}
              {item.price}
            </Text>
            <Text style={styles.lblTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lblDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderKitDataAddMore = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(24),
          borderRadius: 20,
          // marginRight: 12,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <View style={styles.vwGrey}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity>
            {item.status != null && (
              <View
                style={{
                  backgroundColor: backgroundColor,
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  paddingVertical: getHeight(4),
                  paddingHorizontal: getWidth(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 999,
                  marginRight: getWidth(20),
                }}
              >
                <Text
                  style={[styles.lblStatus, { color: textColor }]}
                  numberOfLines={2}
                >
                  {item.status}
                </Text>
              </View>
            )}
          </View>

          {/* veProductDetails */}
          <View>
            <Text style={styles.lblPrice} numberOfLines={1}>
              {currency}
              {item.price}
            </Text>
            <Text style={styles.lblTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lblDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
      funOpenIsModifyOrder={funOpenIsModifyOrder}
      funCloseIsModifyOrder={funCloseIsModifyOrder}
      showIsModifyOrder={showIsModifyOrder}
      renderKitDataInCart={renderKitDataInCart}
      kitDataInCart={kitDataInCart}
      kitDataAddMore={kitDataAddMore}
      renderKitDataAddMore={renderKitDataAddMore}
    />
  );
};

export default CheckoutContainer;
