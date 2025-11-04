import { Platform, StyleSheet, Text, View } from 'react-native';

import { getHeight, getWidth } from '../../constants/StylesConstants';
import { Colors } from '../../constants/Colors';
import { FontFamily } from '../../constants/FontFamily';
import { FontSize } from '../../constants/FontSize';

export const styles = StyleSheet.create({
  verticalLine:{
    width: 1,
    backgroundColor: Colors.black30,
    height: getHeight(34),
    alignSelf: 'center',
    marginLeft:getWidth(16),
    marginRight:getWidth(18)
  },
  vwCountryCode: {
    marginRight:getWidth(8),
    flexDirection: 'row',
    gap:5,
    alignItems: 'center',
    paddingTop: getHeight(5),
  },
  lblCountryCode: {
    fontSize: FontSize.size18,
    fontFamily: FontFamily.Medium,
    color: Colors.black,
  },
  imgLeftIcon: { alignSelf: 'center',height:getHeight(30),width:getWidth(30)},
  vwTextInputAndIcon: {
    flexDirection: 'row',
    // paddingBottom: 10,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: getHeight(60),
    borderWidth:1,
    borderColor:Colors.black30,
    flex: 1,
    paddingHorizontal: getWidth(27),
  },
  multilineContainer: {
    height: getWidth(135),
    borderRadius: getWidth(8),
  },
  label: {
    color: Colors.white,
    zIndex: 1,
    fontSize: FontSize.size16,
    fontFamily: FontFamily.Regular,
    paddingTop: getWidth(Platform.OS == 'ios' ? 8 : 9),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: FontSize.size18,
    fontFamily: FontFamily.Regular,
    color: Colors.black,
    paddingLeft: 0,
    margin: 0,
    padding: 0,
  },
  multilineInput: {
    textAlignVertical: 'top', // Aligns the text to the top for multiline
    height: '100%',
  },

  vwEye: {
    justifyContent: 'center',
  },
});
