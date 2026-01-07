import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../global/Header';
import { images } from '../../constants/Images';
import {
  activityOpacity,
  currency,
  flashMessageWarning,
} from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { ScreenNames } from '../../constants/AppConstants';
import { getTranslation } from '../../localization/i18n/i18n.config';
import AnalitiDetailsComponent from '../../components/AnalitiDetails';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';

const AnalitiDetailsContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const analitidata = [
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

  const [analitiArrayData, setAnalitiArraysData] = useState<any>({});
  const [selectedTests, setSelectedTests] = useState<number[]>([]);

  console.log('selectedTests', selectedTests);

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

  const totalPriceanaliti = analitiArrayData?.tests
    ?.filter((t: any) => selectedTests.includes(t.test_id))
    ?.reduce((sum: number, t: any) => sum + Number(t.price || 0), 0);

  const renderItemAnalitiData = ({
    item,
    index,
  }: {
    item: any;
    index: any;
  }) => {
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
            <Text style={styles.lblCurrency}>
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

  const handleNavigateCheckout = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
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
          centerTitle={getTranslation('analititextdetails')}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //==================API=========================

  const _analitiDetailsApi = async () => {
    try {
      const params = {
        kit_id: route?.params?.analitiId,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        console.log(responseData, 'reponseData of api Kit Details');
        if (responseData.code === StatusCode.SUCCESS) {
          setAnalitiArraysData(responseData.data);
          const defaultSelected = responseData.data?.tests?.map(
            (t: any) => t.test_id,
          );
          setSelectedTests(defaultSelected);
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

  useEffect(() => {
    _analitiDetailsApi();
  }, []);

  return (
    <AnalitiDetailsComponent
      navigation={navigation}
      insets={insets}
      analitiArrayData={analitiArrayData}
      renderItemAnalitiData={renderItemAnalitiData}
      totalPriceanaliti={totalPriceanaliti}
      selectedTests={selectedTests}
      handleNavigateCheckout={handleNavigateCheckout}
    />
  );
};

export default AnalitiDetailsContainer;
