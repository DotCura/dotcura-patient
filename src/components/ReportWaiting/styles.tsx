import { StyleSheet } from 'react-native';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  lblReportWaitingBtn: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.gbold,
    color: Colors.purple66,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: getHeight(22),
  },
  lblReportWaitingTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.gmedium,
    color: Colors.gray0F,
    textAlign: 'center',
    marginHorizontal: getWidth(40),
  },
  lblReportWaitingSubTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
    textAlign: 'center',
  },
});
