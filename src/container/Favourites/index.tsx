import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import FavouritesComponent from '../../components/Favourites';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../global/Header';
import {
  activityOpacity,
  currency,
  flashMessageBottomSucess,
  getRandomTheme,
} from '../../constants/GConstant';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { getTags } from 'react-native-device-info';
import { getTranslation } from '../../localization/i18n/i18n.config';

const FavouritesContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const kitfavList = [
    {
      id: '1',
      title: 'Diabete',
      description: 'Controllo glicemia e zuccheri',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Alta richiesta',
      kitimage: images.imgkit1,
    },
    {
      id: '2',
      title: 'Anemia',
      description: 'Controllo ferro e globuli rossi',
      price: '35.00',
      isLiked: false,
      isAdded: false,
      status: 'Subito disponibile',
      kitimage: images.imgkit2,
    },
    {
      id: '3',
      title: 'Colesterolo',
      description: 'Controllo colesterolo totale e HDL',
      price: '40.00',
      isLiked: false,
      isAdded: false,
      status: 'Pronto in 24 ore',
      kitimage: images.imgkit3,
    },
    {
      id: '4',
      title: 'Tiroide',
      description: 'Controllo TSH, FT3, FT4',
      price: '45.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit4,
    },
    {
      id: '5',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit5,
    },
    {
      id: '6',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit6,
    },
    {
      id: '7',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit7,
    },
    {
      id: '8',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit1,
    },
    {
      id: '9',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit3,
    },
    {
      id: '10',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit2,
    },
    {
      id: '11',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit1,
    },
    {
      id: '12',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit4,
    },
    {
      id: '13',
      title: 'Vitamina D',
      description: 'Controllo livello vitamina D nel sangue',
      price: '30.00',
      isLiked: false,
      isAdded: false,
      status: null,
      kitimage: images.imgkit5,
    },
  ];

  const [kitFavData, setKitFavData] = useState(kitfavList);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const renderFavKitData = ({ item, index }: any) => {
    const { backgroundColor, textColor } = getRandomTheme();
    return (
      <TouchableOpacity
        // onPress={handleNavigateKitDetails}
        activeOpacity={activityOpacity}
        style={{
          width: ScreenDimensions.screenWidth / 2 - getWidth(32),
          borderRadius: 20,
          marginRight: 12,
        }}
      >
        <View style={{ gap: getHeight(8) }}>
          <ImageBackground source={item.kitimage} style={styles.vwGrey}>
            <TouchableOpacity
              style={styles.btnPlusBlack}
              activeOpacity={activityOpacity}
            >
              <Image source={images.imgPlusBlack} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnFav}
              onPress={funOpenDeleteModel}
              activeOpacity={activityOpacity}
            >
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

  const handlePressUnfav = () => {
    funCloseDeleteModel();
    flashMessageBottomSucess(getTranslation('unfavmessage'));
  };

  const funOpenDeleteModel = () => {
    setShowDeleteModel(true);
  };

  const funCloseDeleteModel = () => {
    setShowDeleteModel(false);
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
    <FavouritesComponent
      insets={insets}
      kitFavData={kitFavData}
      renderFavKitData={renderFavKitData}
      showDeleteModel={showDeleteModel}
      funOpenDeleteModel={funOpenDeleteModel}
      funCloseDeleteModel={funCloseDeleteModel}
      handlePressUnfav={handlePressUnfav}
    />
  );
};

export default FavouritesContainer;
