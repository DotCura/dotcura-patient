import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  txtAccess: {
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    marginTop:getHeight(27)
  },
  summaryContainer: {
    marginTop: getHeight(24),
  },
  summaryInnerContainer: {
    backgroundColor: Colors.grayF3,
    padding: 20,
    marginTop: getHeight(10),
    borderRadius: 20,
    gap: getHeight(8),
  },
  summaryTitle: {
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    letterSpacing: 0.3,
    color: Colors.gray0F,
  },
  summarySubtitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.1,
    color: Colors.gray55,
  },
  summaryItemRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  summaryLabel: {
    flex: 1,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.2,
    color: Colors.gray55,
  },
  summaryValue: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.2,
    color: Colors.gray0F,
  },
  lblChnage: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.blue17,
    letterSpacing: 0.1,
  },
  btnChange: {
    backgroundColor: Colors.white64,
    paddingVertical: getHeight(9),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
  },
  lblDateAndTime: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray75,
  },
  lblDateAndTimeValue: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
  },
  vwImgBack: {
    height: getHeight(71),
    marginTop: getHeight(12),
    borderRadius: 24,
    padding: 16,
    overflow: 'hidden',
  },
  lblYourOrder: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
  },
  lblYourOrderSubtitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    letterSpacing: 0.2,
  },
  lblHelp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getWidth(16),
    paddingVertical: getHeight(6),
  },
  itemLabel: {
    flex: 1,
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    marginRight: 10,
  },
  vwMainModelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    marginTop: getHeight(5),
    marginHorizontal: getWidth(12),
    paddingBottom: getWidth(10),
  },
  lblLatestValue: {
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },
  vwLatestValue: {
    marginTop: getHeight(24),
    gap: getHeight(12),
  },
  vwMain: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
  },
  vwProfile: {
    marginHorizontal: getWidth(16),
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: getHeight(12),
  },
  vwName: {
    height: getHeight(56),
    aspectRatio: 1,
    backgroundColor: Colors.grayE7,
    borderRadius: 100,
  },
  txtFirstCharacter: {
    alignSelf: 'center',
    color: Colors.grayAD,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    fontWeight: '400',
    marginTop: getHeight(18),
  },
  vwInsta: {
    position: 'absolute',
    bottom: getHeight(0),
    right: getWidth(0),
    backgroundColor: Colors.white,
    height: getHeight(20),
    aspectRatio: 1,
    borderRadius: 100,
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
  vwNameDate: {
    marginLeft: getWidth(12),
  },
  txtFullName: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size20,
  },
  txtMember: {
    color: Colors.gray55,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
    marginTop: getHeight(2),
  },
  vwAvabilityWorkArea: {
    alignSelf: 'center',
    marginTop: getHeight(26),
    flexDirection: 'row',
    gap: getWidth(8),
  },
  vwAvablity: {
    borderWidth: 2,
    borderColor: Colors.grayE7,
    height: getHeight(91),
    borderRadius: 20,
    width: ScreenDimensions.screenWidth / 2 - getWidth(16),
  },
  vwInAva: {
    height: getHeight(40),
    aspectRatio: 1,
    backgroundColor: Colors.grayF3,
    alignSelf: 'center',
    marginTop: getHeight(12),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAvability: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.medium,
    marginTop: getHeight(6),
    fontSize: fontSize.size16,
    alignSelf: 'center',
  },
  vwUpdateBankDetails: {
    marginTop: getHeight(32),
    backgroundColor: Colors.goldenFC,
    borderRadius: 28,
    height: getHeight(91),
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwImage: {
    flexDirection: 'row',
  },
  txtBankDetails: {
    color: Colors.black12,
    fontFamily: fontsfamily.bold,
    fontWeight: '700',
    fontSize: fontSize.size16,
    marginLeft: getWidth(6),
  },
  txtWeCanNot: {
    color: Colors.grey40,
    fontFamily: fontsfamily.regular,
    fontWeight: '400',
    marginTop: getWidth(2),
    fontSize: fontSize.size14,
  },
  vwBottom: {},
  vwInBank: {
    marginLeft: getWidth(25),
  },
  container: {
    marginTop: getHeight(32),
    marginHorizontal: getWidth(16),
  },
  containerTwo: {
    marginHorizontal: getWidth(16),
    marginTop: getHeight(24),
  },
  overlay: {
    flex: 1,
    backgroundColor: '#0F0F0F99',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    height: '90%',
  },
  vwHeadingLine: {
    height: getHeight(4),
    width: getWidth(40),
    backgroundColor: Colors.grayED,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: getHeight(6),
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: getWidth(16),
    marginTop: getHeight(4),
    // backgroundColor:"red"
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
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  vwSave: {
    backgroundColor: Colors.lightBlurE4,
    height: getHeight(36),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(12),
    borderRadius: 20,
  },
  lblSave: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.blue17,
  },
  txttitle: {
    marginTop: getHeight(24),
    color: Colors.gray55,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row', // image + text horizontally
    alignItems: 'center',
    backgroundColor: Colors.grayED,
    borderRadius: 20,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(14),
    marginBottom: getHeight(8),
  },
  vwSupport: {
    marginHorizontal: getWidth(16),
    marginTop: getHeight(16),
    flexDirection: 'row', // image + text horizontally
    alignItems: 'center',
    backgroundColor: Colors.grayED,
    borderRadius: 20,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(14),
  },

  title: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    fontWeight: '500',
    marginLeft: getWidth(8),
    color: Colors.gray0F,
  },

  // Order history
  txtOrderHistory: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    marginTop: getHeight(4),
    marginLeft: getWidth(90),
  },
  vwmainOrder: {
    height: getHeight(100),
    marginHorizontal: getWidth(15),
    borderColor: Colors.grayE7,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: getHeight(8),
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
  },
  vwAmoutAndLeftarrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtRuppes: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
  },
  txtDate: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray75,
    marginTop: getHeight(2),
  },
  vwstatus: {
    height: getHeight(24),
    borderRadius: 12,
    width: getWidth(100),
    marginTop: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStatus: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
  },

  vwDetailsStatus: {
    height: getHeight(24),
    borderRadius: 12,
    width: getWidth(56),
    marginTop: getHeight(38),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getWidth(16),
  },
  txtDetailsAmount: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    marginLeft: getWidth(16),
  },
  txtDateDetails: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    marginTop: getHeight(2),
    marginLeft: getWidth(16),
  },
  vwmainDetails: {
    height: getHeight(178),
    backgroundColor: Colors.grayF3,
    borderRadius: 20,
    marginHorizontal: getWidth(16),
    marginBottom: getHeight(8),
  },

  txtPaymentDetails: {
    marginTop: getHeight(24),
    marginLeft: getWidth(16),
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size20,
    color: Colors.gray0F,
  },
  vwPaymentDetails: {
    marginTop: getHeight(8),
    marginHorizontal: getWidth(16),

    borderColor: Colors.grayE7,
    height: getHeight(81),
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
  },
  txtCards: {
    color: Colors.gray75,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  txtCardNumber: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
  },
  txtCardPaymentDate: {
    color: Colors.gray75,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },

  // Notification Modal

  txtNotification: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    marginTop: getHeight(4),
    marginLeft: getWidth(108),
  },
});
