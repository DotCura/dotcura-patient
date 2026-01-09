import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './styles';
import GetTestedComponent from '../../../components/bottomTabs/GetTested';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  activityOpacity,
  currency,
  flashMessageWarning,
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
import { APIManager } from '../../../api/APIManager';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../../api/APIConstant';
import { useDebounce } from '../../../constants/utils/useDebounce';
import {
  LoadType,
  usePaginatedList,
} from '../../../global/ApiHelper/usePaginatedList';
import { apiPromise } from '../../../global/ApiHelper/apiPromise';
import FastImage from '@d11/react-native-fast-image';

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
  const [kitData, setKitData] = useState<any>([]);

  const [analitiData, setAnalitiData] = useState<any>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isFilterModelVisible, setIsFilterModelVisible] = useState(false);

  const [categoryData, setCategoryData] = useState(categoriesList);
  const [genderData, setGenderData] = useState(genderList);
  const [ageData, setAgeData] = useState(ageList);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const [selectedTab, setSelectedTab] = useState('checkup'); // 'checkup' or 'analiti'
  const [checkupcount, setCheckupCount] = useState(0);
  const [analiticount, setAnalitiCount] = useState(0);

  const [searchHistory, setSeachHistory] = useState('');

  const debouncedSearch = useDebounce(searchHistory, 400);

  const toggleAddKit = (id: string) => {
    console.log('toggleAddKit', id);

    setKitData((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, is_in_cart: !item.is_in_cart } : item,
      ),
    );
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
            <Text style={styles.lblTitle} numberOfLines={1}>
              {item.kit_name}
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

  const handleNavigateKitDetails = (kitId: any) => {
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.KITDETAILSCONTAINER,
      params: {
        kitId: kitId,
      },
    });
  };

  const handleNavigateAnalitiDetails = (analitiId: any) => {
    navigation.navigate('TransitionFlow', {
      screen: ScreenNames.ANALITIDETAILSCONTAINER,
      params: {
        analitiId: analitiId,
      },
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

  //==================API=============================

  const fetchCheckupList = useCallback(
    async ({
      page,
      searchQuery,
      loadType,
    }: {
      page: number;
      searchQuery?: string;
      loadType: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITLIST,
        method: 'POST',
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
        params: {
          page,
          kit_type: 'CHECKUP',
          ...(searchQuery ? { search: searchQuery } : {}),
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
    async ({
      page,
      searchQuery,
      loadType,
    }: {
      page: number;
      searchQuery?: string;
      loadType: any;
    }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.BOTTOMTAB.KITLIST,
        method: 'POST',
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
        params: {
          page,
          kit_type: 'ANALYSIS',
          ...(searchQuery ? { search: searchQuery } : {}),
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
    searchQuery: debouncedSearch,
    fetcher: fetchCheckupList,
  });

  const analiti: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: selectedTab === 'analiti',
    searchQuery: debouncedSearch,
    fetcher: fetchAnalitiList,
  });

  //local Kit data state whenever it changes
  useEffect(() => {
    if (checkup.data) {
      setKitData(checkup.data);
    }
  }, [checkup.data]);


  //local analiti data state whenever it changes
  useEffect(() => {
    if (analiti.data) {
      setAnalitiData(analiti.data);
    }
  }, [analiti.data]);

  return (
    <GetTestedComponent
      insets={insets}
      kitCount={kitCount}
      checkup={checkup}
      analiti={analiti}
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
      searchHistory={searchHistory}
      setSeachHistory={setSeachHistory}
    />
  );
};

export default GetTestedContainer;
