import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwStatus: {
    // paddingVertical: getHeight(2),
    // paddingHorizontal: getWidth(8),
    // borderRadius: 999,
    // marginLeft: getWidth(4),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  lblStatus: {
    paddingVertical: getHeight(2),
    paddingHorizontal: getWidth(8),
    borderRadius: 999,
    marginLeft: getWidth(4),
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size12,
  },
  lblCurrency: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
  },
  lblTestName: {
    
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
  },
  lblDesc: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
});
