import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight } from '../../constants/utils/Dimensions';
import { ZustandStores } from '../../store';
import { activityOpacity } from '../../constants/GConstant';
import CustomButton from '../../global/Buttons';
import { fontSize } from '../../constants/FontSizes';

const RateAndReviewComponent = (props: any) => {
  const insets = useSafeAreaInsets();
  const { orderStatus, setOrderStatus } = ZustandStores.OrderstatusStore();

  const renderItemRating = (_: unknown, index: number) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        key={index}
        onPress={() => {
          props?.handleOnPressRate(index + 1);
        }}
      >
        <Image
          source={
            props?.rate && index < props?.rate
              ? images.imgRateFillStar
              : images.imgRateUnfillStar
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          backgroundColor: Colors.blue2C,

          paddingTop: orderStatus == '' ? insets.top + 10 : getHeight(25),
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.vwMainRate}>
          <Image source={images.imgRateReview} />
          <Text style={styles.ratereviewtitle}>
            {getTranslation('ratereviewtital')}
          </Text>
          <Text style={styles.ratereviewSubtitle}>
            {getTranslation('ratereviewsubtitle')}
          </Text>
        </View>
        <View style={styles.vwWhiteRatePopUp}>
          <Text style={styles.ratereviewpopuptitle}>
            {getTranslation('ratereviewpopuptitle')}
          </Text>
          <Text style={styles.ratereviewpopupSubtitle}>
            {getTranslation('ratereviewpopupsubtitle')}
          </Text>
          <View style={styles.vwGiveRate}>
            {Array.from({ length: 5 }).map(renderItemRating)}
          </View>
        </View>
      </View>
      <View
        style={{
          marginBottom:
            insets.bottom > 0 ? insets.bottom : insets.bottom + getHeight(16),
        }}
      >
        <CustomButton
          btnicon={false}
          style={{ backgroundColor: Colors.white, marginTop: getHeight(16) }}
          textStyle={{ color: Colors.black, fontSize: fontSize.size16 }}
          btnPress={props.handlePressRateAndReview}
          btnTitle={getTranslation('submit')}
        />
      </View>
    </View>
  );
};

export default RateAndReviewComponent;
