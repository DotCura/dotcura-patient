import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { act, useState } from 'react';
import { styles } from './styles';
import GetTestedComponent from '../../../components/bottomTabs/GetTested';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  activityOpacity,
  currency,
  getRandomTheme,
} from '../../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { ScreenNames } from '../../../constants/AppConstants';
import { getTranslation } from '../../../localization/i18n/i18n.config';

const GetTestedContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
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

  const categoriesList = [
    { id: 1, name: 'Routine checks' },
    { id: 2, name: 'Specific conditions' },
    { id: 3, name: 'MST and sexual health' },
    { id: 4, name: 'Intolerances' },
    { id: 5, name: 'Fertility and conception' },
    { id: 6, name: 'Metabolism' },
  ];

  const genderList = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  const ageList = [
    { id: 1, name: 'Under 40' },
    { id: 2, name: 'Over 40' },
  ];

  const [kitCount, setkitCount] = useState(31);
  const [kitData, setKitData] = useState(kitList);
  const [analitiData, setAnalitiData] = useState(analitiList);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isFilterModelVisible, setIsFilterModelVisible] = useState(false);

  const [categoryData, setCategoryData] = useState(categoriesList);
  const [genderData, setGenderData] = useState(genderList);
  const [ageData, setAgeData] = useState(ageList);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const [selectedTab, setSelectedTab] = useState('checkup'); // 'checkup' or 'analiti'
  const [checkupcount, setCheckupCount] = useState(31);
  const [analiticount, setAnalitiCount] = useState(31);

  const renderKitData = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        onPress={handleNavigateKitDetails}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(32),
          borderRadius: 20,
          marginRight: 12,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <ImageBackground source={item.kitimages} style={styles.vwGrey} >
            <TouchableOpacity
              style={styles.btnPlusBlack}
              activeOpacity={activityOpacity}
            >
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
          navigation.navigate('TransitionFlow', {
            screen: ScreenNames.ANALITIDETAILSCONTAINER,
          });
          // navigation.navigate(ScreenNames.ANALITIDETAILSCONTAINER);
        }}
        style={styles.btnAnalitiMain}
      >
        <View style={styles.vwtitleimage}>
          <Image source={item.analitiimages} />
          <Text style={styles.lblAnalitiLabel} numberOfLines={2}>{item.title}</Text>
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

  const handleNavigateCheckout = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
  };

  const handleNavigateKitDetails = () => {
    // navigation.navigate(ScreenNames.KITDETAILSCONTAINER);
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.KITDETAILSCONTAINER,
    });
  };

  const handleFunOpenFilterModel = () => {
    setIsFilterModelVisible(true);
  };

  const handleFunCloseFilterModel = () => {
    setIsFilterModelVisible(false);
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const toggleGender = (id: number) => {
    setSelectedGender(prev => (prev === id ? null : id));
  };

  const toggleAge = (id: number) => {
    setSelectedAge(prev => (prev === id ? null : id));
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedGender(null);
    setSelectedAge(null);
  };

  const totalFilters =
    selectedCategories.length +
    (selectedGender ? 1 : 0) +
    (selectedAge ? 1 : 0);

  return (
    <GetTestedComponent
      insets={insets}
      kitCount={kitCount}
      kitData={kitData}
      analitiData={analitiData}
      renderKitData={renderKitData}
      renderAnalitiData={renderAnalitiData}
      searchVisible={searchVisible}
      setSearchVisible={setSearchVisible}
      handleNavigateCheckout={handleNavigateCheckout}
      isFilterModelVisible={isFilterModelVisible}
      handleFunOpenFilterModel={handleFunOpenFilterModel}
      handleFunCloseFilterModel={handleFunCloseFilterModel}
      categoryData={categoryData}
      ageData={ageData}
      genderData={genderData}
      toggleCategory={toggleCategory}
      toggleGender={toggleGender}
      toggleAge={toggleAge}
      resetFilters={resetFilters}
      totalFilters={totalFilters}
      selectedCategories={selectedCategories}
      selectedGender={selectedGender}
      selectedAge={selectedAge}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      checkupcount={checkupcount}
      analiticount={analiticount}
    />
  );
};

export default GetTestedContainer;
