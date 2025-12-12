import { StyleSheet } from 'react-native';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwGiveRate: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  vwMainRate: {
    alignItems: 'center',
    marginTop: getHeight(114),
  },
  vwWhiteRatePopUp: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
  },
  ratereviewtitle: {
    textAlign: 'center',
    marginTop: getHeight(47),
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.gmedium,
    color: Colors.white,
  },
  ratereviewSubtitle: {
    marginBottom: getHeight(32),
    textAlign: 'center',
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.blueD9,
    letterSpacing: 0.2,
  },
  ratereviewpopuptitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gmedium,
    color: Colors.blue002,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  ratereviewpopupSubtitle: {
    textAlign: 'center',
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    color: Colors.blue002,
    letterSpacing: 0.2,
  },
});
