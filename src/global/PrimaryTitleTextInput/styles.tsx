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
    marginRight:getWidth(16)
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
  verticalLine: {
    width: 1,
    backgroundColor: Colors.black,
    height: getHeight(34),
    alignSelf: 'center',
    marginLeft: getWidth(16),
    marginRight: getWidth(18),
  },
  imgLeftIcon: {
    alignSelf: 'center',
    height: getHeight(20),
    width: getWidth(20),
  },
  vwTextInputAndIcon: {
    flexDirection: 'row',
    gap: getWidth(12),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 12,
    height: getHeight(56),
    gap:getWidth(8),
    borderWidth: 2,
    borderColor: Colors.grayD8,
    paddingHorizontal: getWidth(12),
  },
  multilineContainer: {
    height: getWidth(135),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.grayD8,
  },
  label: {
    color: Colors.white,
    zIndex: 1,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
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
    textAlignVertical: 'top',
    height: '100%',
  },
});
