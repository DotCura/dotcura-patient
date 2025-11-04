import {StyleSheet} from 'react-native';
import {fontSize} from './FontSizes';
import {fontsfamily} from './FontFamily';
import {colors} from './Colors';
import {getWidth} from './utils/Dimensions';

export const constnatStyles = StyleSheet.create({
  vwNoDataCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  vwSkin: {
    flex: 1,
    backgroundColor: colors.skinED,
  },
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
    backgroundColor: colors.skinED,
    paddingHorizontal: getWidth(16),
  },
  vwTitleSubtitles: {gap: getWidth(10), marginHorizontal: getWidth(20)},
  lblHeaderTitle: {
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.semibold,
    color: colors.blue81,
    textAlign: 'center',
  },
  lblNoData: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: colors.blue81,
    textAlign: 'center',
  },
  lblMainTitle: {
    color: colors.blue81,
    fontSize: fontSize.size22,
    fontFamily: fontsfamily.bold,
    textAlign: 'center',
  },
  lblMainSubtitle: {
    color: colors.black33,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    textAlign: 'center',
  },
});
