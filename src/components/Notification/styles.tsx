import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  btnalertlbl: {
    color: Colors.black12,
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size14,
    letterSpacing: 0.1,
  },
  btnalert: {
    backgroundColor: Colors.white80,
    borderRadius: 20,
    paddingHorizontal: getWidth(12),
    paddingVertical: getHeight(9),
    alignSelf: 'flex-start',
    marginTop: getHeight(12),
  },
  vwTitleImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnNotification: {
    backgroundColor: Colors.blueD1,
    borderRadius: 20,
    padding: 16,
    marginBottom: getHeight(13),
  },
  title: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
    flex: 1,
  },
});
