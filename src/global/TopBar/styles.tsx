import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: getHeight(10),
    backgroundColor: Colors.whiteF2,
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
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btnBackPlaceholder: {
    width: getWidth(32),
  },
});
