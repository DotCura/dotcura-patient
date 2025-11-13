import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontSize } from '../../constants/FontSize';
import { FontFamily } from '../../constants/FontFamily';
import { getHeight } from '../../constants/StylesConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  titleOrderStatus: {
    fontSize: FontSize.size32,
    fontFamily: FontFamily.Bold,
    color: '#E4EEFD',
  },
  titleOrderStatusDes: {
    fontSize: FontSize.size16,
    fontFamily: FontFamily.Regular,
    color: '#ADADB4',
  },
  lblEditOrder: {
    fontSize: FontSize.size14,
    fontFamily: FontFamily.Medium,
    color: '#E4EEFD',
  },
  lblOrderTitleSmall: {
    fontSize: FontSize.size14,
    fontFamily: FontFamily.Bold,
    color: '#E4EEFD',
  },
  lblOrderDesSmall: {
    fontSize: FontSize.size12,
    fontFamily: FontFamily.Regular,
    color: '#C5C5CB',
  },
  progressBarContainer: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 15,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#333333', // Inactive color
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#D4A928', // Active color (yellowish)
  },
});
