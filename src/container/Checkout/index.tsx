import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
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
  appName,
  currency,
  flashMessageWarning,
  flashMessageWarningBottom,
  getRandomTheme,
  goToTabScreen,
  useDelayedBg,
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
import { useFocusEffect } from '@react-navigation/native';
import { fontsfamily } from '../../constants/FontFamily';

const CheckoutContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();
  const { cartCount, cartKitIds, addKit, removeKit, increment } =
    ZustandStores.CartStore();

  //LocallyMangeIsTick
  useFocusEffect(
    useCallback(() => {
      if (!checkup?.data?.length) return;

      checkup.updateData((prev: any[]) =>
        prev.map(item => {
          const shouldBeInCart = cartKitIds.includes(item.id);

          // ⛔ prevent unnecessary re-render
          if (item.is_in_cart === shouldBeInCart) {
            return item;
          }

          return {
            ...item,
            is_in_cart: shouldBeInCart,
          };
        }),
      );
    }, [cartKitIds]),
  );

  const testKits = [
    {
      id: '1',
      name: 'Diabete',
      type: 'kit',
      price: 35,
      kitimage: images.imgkit1,
      count: 12,
    },
    {
      id: '2',
      name: 'Diabete',
      type: 'kit',
      price: 35,
      kitimage: images.imgkit1,
      count: 12,
    },
    {
      id: '3',
      name: 'Cuore e circolazione',
      price: 35,
      type: 'analiti',
      kitimage: images.imgHeart,
      count: 12,
    },
  ];

  const kitList = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Alta richiesta',
      kitimages: images.imgkit1,
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
      kitimages: images.imgkit2,
    },
    {
      id: '3',
      title: 'Colesterolo',
      description: 'Controllo colesterolo totale e HDL',
      price: '40.00',
      isLiked: false,
      isAdded: false,
      status: 'Pronto in 24 ore',
      kitimages: images.imgkit3,
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit4,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit5,
    },
    {
      id: '6',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit6,
    },
    {
      id: '7',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit7,
    },
    {
      id: '8',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit1,
    },
    {
      id: '9',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit2,
    },
    {
      id: '10',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit3,
    },
    {
      id: '11',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit4,
    },
    {
      id: '12',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit1,
    },
    {
      id: '13',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimages: images.imgkit5,
    },
  ];

  const analitiList = [
    {
      id: '1',
      title: 'Cuore e circolazione',
      price: '6.00',
      analitiimages: images.imgHeart,
    },
    {
      id: '2',
      title: 'Reni',
      price: '6.00',
      analitiimages: images.imgKidney,
    },
    {
      id: '3',
      title: 'Fegato',
      price: '6.00',
      analitiimages: images.imgSoda,
    },
    {
      id: '4',
      title: 'Tiroide',
      price: '6.00',
      analitiimages: images.imgButterfly,
    },
    {
      id: '5',
      title: 'Diabete e metabolismo',
      price: '6.00',
      analitiimages: images.imgLolipop,
    },
    {
      id: '6',
      title: 'Anemia e sangue',
      price: '6.00',
      analitiimages: images.imgBlood,
    },
    {
      id: '7',
      title: 'Ossa e vitamina D',
      price: '6.00',
      analitiimages: images.imgHadi,
    },
    {
      id: '8',
      title: 'Difese immunitarie',
      price: '6.00',
      analitiimages: images.imgShield,
    },
    {
      id: '9',
      title: 'Ormone uomo',
      price: '6.00',
      analitiimages: images.imgMasrrom,
    },
    {
      id: '10',
      title: 'Ormone donna',
      price: '6.00',
      analitiimages: images.imgFlower,
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

  const kitsData = [
    {
      id: '1',
      name: 'Emocromo',
      desc: 'Conteggio completo delle cellule del sangue',
      price: 7.0,
      status: null,
    },
    {
      id: '2',
      name: 'Sideremia',
      desc: 'Livello di ferro nel sangue',
      price: 6.0,
      status: null,
    },
    {
      id: '3',
      name: 'Ferritina',
      desc: 'Riserve di ferro nell’organismo',
      price: 6.0,
      status: 'Da fare',
    },
    {
      id: '4',
      name: 'Emoglobulina A2',
      desc: 'Proteina che trasporta il ferro',
      price: 11.0,
      status: null,
    },
    {
      id: '5',
      name: 'Vitamina B12',
      desc: 'Vitamina essenziale per la produzione di globuli rossi',
      price: 10.0,
      status: null,
    },
    {
      id: '6',
      name: 'Sangue occulto',
      desc: 'Ricerca di sangue nascosto nelle feci',
      price: 12.0,
      status: 'Deal',
    },
    {
      id: '7',
      name: 'Anticorpi transglutaminasi',
      desc: 'Test per escludere celiachia',
      price: 10,
      status: null,
    },
  ];

  const addressList = [
    {
      id: 1,
      title: 'Usa la mia posizione',
      subtitle: 'Consenti la geolocalizzazione',
    },
    { id: 2, title: 'Casa', subtitle: 'Via Roma, 31 – Naples' },
    { id: 3, title: 'Appartamento', subtitle: 'Piazzale Napoli, 21 – Rome' },
  ];

  const analaitidata = [
    {
      id: '1',
      name: 'Colesterolo Totale',
      desc: 'Quanto colesterolo hai nel sangue',
      price: 8.0,
      status: null,
    },
    {
      id: '2',
      name: 'Colesterolo HDL',
      desc: "Il colesterolo 'buono' per il cuore",
      price: 10.0,
      status: null,
    },
    {
      id: '3',
      name: 'Colesterolo LDL',
      desc: "Il colesterolo 'cattivo' da controllare",
      price: 6.0,
      status: 'Da fare',
    },
    {
      id: '4',
      name: 'Trigliceridi',
      desc: 'Grassi da tenere sotto controllo',
      price: 11.0,
      status: null,
    },
    {
      id: '5',
      name: 'Profilo Lipidico Completo',
      desc: 'Analisi completa dei grassi nel sangue',
      price: 10.0,
      status: null,
    },
  ];

  const [testkitsData, setTestsKitData] = useState<any>([]);
  const [kitData, setKitData] = useState(kitList);
  const [analitiData, setAnalitiData] = useState(analitiList);
  const [kitDataAddMore, setKitDataAddMore] = useState(kitListAddMore);
  const [kitsArrayData, setKitsArraysData] = useState(kitsData);
  const [analitiArrayData, setAnalitiArraysData] = useState<any>({});
  const [selectedTests, setSelectedTests] = useState<number[]>([]);

  const totalPriceanaliti = analitiArrayData?.tests
    ?.filter((t: any) => selectedTests.includes(t.test_id))
    ?.reduce((sum: number, t: any) => sum + Number(t.price || 0), 0);

  // const [selectedTestsAnaliti, setSelectedTestsAnaliti] = useState(
  //   analitiArrayData.map(t => t.id),
  // );
  const [selectedTestsKits, setSelectedTestsKits] = useState(
    kitsArrayData.map(t => t.id),
  );

  const [manageAddress, setManageAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(20);

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
  const [selectedTab, setSelectedTab] = useState('checkup'); // 'checkup' or 'analiti'

  const [checkupcount, setCheckupCount] = useState(31);
  const [analiticount, setAnalitiCount] = useState(31);

  const [showIsModifyOrder, setShowIsModifyOrder] = useState(false);
  const [showIsKitTestDetails, setShowIsKitTestDetails] = useState(false);

  const [cancleOrderVisible, setCancleOrderVisible] = useState(false);

  const [editAnlitiPopupVisible, setEditAnalitiPopupVisible] = useState(false);

  const pickerBg = useDelayedBg(cancleOrderVisible, 400);

  const [selectedAddress, setSelectedAddress] = useState(null);
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

  const handleBookSlot = () => {
    if (selectedDate && selectedTime) {
      setSelectedSlot({ day: selectedDate, time: selectedTime });
      setShowPicker(false);
    }
  };

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

  // const toggleSelect = (id: string) => {
  //   setSelectedTestsAnaliti(prev => {
  //     // ❌ If only 1 item is selected → DO NOT allow removal
  //     if (prev.length === 1 && prev.includes(id)) {
  //       Alert.alert(getTranslation('atleastoneselected') || '');
  //       return prev; // stop here
  //     }

  //     // Normal add/remove
  //     return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
  //   });
  // };

  // const totalPriceAnaliti = analitiArrayData
  //   .filter(t => selectedTestsAnaliti.includes(t.id))
  //   .reduce((sum, t) => sum + t.price, 0);

  const totalPriceKits = kitsArrayData
    .filter(t => selectedTestsKits.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

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

  const renderItemKitsData = ({ item, index }: { item: any; index: any }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            gap: getWidth(12),
          }}
        >
          <View style={{ alignSelf: 'flex-start' }}>
            <Image source={images.imglightbluetick} />
          </View>
          <View style={{ flex: 1, marginRight: getWidth(20) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.lblTestName} numberOfLines={2}>
                {item.name}{' '}
              </Text>
              {item.status && (
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.lblStatus,
                      {
                        backgroundColor:
                          index == 2
                            ? Colors.greenD9
                            : index == 5
                            ? Colors.redFC
                            : Colors.white,
                        color:
                          index == 2
                            ? Colors.green0D
                            : index == 5
                            ? Colors.red40
                            : Colors.white,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.lblDesc} numberOfLines={3}>
              {item.desc}
            </Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', marginTop: 2 }}>
          <Text style={styles.lblCurrency}>
            + {currency}
            {item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const handleApplyDiscount = () => {
    // Just a sample logic
    if (discountCode === 'AA000000') {
      setDiscountValue(10);
      setDiscountCode('');
    } else {
      setDiscountValue(0);
    }
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

  const funOpenIsModifyOrder = () => {
    setShowIsModifyOrder(true);
    // navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
    //   screen: ScreenNames.GETTESTEDCONTAINER,
    // });
    // goToTabScreen(navigation, ScreenNames.GETTESTEDCONTAINER);
  };

  const funGetTestedContainer = () => {
    navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
      screen: ScreenNames.GETTESTEDCONTAINER,
    });
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

  const funOpenIsKitTestDetails = () => {
    setShowIsModifyOrder(false);
    setShowIsKitTestDetails(true);
  };

  const pressHandleCartItem = (item: any) => {
    if (item?.kit_type === 'CHECKUP') {
      setShowIsKitTestDetails(true);
    } else {
      _analitiDetailsApi(item?.kit_id);
    }
  };

  const funOpenEditKit = () => {
    setShowIsKitTestDetails(true);
  };

  const funCloseEditKit = () => {
    setShowIsKitTestDetails(false);
  };

  const funOpenEditAnaliti = () => {
    setEditAnalitiPopupVisible(true);
  };

  const funCloseEditAnaliti = () => {
    setEditAnalitiPopupVisible(false);
  };

  const funCloseIsKitTestDetails = () => {
    setShowIsKitTestDetails(false);
    setShowIsModifyOrder(true);
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
        onPress={funOpenIsKitTestDetails}
      >
        <View style={{ gap: getHeight(8) }}>
          <View style={styles.vwGrey}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity> */}
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

  const renderKitDataAddMore = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        onPress={funOpenIsKitTestDetails}
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
            {/* <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity> */}
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
    setOrderStatus('order_sent');
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

  //AddAddress
  const addressType = [
    { label: getTranslation('addresstypehome'), value: '1' },
    { label: getTranslation('addresstypework'), value: '2' },
    { label: getTranslation('addresstypemedical'), value: '3' },
    { label: getTranslation('addresstypeother'), value: '4' },
  ];

  const [AddressData, setAddressData] = useState([]);
  const [addressPopupVisible, setAddressPopupVisible] = useState(false);
  const [addAddressPopupVisible, setAddAddressPopupVisible] = useState(false);

  type AddressMode = 'add' | 'edit';
  const [addressMode, setAddressMode] = useState<AddressMode>('add');
  const [editAddressData, setEditAddressData] = useState<any>(null);

  const [searchAddress, setSearchAddress] = useState('');
  const [searchAddressError, setSearchAddressError] = useState<any>('');

  const [isdefaultsave, setIsDefaultSave] = useState(true);
  const [floor, setFloor] = useState<string>('');
  const [stairs, setStairs] = useState<string>('');
  const [instructions, setinstructions] = useState<string>('');

  const floorRef = useRef<TextInput | null>(null);
  const stairsRef = useRef<TextInput | null>(null);
  const instructionRef = useRef<TextInput | null>(null);

  const [floorError, setFloorError] = useState<any>('');
  const [stairsError, setStairsError] = useState<any>('');
  const [instructionsError, setInstructionNameError] = useState<any>('');

  const [addressTypeData, setAddressTypeData] = useState(addressType);
  const [addressTypeValue, setAddressTypeValue] = useState<string | null>('1');
  const [addressTypeItem, setAddressTypeItem] = useState<string | null>(
    addressTypeData[0].label,
  );

  const [addressTypeError, setAddressTypeError] = useState<any>('');
  const [selectedid, setSelectedId] = useState<any>('');

  const handleSetAddressType = (item: any) => {
    setAddressTypeValue(item.value);
  };

  const handleOnChangeText = (text: string, type: string) => {
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
    } else if (floor.trim() === '') {
      setFloorError(getTranslation('emptyFloor'));
      return;
    } else if (!/^\d+$/.test(floor)) {
      setFloorError(getTranslation('invalidFloor'));
      return;
    } else if (stairs.trim() === '') {
      setStairsError(getTranslation('emptyStairs'));
      return;
    } else if (!/^[A-Za-z]+$/.test(stairs)) {
      setFloorError(getTranslation('invalidStairs'));
      return;
    } else if (instructions.trim() == '') {
      setInstructionNameError(getTranslation('emptyInstructions'));
      return;
    } else {
      if (addressMode == 'add') {
        _addAddressApi();
      } else {
        _updateAddressApi();
      }
    }
  };

  const handleOnPressSetId = (item: any) => {
    setSelectedId(item.id);
  };

  const handleCloseAddress = () => {
    setAddressPopupVisible(false); // do NOT reset selectedAddress
  };

  const handleOnPressSaveLocation = (item: any) => {
    console.log('item', item);
    setSelectedAddress(item);
    setAddressPopupVisible(false);
  };

  const handlePressAddAddress = () => {
    setAddressPopupVisible(false);
    // setAddAddressPopupVisible(true);
    // ⏱ wait until AddressModel is fully closed
    setTimeout(() => {
      setAddAddressPopupVisible(true);
    }, 500); // match animationOut duration
  };

  const searchRef = useRef<any>(null);

  const handlePlaceSelect = async (place: any) => {
    console.log('call', place);
    if (place && place.placeId) {
      console.log('Selected place:', JSON.stringify(place));
      console.log('place?.text?.text', place?.text?.text);

      // searchRef.current?.clear();
      setSearchAddress(place?.text?.text);
      // setSearchText("");
    }
  };

  const toggleisDefault = () => {
    setIsDefaultSave(!isdefaultsave);
  };

  //chekout chnage btn fun
  const handleNavigateAddAddress = () => {
    _addressListApi();
  };

  const handleOnPressDeleteAddress = async () => {
    await _deleteAddressApi();
  };

  //add address btn
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

    setAddressPopupVisible(false);

    setTimeout(() => {
      setAddAddressPopupVisible(true);
    }, 500);
  };

  const handleEditAddress = (address: any) => {
    console.log('call edit address');

    setAddressMode('edit');
    setEditAddressData(address);

    // prefill fields
    setSearchAddress(address.address);
    setFloor(address.floor);
    setStairs(address.stairs);
    setinstructions(address.instructions);
    setIsDefaultSave(address.is_default === 1);
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

  //close add address
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

  //FAMILYLIST
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
      return {
        ...res,
        data: formattedData ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const familyMemberList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFamilyMemberList,
  });

  // Api AddressList
  const _addressListApi = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setAddressPopupVisible(true);

          const list = responseData.data || [];
          setAddressData(list);

          // ✅ Auto select default address
          const defaultAddress = list.find(
            (item: any) => item.is_default === 1,
          );
          console.log('defaultAddress', defaultAddress);

          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
          } else {
            setSelectedAddress(null);
          }
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.ADDRESS.GETADDRESS,
        callback,
        params,
      });
    } catch (error) {
      console.log('Address List error:', error);
    }
  };

  const _addAddressApi = async () => {
    setAddressTypeValue('1');
    setSearchAddress('');
    setFloor('');
    setStairs('');
    setinstructions('');
    setIsDefaultSave(false);
    try {
      const params = {
        address: searchAddress,
        title: addressTypeItem,
        floor: floor,
        stairs: stairs,
        instructions: instructions,
        latitude: '0',
        longitude: '0',
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
        latitude: '0',
        longitude: '0',
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

  //API MODEL ADDITIONS

  const fetchCheckupList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITLIST,
        method: 'POST',
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
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
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
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
    enabled: selectedTab === 'checkup',
    fetcher: fetchCheckupList,
  });

  const analiti: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: selectedTab === 'analiti',
    fetcher: fetchAnalitiList,
  });

  //ADDTOCART
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

  const [cartLoaded, setCartLoaded] = useState(false);

  //GETCARTDETAILS
  const _getCartDetails = async () => {
    try {
      const params = {};

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setTestsKitData(responseData.data);
        } else {
          setTestsKitData([]);
          flashMessageWarning(responseData.message);
        }
        setCartLoaded(true); // ✅ API finished
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
  }, []);

  //edit analiti

  //==================API=========================
  const [originalCartTestIds, setOriginalCartTestIds] = useState<number[]>([]);

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

  const isSameSelection = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  };
  const allTestIds = analitiArrayData?.tests?.map((t: any) => t.test_id) || [];

  const isAllSelected = selectedTests.length === allTestIds.length;
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

  const isSelectionChanged =
    !!analitiArrayData?.is_in_cart &&
    !isSameSelection(originalCartTestIds, selectedTests);

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
      renderKitDataInCart={renderKitDataInCart}
      // kitDataInCart={kitDataInCart}
      kitDataAddMore={kitDataAddMore}
      renderKitDataAddMore={renderKitDataAddMore}
      funOpenIsKitTestDetails={funOpenIsKitTestDetails}
      funCloseIsKitTestDetails={funCloseIsKitTestDetails}
      showIsKitTestDetails={showIsKitTestDetails}
      setShowIsKitTestDetails={setShowIsKitTestDetails}
      //kittestdetails
      kitsArrayData={kitsArrayData}
      renderItemKitsData={renderItemKitsData}
      totalPriceKits={totalPriceKits}
      funOpenEditKit={funOpenEditKit}
      funCloseEditKit={funCloseEditKit}
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
      AddressData={AddressData}
      addressPopupVisible={addressPopupVisible}
      setAddressPopupVisible={setAddressPopupVisible}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
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
      handleOnPressSetId={handleOnPressSetId}
      selectedid={selectedid}
      handleCloseAddress={handleCloseAddress}
      handlePressAddAddress={handlePressAddAddress}
      //kitanalitieditmodel
      checkup={checkup}
      analiti={analiti}
      renderKitData={renderKitData}
      renderAnalitiData={renderAnalitiData}
      kitData={kitData}
      analitiData={analitiData}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      checkupcount={checkupcount}
      analiticount={analiticount}
      pickerBg={pickerBg}
      funGetTestedContainer={funGetTestedContainer}
    />
  );
};

export default CheckoutContainer;
