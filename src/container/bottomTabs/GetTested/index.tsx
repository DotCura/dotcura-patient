import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
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
      title: 'Colesterolo',
      description: 'Controllo colesterolo totale e HDL',
      price: '40.00',
      isLiked: false,
      isAdded: false,
      status: 'Pronto in 24 ore',
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '6',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '7',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '8',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '9',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '10',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '11',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '12',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
    {
      id: '13',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
    },
  ];

  const [kitCount, setkitCount] = useState(31);
  const [kitData, setKitData] = useState(kitList);
  const [searchVisible, setSearchVisible] = useState(false);

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

  const handleNavigateCheckout = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
  };

  const handleNavigateKitDetails = () => {
    navigation.navigate(ScreenNames.KITDETAILSCONTAINER);
  };

  return (
    <GetTestedComponent
      insets={insets}
      kitCount={kitCount}
      kitData={kitData}
      renderKitData={renderKitData}
      searchVisible={searchVisible}
      setSearchVisible={setSearchVisible}
      handleNavigateCheckout={handleNavigateCheckout}
    />
  );
};

export default GetTestedContainer;
