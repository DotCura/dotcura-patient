import { StyleSheet } from 'react-native';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwTabs: {
    // position: 'absolute',
    bottom: 0,
    // alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: getWidth(250),
    borderRadius: 999,
    height: getHeight(62),
    paddingHorizontal: getWidth(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    // marginHorizontal: getWidth(59),
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  lbl: { fontSize: fontSize.size10 },
});
