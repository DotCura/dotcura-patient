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
  imgkitdetails: {
    justifyContent: 'flex-end',
    marginTop: getHeight(11),
    height: getHeight(237),
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 21,
  },
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
    backgroundColor: Colors.goldenF9,
    borderRadius: 28,
    flexDirection: 'row',
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwInfo1: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwInfo2: {
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.blue002,
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
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size14,
  },
  txtinfo1Subtitle: {
    letterSpacing: 0.2,
    color: Colors.gray2A,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
  },
  txtlablinfo2: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.2,
  },
  txtBankDetails: {
    color: Colors.black12,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
  },
  txtWeCanNot: {
    letterSpacing: 0.2,
    color: Colors.golden40,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
  },
  vwHeaderTitle: {},
  lblGoToCart: {
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
    color: Colors.white,
  },
  kittitle: {
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size36,
    color: Colors.white,
    letterSpacing: 0.1,
  },
  kitsubtitle: {
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  lblAnlaytics: {
    flex: 1,
    fontFamily: fontsfamily.gsemiBold,
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
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.white,
  },
});
