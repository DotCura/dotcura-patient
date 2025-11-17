import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  lblOpenMap: {
    color: Colors.black04,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },
  lblLeboName: {
    color: Colors.blue0D,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size14,
  },
  txtinvitefriendTitle: {
    color: Colors.black04,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  txtInvoteFriendSubtitle: {
    letterSpacing: 0.1,
    color: Colors.blue0D,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size14,
    marginRight: getWidth(12),
  },
  btnInviteFriend: {
    backgroundColor: Colors.white36,
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: getHeight(16),
  },
  vwInBank: { gap: getHeight(2), flex: 1 },
  vwInviteDetails: {
    gap: getWidth(6),
    marginTop: getHeight(24),
    backgroundColor: Colors.blueD9,
    borderRadius: 28,
    flexDirection: 'row',
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  starRow: {
    flexDirection: 'row',
  },
  lblTitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray75,
  },
  lblSubtitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
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
  lblInformation: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
  },
  lblKitName: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
  },
  lblWithDrawDate: {
    marginTop: 4,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  },
  lblKitId: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  },
  lblDataSaveDes: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray2A,
    letterSpacing: 0.1,
  },
});
