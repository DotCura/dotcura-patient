import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { styles } from './styles';
import GetTestedComponent from '../../../components/bottomTabs/GetTested';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  activityOpacity,
  currency,
  flashMessageWarning,
} from '../../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { ScreenNames } from '../../../constants/AppConstants';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { ApiEndPoints, MethodType, StatusCode } from '../../../api/APIConstant';
import { useDebounce } from '../../../constants/utils/useDebounce';
import {
  LoadType,
  usePaginatedList,
} from '../../../global/ApiHelper/usePaginatedList';
import { apiPromise } from '../../../global/ApiHelper/apiPromise';
import FastImage from '@d11/react-native-fast-image';
import { APIManager } from '../../../api/APIManager';
import { ZustandStores } from '../../../store';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';

const GetTestedContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const { cartCount, cartKitIds, addKit, removeKit } =
    ZustandStores.CartStore();

  //LocallyMangeIsTick
  // useFocusEffect(
  //   useCallback(() => {
  //     if (!checkup?.data?.length) return;

  //     console.log("cartKitIds",cartKitIds);
  //     checkup.updateData((prev: any[]) =>
  //       prev.map(item => {
  //         const shouldBeInCart = cartKitIds.includes(item.id);
  //         console.log("item.id,shouldBeInCart);",item.id,shouldBeInCart);

  //         // ⛔ prevent unnecessary re-render
  //         if (item.is_in_cart === shouldBeInCart) {
  //           return item;
  //         }

  //         return {
  //           ...item,
  //           is_in_cart: shouldBeInCart,
  //         };
  //       }),
  //     );
  //   }, [cartKitIds]),
  // );

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
      price: item.price,
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
        showLoader:true,
        callback: () => {},
      });
    } catch (e) {
      console.log('Cart toggle error', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkup?.reset?.();
    }, []),
  );

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
      cartCount={cartCount}
    />
  );
};

export default GetTestedContainer;
