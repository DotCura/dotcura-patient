import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: getHeight(400),
    backgroundColor: 'transparent',
  },
  vwImgOnboarding: {
    width: ScreenDimensions.screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: getHeight(101),
  },
  imageContainer: {
    marginTop: getHeight(130),
    width: ScreenDimensions.screenWidth - getWidth(60),
    overflow: 'hidden',
  },
  onboardingImage: {
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.bold,
    color: Colors.gray0F,
    textAlign: 'center',
    marginHorizontal: getWidth(16),
  },
  txtSubtitle: {
    marginTop: 4,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.regular,
    color: Colors.gray55,
    textAlign: 'center',
    marginHorizontal: getWidth(23),
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    height: getHeight(4),
    borderRadius: getWidth(2),
    marginHorizontal: getWidth(4),
  },
  activeIndicator: {
    height: getHeight(12),
    borderRadius: 10,
    width: getWidth(12),
    backgroundColor: Colors.blue1C,
  },
  inactiveIndicator: {
    height: getHeight(12),
    borderRadius: 10,
    width: getWidth(12),
    backgroundColor: Colors.grayF3,
  },
  buttonContainer: {
    // position: 'absolute',
    gap:8,
    marginHorizontal: getWidth(20),
    // bottom: 0,
    // left: 0,
    // right: 0,
    // paddingBottom: getHeight(40),
    // backgroundColor: 'transparent',
  },
});
