import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  lblItemInner: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray2A,
  },
  vwInput: {
    marginTop: getHeight(24),
    gap: getHeight(12),
    marginHorizontal: getWidth(16),
  },
  lblSave: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.blue17,
  },
  vwSave: {
    backgroundColor: Colors.lightBlurE4,
    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
    borderRadius: 20,
  },
  vwMainModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    marginTop: getHeight(5),
    marginHorizontal: getWidth(12),
    paddingBottom: getWidth(10),
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
  vwHeadingLine: {
    height: getHeight(4),
    width: getWidth(40),
    backgroundColor: Colors.grayED,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: getHeight(6),
  },
});
