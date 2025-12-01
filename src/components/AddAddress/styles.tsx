import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  lblwhodothetest: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gmedium,
    letterSpacing: 0.1,
    color: Colors.gray55,
  },
  vwSwitchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: getWidth(12),
    marginTop: getHeight(14),
  },
  lblSwitchTitle: {
    flex: 1,
    marginRight: getWidth(10),
    fontSize: fontSize.size16,
    color: Colors.gray0F,
    fontFamily: fontsfamily.gmedium,
  },
  vwInputsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  vwHeader: {
    marginTop: getHeight(23),
  },
  lblTitleInput: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray55,
    marginBottom: getHeight(6),
  },
});
