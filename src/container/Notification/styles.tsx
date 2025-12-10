import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  btnNotification: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: getHeight(13),
  },
  vwTitleImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lblOrderID: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
    marginTop: getHeight(6),
  },
  title: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
    flex: 1,
  },
  kitandtestdetails: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
});
