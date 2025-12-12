import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import RateAndReviewComponent from '../../components/RateAndReview';

const RateAndReviewContainer = () => {
  const [rate, setRate] = useState<number | null>(null);
  return (
    <RateAndReviewComponent
      rate={rate}
      handleOnPressRate={(index: any) => {
        setRate(index);
      }}
    />
  );
};

export default RateAndReviewContainer;
