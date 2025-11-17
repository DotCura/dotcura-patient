import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: Colors.lightBlurE4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(16),
    paddingHorizontal: getWidth(16),
    gap: getWidth(8),
    height: getHeight(48),
  },
  addText: {
    color: Colors.blue17,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    letterSpacing: 0.2,
  },
  vwEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(24),
    marginHorizontal: getWidth(16),
  },
  emptyTitle: {
    color: Colors.gray0F,
    fontSize: fontSize.size24,
    fontFamily: fontsfamily.bold,
    textAlign: 'center',
  },
  emptySubtitle: {
    letterSpacing: 0.2,
    color: Colors.gray55,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    textAlign: 'center',
  },
});
