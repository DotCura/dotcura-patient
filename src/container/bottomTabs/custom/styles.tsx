import { StyleSheet } from 'react-native';
import { fontSize } from '../../../constants/FontSizes';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  vwTopCirle: {
    height: getWidth(7),
    width: getWidth(14),
    backgroundColor: Colors.blackBlue04,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    position: 'absolute',
    top: getWidth(-12),
  },
  btn: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    height: getHeight(54),
    justifyContent: 'center',
  },
  lbl: { fontSize: fontSize.size10},
});
