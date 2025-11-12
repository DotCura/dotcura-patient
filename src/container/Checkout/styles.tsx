import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grayF3,
    borderRadius: 20,
    padding: 16,
    gap: getHeight(12),
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    flex: 1,
  },
  testedInlcuded: {
    color: Colors.gray2A,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  cardPrice: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
  },
  cardDesc: {
    color: Colors.gray2A,
    letterSpacing: 0.1,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
});
