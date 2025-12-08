import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  lblQuotes: {
    marginTop: getHeight(21),
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
    letterSpacing: 0.2,
  },
  imgTest: { height: getHeight(64), width: getWidth(50) },
  lblAnalyses: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gbold,
    color: Colors.blue002,
    letterSpacing: 0.1,
  },
  lblMainDesCount: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    color: Colors.blue002,
    letterSpacing: 0.1,
  },
  lblTestAnaliti: {
    fontSize: fontSize.size36,
    fontFamily: fontsfamily.gmedium,
    color: Colors.blue002,
    letterSpacing: 0.1,
  },
  vwTextTestImage: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  vwOuterAnalitiTest: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginTop: getHeight(11),
  },
  vwBlueProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,

    backgroundColor: Colors.blueD1, // progress background color
  },
});
