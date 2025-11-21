import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';

const OrderStatusComponent = (props: any) => {
  const insets = useSafeAreaInsets();
  const [showBigView, setShowBigView] = useState(false);

  const ProgressBar = ({ currentStep, totalSteps = 5 }: any) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index <= currentStep && styles.progressStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* BIG VIEW */}
      {showBigView && (
        <View style={styles.bigViewContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleOrderStatus}>
                {props.orderStatus === 'order_sent'
                  ? getTranslation('ordersent')
                  : props.orderStatus === 'order_confirm'
                  ? 'orderconfirm'
                  : null}
              </Text>
              <Text style={styles.titleOrderStatusDes}>
                {getTranslation('ordersentsubtitle')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowBigView(false)}
            >
              <Image
                source={images.imgLeftArrow}
                tintColor={Colors.white}
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </TouchableOpacity>
          </View>

          <Image source={images.imgStepper} style={styles.progressImage} />

          <TouchableOpacity style={styles.editButton}>
            <Image source={images.pencilblue} tintColor={Colors.white} />
            <Text style={styles.lblEditOrder}>
              {getTranslation('editorder')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SMALL VIEW */}
      {!showBigView && (
        <View style={styles.smallViewContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lblOrderTitleSmall}>Order sent</Text>
              <Text style={styles.lblOrderDesSmall} numberOfLines={1}>
                We are looking for a nurse for you...
              </Text>
              <ProgressBar currentStep={1} />
            </View>

            <TouchableOpacity
              onPress={() => setShowBigView(true)}
              style={styles.toggleButton}
            >
              <Image
                source={images.imgLeftArrow}
                tintColor={Colors.white}
                style={{ transform: [{ rotate: '270deg' }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderStatusComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingBottom: getHeight(30),
  },
  bigViewContainer: {
    paddingHorizontal: 16,
  },
  smallViewContainer: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  toggleButton: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF14',
    borderRadius: 100,
    marginLeft: 12,
  },
  titleOrderStatus: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.white,
  },
  titleOrderStatusDes: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.grayAD,
    marginTop: getHeight(4),
  },
  progressImage: {
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: Colors.white08,
    height: getHeight(48),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeight(16),
    flexDirection: 'row',
    gap: getWidth(6),
  },
  lblEditOrder: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.white,
  },
  lblOrderTitleSmall: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    color: Colors.lightBlurE4,
  },
  lblOrderDesSmall: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.greyC5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: getHeight(8),
    gap: 4,
  },
  progressStep: {
    height: 4,
    flex: 1,
    backgroundColor: Colors.grey29,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: Colors.goldenE8,
  },
});
