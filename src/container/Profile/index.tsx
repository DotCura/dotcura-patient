import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import AppHeader from '../../global/Header';
import ProfileComponent from '../../components/Profile';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { activityOpacity, appName, currency } from '../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { ScreenNames } from '../../constants/AppConstants';
import { formatPhoneNumber } from '../../constants/TextInputConstant';
import { regex } from '../../constants/Regex';
import { MmkvManager } from '../../constants/utils/MmkvManager';
import { CommonActions } from '@react-navigation/native';
import { ZustandStores } from '../../store';

const ProfileContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();

  const recommandAnalysis = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      kitimage: images.imgkit1,
      isLiked: false,
      isAdded: false,
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      kitimage: images.imgkit2,
      isLiked: false,
      isAdded: false,
    },
    {
      id: '3',
      title: 'Colesterolo',
      description: 'Controllo colesterolo totale e HDL',
      price: '40.00',
      isLiked: false,
      isAdded: false,
      kitimage: images.imgkit3,
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
      kitimage: images.imgkit4,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      kitimage: images.imgkit5,
    },
  ];
  const data = [
    {
      id: '1',
      title: getTranslation('orderhistoryprofile'),
      image: images.imgcartclock,
      onpressfun: () => {
        setIsShowOrderHistoryModel(true);
      },
      iscurv: true,
    },
    {
      id: '6',
      title: getTranslation('favourite'),
      image: images.imgFavProfile,
      onpressfun: () => {
        console.log('fav');
      },
      iscurv: true,
    },
    {
      id: '2',
      title: getTranslation('notificationsprofile'),
      image: images.imgBell,
      onpressfun: () => {
        navigation.navigate(ScreenNames.NOTIFICATIONSWITCHCONTAINER);
      },
      iscurv: true,
    },
    {
      id: '3',
      title: getTranslation('access'),
      image: images.imgWarningProfile,
      onpressfun: () => {
        navigation.navigate(ScreenNames.ACCESSCONTAINER);
      },
      iscurv: true,
    },
    {
      id: '4',
      title: getTranslation('paymentmethod'),
      image: images.imgCard,
      onpressfun: () => {
        setVisiblePaymentMethodModel(true);
      },
      iscurv: true,
    },
    {
      id: '5',
      title: getTranslation('addresss'),
      image: images.imgAddressProfile,
      onpressfun: () => {
        setAddressPopupVisible(true);
      },
      iscurv: true,
    },
  ];
  const dataTwo = [
    {
      id: '2',
      title: getTranslation('termsandconditions'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('Terms');
      },
      iscurv: false,
    },
    {
      id: '3',
      title: getTranslation('privacypolicy'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('Terms');
      },
      iscurv: false,
    },
  ];
  const dataThree = [
    {
      id: '1',
      title: getTranslation('supportprofile'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('suppoet');
      },
      iscurv: false,
    },
    {
      id: '2',
      title: getTranslation('rateapp'),
      image: images.imgShareProfile,
      onpressfun: () => {
        console.log('rate');
      },
      iscurv: false,
    },
  ];
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
  const orderHistory = [
    {
      id: '1',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Pagato',
      date: '8/8/2025',
      price: 35,
    },
    {
      id: '2',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Cancellato',
      date: '8/8/2025',
      price: 35,
    },
    {
      id: '3',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Pagato',
      date: '8/8/2025',
      price: 35,
    },
    {
      id: '4',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Pagato',
      date: '8/8/2025',
      price: 35,
    },
    {
      id: '5',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Pagato',
      date: '8/8/2025',
      price: 35,
    },
    {
      id: '6',
      orderid: '#121314',
      title: 'Diabetes',
      status: 'Cancellato',
      date: '8/8/2025',
      price: 35,
    },
  ];
  const addressList = [
    { id: 1, title: 'Use my location', subtitle: 'Allow geolocation' },
    { id: 2, title: 'Home', subtitle: 'Via Roma, 31 – Naples' },
    { id: 3, title: 'Apartment', subtitle: 'Piazzale Napoli, 21 – Rome' },
  ];
  const cardList = [
    { id: 1, title: '•••• 6666', subtitle: 'Visa', images: images.imgvisa },
    {
      id: 2,
      title: '•••• 1234',
      subtitle: 'Mastercard',
      images: images.imgmastercard,
    },
  ];
  const payList = [
    { id: 1, title: 'Apple Pay', images: images.imgapplepay },
    { id: 2, title: 'Klarna', images: images.imgkalrnapay },
    { id: 3, title: 'PayPal', images: images.imgpaypal },
  ];

  const [settingsSwitch, setSettingsSwitch] = useState<any>({
    email_24h: true,
    email_results: false,
    email_offers: false,
    email_tips: false,
    email_updates: false,

    sms_1h: true,
    sms_confirm: false,
    sms_periodic: false,
    sms_limited: false,
    sms_urgent: false,

    push_1h: false,
    push_tracking: false,
    push_results: false,
    push_suggestions: true,
    push_tips: true,
  });

  const [recommandAnalysisData, setrecommandAnalysisData] =
    useState(recommandAnalysis);
  const [fullName, setFullName] = useState('Giovanni Carnevale');
  const [memberSince, setMemberSince] = useState('2025');
  const [testkitsData, setTestsKitData] = useState(testKits);
  const [orderHistoryData, setOrderHistoryData] = useState(orderHistory);
  const [AddressData, setAddressData] = useState(addressList);
  const [cardData, setCardData] = useState(cardList);
  const [payData, setPayData] = useState(payList);
  const [addressPopupVisible, setAddressPopupVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCards, setSelectedCards] = useState(null);
  const [selectedPays, setSelectedPays] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [callingCode, setCallingCode] = useState<any>('39');
  const [email, setEmail] = useState<any>('');

  const [phoneNumberError, setPhoneNumberError] = useState<any>('');
  const [emailError, setEmailError] = useState<any>('');

  const moblieNoRef = useRef<any>(null);

  //ModelVariables
  const [isShowSwitchModel, setIsShowSwitchModel] = useState(false);
  const [isShowOrderHistoryModel, setIsShowOrderHistoryModel] = useState(false);
  const [isShowOrderHistoryDetailsModel, setIsShowOrderHistoryDetailsModel] =
    useState(false);
  const [visibleAccessModel, setVisibleAccessModel] = useState(false);
  const [visiblePaymentMethodModel, setVisiblePaymentMethodModel] =
    useState(false);

  const toggleSwitchModel = (key: string) =>
    setSettingsSwitch({ ...settingsSwitch, [key]: !settingsSwitch[key] });

  const handleNavigation = () => {
    setOrderStatus('');
    MmkvManager.clearAllExcept([MmkvManager.Keys.isOnBoardingVisisted]);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.LOGINCONTAINER }],
      }),
    );
  };

  const renderRecommandAnlaysisData = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth * 0.4,
          borderRadius: 20,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <ImageBackground style={styles.vwGrey} source={item.kitimage}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity>
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

  const renderItemOrderHistory = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btnOrderHistory}
        onPress={funOpenOrderHistoryDetailsModel}
      >
        {/* orderDetailsView */}
        <View style={styles.vwMainOrderDetails}>
          <View style={{ flex: 1, gap: getHeight(2) }}>
            <Text style={styles.lblOrderTitle}>{item.title}</Text>
            <Text style={styles.lblOrderDate}>{item.date}</Text>
            <Text style={styles.lblOrderID}>{item.orderid}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: getWidth(6) }}>
            <Text style={styles.lblPrice}>
              {currency} {item?.price?.toFixed(2)}
            </Text>
            <TouchableOpacity style={{ marginTop: 1 }}>
              <Image source={images.imgRightBlack} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor:
              item.status == 'Pagato' ? Colors.greenD9 : Colors.redFC,
            borderRadius: 999,
            height: getHeight(24),
            paddingHorizontal: getWidth(8),
          }}
        >
          <Text
            style={{
              color: item.status == 'Pagato' ? Colors.green0D : Colors.red40,
              fontFamily: fontsfamily.medium,
              fontSize: fontSize.size12,
              letterSpacing: 0.1,
            }}
          >
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const funOpenSwitchModel = () => {
    setIsShowSwitchModel(true);
  };

  const funCloseSwitchModel = () => {
    setIsShowSwitchModel(false);
  };

  const funOpenOrderHistoryModel = () => {
    setIsShowOrderHistoryModel(true);
  };

  const funCloseOrderHistoryModel = () => {
    setIsShowOrderHistoryModel(false);
  };

  const funOpenOrderHistoryDetailsModel = () => {
    setIsShowOrderHistoryModel(false);
    setIsShowOrderHistoryDetailsModel(true);
  };

  const funCloseOrderHistoryDetailsModel = () => {
    setIsShowOrderHistoryModel(true);
    setIsShowOrderHistoryDetailsModel(false);
  };

  const funOpenPaymentMethodModel = () => {
    setVisiblePaymentMethodModel(true);
  };

  const funClosePaymentMethodModel = () => {
    setVisiblePaymentMethodModel(false);
  };

  const handleNavigateAddFamily = () => {
    navigation.navigate(ScreenNames.ADDFAMILYCONTAINER);
  };

  const handleNavigateAccount = () => {
    navigation.navigate(ScreenNames.ACCOUNTCONTAINER);
  };

  const handlePressLogout = () => {
    Alert.alert(appName, getTranslation('logoutText') || '|| ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: handleNavigation },
    ]);
  };

  const handlePressAddCardProfile = () => {
    setVisiblePaymentMethodModel(false);
    navigation.navigate(ScreenNames.ADDCARDPROFILECONTAINER);
  };

  const handlePressDeleteAccount = () => {
    Alert.alert(appName, getTranslation('deleteText') || '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: handleNavigation },
    ]);
  };

  //onChange
  const changeInput = (inputFieldName: any, text: any) => {
    switch (inputFieldName) {
      case 'Phone Number':
        setPhoneNumber(formatPhoneNumber(text));
        break;
      default:
        break;
    }
  };

  const onChangeEmail = (text: any) => {
    const formatted = text
      .replace(/^\s+/, '')
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(formatted);
  };

  const handleSaveAccess = () => {
    const plainText = phoneNumber.replace(/-/g, '');
    if (!email.trim()) {
      setEmailError(getTranslation('errorMessageEmail'));
      return;
    } else if (!regex.email.test(email.trim())) {
      setEmailError(getTranslation('errorMessageValidEmail'));
      return;
    } else if (!phoneNumber) {
      setPhoneNumberError(getTranslation('errorMessagePhoneNumber'));
      return;
    } else if (/^0+$/.test(plainText)) {
      setPhoneNumberError(getTranslation('errorMessageAllZero'));
      return;
    } else if (!regex.mobliedesh.test(phoneNumber)) {
      setPhoneNumberError(getTranslation('errorMesaageValidPhoenNumber'));
      return;
    } else {
      setVisibleAccessModel(false);
    }
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.navigate(ScreenNames.BOTTOMTABNAVIGATION, {
              screen: ScreenNames.HOMECONTAINER,
            });
          }}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    console.log('route', route?.params?.ismodelfromProfile);
    if (route?.params?.ismodelfromProfile) {
      setAddressPopupVisible(true);
    }
  }, [route?.params]);

  return (
    <ProfileComponent
      navigation={navigation}
      handleNavigateAccount={handleNavigateAccount}
      handlePressDeleteAccount={handlePressDeleteAccount}
      handlePressAddCardProfile={handlePressAddCardProfile}
      handlePressLogout={handlePressLogout}
      fullName={fullName}
      memberSince={memberSince}
      data={data}
      dataTwo={dataTwo}
      dataThree={dataThree}
      insets={insets}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      recommandAnalysisData={recommandAnalysisData}
      handleNavigateAddFamily={handleNavigateAddFamily}
      //switchmodel
      funOpenSwitchModel={funOpenSwitchModel}
      funCloseSwitchModel={funCloseSwitchModel}
      isShowSwitchModel={isShowSwitchModel}
      toggleSwitchModel={toggleSwitchModel}
      settingsSwitch={settingsSwitch}
      //orderhistoryDetails
      isShowOrderHistoryDetailsModel={isShowOrderHistoryDetailsModel}
      funOpenOrderHistoryDetailsModel={funOpenOrderHistoryDetailsModel}
      funCloseOrderHistoryDetailsModel={funCloseOrderHistoryDetailsModel}
      renderItemTestKits={renderItemTestKits}
      testkitsData={testkitsData}
      //OrderHistoryModel
      isShowOrderHistoryModel={isShowOrderHistoryModel}
      funOpenOrderHistoryModel={funOpenOrderHistoryModel}
      funCloseOrderHistoryModel={funCloseOrderHistoryModel}
      renderItemOrderHistory={renderItemOrderHistory}
      orderHistoryData={orderHistoryData}
      //AddressModel
      AddressData={AddressData}
      addressPopupVisible={addressPopupVisible}
      setAddressPopupVisible={setAddressPopupVisible}
      selectedAddress={selectedAddress}
      setSelectedAddress={setSelectedAddress}
      //accessModel
      visibleAccessModel={visibleAccessModel}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      callingCode={callingCode}
      setCallingCode={setCallingCode}
      phoneNumberError={phoneNumberError}
      setPhoneNumberError={setPhoneNumberError}
      moblieNoRef={moblieNoRef}
      changeInput={changeInput}
      emailError={emailError}
      setEmailError={setEmailError}
      email={email}
      onChangeEmail={onChangeEmail}
      handleSaveAccess={handleSaveAccess}
      onPressAccessModal={() => {
        setVisibleAccessModel(false);
      }}
      //PaymentMethodModel
      visiblePaymentMethodModel={visiblePaymentMethodModel}
      funOpenPaymentMethodModel={funOpenPaymentMethodModel}
      funClosePaymentMethodModel={funClosePaymentMethodModel}
      cardData={cardData}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      payData={payData}
      selectedPays={selectedPays}
      setSelectedPays={setSelectedPays}
    />
  );
};

export default ProfileContainer;
