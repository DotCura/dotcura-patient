import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';
import { Colors } from '../../../constants/Colors';

export const styles = StyleSheet.create({
  txtInputFocus: {
    borderColor: Colors.blue002,
    borderWidth: 2,
  },
  txtInputFocusfixed: {
    borderColor: Colors.blue002,
    borderWidth: 1,
  },
  txtInputotp: {
    textAlign: 'center',
    fontSize: fontSize.size26,
    fontFamily: fontsfamily.gregular,
    // height: getWidth(56),
    // width: getWidth(56),
  },
  vwTxtInputotp: {
    height: getWidth(56),
    width: getWidth(56),
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.grayD8,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.blue002,
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
    color: Colors.black,
    fontSize: fontSize.size26,
    fontFamily: fontsfamily.gregular,
    height: getWidth(56),
    width: getWidth(56),
    marginBottom: 2,
  },
  lblResendOtp: {
    fontSize: fontSize.size16,
    color: Colors.gray0F,
    fontFamily: fontsfamily.gregular,
    textAlign: 'center',
  },
  lblDidntgetOtp: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
    textAlign: 'center',
  },
  lblResendWarning:{
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
  }
});
