import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { Colors } from '../../constants/Colors';

export const styles = StyleSheet.create({
  lblNoAddressFound: {
    fontSize: fontSize.size20,
    textAlign: 'center',
    marginHorizontal: getWidth(40),
    fontFamily: fontsfamily.gsemiBold,
    color: Colors.blue002,
  },
  imgEditIcon: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
  },
  imgDeleteIcon: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
  },
  vwDeleteAddressIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },
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
    marginRight: getWidth(10),
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
