import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/StylesConstants';
import { Colors } from '../../constants/Colors';
import { FontFamily } from '../../constants/FontFamily';
import { FontSize } from '../../constants/FontSize';

export const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getWidth(50),
    height: getHeight(60),
    alignSelf: 'center',
    backgroundColor: Colors.blue00,
    width: '100%',

  },
  lblTitle: {
    marginTop:2,
    fontSize: FontSize.size18,
    fontFamily: FontFamily.Medium,
    color: Colors.white,
  },
});
