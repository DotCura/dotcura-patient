import { StyleSheet } from 'react-native';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';

export const styles = StyleSheet.create({
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
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size20,
  },
  lblChangeQuery: {
    color: Colors.black04,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },
  vwwarningDetails1: {
    gap: getWidth(6),
    backgroundColor: Colors.grayED,
    borderRadius: 28,
    flexDirection: 'row',
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(16),
  },
  txtBankDetails: {
    color: Colors.gray0F,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  txtBankDetailsyellow: {
    color: Colors.black12,
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
  },
  txtWeCanNot: {
    color: Colors.gray2A,
    fontFamily: fontsfamily.regular,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwOptimalAndPercentage: {
    flexDirection: 'row',
    marginTop: getHeight(16),
  },
  lblValuePecentage: {
    fontFamily: fontsfamily.bold,
    fontSize: fontSize.size16,
    color: Colors.gray0F,
  },
  lblPercentage: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size16,
    color: Colors.gray75,
  },
  lblUnit: {
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size24,
    color: Colors.gray55,
  },
  lblTestValue: {
    textAlign: 'center',
    fontFamily: fontsfamily.regular,
    fontSize: fontSize.size40,
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
    backgroundColor: Colors.goldenFB,
    borderRadius: 999,
    paddingHorizontal: getWidth(4),
    marginHorizontal: getWidth(2),
    paddingVertical:getHeight(2)
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
    fontFamily: fontsfamily.heavy,
    fontSize: fontSize.size24,
    color: Colors.gray0F,
  },
  lblValue: {
    fontFamily: fontsfamily.heavy,
    fontSize: fontSize.size24,
    color: Colors.golden40,
  },
});
