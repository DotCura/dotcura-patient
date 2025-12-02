import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  /* Card */
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: getWidth(16),
    paddingVertical: getWidth(12.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  /* Initial circle */
  initialCircle: {
    width: getWidth(40),
    height: getHeight(40),
    borderRadius: 999,
    backgroundColor: Colors.grayE7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    fontSize: fontSize.size16,
    color: Colors.grayAD,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.2,
  },

  /* Name & Relation */
  name: {
    fontSize: fontSize.size16,
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    letterSpacing: 0.2,
  },
  relation: {
    fontSize: fontSize.size14,
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.1,
  },

  /* Remove Button */
  removeBtn: {
    backgroundColor: Colors.blueD1,
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(12),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    fontSize: fontSize.size14,
    color: Colors.blue002,
    fontFamily: fontsfamily.medium,
    letterSpacing: 0.1,
  },
});
