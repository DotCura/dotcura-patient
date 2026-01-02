import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwCurrencyPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vwtitleimage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(8),
  },
  btnAnalitiMain: {
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(20),
    marginHorizontal: getWidth(16),
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: Colors.white,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    position: 'absolute',
    left: getWidth(8),
    top: getHeight(8),
    elevation: 6,
  },
  btnPlusBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(36),
    aspectRatio: 1,
    borderRadius: 20,
   
    position: 'absolute',
    left: getWidth(8),
    top: getHeight(8),
    elevation: 6,
  },
  btnFav: {
    position: 'absolute',
    right: getWidth(16),
    top: getHeight(8),
  },
  lablPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size15,
  },
  lablCurrency: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size15,
  },
  lblAnalitiLabel: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    flex:1,
  },
  lblReportTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  lblLastValue: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size12,
  },
  lblStatus: {
    color: Colors.gray55,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size12,
  },
  lblPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
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
