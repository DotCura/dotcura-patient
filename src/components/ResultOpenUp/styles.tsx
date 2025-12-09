import { StyleSheet } from 'react-native';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  lbldiscoverprivacy: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.gbold,
    color: Colors.purple66,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: getHeight(22),
  },
  lblResultOpenTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.gmedium,
    color: Colors.gray0F,
    textAlign: 'center',
  },
  lblResultOpenSubTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
    textAlign: 'center',
  },
});
