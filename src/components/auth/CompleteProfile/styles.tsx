import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  vwHeader: {
    marginTop: getHeight(23),
  },
  vwInput: {
    marginTop: getHeight(43),
    gap: getHeight(12),
  },
  vwBottom: {
    marginTop: getHeight(20),
  },
  label: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
    marginBottom: getHeight(8),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: getWidth(8),
  },
  optionText: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
  },
});
