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
  btnBack: {
    backgroundColor: Colors.white,
    height: getHeight(36),
    width: getWidth(36),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueDC,
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
    flex: 1,
    width: ScreenDimensions.screenWidth,
  },
  imageContainer: {
    width: ScreenDimensions.screenWidth,
    overflow: 'hidden',
  },
  onboardingImage: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    marginBottom: getHeight(40),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: fontSize.size28,
    fontFamily: fontsfamily.gmedium,
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
    marginHorizontal: getWidth(16),
    letterSpacing: 0.2,
  },
  indicatorContainer: {
    marginHorizontal: getWidth(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    height: getHeight(4),
    borderRadius: getWidth(2),
  },
  completedIndicator: {
    height: getHeight(13),
    borderRadius: 10,
    width: getWidth(13),
    backgroundColor: Colors.blue002,
  },
  activeIndicator: {
    height: getHeight(14),
    borderRadius: 3636,
    width: getWidth(52),
    backgroundColor: Colors.blue002,
  },
  inactiveIndicator: {
    height: getHeight(13),
    borderRadius: 10,
    width: getWidth(13),
    backgroundColor: Colors.purpleB3,
  },
  buttonContainer: {
    gap: 8,
    paddingHorizontal: getWidth(16),
  },
});
