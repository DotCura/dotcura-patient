import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { getHeight, getWidth } from './utils/Dimensions';
import { fontSize } from './FontSizes';
import { fontsfamily } from './FontFamily';

export const constnatStyles = StyleSheet.create({
  vwNoDataCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  vwFlashMessage: {
    zIndex: 1000,
    elevation: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'box-none',
  },
  keyboardContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
  },
  vwContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
  },
  vwTitleSubtitles: { gap: getWidth(4) },
  lblHeaderTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    textAlign: 'center',
    marginLeft:getWidth(20)
  },
  lblSubHeaderTitle: {
    marginTop: getHeight(1),
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    textAlign: 'center',
  },
  lblNoData: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.black,
    textAlign: 'center',
  },
  lblMainTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
  },
  lblMainSubtitle: {
    color: Colors.gray55,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
  },
  lblModalTitle: {
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    marginLeft: getWidth(15),
  },
  lblModalSubTitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    marginLeft: getWidth(15),
  },
});
