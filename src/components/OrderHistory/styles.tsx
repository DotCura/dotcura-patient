import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  orderhistoryemptysubtitle: {
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    color: Colors.gray55,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  orderhistoryemptytitle: {
    marginTop: getHeight(36),
    fontFamily: fontsfamily.gsemiBold,
    fontSize: fontSize.size20,
    color: Colors.gray0F,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  emptyview: {
    marginTop: getHeight(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lblOrderHistory: {
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size28,
    color: Colors.gray0F,
    marginTop: getHeight(22),
  },
});
