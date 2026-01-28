import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwInnerMap: {
    gap: getHeight(12),
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  vwMap: {
    marginTop: getHeight(33),
    gap: getHeight(38),
    paddingHorizontal: getWidth(16),
  },

  lblName: {
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size24,
    color: Colors.gray0F,
  },
  lblSubtitle: {
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.gray55,
  },
});
