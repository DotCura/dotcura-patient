import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwTextCount: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.redCA,
    borderRadius: 999,
    // height: getHeight(16),
    paddingVertical:getHeight(1.5),
    paddingHorizontal:getWidth(4.5),
    position: 'absolute',
    right: -2,
    top: -4,
    aspectRatio: 1,
  },
  labelTextCount: {
    color: Colors.white,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.medium,
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
  vwHeaderText: {
    flex: 1,
    justifyContent: 'center',
  },
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(12),
  },
  lblHeaderTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size24,
    fontFamily: fontsfamily.bold,
  },
});
