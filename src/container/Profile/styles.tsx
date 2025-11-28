import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwMainOrderDetails: {
    flexDirection: 'row',
  },
  btnOrderHistory: {
    marginHorizontal: getWidth(16),
    padding: 4,
    borderRadius: 20,
    gap: getHeight(8),
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.grayE7,
    paddingHorizontal: getWidth(16),
    paddingTop: getHeight(16),
    paddingBottom: getHeight(12),
  },
  lblOrderTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
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
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  card: {
    backgroundColor: Colors.grayF3,
    borderRadius: 20,
    padding: 16,
    gap: getHeight(12),
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    flex: 1,
  },
  testedInlcuded: {
    color: Colors.gray2A,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  cardPrice: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
  },
  cardDesc: {
    color: Colors.gray2A,
    letterSpacing: 0.1,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  vwGrey: {
    backgroundColor: Colors.grayF3,
    height: getHeight(143),
    borderRadius: 20,
    overflow: 'hidden',
  },
  btnPlusBlack: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(36),
    aspectRatio: 1,
    borderRadius: 20,
    position: 'absolute',
    left: getWidth(8),
    top: getHeight(8),
  },
  btnFav: {
    position: 'absolute',
    right: getWidth(16),
    top: getHeight(8),
  },
  lblPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
    marginTop: getHeight(4),
  },
  lblTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
  },
  lblDescription: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
  },
});
