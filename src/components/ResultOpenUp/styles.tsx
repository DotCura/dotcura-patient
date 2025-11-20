import { StyleSheet } from 'react-native';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  lblResultOpenTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    textAlign: 'center',
  },
  lblResultOpenSubTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    textAlign: 'center',
  },
});
