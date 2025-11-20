import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  lblTitleInput: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray55,
    marginBottom: getHeight(6),
  },
  lblCategory: {
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    flex: 1,
  },
  vwCategory: {
    height: getHeight(60),
    borderWidth: 2,
    borderColor: Colors.grayE7,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: getWidth(16),
  },
  lblAgg: {
    color: Colors.blue17,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  btnagg: {
    backgroundColor: Colors.lightBlurE4,
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: getWidth(6),
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(12),
  },
  lblMedica: {
    flex: 1,
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },
  vwMain: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
  },
  txtInformation: {
    marginTop: getHeight(24),
    color: Colors.gray0F,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },
  vwInput: {
    marginTop: getHeight(12),
    gap: getHeight(12),
  },
  vwDateOfBirth: {},
  txtDateOfBirth: {
    color: Colors.gray55,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },
  vwinsideDate: {
    height: getHeight(56),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.grayD8,
    marginTop: getHeight(6),
  },
  txtInsideDate: {
    color: Colors.gray75,
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    marginLeft: getWidth(12),
    marginTop: getHeight(15),
  },
  txtSelectedDate: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
    marginLeft: getWidth(12),
    marginTop: getHeight(15),
  },
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
  label: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: Colors.gray0F,
    marginBottom: getHeight(8),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop:getHeight(6),
    // marginVertical: 5,
    gap: getWidth(8),
  },
  optionText: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray0F,
  },
});
