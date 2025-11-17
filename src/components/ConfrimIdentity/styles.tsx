import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  vwFrontSide: {
    marginTop: getHeight(24),
    height: getHeight(116),
    borderWidth: 2,
    borderColor: Colors.grayD8,
    borderRadius: 12,
  },

  lblTitleInput: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semiBold,
    color: Colors.gray55,
    marginBottom: getHeight(6),
  },
  txtFronSide: {
    alignSelf: 'center',
    marginTop: getHeight(27),
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
    color: Colors.gray0F,
  },
  btnFrontSide: {
    height: getHeight(36),
    width: getWidth(92),
    backgroundColor: Colors.lightBlurE4,
    alignSelf: 'center',
    marginTop: getHeight(8),
    borderRadius: 20,
    flexDirection: 'row',
    // justifyContent:"center",
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(16),
    alignItems: 'center',
  },
  txtUpload: {
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
    color: Colors.blue17,
  },
  imgFrontSide: {
    height: getHeight(116),
    resizeMode: 'cover',
    borderRadius: 12,
  },
});
