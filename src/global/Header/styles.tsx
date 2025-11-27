import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.whiteF2,
    paddingHorizontal: getWidth(12),
    paddingBottom: getWidth(10),
  },
  vwHelp: {
    backgroundColor: Colors.white,

    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(13),
    borderRadius: 20,
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  vwSave: {
    backgroundColor: Colors.lightBlurE4,
    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
    borderRadius: 20,
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
  lblSave: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.blue17,
  },
  lblHelp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
  },
});
