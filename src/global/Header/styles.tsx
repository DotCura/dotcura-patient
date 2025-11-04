import {StyleSheet} from 'react-native';
import {getWidth} from '../../constants/utils/Dimensions';
import {colors} from '../../constants/Colors';

export const styles = StyleSheet.create({
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: colors.skinED,
    paddingHorizontal: getWidth(16),
    paddingBottom: getWidth(13),
  },
});
