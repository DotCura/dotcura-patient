import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getWidth(16),
    paddingVertical: getHeight(6),
  },
  itemLabel: {
    flex: 1,
    color: Colors.gray0F,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gregular,
    marginRight: 10,
  },
});
