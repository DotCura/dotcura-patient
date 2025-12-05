import { StyleSheet } from 'react-native';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';
import { Colors } from '../../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  lblTestImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blTestImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lblTotalAnalysis: {
    color: Colors.blue002,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  lblCurrentanalysis: {
    letterSpacing: 0.2,
    color: Colors.blue002,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
  },
  lblTestName: {
    flex: 1,
    letterSpacing: 0.2,
    color: Colors.blue002,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
  },
  btnTestReport: {
    marginHorizontal: getWidth(16),
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(16),
    gap: getHeight(7),
  },

  lblKitAndTestName: {
    color: Colors.gray55,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.1,
  },
  lblDateyear: {
    color: Colors.gray0F,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.1,
  },
  vwLightBlue: {
    backgroundColor: Colors.blueD1,
    height: getHeight(37),
    aspectRatio: 1,
    borderRadius: 100,
  },
  lblWaitingForResult: {
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },
  progressBarContainer: {
    flexDirection: 'row',
    gap: 4,
    marginRight: getWidth(141),
  },
  progressStep: {
    height: 4,
    flex: 1,
    backgroundColor: Colors.grey29,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: Colors.blue3C,
  },
  vwMainOrderDetails: {
    flexDirection: 'row',
  },
  nurseview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(4),
  },
  starRow: {
    flexDirection: 'row',
  },
  vwstatusReport: {
    backgroundColor: Colors.lightBlurE4,
    borderRadius: 999,
    paddingVertical: getHeight(5),
    paddingHorizontal: getWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lblTag: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size12,
    letterSpacing: 0.1,
  },
  lblOrderTitleBooked: {
    color: Colors.white,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  lblOrderTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  lblOrderDesBooked: {
    color: Colors.grayD8,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblOrderDate: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblOrderID: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblStatus: {
    color: Colors.blue1C,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size12,
  },
  lblReportTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  lblLastValue: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size12,
  },
  vwReportDate: {
    gap: getWidth(11),
    flexDirection: 'row',
    paddingLeft: getWidth(8),
    paddingRight: getWidth(31),
    paddingVertical: getHeight(8),
    // width: ScreenDimensions.screenWidth * 0.60,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lblReportName: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
  },
  lblDate: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  },
});
