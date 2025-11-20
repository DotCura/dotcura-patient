import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import AppHeader from '../../global/Header';
import ProfileComponent from '../../components/Profile';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
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

const ProfileContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const recommandAnalysis = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
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
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
    },
  ];
  const data = [
    {
      id: '1',
      title: getTranslation('orderhistoryprofile'),
      image: images.imgUserProfile,
      onpressfun: () => {
        setIsShowOrderHistoryModel(true);
      },
    },
    {
      id: '2',
      title: getTranslation('notificationsprofile'),
      image: images.imgBell,
      onpressfun: () => {
        setIsShowSwitchModel(true);
      },
    },
    {
      id: '3',
      title: getTranslation('access'),
      image: images.imgWarningProfile,
    },
    { id: '4', title: getTranslation('paymentmethod'), image: images.imgCard },
    { id: '5', title: getTranslation('addresss'), image: images.imgPin },
  ];
  const dataTwo = [
    { id: '1', title: getTranslation('rateapp'), image: images.imgUserProfile },
    {
      id: '2',
      title: getTranslation('termsandconditions'),
      image: images.imgBell,
    },
    {
      id: '3',
      title: getTranslation('privacypolicy'),
      image: images.imgHelpProfile,
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

  //ModelVariables
  const [isShowSwitchModel, setIsShowSwitchModel] = useState(false);
  const [isShowOrderHistoryModel, setIsShowOrderHistoryModel] = useState(false);
  const [isShowOrderHistoryDetailsModel, setIsShowOrderHistoryDetailsModel] =
    useState(false);

  const toggleSwitchModel = (key: string) =>
    setSettingsSwitch({ ...settingsSwitch, [key]: !settingsSwitch[key] });

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
          <View style={styles.vwGrey}>
            <TouchableOpacity style={styles.btnPlusBlack}>
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFav}>
              <Image source={images.imgFavFilled} />
            </TouchableOpacity>
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
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const handlePressDeleteAccount = () => {
    Alert.alert(appName, getTranslation('deleteText') || '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
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

  return (
    <ProfileComponent
    handleNavigateAccount={handleNavigateAccount}
      handlePressDeleteAccount={handlePressDeleteAccount}
      handlePressLogout={handlePressLogout}
      fullName={fullName}
      memberSince={memberSince}
      data={data}
      dataTwo={dataTwo}
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
    />
  );
};

export default ProfileContainer;
