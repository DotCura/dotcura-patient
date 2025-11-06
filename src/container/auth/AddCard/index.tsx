import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import AddCardComponent from '../../../components/auth/AddCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { regex } from '../../../constants/Regex';
import { flashMessageWarning } from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';

const AddCardContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(true);

  const cardNumberRef = useRef<TextInput | null>(null);
  const cardHolderNameRef = useRef<TextInput | null>(null);
  const expiryDateRef = useRef<TextInput | null>(null);
  const cvvRef = useRef<TextInput | null>(null);

  const [cardNumberError, setCardNumberError] = useState<any>('');
  const [expiryDateError, setExpiryDateError] = useState<any>('');
  const [cvvError, setCvvError] = useState<any>('');
  const [cardHolderNameError, setCardHolderNameError] = useState<any>('');

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'cardNumber') {
      let cleaned = text.replace(/\D/g, '');
      let formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
      setCardNumber(formatted);
    } else if (type === 'cardHolderName') {
      let newText = text.replace(/[0-9]/g, '');
      newText = newText.replace(/^\s+/, '');
      newText = newText.replace(/\s{2,}/g, ' ');
      setCardHolderName(newText);
    } else if (type === 'expiryDate') {
      let cleaned = text.replace(/[^\d]/g, '');
      if (cleaned.length > 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
      } else if (cleaned.length === 2 && !text.includes('/')) {
        cleaned = cleaned + '/';
      }
      if (cleaned.length > 5) cleaned = cleaned.slice(0, 5);
      setExpiryDate(cleaned);
    } else if (type === 'cvv') {
      if (regex.number.test(text)) {
        setCvv(text);
      }
    }
  };

  const handleOnPressAddCard = () => {
    // Expiry Date Validation
    const [monthStr, yearStr] = expiryDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    const fullYear = Math.floor(currentDate.getFullYear() / 100) * 100;
    const fullCardNumber = cardNumber.replace(/\s/g, ''); // remove all spaces

    // console.log('fullCardNumber', fullCardNumber, month, year, currentMonth, currentYear, fullYear);

    if (cardNumber.trim() === '') {
      setCardNumberError(getTranslation('emptyCardNumber'));
    } else if (cardNumber.replace(/\s/g, '').length < 12) {
      setCardNumberError(getTranslation('invalidCardNumber'));
    } else if (!/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
      setCardNumberError(getTranslation('invalidCardNumber'));
    } else if (regex.zero.test(cardNumber.replace(/\s/g, ''))) {
      setCardNumberError(getTranslation('cardNumberZero'));
    } else if (expiryDate.trim() === '') {
      setExpiryDateError(getTranslation('emptyExpiryDate'));
    } else if (month < 1 || month > 12) {
      setExpiryDateError(getTranslation('invalidExpiryMonth'));
    } else if (
      yearStr?.length !== 2 ||
      year < currentYear ||
      year > currentYear + 20
    ) {
      setExpiryDateError(getTranslation('invalidExpiryYear'));
    } else if (year === currentYear && month < currentMonth) {
      setExpiryDateError(getTranslation('invalidExpiryDate'));
    } else if (cvv.trim() === '') {
      setCvvError(getTranslation('emptyCVV'));
    } else if (cvv.length != 3) {
      setCvvError(getTranslation('invalidCVV'));
    } else if (cardHolderName.trim() === '') {
      setCardHolderNameError(getTranslation('emptyCardHolderName'));
    } else {
      // handleApiAddCard();
    }
  };

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <AddCardComponent
      insets={insets}
      headerArray={headerArray}
      cardNumber={cardNumber}
      cardHolderName={cardHolderName}
      expiryDate={expiryDate}
      cvv={cvv}
      cardNumberRef={cardNumberRef}
      cardHolderNameRef={cardHolderNameRef}
      expiryDateRef={expiryDateRef}
      cvvRef={cvvRef}
      handleOnChangeText={handleOnChangeText}
      handleOnPressAddCard={handleOnPressAddCard}
      cardNumberError={cardNumberError}
      expiryDateError={expiryDateError}
      cardHolderNameError={cardHolderNameError}
      cvvError={cvvError}
      setCardHolderNameError={setCardHolderNameError}
      setCardNumberError={setCardNumberError}
      setCvvError={setCvvError}
      setExpiryDateError={setExpiryDateError}
      isEnabled={isEnabled}
      toggleSwitch={toggleSwitch}
    />
  );
};

export default AddCardContainer;
