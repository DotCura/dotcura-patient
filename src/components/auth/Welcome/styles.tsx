import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
  },

  lblDes: {
    color: Colors.gray55,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginHorizontal:getWidth(16),
    letterSpacing:1,
  },
});
