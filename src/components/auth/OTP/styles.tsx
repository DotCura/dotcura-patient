import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  vwOtpMain: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: getWidth(4),
    marginTop: getWidth(30),
    marginBottom: getWidth(6),
  },
  vwHeader: {
    marginTop: getHeight(23),
  },
  vwInput: {
    marginTop: getHeight(46),
  },
  vwBottom: {},
  lblPhoneNumber: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    color: Colors.blue1C,
  },
  vwTxtInput: {
    height: getWidth(56),
    width: getWidth(56),
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth:2,
    borderColor:Colors.grayD8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    textAlign: 'center',
    borderRadius: 12,
    color: Colors.gray0F,
    fontSize: fontSize.size17,
    fontFamily: fontsfamily.semiBold,
    height: getWidth(56),
    width: getWidth(56),
    marginBottom: 2,
  },
  lblResendOtp: {
    fontSize: fontSize.size14,
    color: Colors.blue1C,
    fontFamily: fontsfamily.semiBold,
    textAlign: 'center',
  },
  lblDidntgetOtp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
    textAlign: 'center',
  },
  lblResendWarning:{
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
  }
});
