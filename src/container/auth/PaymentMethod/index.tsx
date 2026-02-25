import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import PaymentMethodComponent from '../../../components/auth/PaymentMethod';
import AppHeader from '../../../global/Header';
import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../../constants/AppConstants';
import {
  flashMessageSucess,
  flashMessageWarning,
} from '../../../constants/GConstant';
import { ApiEndPoints, MethodType, StatusCode } from '../../../api/APIConstant';
import { APIManager } from '../../../api/APIManager';

const PaymentMethodContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const cardList = [
    { id: 1, title: '•••• 6666', subtitle: 'Visa', images: images.imgvisa },
    {
      id: 2,
      title: '•••• 1234',
      subtitle: 'Mastercard',
      images: images.imgmastercard,
    },
  ];
  const payList = [
    {
      id: 1,
      title: 'Apple Pay',
      images: images.imgapplepay,
      apipasskey: 'applepay',
    },
    {
      id: 2,
      title: 'Klarna',
      images: images.imgkalrnapay,
      apipasskey: 'klarna',
    },
    { id: 3, title: 'PayPal', images: images.imgpaypal, apipasskey: 'paypal' },
  ];

  const [cardData, setCardData] = useState([]);
  const [payData, setPayData] = useState(payList);

  const [selectedCards, setSelectedCards] = useState(null);
  const [selectedPays, setSelectedPays] = useState(null);

  const handlePressAddCardProfile = () => {
    // navigation.navigate(ScreenNames.ADDCARDPROFILECONTAINER);
    openCustomerSheet();
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
    _getCardList();
  }, []);

  // =================== API ======================

  const [showCustomerSheet, setShowCustomerSheet] = useState(false);
  console.log('showCustomerSheet', showCustomerSheet);

  const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
  const [stripeEphemeralKey, setStripeEphemeralKey] = useState<string>('');

  const openCustomerSheet = async () => {
    try {
      const callback = async (responseData: any) => {
        if (responseData.code !== StatusCode.SUCCESS) {
          flashMessageWarning(responseData.message);
          return;
        }

        const { customer, ephemeralKey } = responseData.data;

        setStripeCustomerId(customer);
        setStripeEphemeralKey(ephemeralKey);

        // 🔥 show sheet
        setShowCustomerSheet(true);
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        apiEndPoint: ApiEndPoints.PAYMENT.CREATECUSTOMERCARDINTENT,
        callback,
      });
    } catch (error) {
      console.log('CreateIntent error:', error);
    }
  };

  const _addCardapi = async (payment_Method_Id: any) => {
    try {
      const params = {
        paymentMethodId: payment_Method_Id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          _getCardList();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.ADDCARD,
        callback,
        params,
      });
    } catch (error) {
      console.log('_addCardapi error:', error);
    }
  };

  // const _getCardList = async () => {
  //   try {
  //     const params = {};

  //     const callback = async (responseData: any) => {
  //       if (responseData.code === StatusCode.SUCCESS) {
  //         setCardData(responseData?.data);
  //       } else {
  //         flashMessageWarning(responseData.message);
  //       }
  //     };

  //     await APIManager.makeRequest({
  //       navigation: navigation,
  //       method: MethodType.GET,
  //       showLoader: true,
  //       apiEndPoint: ApiEndPoints.PAYMENT.CARDLIST,
  //       callback,
  //       params,
  //     });
  //   } catch (error) {
  //     console.log('card List error:', error);
  //   }
  // };

  const _getCardList = async () => {
    try {
      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          const response = responseData?.data || [];

          // ✅ Extract default payment method safely
          const defaultMethod = response[0]?.default_payment_method || null;

          // ✅ Filter only real cards (must have card_id)
          const onlyCards = response.filter((item: any) => item.card_id);

          setCardData(onlyCards); // only real cards
          setDefaultType(defaultMethod); // store default type separately
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.GET,
        showLoader: true,
        apiEndPoint: ApiEndPoints.PAYMENT.CARDLIST,
        callback,
      });
    } catch (error) {
      console.log('card List error:', error);
    }
  };

  const _deleteCard = async (card_id_params: string) => {
    try {
      const params = {
        card_id: card_id_params,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          console.log('responseData delete card:', responseData);

          _getCardList();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation: navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.DELETECARD,
        callback,
        params,
      });
    } catch (error) {
      console.log('_deleteCard error:', error);
    }
  };

  const [defaultType, setDefaultType] = useState<string>('4');

  const _setDefaultCardApi = async (type: string, card_id: string | null) => {
    try {
      const params = {
        type,
        card_id,
      };

      const callback = async (responseData: any) => {
        if (responseData.code === StatusCode.SUCCESS) {
          setDefaultType(type);

          _getCardList();
        } else {
          flashMessageWarning(responseData.message);
        }
      };

      await APIManager.makeRequest({
        navigation,
        method: MethodType.POST,
        apiEndPoint: ApiEndPoints.PAYMENT.SETDEFAULTCARD,
        callback,
        params,
      });
    } catch (error) {
      console.log('set default error:', error);
    }
  };

  return (
    <PaymentMethodComponent
      insets={insets}
      cardData={cardData}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      payData={payData}
      selectedPays={selectedPays}
      setSelectedPays={setSelectedPays}
      handlePressAddCardProfile={handlePressAddCardProfile}
      showCustomerSheet={showCustomerSheet}
      setShowCustomerSheet={setShowCustomerSheet}
      stripeCustomerId={stripeCustomerId}
      stripeEphemeralKey={stripeEphemeralKey}
      _getCardList={_getCardList}
      _addCardapi={_addCardapi}
      defaultType={defaultType}
      _setDefaultCardApi={_setDefaultCardApi}
      _deleteCard={_deleteCard}
    />
  );
};

export default PaymentMethodContainer;
