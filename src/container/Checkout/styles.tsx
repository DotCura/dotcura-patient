import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
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
  lblHelp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
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
  vwHeaderLeft: {
    flexDirection: 'row',
    gap: getWidth(8),
  },
  vwMain: {
    paddingHorizontal: getWidth(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.white,
    paddingBottom: getWidth(10),
  },
  card: {
    backgroundColor: Colors.grayF3,
    borderRadius: 20,
    padding: 16,
    gap: getHeight(12),
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    flex: 1,
  },
  testedInlcuded: {
    color: Colors.gray2A,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  cardPrice: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
  },
  cardDesc: {
    color: Colors.gray2A,
    letterSpacing: 0.1,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
});
