import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwBtn: { flexDirection: 'row', gap: getWidth(6), alignItems: 'center' },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20,
    height: getHeight(48),
    alignSelf: 'center',
    backgroundColor: Colors.blue002,
    width: '100%',
  },
  imgIcon: {
    marginTop:1,
    alignSelf: 'center',
    resizeMode: 'center',
    height: getHeight(20),
    aspectRatio: 1,
  },
  lblTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gmedium,
    color: Colors.white,
  },
});
