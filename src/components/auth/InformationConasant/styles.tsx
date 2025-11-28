import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  vwHeader: {
    marginTop: getHeight(23),
  },

  vwBottom: {
    marginTop: getHeight(20),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: getWidth(8),
  },
  optionText: {
    flex: 1,
    letterSpacing: 0.2,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray0F,
  },
  optionContainer: {
    gap: getHeight(6),
    marginTop: getHeight(54),
  },
  lblHighlight: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gextrabold,
    textDecorationLine: 'underline',
    color: Colors.gray0F,
  },
});
