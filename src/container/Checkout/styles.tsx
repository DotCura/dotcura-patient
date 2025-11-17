import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwGrey:{
    backgroundColor: Colors.grayF3,
    height: getHeight(143),
    borderRadius: 20,
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
  btnFav: {
    position: 'absolute',
    right: getWidth(16),
    top: getHeight(8),
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
  lblStatus:{
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size12,
  },
  lblPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size16,
  },
  lblTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  lblDescription: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
  },
  btnBack: {
    backgroundColor: Colors.white,
    height: getHeight(36),
    width: getWidth(36),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  lblHelp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
  },
  lblSave: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.blue17,
  },
  vwSave: {
    backgroundColor: Colors.lightBlurE4,
    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
    borderRadius: 20,
  },
  vwHelp: {
    backgroundColor: Colors.white,
    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(13),
    borderRadius: 20,
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  vwHeaderLeft: {
    flexDirection: 'row',
    gap: getWidth(8),
  },
  vwMain: {
    paddingHorizontal: getWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.white,
    paddingBottom: getWidth(10),
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
  //kittestdetails
  lblStatusKitDetails: {
    paddingVertical: getHeight(2),
    paddingHorizontal: getWidth(8),
    borderRadius: 999,
    marginLeft: getWidth(4),
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size12,
  },
  lblCurrency: {
    color: Colors.gray75,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
  },
  lblTestName: {
    // flex: 1,
    color: Colors.gray0F,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size16,
  },
  lblDesc: {
    color: Colors.gray75,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
});
