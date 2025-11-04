import { Platform, StyleSheet, Text, View } from 'react-native';
import { getHeight, getWidth } from '../../constants/StylesConstants';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { FontFamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  verticalLine:{
    width: 1,
    backgroundColor: Colors.black30,
    height: getHeight(34),
    alignSelf: 'center',
    marginLeft:getWidth(16),
    marginRight:getWidth(18)
  },
  imgLeftIcon: { alignSelf: 'center',height:getHeight(30),width:getWidth(30) },
  vwTextInputAndIcon: {
    flexDirection: 'row',
    gap: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:Colors.black30,
    height: getHeight(60),
    paddingHorizontal: getWidth(27),
    borderRadius: 50,
    flex: 1,
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
    paddingTop: getWidth(Platform.OS == 'ios' ? 8 : 12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: FontSize.size18,
    fontFamily: FontFamily.Medium,
    color: Colors.black,
    paddingLeft: 0,
    margin: 0,
    padding: 0,
  },
  multilineInput: {
    textAlignVertical: 'top', // Aligns the text to the top for multiline
    height: '100%',
  },
});
