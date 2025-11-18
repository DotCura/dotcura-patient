import { Platform, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwError: {
    marginTop: getHeight(6),
    gap: getWidth(4),
    alignItems: 'center',
    flexDirection: 'row',
  },
  lablWarning: {
    color: Colors.red8C,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.medium,
  },
  lblTitleInput: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray55,
    marginBottom: getHeight(6),
  },
  vwCountryCode: {
    marginRight: getWidth(8),
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  lblCountryCode: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
  },
  imgLeftIcon: {
    alignSelf: 'center',
    height: getHeight(30),
    width: getWidth(30),
  },
  vwTextInputAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: getHeight(60),
    borderWidth: 2,
    borderColor: Colors.grayD8,
    paddingHorizontal: getWidth(12),
  },
  multilineContainer: {
    height: getWidth(135),
    borderRadius: getWidth(8),
  },
  label: {
    color: Colors.white,
    zIndex: 1,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    paddingTop: getWidth(Platform.OS == 'ios' ? 8 : 9),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
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
