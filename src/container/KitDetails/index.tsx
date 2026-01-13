import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import KitDetailsComponent from '../../components/KitDetails';
import AppHeader from '../../global/Header';
import { images } from '../../constants/Images';
import { currency, flashMessageWarning } from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { ScreenNames } from '../../constants/AppConstants';
import { getTranslation } from '../../localization/i18n/i18n.config';
import {
  ApiEndPoints,
  MethodType,
  StatusCode,
  toggleLoader,
} from '../../api/APIConstant';
import { APIManager } from '../../api/APIManager';

const KitDetailsContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const [kitsArrayData, setKitsArraysData] = useState<any>({});
  const [emptyLoading, setIsEmptyLoading] = useState(true);

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
          <View style={{ flex: 1, marginRight: getWidth(10) }}>
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

  const getTotalTestPrice = () => {
    if (!kitsArrayData?.tests?.length) return 0;

    return kitsArrayData.tests.reduce(
      (total: number, item: any) => total + Number(item.price || 0),
      0,
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
          centerTitle={getTranslation('kitanalysis')}
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

  const _kitDetailsApi = async () => {
    try {
      const params = {
        kit_id: route?.params?.kitId,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        setIsEmptyLoading(false);
        if (responseData.code === StatusCode.SUCCESS) {
          setKitsArraysData(responseData.data);
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
    _kitDetailsApi();
  }, []);

  return (
    <KitDetailsComponent
      navigation={navigation}
      insets={insets}
      kitsTestData={kitsArrayData?.tests}
      renderItemKitsData={renderItemKitsData}
      handleNavigateCheckout={handleNavigateCheckout}
      kitsArrayData={kitsArrayData}
      totalPrice={getTotalTestPrice()}
      emptyLoading={emptyLoading}
    />
  );
};

export default KitDetailsContainer;
