import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  lblOrderHistory: {
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size28,
    color: Colors.gray0F,
    marginTop: getHeight(22),
  },
});
