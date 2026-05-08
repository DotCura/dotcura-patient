import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  NativeModules,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CheckoutComponent from '../../components/Checkout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  activityOpacity,
  currency,
  flashMessageSucess,
  flashMessageWarning,
  formatTestDateForAPI,
} from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { ZustandStores } from '../../store';
import { isPlatformiOS, ScreenNames } from '../../constants/AppConstants';
import { Colors } from '../../constants/Colors';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';
import { APIManager } from '../../api/APIManager';
import FastImage from '@d11/react-native-fast-image';
import { fontsfamily } from '../../constants/FontFamily';
import { GlobalVar } from '../../constants/GlobalVar';
import SocketService from '../../socket/SocketService';
import { CustomerSheet } from '@stripe/stripe-react-native';
import {
  endLiveActivity,
  startLiveActivity,
} from '../../liveactivity/LiveActivityService';

const CheckoutContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  //ZUSTANDVARIABLES
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  const { addKit, removeKit, increment, resetCart } = ZustandStores.CartStore();

  //CHECKOUT VARIABLES
  const [testkitsData, setTestsKitData] = useState<any>([]);
  const [familymemberValue, setFamilyMemberValue] = useState<string | null>(
    '0',
  );
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [manageAddress, setManageAddress] = useState('');
  const [cancleOrderVisible, setCancleOrderVisible] = useState(false);
  const [editAnlitiPopupVisible, setEditAnalitiPopupVisible] = useState(false);
  const [showIsModifyOrder, setShowIsModifyOrder] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  // console.log("Intl.DateTimeFormat().resolvedOptions().timeZone",typeof Intl.DateTimeFormat().resolvedOptions().timeZone);

  //EDITANALITIVARIABLES
  const [analitiArrayData, setAnalitiArraysData] = useState<any>({});
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const totalPriceanaliti = analitiArrayData?.tests
    ?.filter((t: any) => selectedTests.includes(t.test_id))
    ?.reduce((sum: number, t: any) => sum + Number(t.price || 0), 0);

  //COUPANS VARIABLES
  const [appliedCoupon, setAppliedCoupon] = useState<any>(false);
  const [appliedCouponValue, setAppliedValue] = useState<any>(null);
  const [discountValue, setDiscountValue] = useState(0); // amount to subtract
  const [discountCode, setDiscountCode] = useState('');

  //DATEANDTIMESLOTVARIABLES
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
  } | null>(null);
  // console.log("selectedSlot",selectedSlot);

  //AVAILABILITYSLOTSVARIABLES
  type AvailabilitySlot = {
    date: string;
    day_name: string;
    slots: string[];
  };
  const [availabilitySlots, setAvailabilitySlots] = useState<
    AvailabilitySlot[]
  >([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const [selectedDate, setSelectedDate] = useState('Oggi');
  const [selectedTime, setSelectedTime] = useState('16:00 - 17:00');
  console.log('selectedTime', selectedTime);
  console.log('selectedDate', selectedDate);

  const [selectedTab, setSelectedTab] = useState('checkup'); // 'checkup' or 'analiti'
  const apiDate = formatTestDateForAPI(selectedDate);
  const startTime = selectedTime.split(' - ')[0];
  console.log(startTime);

  const [checkupcount, setCheckupCount] = useState(31);
  const [analiticount, setAnalitiCount] = useState(31);

  //PAYMENTVARIABLES
  const [cardData, setCardData] = useState([]);
  const [defaultType, setDefaultType] = useState<string>('4');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const payList = [
    {
      id: 1,
      title: isPlatformiOS ? 'Apple Pay' : 'Google Pay',
      images: isPlatformiOS ? images.imgapplepay : images.imggpay,
      apipasskey: 'applepay',
    },
    { id: 3, title: 'PayPal', images: images.imgpaypal, apipasskey: 'paypal' },
  ];
  const [payData, setPayData] = useState(payList);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

  //SUMAARY SECTION VARIABLES
  const homeServiceCharge = 20;
  const subtotal = useMemo(() => {
    return testkitsData.reduce(
      (sum: number, item: any) => sum + Number(item.price),
      0,
    );
  }, [testkitsData]);
  const total = useMemo(() => {
    return subtotal + homeServiceCharge - discountValue;
  }, [subtotal, discountValue]);

  //CHECKOUTFUNCTIONS
  const renderItemTestKits = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: getWidth(10),
          }}
        >
          <Image
            source={{ uri: item.kit_image }}
            style={{
              height: getWidth(43),
              width: getWidth(43),
              borderRadius: 8,
            }}
          />
          <View style={{ flex: 1, marginRight: getWidth(25) }}>
            <Text style={styles.cardTitle}>
              {item.kit_type === 'CHECKUP' &&
                getTranslation('kitlabeltextcheckout')}
              {item.name}{' '}
              {item.kit_type !== 'CHECKUP' && (
                <Text style={styles.lblKitCount}>
                  ({item?.test_ids?.length})
                </Text>
              )}
            </Text>
            <Text style={styles.cardPrice}>
              {currency} {Number(item.price).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: getWidth(18),
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: getHeight(2),
          }}
        >
          {item.kit_type !== 'CHECKUP' && (
            <TouchableOpacity
              // style={styles.editbtn}
              onPress={() => {
                pressHandleCartItem(item);
              }}
              activeOpacity={activityOpacity}
            >
              <Image source={images.pencilblue} tintColor={Colors.gray0F} />
              {/* <Text style={styles.lblEditText}>
                    {getTranslation('edit')}
                  </Text> */}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={activityOpacity}
            onPress={() => handleDeleteTestKit(item)}
          >
            <Image source={images.imgDelete} tintColor={Colors.gray0F} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItemAnalitiData = ({ item }: { item: any }) => {
    console.log('item', item);

    const selected = selectedTests.includes(item.test_id);
    const isLastSelected = selectedTests.length === 1 && selected;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            gap: getWidth(12),
          }}
        >
          <View
            style={{
              gap: 2,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Text style={styles.lblTestName} numberOfLines={3}>
                {item.name}
              </Text>

              {item.test_label && (
                <Text
                  style={[
                    styles.lblStatus,
                    {
                      backgroundColor: item.test_label_color,
                      color: darkenColor(item.test_label_color, 0.8),
                    },
                  ]}
                >
                  {item.test_label}
                </Text>
              )}
            </View>
            {item.description && (
              <Text style={styles.lblDesc} numberOfLines={3}>
                {item.description}
              </Text>
            )}
            <Text
              style={[
                styles.lblCurrency,
                { fontFamily: fontsfamily.gbold, color: Colors.gray0F },
              ]}
            >
              {currency} {item.price.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', marginTop: 2 }}>
          {!selected ? (
            <TouchableOpacity
              activeOpacity={activityOpacity}
              style={styles.btnadd}
              disabled={isLastSelected}
              onPress={() => toggleSelect(item.test_id)}
            >
              <Image source={images.imgPlusDark} />
              <Text style={styles.lblAdd}>{getTranslation('add')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={activityOpacity}
              style={[styles.btnadd, { backgroundColor: Colors.white }]}
              onPress={() => toggleSelect(item.test_id)}
            >
              <Image source={images.imgminusdark} />
              <Text style={styles.lblAdd}>{getTranslation('remove')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const pressHandleCartItem = (item: any) => {
    _analitiDetailsApi(item?.kit_id);
  };

  const handleDeleteTestKit = async (item: any) => {
    // 🔥 Optimistic UI update
    setTestsKitData((prev: any[]) =>
      prev.filter(i => i.cart_kit_id !== item.cart_kit_id),
    );

    // 2️⃣ Update Zustand cart (PASS kit_id)
    removeKit(item.kit_id);

    // 🔥 API call
    await _removeCartItem(item.cart_kit_id);
  };

  const handleBookSlot = () => {
    const localDate =
      selectedDate === 'Oggi'
        ? new Date().toLocaleDateString('en-CA') // YYYY-MM-DD LOCAL
        : apiDate;

    const localDateTime = `${localDate}T${startTime}:00`;

    const givenUTC = new Date(localDateTime);

    const currentUTC = new Date();
    const currentUTCPlus1Hr = new Date(currentUTC.getTime() + 60 * 60 * 1000);

    console.log('givenutc', givenUTC);
    console.log('currentutc', currentUTC);
    console.log('currentutc+1hr', currentUTCPlus1Hr);

    if (givenUTC < currentUTCPlus1Hr) {
      Alert.alert(getTranslation('timetosoon') || '');
      return;
    }

    setSelectedSlot({ day: selectedDate, time: selectedTime });
    setShowPicker(false);
  };

  const handleApplyDiscount = () => {
    if (appliedCoupon == true) {
      setDiscountValue(0);
      setDiscountCode('');
      setAppliedCoupon(false);
    } else {
      _checkCouponApi();
    }
  };

  const funGetTestedContainer = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.GETTESTEDCONTAINER,
    });
  };

  const funOpenEditAnaliti = () => {
    setEditAnalitiPopupVisible(true);
  };

  const funCloseEditAnaliti = () => {
    setEditAnalitiPopupVisible(false);
  };

  const funOpenIsModifyOrder = () => {
    setShowIsModifyOrder(true);
  };

  const funCloseIsModifyOrder = () => {
    setShowIsModifyOrder(false);
  };

  const funOpenCancleOrder = () => {
    setCancleOrderVisible(true);
  };

  const funCloseCancleOrder = () => {
    setCancleOrderVisible(false);
  };

  const onChnageManageAddress = (text: any) => {
    setManageAddress(text);
  };

  const onChangeDiscountCode = (text: any) => {
    setDiscountCode(text);
  };

  const validateBeforeOrder = () => {
    if (!familymemberValue) {
      flashMessageWarning(getTranslation('selectfamilymember'));
      return false;
    }

    if (!selectedSlot) {
      flashMessageWarning(getTranslation('selecttimeslot'));
      return false;
    }

    if (!selectedAddress) {
      flashMessageWarning(getTranslation('selectaddress'));
      return false;
    }

    if (!testkitsData.length) {
      flashMessageWarning(getTranslation('cartempty'));
      return false;
    }

    return true;
  };

  // const handleOnPressSaveChanges = () => {
  //   const isValid = validateBeforeOrder();

  //   if (!isValid) return;

  //   const paymentMethod = Number(testkitsData[0]?.default_payment_method);
  //   const hasCard = Number(testkitsData[0]?.has_card);

  //   console.log('hasCard:', hasCard);
  //   console.log('paymentMethod:', paymentMethod);

  //   // 🔥 If user has NO card → open Stripe
  //   if (testkitsData[0]?.has_card === 0) {
  //     openCustomerSheet();
  //     return;
  //   }

  //   // ✅ If user already has card → directly book order
  //   _bookOrder();
  // };

  // const handleOnPressSaveChanges = () => {
  //   const isValid = validateBeforeOrder();
  //   if (!isValid) return;

  //   const paymentMethod = Number(testkitsData[0]?.default_payment_method);
  //   const hasCard = Number(testkitsData[0]?.has_card);

  //   console.log("hasCard:", hasCard);
  //   console.log("paymentMethod:", paymentMethod);

  //   // 🔵 CASE 1 → No card + Stripe selected → Open CustomerSheet
  //   if (paymentMethod === 4 && hasCard === 0) {
  //     openCustomerSheet();
  //     return;
  //   }

  //   // 🟢 CASE 2 → Stripe selected but card already exists
  //   if (paymentMethod === 4 && hasCard === 1) {
  //     _bookOrder();
  //     return;
  //   }

  //   // 🟢 CASE 3 → Any other payment method
  //   if ([1, 2, 3].includes(paymentMethod)) {
  //     _bookOrder();
  //     return;
  //   }
  // };

  const handleOnPressSaveChanges = () => {
    const isValid = validateBeforeOrder();
    if (!isValid) return;

    setShowPaymentModal(true);
  };

  const handleNavigateHome = () => {
    setOrderStatus('');
    setCancleOrderVisible(false);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: ScreenNames.BOTTOMTABNAVIGATION,
          state: {
            routes: [
              {
                name: ScreenNames.HOMECONTAINER,
              },
            ],
          },
        },
      ],
    });
  };

  const handleNavigateAddAddress = () => {
    _addressListApi();
  };

  //MODELADDTIONSFUNCTIONS
  const toggleSelect = (test_id: number) => {
    setSelectedTests((prev: number[]) => {
      if (prev.length === 1 && prev.includes(test_id)) {
        flashMessageWarning(getTranslation('atleastoneselected'));
        return prev;
      }

      // Toggle selection
      return prev.includes(test_id)
        ? prev.filter(id => id !== test_id)
        : [...prev, test_id];
    });
  };

  const handleNavigateKitDetails = (kitId: any) => {
    setShowIsModifyOrder(false);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.KITDETAILSCONTAINER,
      params: {
        kitId: kitId,
      },
    });
  };

  const handleNavigateAnalitiDetails = (analitiId: any) => {
    setShowIsModifyOrder(false);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.ANALITIDETAILSCONTAINER,
      params: {
        analitiId: analitiId,
      },
    });
  };

  const toggleAddKit = (item: any) => {
    const isRemoving = item.is_in_cart;

    // 🔁 Optimistic UI toggle
    checkup.updateData((prev: any[]) =>
      prev.map(k =>
        k.id === item.id ? { ...k, is_in_cart: !k.is_in_cart } : k,
      ),
    );

    // 🔢 Update cart count
    if (isRemoving) {
      removeKit(item.id);
    } else {
      addKit(item.id);
    }

    // ✅ SAME API CALL (backend decides ADD / REMOVE)
    addToCart({
      kit_id: item.id,
      test_ids: item.test_ids,
      all_test: 1,
      price: item?.price,
    });
  };

  const darkenColor = (hex: string, amount = 0.25) => {
    // remove #
    const color = hex.replace('#', '');

    const num = parseInt(color, 16);

    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;

    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const renderKitData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleNavigateKitDetails(item.id);
        }}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(32),
          borderRadius: 20,
          marginLeft: index % 2 === 0 ? 0 : getWidth(16),
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <ImageBackground
            source={{ uri: item.kit_image }}
            style={styles.vwGrey}
          >
            {item.is_in_cart ? (
              <TouchableOpacity
                style={styles.btnPlusBlue}
                activeOpacity={activityOpacity}
                onPress={() => toggleAddKit(item)}
              >
                <Image source={images.imgBlueTickRight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => toggleAddKit(item)}
                style={styles.btnPlusBlack}
                activeOpacity={activityOpacity}
              >
                <Image source={images.imgPlusBlack} />
              </TouchableOpacity>
            )}
            {item.kit_label != null && (
              <View
                style={{
                  backgroundColor: item.kit_label_color,
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
                  style={[
                    styles.lblStatus,
                    { color: darkenColor(item.kit_label_color, 0.8) },
                  ]}
                  numberOfLines={2}
                >
                  {item.kit_label}
                </Text>
              </View>
            )}
          </ImageBackground>

          {/* veProductDetails */}
          <View>
            <Text style={styles.lblTitle} numberOfLines={2}>
              {item.kit_name}
            </Text>
            <Text style={styles.lblDescription} numberOfLines={3}>
              {item.description}
            </Text>
            <View style={{ flexDirection: 'row', gap: getWidth(2) }}>
              <Text style={styles.lblPrice} numberOfLines={1}>
                {currency}
                {item.price}
              </Text>
              {item.discount_value !== null && (
                <Text
                  style={[
                    styles.lblPrice,
                    {
                      textDecorationLine: 'line-through',
                      color: Colors.grey29,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {currency}
                  {item.original_price}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAnalitiData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        onPress={() => {
          handleNavigateAnalitiDetails(item.id);
        }}
        style={styles.btnAnalitiMain}
      >
        <View style={styles.vwtitleimage}>
          <FastImage
            source={{ uri: item.kit_image }}
            style={styles.imganaliti}
          />
          <Text style={styles.lblAnalitiLabel} numberOfLines={2}>
            {item.kit_name}
          </Text>
        </View>
        <View style={styles.vwCurrencyPrice}>
          <Text style={styles.lablCurrency}>{getTranslation('andtext')} </Text>
          {item.discount_value !== null ? (
            <Text
              style={[
                styles.lblPrice,
                { textDecorationLine: 'line-through', color: Colors.grey29 },
              ]}
              numberOfLines={1}
            >
              {currency} {item.original_price}{' '}
            </Text>
          ) : null}
          <Text style={styles.lablPrice}>
            {currency} {item.price}
          </Text>

          <Image source={images.imgRightCurve} />
        </View>
      </TouchableOpacity>
    );
  };

  //FAMILYMEMBERFUNCTIONS
  const handleSetFamilyMember = (item: any) => {
    setFamilyMemberValue(item.value);
  };

  //ADDRESSFUNCTIONS
  const addressType = [
    { label: getTranslation('addresstypehome'), value: '1' },
    { label: getTranslation('addresstypework'), value: '2' },
    { label: getTranslation('addresstypemedical'), value: '3' },
    { label: getTranslation('addresstypeother'), value: '4' },
  ];

  const [AddressData, setAddressData] = useState([]);

  type AddressMode = 'add' | 'edit';
  const [addressMode, setAddressMode] = useState<AddressMode>('add');
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [tempSelectedAddress, setTempSelectedAddress] = useState<any>(null);

  const [isdefaultsave, setIsDefaultSave] = useState(true);
  const [addressPopupVisible, setAddressPopupVisible] = useState(false);
  const [addAddressPopupVisible, setAddAddressPopupVisible] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);
  const [floor, setFloor] = useState<string>('');
  const [stairs, setStairs] = useState<string>('');
  const [instructions, setinstructions] = useState<string>('');
  const [searchAddress, setSearchAddress] = useState('');

  const floorRef = useRef<TextInput | null>(null);
  const stairsRef = useRef<TextInput | null>(null);
  const instructionRef = useRef<TextInput | null>(null);
  const searchRef = useRef<any>(null);

  const [searchAddressError, setSearchAddressError] = useState<any>('');
  const [floorError, setFloorError] = useState<any>('');
  const [stairsError, setStairsError] = useState<any>('');
  const [instructionsError, setInstructionNameError] = useState<any>('');
  const [addressTypeError, setAddressTypeError] = useState<any>('');

  const [addressTypeData, setAddressTypeData] = useState(addressType);
  const [addressTypeValue, setAddressTypeValue] = useState<string | null>('1');
  const [addressTypeItem, setAddressTypeItem] = useState<string | null>(
    addressTypeData[0].label,
  );
  console.log('addressTypeValue', addressTypeValue);
  console.log('addressTypeItem', addressTypeItem);
  console.log('addressTypeData', addressTypeData);
  console.log('addressType', addressType);
  console.log('addressType', addressType);

  const handleSetAddressType = (item: any) => {
    setAddressTypeValue(item.value);
    setAddressTypeItem(item.label);
  };

  const handleOnChangeText = (text: string, type: string) => {
    console.log('text', text, 'type', type);

    if (type === 'floor') {
      let newText = text.replace(/[^\d]/g, '');
      setFloor(newText);
    } else if (type === 'stairs') {
      let newText = text.replace(/[^a-zA-Z]/g, '');
      setStairs(newText);
    } else if (type === 'instruction') {
      let newText = text.replace(/^\s+/, '');
      setinstructions(newText);
    }
  };

  const handleOnPressSaveAddress = () => {
    setAddressTypeError('');
    if (addressTypeValue == '') {
      setAddressTypeError(getTranslation('errorselectaddresstype'));
      return;
    }
    if (searchAddress.trim() === '') {
      Alert.alert(getTranslation('emptysearchaddress') || '');
      return;
    }
    // else if (floor.trim() === '') {
    //   setFloorError(getTranslation('emptyFloor'));
    //   return;
    // } else if (!/^\d+$/.test(floor)) {
    //   setFloorError(getTranslation('invalidFloor'));
    //   return;
    // } else if (stairs.trim() === '') {
    //   setStairsError(getTranslation('emptyStairs'));
    //   return;
    // } else if (!/^[A-Za-z]+$/.test(stairs)) {
    //   setFloorError(getTranslation('invalidStairs'));
    //   return;
    // } else if (instructions.trim() == '') {
    //   setInstructionNameError(getTranslation('emptyInstructions'));
    //   return;
    // }
    else {
      if (addressMode == 'add') {
        _addAddressApi();
      } else {
        _updateAddressApi();
      }
    }
  };

  const handleCloseAddress = () => {
    setAddressPopupVisible(false);
  };

  const handleOnPressSaveLocation = (item: any) => {
    console.log('item', item);
    if (!tempSelectedAddress) {
      Alert.alert(getTranslation('selectaddress') || '');
      return;
    }
    // Reset slot when address changes
    if (selectedAddress?.address_id !== item?.address_id) {
      setSelectedSlot(null);
      setAvailabilitySlots([]);
    }
    setSelectedAddress(item);
    setAddressPopupVisible(false);
  };

  const handlePressAddAddress = () => {
    setAddressPopupVisible(false);

    setTimeout(() => {
      setAddAddressPopupVisible(true);
    }, 500);
  };

  const handlePlaceSelect = async (place: any) => {
    if (place && place.placeId) {
      setSearchAddress(place?.text?.text);
      try {
        // Fetch place details to get lat/lng
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
            place.placeId
          }&key=${
            isPlatformiOS
              ? GlobalVar.google_map_api_key_ios
              : GlobalVar.google_map_api_key_android
          }`,
        );
        const data = await response.json();

        //Update Search Count API Call
        Keyboard.dismiss();
        if (data.result && data.result.geometry) {
          const { lat, lng } = data.result.geometry.location;

          setLatitude(lat);
          setLongitude(lng);

          console.log('Latitude:', lat, 'Longitude:', lng);
        } else {
          console.warn('Could not fetch lat/lng');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    }
  };

  const toggleisDefault = () => {
    setIsDefaultSave(!isdefaultsave);
  };

  const handleOnPressDeleteAddress = async () => {
    await _deleteAddressApi();
  };

  const handleEditAddress = (address: any) => {
    console.log('call edit address', address);

    setAddressMode('edit');
    setEditAddressData(address);

    // prefill fields
    setSearchAddress(address.address);
    setFloor(address.floor);
    setStairs(address.stairs);
    setinstructions(address.instructions);
    setIsDefaultSave(address.is_default === 1);
    setLatitude(address.latitude);
    setLongitude(address.longitude);
    // ✅ FIND matching address type
    const matchedType = addressTypeData.find(
      item => item.label === address.title,
    );

    if (matchedType) {
      setAddressTypeValue(matchedType.value); // ✅ correct
      setAddressTypeItem(matchedType.label);
    }

    setAddressPopupVisible(false);

    setTimeout(() => {
      setAddAddressPopupVisible(true);
    }, 500);
  };

  const funOpenAddAddressPopup = () => {
    console.log('call add address');

    setAddressMode('add');
    setEditAddressData(null);

    // reset all fields
    setSearchAddress('');
    setFloor('');
    setStairs('');
    setinstructions('');
    setIsDefaultSave(false);
    setAddressTypeValue('1');
    setAddressTypeItem(addressTypeData[0].label);
    setLatitude(0);
    setLongitude(0);

    setAddressPopupVisible(false);

    setTimeout(() => {
      setAddAddressPopupVisible(true);
    }, 500);
  };

  const funCloseAddAddressPopup = () => {
    setAddAddressPopupVisible(false);
    // setAddressPopupVisible(true);
    setTimeout(() => {
      setAddressPopupVisible(true);
    }, 500); // match animationOut duration
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
                onPress={() => {
                  navigation.goBack();
                }}
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
          </View>
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //================= API ==============================

  //FAMILYAPI
  const fetchFamilyMemberList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.FAMILY.GETFAMILYMEMBERLIST,
        method: 'POST',
        showLoader: loadType === LoadType.INITIAL,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE

      const formattedData = res?.data?.map((item: any) => ({
        label: item.name, // shown in dropdown
        value: item.id.toString(), // stored value
      }));

      // ➕ add "Tu" manually at top
      const finalList = [
        {
          label: getTranslation('youtext'),
          value: '0',
        },
        ...formattedData,
      ];
      return {
        ...res,
        data: finalList ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const familyMemberList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFamilyMemberList,
  });

  //ADDRESSAPI
  const _addressListApi = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setIsLoadingAddress(false);
          setAddressPopupVisible(true);

          const list = responseData.data || [];
          setAddressData(list);

          // ✅ Auto select default address
          const defaultAddress = list.find(
            (item: any) => item.is_default === 1,
          );
          console.log('defaultAddress', defaultAddress);

          if (defaultAddress) {
            setTempSelectedAddress(defaultAddress);
          } else {
            setTempSelectedAddress(null);
          }
        } else {
          setIsLoadingAddress(false);

          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.ADDRESS.GETADDRESS,
        showLoader: false,
        callback,
        params,
      });
    } catch (error) {
      console.log('Address List error:', error);
    }
  };

  const _addAddressApi = async () => {
    funCloseAddAddressPopup();

    try {
      const params = {
        address: searchAddress,
        title: addressTypeItem,
        floor: floor,
        stairs: stairs,
        instructions: instructions,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        is_default: isdefaultsave == true ? 1 : 0,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setTimeout(() => {
            _addressListApi();
            setAddressPopupVisible(true);
          }, 500); // match animationOut duration
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.ADDADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Add Address error:', error);
    }
  };

  const _updateAddressApi = async () => {
    try {
      const params = {
        address_id: editAddressData.address_id,
        address: searchAddress,
        title: addressTypeItem,
        floor: floor,
        stairs: stairs,
        instructions: instructions,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        is_default: isdefaultsave == true ? 1 : 0,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          funCloseAddAddressPopup();
          setTimeout(() => {
            _addressListApi();
            setAddressPopupVisible(true);
          }, 500); // match animationOut duration
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.UPDATEADDRESS,
        showLoader: false,
        callback,
        params,
      });
    } catch (error) {
      console.log('Add Address error:', error);
    }
  };

  const _deleteAddressApi = async () => {
    try {
      const params = {
        address_id: editAddressData.address_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          funCloseAddAddressPopup();
          setTimeout(() => {
            _addressListApi();
            setAddressPopupVisible(true);
          }, 500); // match animationOut duration
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.ADDRESS.REMOVEADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Remove Address error:', error);
    }
  };

  //MODELADDTIONSAPI
  const fetchCheckupList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITLIST,
        method: 'POST',
        showLoader: false,
        params: {
          page,
          kit_type: 'CHECKUP',
        },
      });

      // ✅ set counts here
      if (res?.data?.kitTypeTotals) {
        setCheckupCount(res.data.kitTypeTotals.CHECKUP ?? 0);
        setAnalitiCount(res.data.kitTypeTotals.ANALYSIS ?? 0);
      }

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data?.items ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const fetchAnalitiList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITLIST,
        method: 'POST',
        showLoader: false,
        params: {
          page,
          kit_type: 'ANALYSIS',
        },
      });

      // ✅ set counts here
      if (res?.data?.kitTypeTotals) {
        setCheckupCount(res.data.kitTypeTotals.CHECKUP ?? 0);
        setAnalitiCount(res.data.kitTypeTotals.ANALYSIS ?? 0);
      }

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data?.items ?? [],
      };
    },
    [navigation],
  );

  const checkup: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: showIsModifyOrder && selectedTab === 'checkup',
    fetcher: fetchCheckupList,
  });

  const analiti: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: showIsModifyOrder && selectedTab === 'analiti',
    fetcher: fetchAnalitiList,
  });

  const addToCart = async ({
    kit_id,
    test_ids,
    all_test,
    price,
  }: {
    kit_id: number;
    test_ids: number[];
    all_test: 0 | 1;
    price: any;
  }) => {
    try {
      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.ADDTOCART,
        params: { kit_id, test_ids, all_test, price },
        showLoader: false,
        callback: (responseData: any) => {
          if (responseData.code === StatusCode.SUCCESS) {
            _getCartDetails();
          } else {
            flashMessageWarning(responseData.message);
          }
        },
      });
    } catch (e) {
      console.log('Cart toggle error', e);
    }
  };

  //CHECKOUTAPI
  const _getCartDetails = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setTestsKitData(responseData.data);
          setCartLoaded(true);

          // Handle PreviousBookingDetails
          if (responseData.data?.[0]?.PreviousBookingDetails) {
            setSelectedAddress(responseData.data[0].PreviousBookingDetails);
          }
        } else {
          setCartLoaded(true);
          setTestsKitData([]);
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.CHECKOUT.GETCARTITEMDETAILS,
        callback,
        params,
      });
    } catch (error) {
      console.log('getcartitem details error:', error);
      setTestsKitData([]);
      setCartLoaded(true); // ✅ even on error
    }
  };

  const _removeCartItem = async (cart_id: number) => {
    try {
      const params = {
        cart_item_id: cart_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.REMOVETOCART,
        callback,
        showLoader: false,
        params,
      });
    } catch (error) {
      console.log('Remove Cart Item error:', error);
    }
  };

  useEffect(() => {
    _getCartDetails();
    _getCardList();
  }, []);

  //EDITANALITIAPI

  const [originalCartTestIds, setOriginalCartTestIds] = useState<number[]>([]);
  const allTestIds = analitiArrayData?.tests?.map((t: any) => t.test_id) || [];
  const isAllSelected = selectedTests?.length === allTestIds?.length;

  const isSameSelection = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  };

  const isSelectionChanged =
    !!analitiArrayData?.is_in_cart &&
    !isSameSelection(originalCartTestIds, selectedTests);

  const _analitiDetailsApi = async (analitiId: any) => {
    try {
      const params = {
        kit_id: analitiId,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        console.log(responseData, 'reponseData of api Kit Details');
        if (responseData.code === StatusCode.SUCCESS) {
          setEditAnalitiPopupVisible(true);
          setAnalitiArraysData(responseData.data);
          if (responseData.data.is_in_cart && responseData.data.cart_kit) {
            const { all_test, test_ids } = responseData.data.cart_kit;

            const selected =
              all_test === 1
                ? responseData.data.tests.map((t: any) => t.test_id)
                : test_ids;

            setSelectedTests(selected);
            setOriginalCartTestIds(selected); // ✅ SAVE ORIGINAL
          } else {
            setSelectedTests([]);
            setOriginalCartTestIds([]);
          }
        } else if (responseData.code === StatusCode.INVALID_OR_FAIL) {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITDETAILS,
        callback,
        params,
      });
    } catch (error) {
      toggleLoader(false);
      console.log('kit details error:', error);
    }
  };

  const _addToCartAnaliti = async () => {
    try {
      const params = {
        kit_id: analitiArrayData.id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          increment();
          // ✅ IMPORTANT: update local state
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            is_in_cart: true,
          }));
          navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.ADDTOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Analiti add to cart error:', error);
    }
  };

  const _updateCartAnaliti = async () => {
    try {
      const params = {
        cart_kit_id: analitiArrayData.cart_kit.cart_kit_id, // 🔑 IMPORTANT
        cart_item_id: analitiArrayData.cart_kit.cart_id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          // ✅ Update local state
          setEditAnalitiPopupVisible(false);
          _getCartDetails();
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            cart_kit: {
              ...prev.cart_kit,
              test_ids: selectedTests,
              all_test: isAllSelected ? 1 : 0,
            },
          }));

          setOriginalCartTestIds(selectedTests); // reset baseline

          navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.UPDATETOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Update cart error:', error);
    }
  };

  const handleNavigateCheckout = () => {
    if (!selectedTests.length) {
      flashMessageWarning(getTranslation('atleastoneselected'));
      return;
    }

    // 🟢 Not in cart → ADD
    if (!analitiArrayData?.is_in_cart || !analitiArrayData?.cart_kit) {
      _addToCartAnaliti();
      return;
    }

    // 🟡 In cart → check changes
    const hasChanged = !isSameSelection(originalCartTestIds, selectedTests);

    if (!hasChanged) {
      // ✅ No change → just navigate
      setEditAnalitiPopupVisible(false);
      return;
    }

    // 🔥 Changed → UPDATE
    _updateCartAnaliti();
  };

  //BOOKORDERAPI

  const [showCustomerSheet, setShowCustomerSheet] = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
  const [stripeEphemeralKey, setStripeEphemeralKey] = useState<string>('');

  const openCustomerSheet = async () => {
    try {
      setShowCustomerSheet(false);
      const callback = async (responseData: any) => {
        if (responseData.code !== StatusCode.SUCCESS) {
          flashMessageWarning(responseData.message);
          return;
        }

        const { customer, ephemeralKey } = responseData.data;

        setStripeCustomerId(customer);
        setStripeEphemeralKey(ephemeralKey);

        // 🔥 show sheet
        setShowCustomerSheet(true);
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.PAYMENT.CREATECUSTOMERCARDINTENT,
        callback,
      });
    } catch (error) {
      console.log('CreateIntent error:', error);
    }
  };

  const _addCardapi = async (payment_Method_Id: any) => {
    try {
      const params = {
        paymentMethodId: payment_Method_Id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          _getCardList();
          setShowPaymentModal(true);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.ADDCARD,
        callback,
        params,
      });
    } catch (error) {
      console.log('_addCardapi error:', error);
    }
  };

  const _getCardList = async () => {
    try {
      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          const response = responseData?.data || [];
          const defaultMethod = response[0]?.default_payment_method || null;
          const onlyCards = response.filter((item: any) => item.card_id);

          setCardData(onlyCards);
          setDefaultType(defaultMethod);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.PAYMENT.CARDLIST,
        callback,
      });
    } catch (error) {
      console.log('card List error:', error);
    }
  };

  const _setDefaultCardApi = async (type: string, card_id: string | null) => {
    try {
      const params = {
        type,
        card_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setDefaultType(type);
          _getCardList();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.SETDEFAULTCARD,
        callback,
        params,
      });
    } catch (error) {
      console.log('set default error:', error);
    }
  };

  const _deleteCard = async (card_id_params: string) => {
    try {
      setDeletingCardId(card_id_params);
      const params = {
        card_id: card_id_params,
      };

      const callback = async (responseData: any) => {
        setDeletingCardId(null);
        if (responseData.code === StatusCode.SUCCESS) {
          _getCardList();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.DELETECARD,
        showLoader: false, // 👈 KEY: Don't show global loader
        callback,
        params,
      });
    } catch (error) {
      setDeletingCardId(null);
      console.log('_deleteCard error:', error);
    }
  };
  const { LiveActivityModule } = NativeModules;
  const _bookOrder = async () => {
    try {
      const params = {
        address_id: selectedAddress?.address_id,
        subtotal: subtotal,
        coupon_id: appliedCouponValue?.id,
        discount: appliedCouponValue?.discount_amount,
        total_amount: total,
        note: manageAddress,
        test_date:
          selectedDate === 'Oggi'
            ? new Date().toISOString().split('T')[0]
            : apiDate,
        test_time: selectedTime,
        family_member_id: familymemberValue,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      // console.log('params', params);

      const callback = (responseData: any) => {
        console.log(
          'responsedata_bookorder',
          typeof responseData?.data?.data?.id,
        );

        if (responseData.code === StatusCode.SUCCESS) {
          resetCart();
          if (isPlatformiOS) {
            startLiveActivity(
              String(responseData?.data?.data?.id),
              'Stiamo cercando un infermiere per te...',
              'La tua richiesta è stata registrata. Stiamo cercando un infermiere per te...',
              1,
              JSON.stringify({ text: 'In attesa' }), // 👈 REQUIRED
            );
          } else {
            LiveActivityModule.show(
              String(responseData?.data?.data?.id),
              'Stiamo cercando un infermiere per te...',
              'Stiamo cercando un infermiere per te...',
              'Request',
            );
          }
          navigation.reset({
            index: 0,
            routes: [
              {
                name: ScreenNames.BOTTOMTABNAVIGATION,
                state: {
                  routes: [
                    {
                      name: ScreenNames.HOMECONTAINER,
                    },
                  ],
                },
              },
            ],
          });
          SocketService.emit('patient_join_booking');
          // setOrderStatus('order_sent');
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.BOOKORDER,
        params,
        callback,
      });
    } catch (error) {
      console.log('BOOKORDER error:', error);
    }
  };

  //AVAILABILITYBYADDRESSAPI
  const _availabilityByAddressApi = async (address_id: string | number) => {
    try {
      setIsLoadingSlots(true);
      setAvailabilitySlots([]);

      const params = {
        address_id: String(address_id),
      };

      const callback = (responseData: any) => {
        setIsLoadingSlots(false);
        if (responseData.code === StatusCode.SUCCESS) {
          const data = responseData.data ?? [];
          setAvailabilitySlots(data);
          // Sync selectedDate/Time to the first API entry so the picker matches
          if (data.length > 0) {
            setSelectedDate(data[0].day_name);
            if (data[0].slots.length > 0) {
              setSelectedTime(data[0].slots[0]);
            }
          }
        } else {
          setAvailabilitySlots([]);
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.AVAILABILITYBYADDRESS,
        params,
        showLoader: false,
        callback,
      });
    } catch (error) {
      setIsLoadingSlots(false);
      setAvailabilitySlots([]);
      console.log('Availability by address error:', error);
    }
  };

  // Fetch availability slots whenever selectedAddress changes
  useEffect(() => {
    if (selectedAddress?.address_id) {
      _availabilityByAddressApi(selectedAddress.address_id);
    } else {
      setAvailabilitySlots([]);
    }
  }, [selectedAddress?.address_id]);

  const _checkCouponApi = async () => {
    if (!discountCode.trim()) {
      flashMessageWarning(getTranslation('errorcoupanscode'));
      return;
    }

    try {
      const params = {
        coupon_code: discountCode.trim(),
        subtotal: subtotal,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          console.log('insucess');

          const coupon = responseData.data;

          // ✅ Save coupon
          setAppliedCoupon(true);
          setAppliedValue(coupon);

          // ✅ Use backend-calculated discount
          setDiscountValue(Number(coupon.discount_amount));

          flashMessageSucess(responseData.message);
        } else {
          // ❌ Invalid coupon
          setAppliedCoupon(false);
          setDiscountValue(0);
          setAppliedValue(null);
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.CHECKCOUPON,
        params,
        callback,
      });
    } catch (error) {
      console.log('Check coupon error:', error);
      setDiscountValue(0);
      setAppliedCoupon(false);
      setAppliedValue(null);
    }
  };

  return (
    <CheckoutComponent
      cartLoaded={cartLoaded}
      navigation={navigation}
      handleDeleteTestKit={handleDeleteTestKit}
      handleNavigateAddAddress={handleNavigateAddAddress}
      orderStatus={orderStatus}
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
      familyMemberData={familyMemberList?.data}
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
      //editanaliti
      editAnlitiPopupVisible={editAnlitiPopupVisible}
      setEditAnalitiPopupVisible={setEditAnalitiPopupVisible}
      funOpenEditAnaliti={funOpenEditAnaliti}
      funCloseEditAnaliti={funCloseEditAnaliti}
      analitiArrayData={analitiArrayData}
      renderitemanalitidata={renderItemAnalitiData}
      totalPriceAnaliti={totalPriceanaliti}
      isInCart={!!analitiArrayData?.is_in_cart}
      isSelectionChanged={isSelectionChanged}
      handleNavigateCheckout={handleNavigateCheckout}
      selectedTests={selectedTests}
      isAllSelected={isAllSelected}
      //AddressModel
      isLoadingAddress={isLoadingAddress}
      AddressData={AddressData}
      addressPopupVisible={addressPopupVisible}
      setAddressPopupVisible={setAddressPopupVisible}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
      tempSelectedAddress={tempSelectedAddress}
      setTempSelectedAddress={setTempSelectedAddress}
      //CancleModel
      cancleOrderVisible={cancleOrderVisible}
      setCancleOrderVisible={setCancleOrderVisible}
      funOpenCancleOrder={funOpenCancleOrder}
      funCloseCancleOrder={funCloseCancleOrder}
      handleNavigateHome={handleNavigateHome}
      //AddAddressModel
      handleOnPressDeleteAddress={handleOnPressDeleteAddress}
      handleEditAddress={handleEditAddress}
      addressMode={addressMode}
      addAddressPopupVisible={addAddressPopupVisible}
      setAddAddressPopupVisible={setAddAddressPopupVisible}
      funOpenAddAddressPopup={funOpenAddAddressPopup}
      funCloseAddAddressPopup={funCloseAddAddressPopup}
      searchRef={searchRef}
      handlePlaceSelect={handlePlaceSelect}
      handleOnPressSaveAddress={handleOnPressSaveAddress}
      handleOnChangeText={handleOnChangeText}
      floor={floor}
      stairs={stairs}
      instructions={instructions}
      floorRef={floorRef}
      stairsRef={stairsRef}
      instructionRef={instructionRef}
      floorError={floorError}
      setFloorError={setFloorError}
      stairsError={stairsError}
      setStairsError={setStairsError}
      instructionsError={instructionsError}
      setInstructionNameError={setInstructionNameError}
      toggleisDefault={toggleisDefault}
      isdefaultsave={isdefaultsave}
      setAddressTypeValue={setAddressTypeValue}
      addressTypeValue={addressTypeValue}
      addressTypeData={addressTypeData}
      handleSetAddressType={handleSetAddressType}
      searchAddress={searchAddress}
      setSearchAddress={setSearchAddress}
      searchAddressError={searchAddressError}
      setSearchAddressError={setSearchAddressError}
      addressTypeError={addressTypeError}
      setAddressTypeError={setAddressTypeError}
      handleOnPressSaveLocation={handleOnPressSaveLocation}
      handleCloseAddress={handleCloseAddress}
      handlePressAddAddress={handlePressAddAddress}
      checkup={checkup}
      analiti={analiti}
      renderKitData={renderKitData}
      renderAnalitiData={renderAnalitiData}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      checkupcount={checkupcount}
      analiticount={analiticount}
      funGetTestedContainer={funGetTestedContainer}
      appliedCoupon={appliedCoupon}
      showCustomerSheet={showCustomerSheet}
      setShowCustomerSheet={setShowCustomerSheet}
      stripeCustomerId={stripeCustomerId}
      stripeEphemeralKey={stripeEphemeralKey}
      _bookOrder={_bookOrder}
      _addCardapi={_addCardapi}
      _getCardList={_getCardList}
      cardData={cardData}
      defaultType={defaultType}
      showPaymentModal={showPaymentModal}
      setShowPaymentModal={setShowPaymentModal}
      payData={payData}
      _setDefaultCardApi={_setDefaultCardApi}
      _deleteCard={_deleteCard}
      openCustomerSheet={openCustomerSheet}
      deletingCardId={deletingCardId}
      // Availability slots
      availabilitySlots={availabilitySlots}
      isLoadingSlots={isLoadingSlots}
    />
  );
};

export default CheckoutContainer;
