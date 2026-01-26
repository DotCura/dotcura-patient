import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
  vwTestTitleInner:{
    backgroundColor: Colors.goldenFB,
    borderRadius: 999,
    paddingHorizontal: getWidth(2),
    marginHorizontal: getWidth(2),
    paddingVertical: getHeight(2),
  },
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
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: getWidth(15),
    backgroundColor: Colors.whiteF2,
    paddingHorizontal: getWidth(16),
    paddingBottom: getWidth(10),
  },
  lblUnit: {
    color: Colors.gray92,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size23,
    letterSpacing: 0.2,
  },
  btnChnageQuery: {
    backgroundColor: Colors.white36,
    paddingVertical: getHeight(9),
    paddingHorizontal: getWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: getHeight(16),
  },
  lblTrade: {
    marginTop: getHeight(24),
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size20,
  },
  lblChangeQuery: {
    color: Colors.black04,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },
  vwwarningDetails1: {
    gap: getWidth(6),
    backgroundColor: Colors.grayE7,
    borderRadius: 28,
    flexDirection: 'row',
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(20),
  },
  txtBankDetails: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    letterSpacing: 0.2,
  },
  txtBankDetailsyellow: {
    color: Colors.black12,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  txtWeCanNot: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.gregular,
    letterSpacing: 0.1,
    fontSize: fontSize.size14,
  },
  txtWeCanNotYellow: {
    color: Colors.golden40,
    fontFamily: fontsfamily.regular,
    letterSpacing: 0.1,
    fontSize: fontSize.size14,
  },
  vwwarningDetails: {
    gap: getWidth(6),
    marginTop: getHeight(24),
    backgroundColor: Colors.goldenFC,
    borderRadius: 28,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  vwInBank: { gap: getHeight(2), flex: 1 },
  vwPercentage: {
    // flex: 1,
    flexDirection: 'row',

    // justifyContent: 'center',
    alignItems: 'center',
  },
  vwOptimalAndPercentage: {
    // flexDirection: 'row',
    gap: getHeight(9),
    marginTop: getHeight(13),
  },
  lblValuePecentage: {
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size16,
    color: Colors.gray0F,
    letterSpacing: 0.2,
  },
  lblPercentage: {
    flex: 1,
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.gray75,
  },
  lblUnitsmall: {
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size16,
    color: Colors.gray92,
  },
  lblTestValue: {
    textAlign: 'center',
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size54,
    color: Colors.gray0F,
  },
  card: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  vwTestTitle: {
    backgroundColor: Colors.goldeenF5,
    borderRadius: 999,
    paddingHorizontal: getWidth(8),
    marginHorizontal: getWidth(2),
    paddingVertical: getHeight(2),
  },
  vwTestDes: {
    marginTop: getHeight(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lblValueDes: {
    textAlign: 'center',
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size24,
    color: Colors.gray0F,
  },
  lblValue: {
    textAlign: 'center',
    fontFamily: fontsfamily.gmedium,
    fontSize: fontSize.size24,
    color: Colors.golden40,
  },
});
