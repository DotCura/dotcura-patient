import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  itemdefault: {
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.gmedium,
    color: Colors.purple66,
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(16),
    borderRadius: 20,
    marginBottom: getHeight(8),
  },
  itemTitle: {
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gmedium,
    color: Colors.gray0F,
    flex: 1,
  },
  itemSubtitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray75,
  },
  vwHeader: {
    marginHorizontal: getWidth(16),
    flex: 1,
    marginTop: getHeight(23),
  },
});
