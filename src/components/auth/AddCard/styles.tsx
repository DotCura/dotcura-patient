import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwHeader: {
    marginTop: getHeight(23),
  },
  vwSwitchcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeight(35),
  },
  vwBottom: {
    marginTop: getHeight(20),
  },
  vwMain: {
    paddingTop: getWidth(20),
    gap: getWidth(10),
  },
  vwInputsMain: { marginTop: getWidth(48), gap: getWidth(15) },
  vwInputsInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
  vwTnCMain: {
    padding: getWidth(16),
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: getWidth(20),
  },
  vwDashLine: {
    flex: 1,
    height: 1,
    marginTop: getWidth(15),
    marginBottom: getWidth(12),
    backgroundColor: Colors.black,
  },
  vwTnCInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(8),
    flex: 1,
  },
  lblSaveYourCard: {
    textAlign: 'center',
    marginHorizontal: getWidth(15),
    fontSize: fontSize.size14,
    color: Colors.black,
    fontFamily: fontsfamily.regular,
  },
  lblSaveAgree: {
    fontSize: fontSize.size14,
    color: Colors.black,
    fontFamily: fontsfamily.semiBold,
    textAlign: 'left',
  },
  lblSaveAgreeSubtitle: {
    fontSize: fontSize.size12,
    color: Colors.black,
    fontFamily: fontsfamily.regular,
    textAlign: 'left',
  },
  lblSwitchTitle: {
    flex: 1,
    marginRight: getWidth(10),
    fontSize: fontSize.size16,
    color: Colors.gray0F,
    fontFamily: fontsfamily.gregular,
    letterSpacing:0.2
  },
});
