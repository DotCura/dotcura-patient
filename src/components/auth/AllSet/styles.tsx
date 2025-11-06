import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: getWidth(16),
    justifyContent:"center",
    alignItems:"center"
  },

  lblMainTitle: {
     color: Colors.gray0F,
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    marginTop:getHeight(40),
    


  },
  lblMainSubtitle: {
    color: Colors.gray55,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
  
  },
});
