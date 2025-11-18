import { StyleSheet } from 'react-native';
import { getHeight } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  vwHeader: {
    marginTop: getHeight(23),
  },
  lblTitleInput: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray55,
    marginBottom: getHeight(6),
  },
});
