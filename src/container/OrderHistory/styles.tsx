import { StyleSheet } from "react-native";
import { getWidth } from "../../constants/utils/Dimensions";
import { Colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";


export const styles = StyleSheet.create({
    vwMainOrderDetails: {
        flexDirection: 'row',
      },
    nurseview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: getWidth(4),
      },
      starRow: {
        flexDirection: 'row',
      },
      lblTag: {
        color: Colors.gray0F,
        fontFamily: fontsfamily.regular,
        fontSize: fontSize.size12,
        letterSpacing: 0.1,
      },
      lblOrderTitle: {
        color: Colors.gray0F,
        fontFamily: fontsfamily.bold,
        fontSize: fontSize.size16,
        letterSpacing: 0.2,
      },
      lblOrderDate: {
        color: Colors.gray55,
        fontFamily: fontsfamily.regular,
        fontSize: fontSize.size14,
        letterSpacing: 0.1,
      },
      lblOrderID: {
        color: Colors.gray55,
        fontFamily: fontsfamily.regular,
        fontSize: fontSize.size14,
        letterSpacing: 0.1,
      },
      lblStatus: {
        color: Colors.blue1C,
        fontFamily: fontsfamily.medium,
        fontSize: fontSize.size12,
      },
})