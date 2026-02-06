import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const paymentstyles = StyleSheet.create({
  vwHeadingLine: {
    height: getHeight(4),
    width: getWidth(40),
    backgroundColor: Colors.grayED,
    borderRadius: 10,
    alignSelf: 'center',
  },
  lblOrderCompleteTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.gmedium,
    color: Colors.gray0F,
    marginTop: getHeight(16),
  },
  lblOrderCompleteSubTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
  },
  btnPaymentHisory: {
    gap: getHeight(8),
    marginTop: getHeight(32),
    marginBottom: getHeight(20),
  },
  //SUMMARY
  summaryContainer: {
    marginTop: getHeight(24),
  },
  summaryInnerContainer: {
    backgroundColor: Colors.grayE7,
    padding: 20,
    marginTop: getHeight(10),
    borderRadius: 20,
    gap: getHeight(8),
  },
  summaryTitle: {
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.gsemiBold,
    letterSpacing: 0.3,
    color: Colors.gray0F,
  },
  summarySubtitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.1,
    color: Colors.gray55,
  },
  summaryItemRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  summaryLabel: {
    flex: 1,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.2,
    color: Colors.gray55,
  },
  summaryValue: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.2,
    color: Colors.gray0F,
  },
  discountContainer: {
    // marginTop: 16,
  },
  discountLabel: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.2,
    color: Colors.gray0F,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray0F,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
