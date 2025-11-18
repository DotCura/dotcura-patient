import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../../constants/Images';
import AppHeader from '../../global/Header';
import ProfileComponent from '../../components/Profile';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { activityOpacity, currency } from '../../constants/GConstant';
import { getHeight, ScreenDimensions } from '../../constants/utils/Dimensions';
import { styles } from './styles';

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

  const [recommandAnalysisData, setrecommandAnalysisData] =
    useState(recommandAnalysis);
    const [fullName, setFullName] = useState('Giovanni Carnevale');
  const [memberSince, setMemberSince] = useState('2025');

  const data = [
    {
      id: '1',
      title: getTranslation('orderhistoryprofile'),
      image: images.imgUserProfile,
    },
    {
      id: '2',
      title: getTranslation('notificationsprofile'),
      image: images.imgBell,
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
    { id: '1', title:getTranslation("rateapp"), image: images.imgUserProfile },
    { id: '2', title: getTranslation("termsandconditions"), image: images.imgBell },
    {
      id: '3',
      title: getTranslation("privacypolicy"),
      image: images.imgHelpProfile,
    },
  ];

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

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
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
      fullName={fullName}
      memberSince={memberSince}
      data={data}
      dataTwo={dataTwo}
      insets={insets}
      renderRecommandAnlaysisData={renderRecommandAnlaysisData}
      recommandAnalysisData={recommandAnalysisData}
    />
  );
};

export default ProfileContainer;
