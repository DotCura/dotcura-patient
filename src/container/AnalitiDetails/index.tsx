import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AppHeader from '../../global/Header';
import { images } from '../../constants/Images';
import {
  activityOpacity,
  currency,
  flashMessageWarning,
} from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
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
import { ZustandStores } from '../../store';
import { useFocusEffect } from '@react-navigation/native';

const AnalitiDetailsContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { increment, decrement } = ZustandStores.CartStore();
  console.log('route?.params?.is_order_edit', route?.params?.is_order_edit);

  const [analitiArrayData, setAnalitiArraysData] = useState<any>({});
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  console.log('selectedTests', selectedTests);

  const [emptyLoading, setIsEmptyLoading] = useState(true);

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
    if (!selectedTests.length) {
      flashMessageWarning(getTranslation('atleastoneselected'));
      return;
    }
    const isOrderEdit = route?.params?.is_order_edit === true;
    const hasChanged = !isSameSelection(originalCartTestIds, selectedTests);

    // 🟣 EDIT ORDER FLOW
    if (isOrderEdit) {
      // Not in cart → ADD (EDIT)
      if (!analitiArrayData?.is_in_cart) {
        _addToCartAnalitiEdit();
        return;
      }

      // In cart + NO CHANGE → just navigate
      if (!hasChanged) {
        navigation.navigate(ScreenNames.EDITORDERCONTAINER, {
          booking_order_id: route?.params?.booking_order_id,
        });
        return;
      }

      // In cart + CHANGED → UPDATE (EDIT)
      _updateCartAnalitiEdit();
      return;
    }

    // 🟢 Not in cart → ADD
    if (!analitiArrayData?.is_in_cart || !analitiArrayData?.cart_kit) {
      _addToCartAnaliti();
      return;
    }

    // 🟡 In cart → check changes

    if (!hasChanged) {
      // ✅ No change → just navigate
      navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
      return;
    }

    // 🔥 Changed → UPDATE
    _updateCartAnaliti();
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
  const [originalCartTestIds, setOriginalCartTestIds] = useState<number[]>([]);

  const _analitiDetailsApi = async () => {
    try {
      const params = {
        kit_id: route?.params?.analitiId,
        is_edit: route?.params?.is_order_edit === true ? 1 : 0,
      };

      const callback = async (responseData: any) => {
        toggleLoader(false);
        setIsEmptyLoading(false);
        console.log(responseData, 'reponseData of api Kit Details');
        if (responseData.code === StatusCode.SUCCESS) {
          setAnalitiArraysData(responseData.data);
          if (responseData.data.is_in_cart && responseData.data.cart_kit) {
            const { all_test, test_ids } = responseData.data.cart_kit;

            const selected =
              all_test === 1
                ? responseData.data.tests.map((t: any) => t.test_id)
                : test_ids;

            setSelectedTests(selected);
            setOriginalCartTestIds(selected); // ✅ SAVE ORIGINAL
          } else {
            setSelectedTests([]);
            setOriginalCartTestIds([]);
          }
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

  useFocusEffect(
    useCallback(() => {
      _analitiDetailsApi();
    }, []),
  );

  const isSameSelection = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  };

  const allTestIds = analitiArrayData?.tests?.map((t: any) => t.test_id) || [];

  const isAllSelected = selectedTests.length === allTestIds.length;

  const _addToCartAnaliti = async () => {
    try {
      const params = {
        kit_id: analitiArrayData.id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          increment();
          // ✅ IMPORTANT: update local state
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            is_in_cart: true,
          }));
          navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.ADDTOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Analiti add to cart error:', error);
    }
  };

  const _addToCartAnalitiEdit = async () => {
    try {
      const params = {
        kit_id: analitiArrayData.id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
        is_edit: 1,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            is_in_cart: true,
          }));
          navigation.navigate(ScreenNames.EDITORDERCONTAINER, {
            booking_order_id: route?.params?.booking_order_id,
          });
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.ADDTOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Analiti add to cart error:', error);
    }
  };

  const _updateCartAnaliti = async () => {
    try {
      const params = {
        cart_kit_id: analitiArrayData.cart_kit.cart_kit_id, // 🔑 IMPORTANT
        cart_item_id: analitiArrayData.cart_kit.cart_id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          // ✅ Update local state
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            cart_kit: {
              ...prev.cart_kit,
              test_ids: selectedTests,
              all_test: isAllSelected ? 1 : 0,
            },
          }));

          setOriginalCartTestIds(selectedTests); // reset baseline

          navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.UPDATETOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Update cart error:', error);
    }
  };

  const _updateCartAnalitiEdit = async () => {
    try {
      const params = {
        cart_kit_id: analitiArrayData.cart_kit.cart_kit_id, // 🔑 IMPORTANT
        cart_item_id: analitiArrayData.cart_kit.cart_id,
        test_ids: isAllSelected ? allTestIds : selectedTests,
        all_test: isAllSelected ? 1 : 0,
        price: isAllSelected ? analitiArrayData.price : totalPriceanaliti,
      };

      const callback = (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          // ✅ Update local state
          setAnalitiArraysData((prev: any) => ({
            ...prev,
            cart_kit: {
              ...prev.cart_kit,
              test_ids: selectedTests,
              all_test: isAllSelected ? 1 : 0,
            },
          }));

          setOriginalCartTestIds(selectedTests); // reset baseline

          navigation.navigate(ScreenNames.EDITORDERCONTAINER, {
            booking_order_id: route?.params?.booking_order_id,
          });
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.CHECKOUT.UPDATETOCART,
        params,
        callback,
      });
    } catch (error) {
      console.log('Update cart error:', error);
    }
  };

  const isSelectionChanged =
    !!analitiArrayData?.is_in_cart &&
    !isSameSelection(originalCartTestIds, selectedTests);

  return (
    <AnalitiDetailsComponent
      navigation={navigation}
      insets={insets}
      analitiArrayData={analitiArrayData}
      renderItemAnalitiData={renderItemAnalitiData}
      totalPriceanaliti={totalPriceanaliti}
      selectedTests={selectedTests}
      handleNavigateCheckout={handleNavigateCheckout}
      emptyLoading={emptyLoading}
      isInCart={!!analitiArrayData?.is_in_cart}
      isSelectionChanged={isSelectionChanged}
      isAllSelected={isAllSelected}
    />
  );
};

export default AnalitiDetailsContainer;
