import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  lblunfavtitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size28,
    textAlign: 'center',
    fontFamily: fontsfamily.gmedium,
    marginTop: getHeight(15),
  },
  vwMainModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(5),
    marginHorizontal: getWidth(12),
    paddingBottom: getWidth(10),
  },
  vwHeadingLine: {
    height: getHeight(4),
    width: getWidth(40),
    backgroundColor: Colors.grayED,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: getHeight(6),
  },
  btnBack: {
    backgroundColor: Colors.white,
    height: getHeight(36),
    width: getWidth(36),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
