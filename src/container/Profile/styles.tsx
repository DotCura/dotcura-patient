import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { getHeight, getWidth } from "../../constants/utils/Dimensions";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";

export const styles = StyleSheet.create({
    vwGrey: {
        backgroundColor: Colors.grayF3,
        height: getHeight(143),
        borderRadius: 20,
      },
      btnPlusBlack: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeight(36),
        aspectRatio: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        position: 'absolute',
        left: getWidth(8),
        top: getHeight(8),
        elevation: 6,
      },
      btnFav: {
        position: 'absolute',
        right: getWidth(16),
        top: getHeight(8),
      },
      lblPrice: {
        color: Colors.gray0F,
        fontFamily: fontsfamily.medium,
        fontSize: fontSize.size16,
      },
      lblTitle: {
        color: Colors.gray0F,
        fontFamily: fontsfamily.bold,
        fontSize: fontSize.size16,
      },
      lblDescription: {
        color: Colors.gray2A,
        fontFamily: fontsfamily.regular,
        fontSize: fontSize.size14,
      },
})
