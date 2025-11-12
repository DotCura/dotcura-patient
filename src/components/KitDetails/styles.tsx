import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwKitDeatils: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vwCartImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getWidth(8),
  },
  vwPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(5),
  },
  vwwarningDetails: {
    gap: getWidth(6),
    marginTop: getHeight(14),
    backgroundColor: Colors.goldenFC,
    borderRadius: 28,
    flexDirection: 'row',
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwInfo1: {
    backgroundColor: Colors.grayED,
    borderRadius: 28,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwInfo2: {
    backgroundColor: Colors.grayED,
    borderRadius: 28,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwImage: {
    flexDirection: 'row',
  },
  vwGoToCart: {
    width: ScreenDimensions.screenWidth - getWidth(32),
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    height: getHeight(48),
    paddingHorizontal: getWidth(16),
    backgroundColor: Colors.blue1C,
    flexDirection: 'row',
  },
  vwInBank: { gap: getHeight(2), flex: 1 },
  btnSelectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getWidth(6),
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(12),
    backgroundColor: Colors.lightBlurE4,
    borderRadius: 20,
  },
  txtinfo1SubtitleBold: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size14,
  },
  txtinfo1Subtitle: {
    letterSpacing: 0.2,
    color: Colors.gray2A,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
  },
  txtlablinfo2: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.2,
  },
  txtBankDetails: {
    color: Colors.black12,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  txtWeCanNot: {
    letterSpacing: 0.2,
    color: Colors.golden40,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
  },
  vwHeaderTitle: {
    marginTop: getHeight(24),
  },
  lblGoToCart: {
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size16,
    color: Colors.white,
  },
  kittitle: {
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size28,
    color: Colors.gray0F,
  },
  kitsubtitle: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    color: Colors.gray55,
    letterSpacing: 0.2,
  },
  lblAnlaytics: {
    flex: 1,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size20,
    color: Colors.gray0F,
  },
  lblSelectAll: {
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
    color: Colors.blue17,
  },
  disprice: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    color: Colors.white36,
    textDecorationLine: 'line-through',
  },
  totalprice: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    color: Colors.white,
  },
});
