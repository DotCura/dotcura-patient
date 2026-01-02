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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CheckoutComponent from '../../components/Checkout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import {
  activityOpacity,
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

const CheckoutContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();

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

  const [testkitsData, setTestsKitData] = useState(testKits);
  const [kitData, setKitData] = useState(kitList);
  const [analitiData, setAnalitiData] = useState(analitiList);
  const [kitDataAddMore, setKitDataAddMore] = useState(kitListAddMore);
  const [kitsArrayData, setKitsArraysData] = useState(kitsData);
  const [analitiArrayData, setAnalitiArraysData] = useState(analaitidata);

  const [selectedTestsAnaliti, setSelectedTestsAnaliti] = useState(
    analitiArrayData.map(t => t.id),
  );
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
  const [AddressData, setAddressData] = useState(addressList);
  const [addressPopupVisible, setAddressPopupVisible] = useState(false);
  const [cancleOrderVisible, setCancleOrderVisible] = useState(false);
  const [addAddressPopupVisible, setAddAddressPopupVisible] = useState(false);
  const [editAnlitiPopupVisible, setEditAnalitiPopupVisible] = useState(false);

  const pickerBg = useDelayedBg(cancleOrderVisible, 400);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const homeServiceCharge = 20;

  const subtotal = useMemo(() => {
    return testkitsData.reduce((sum, item) => sum + item.price, 0);
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

  const toggleSelect = (id: string) => {
    setSelectedTestsAnaliti(prev => {
      // ❌ If only 1 item is selected → DO NOT allow removal
      if (prev.length === 1 && prev.includes(id)) {
        Alert.alert(getTranslation('atleastoneselected') || '');
        return prev; // stop here
      }

      // Normal add/remove
      return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
    });
  };

  const totalPriceAnaliti = analitiArrayData
    .filter(t => selectedTestsAnaliti.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  const totalPriceKits = kitsArrayData
    .filter(t => selectedTestsKits.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  const handleNavigateKitDetails = () => {
    // navigation.navigate(ScreenNames.KITDETAILSCONTAINER);
    setShowIsModifyOrder(false);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.KITDETAILSCONTAINER,
    });
  };

  const toggleAddKit = (id: string) => {
    setKitData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isAdded: !item.isAdded } : item,
      ),
    );
  };

  const renderKitData = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        onPress={handleNavigateKitDetails}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(32),
          borderRadius: 20,
          // marginRight: 12,
          marginLeft: index % 2 === 0 ? 0 : getWidth(16),
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <ImageBackground source={item.kitimages} style={styles.vwGrey}>
            {item.isAdded ? (
              <TouchableOpacity
                style={styles.btnPlusBlue}
                activeOpacity={activityOpacity}
                onPress={() => toggleAddKit(item.id)}
              >
                <Image source={images.imgBlueTickRight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => toggleAddKit(item.id)}
                style={styles.btnPlusBlack}
                activeOpacity={activityOpacity}
              >
                <Image source={images.imgPlusBlack} />
              </TouchableOpacity>
            )}

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
          </ImageBackground>

          {/* veProductDetails */}
          <View>
            <Text style={styles.lblTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.lblDescription} numberOfLines={3}>
              {item.description}
            </Text>
            <Text style={styles.lblPrice} numberOfLines={1}>
              {currency}
              {item.price}
            </Text>
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
          setShowIsModifyOrder(false);
          navigation.navigate('TransitionFlow', {
            screen: ScreenNames.ANALITIDETAILSCONTAINER,
          });
          // navigation.navigate(ScreenNames.ANALITIDETAILSCONTAINER);
        }}
        style={styles.btnAnalitiMain}
      >
        <View style={styles.vwtitleimage}>
          <Image source={item.analitiimages} />
          <Text style={styles.lblAnalitiLabel} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <View style={styles.vwCurrencyPrice}>
          <Text style={styles.lablCurrency}>
            {getTranslation('andtext')} {currency}{' '}
          </Text>
          <Text style={styles.lablPrice}>{item.price}</Text>
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

  const handleDeleteTestKit = (id: any) => {
    const updated = testkitsData.filter(item => item.id !== id);
    setTestsKitData(updated);
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

  const funOpenAddAddressPopup = () => {
    setAddAddressPopupVisible(true);
  };

  const funCloseAddAddressPopup = () => {
    setAddAddressPopupVisible(false);
    // setAddressPopupVisible(true);
    setTimeout(() => {
      setAddressPopupVisible(true);
    }, 500); // match animationOut duration
  };

  const funOpenIsKitTestDetails = () => {
    setShowIsModifyOrder(false);
    setShowIsKitTestDetails(true);
  };

  const pressHandleCartItem = (type: any) => {
    if (type === 'kit') {
      setShowIsKitTestDetails(true);
    } else {
      setEditAnalitiPopupVisible(true);
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
            source={item.kitimage}
            style={{
              height: getWidth(43),
              width: getWidth(43),
              borderRadius: 8,
            }}
          />
          <View style={{ flex: 1, marginRight: getWidth(25) }}>
            <Text style={styles.cardTitle}>
              {item.type === 'kit' && getTranslation('kitlabeltextcheckout')}
              {item.name}{' '}
              {item.type !== 'kit' && (
                <Text style={styles.lblKitCount}>({item.count})</Text>
              )}
            </Text>
            <Text style={styles.cardPrice}>
              {currency} {item.price.toFixed(2)}
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
          {item.type !== 'kit' && (
            <TouchableOpacity
              // style={styles.editbtn}
              onPress={() => {
                pressHandleCartItem(item.type);
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
            onPress={() => handleDeleteTestKit(item.id)}
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

  const renderitemanalitidata = ({
    item,
    index,
  }: {
    item: any;
    index: any;
  }) => {
    const selected = selectedTestsAnaliti.includes(item.id);
    const isLastSelected = selectedTestsAnaliti.length === 1 && selected;

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
          <View style={{ flex: 1, marginRight: getWidth(20), gap: 1 }}>
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
            <Text style={styles.lblCurrencyanaliti}>
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
              onPress={() => toggleSelect(item.id)}
            >
              <Image source={images.imgPlusDark} />
              <Text style={styles.lblAdd}>{getTranslation('add')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={activityOpacity}
              style={[styles.btnadd, { backgroundColor: Colors.white }]}
              onPress={() => toggleSelect(item.id)}
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

  // const handleOnPressSaveChanges = () => {
  //   navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
  //     screen: ScreenNames.HOMECONTAINER,
  //   });
  //   // goToTabScreen(navigation, ScreenNames.HOMECONTAINER);
  //   setOrderStatus('order_sent');
  // };

  const handleNavigateAddAddress = () => {
    setAddressPopupVisible(true);
  };

  // const handleNavigateHome = () => {
  //   // goToTabScreen(navigation, ScreenNames.HOMECONTAINER);
  //   setOrderStatus('');
  //   setCancleOrderVisible(false);
  //   navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
  //     screen: ScreenNames.HOMECONTAINER,
  //   });
  // };

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
    { label: 'Home', value: '1' },
    { label: 'Apartment', value: '2' },
    { label: 'Residency', value: '3' },
  ];

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
  const [addressTypeValue, setAddressTypeValue] = useState<string | null>('');
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
      funCloseAddAddressPopup();
      setTimeout(() => {
        setAddressPopupVisible(true);
      }, 500); // match animationOut duration
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
    // if (place && place.placeId) {
    //   toggleLoader(true);
    //   // console.log("Selected place:", JSON.stringify(place));
    //   searchRef.current?.clear();
    //   // setSearchText("");

    //   try {
    //     // Fetch place details to get lat/lng
    //     const response = await fetch(
    //       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&key=${googleApiKey}`
    //     );
    //     const data = await response.json();

    //     console.log("selectPlaceData", JSON.stringify(data));

    //     //Update Search Count API Call
    //     _updateCount();
    //     Keyboard.dismiss();
    //     toggleLoader(false);
    //     if (data.result && data.result.geometry) {
    //       const { lat, lng } = data.result.geometry.location;

    //       setLocationForLatLong({ lat, lng });

    //       // Update map region to the selected location
    //       const newRegion = {
    //         latitude: lat,
    //         longitude: lng,
    //         latitudeDelta: 0.001, // Adjust zoom level as needed
    //         longitudeDelta: 0.001,
    //       };

    //       // Update map region state
    //       setMapRegion(newRegion);

    //       // Animate map to the new location
    //       if (mapRef.current) {
    //         mapRef.current.animateToRegion(newRegion, 700); // 1000 ms animation duration
    //       }
    //       setLatitude(lat);
    //       setLongitude(lng);
    //       // _venueList(lat, lng);
    //       _eventList(lat, lng, 0);

    //       {
    //         subscriptionData?.is_subscription != 0  &&
    //           fetchNearbyAirports(lat, lng);
    //       }

    //       // {
    //       //   subscriptionData?.is_subscription != 0;
    //       //   _getNearByDriverApi(lat, lng);
    //       // }

    //       console.log("Latitude:", lat, "Longitude:", lng);
    //     } else {
    //       console.warn("Could not fetch lat/lng");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching place details:", error);
    //   }
    // }
  };

  const toggleisDefault = () => {
    setIsDefaultSave(!isdefaultsave);
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

  return (
    <CheckoutComponent
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
      renderitemanalitidata={renderitemanalitidata}
      totalPriceAnaliti={totalPriceAnaliti}
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
