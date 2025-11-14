import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  lblWaitingForResult: {
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },
  textinputsearch: {
    margin: 0,
    padding: 0,
    flex: 1,
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
  },
  vwTextinputIcon: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    paddingHorizontal: getWidth(12),
    height: getHeight(36),
    alignItems: 'center',
    borderRadius: 999,
    elevation: 4,
    flex: 1,
    flexDirection: 'row',
    gap: getWidth(8),
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayED,
    padding: 8,
    borderRadius: 20,
  },
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
    paddingBottom: getWidth(10),
  },
  latestanlaysis: {
    marginHorizontal: getWidth(16),
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    letterSpacing: 0.3,
  },
  lblHeaderTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size24,
    fontFamily: fontsfamily.bold,
  },
  lblSearchProfile: {
    color: Colors.gray0F,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  vwHeaderRight: { flexDirection: 'row', gap: getWidth(8) },
  vwHeaderbtn: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: getHeight(36),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  vwHeaderbtnSearch: {
    paddingHorizontal: getWidth(12),
    flexDirection: 'row',
    gap: getWidth(6),
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  vwHeaderText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: getWidth(6),
    justifyContent: 'flex-start',
  },
});
