import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import PaymentMethodComponent from '../../../components/auth/PaymentMethod';
import AppHeader from '../../../global/Header';
import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../../constants/AppConstants';

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
    { id: 1, title: 'Apple Pay', images: images.imgapplepay },
    { id: 2, title: 'Klarna', images: images.imgkalrnapay },
    { id: 3, title: 'PayPal', images: images.imgpaypal },
  ];

  const [cardData, setCardData] = useState(cardList);
  const [payData, setPayData] = useState(payList);

  const [selectedCards, setSelectedCards] = useState(null);
  const [selectedPays, setSelectedPays] = useState(null);

  const handlePressAddCardProfile = () => {
    navigation.navigate(ScreenNames.ADDCARDPROFILECONTAINER);
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
    <PaymentMethodComponent
      insets={insets}
      cardData={cardData}
      selectedCards={selectedCards}
      setSelectedCards={setSelectedCards}
      payData={payData}
      selectedPays={selectedPays}
      setSelectedPays={setSelectedPays}
      handlePressAddCardProfile={handlePressAddCardProfile}
    />
  );
};

export default PaymentMethodContainer;
