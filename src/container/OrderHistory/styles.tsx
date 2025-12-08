import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  kitandtestdetails: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
    letterSpacing: 0.1,
  },
  btnExtraCount: {
    backgroundColor: Colors.grayF3,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  vwTagInner: {
    backgroundColor: Colors.grayED,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  vwTagMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: getHeight(10),
    gap: getHeight(5),
  },
  btnOrderHistory: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.grayE7,
    paddingHorizontal: getWidth(16),
    paddingTop: getHeight(16),
    paddingBottom: getHeight(12),
  },
  vwMainOrderDetails: {
    flexDirection: 'row',
  },
  nurseview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(10),
    gap: getWidth(4),
  },
  starRow: {
    flexDirection: 'row',
  },
  lblTag: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size12,
    letterSpacing: 0.1,
  },
  lblOrderTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  lblOrderDate: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblOrderID: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
    marginTop: getHeight(6),
  },
  lblStatus: {
    color: Colors.blue1C,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size12,
  },
});
