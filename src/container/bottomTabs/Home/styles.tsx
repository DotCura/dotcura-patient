import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  lblTag: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size12,
    letterSpacing: 0.1,
  },
  lblOrderTitleBooked: {
    color: Colors.white,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
    flex: 1,
  },
  vwMainOrderDetails: {
    flexDirection: 'row',
  },
  nurseview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(4),
    marginTop: getHeight(10),
  },
  starRow: {
    flexDirection: 'row',
  },
  lblOrderTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  lblOrderDesBooked: {
    marginTop: getHeight(6),
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
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
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  lblKitsandAnaliti: {
    color: Colors.gray75,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  btnBookedExtraCount: {
    backgroundColor: Colors.white08,
    paddingHorizontal: getWidth(8),
    height: getHeight(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  vwTagBooked: {
    paddingVertical:getHeight(4),
    backgroundColor: Colors.white08,
    paddingHorizontal: getWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  btnBooked: {
    marginTop: getHeight(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.black04,
    borderRadius: 20,
    padding: 16,
  },
  btnextracount: {
    backgroundColor: Colors.grayF3,
    paddingHorizontal: getWidth(8),
    paddingVertical: getHeight(4),
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  vwBackTagWaiting: {
    backgroundColor: Colors.grayF3,
    paddingHorizontal: getWidth(8),
    height: getHeight(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    marginRight: getWidth(2),
  },
  vwTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: getHeight(5),
  },
  imgkit: {
    height: getHeight(40),
    width: getWidth(40),
    borderRadius: 26,
  },
  btnwaitingview3: {
    gap: getHeight(10),
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.blue6B,
    paddingHorizontal: getWidth(16),
    paddingTop: getHeight(16),
    paddingBottom: getHeight(12),
    flexDirection: 'row',
  },
  btnwaitingview2: {
    backgroundColor: Colors.blue1C08,
    padding: 4,
    borderRadius: 20,
  },
  btnwaitingview1: {
    backgroundColor: Colors.blue1C04,
    padding: 4,
    borderRadius: 20,
    marginTop: getHeight(3),
  },
  lblTestImage: {
    flexDirection: 'row',
    alignItems:'center'
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
    flex:1,
    letterSpacing: 0.2,
    color: Colors.blue002,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size16,
  },
  btnTestReport: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(16),
    gap: getHeight(7),
  },
  vwGrey: {
    backgroundColor: Colors.grayF3,
    height: getHeight(143),
    borderRadius: 20,
  },
  btnPlusBlack: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(36),
    aspectRatio: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    position: 'absolute',
    left: getWidth(8),
    top: getHeight(8),
    elevation: 6,
  },
  btnFav: {
    position: 'absolute',
    right: getWidth(16),
    top: getHeight(8),
  },
  lblReportTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    letterSpacing:0.2
  },
  lblLastValue: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size24,
    letterSpacing:0.2
  },
  lblPrice: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size16,
  },
  lblTitle: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  lblDescription: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
  },
});
