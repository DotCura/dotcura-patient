import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../constants/utils/Dimensions";
import { Colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
    vwHeader: {
        marginTop: getHeight(23),
      },
     
      vwBottom: {
        marginTop: getHeight(20),
      },
      vwMain: {
        paddingTop: getWidth(20),
        gap: getWidth(10),
      },
      vwInputsMain: {marginTop: getWidth(20), gap: getWidth(15)},
      vwInputsInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: getWidth(10),
      },
     
      
      
     
});
