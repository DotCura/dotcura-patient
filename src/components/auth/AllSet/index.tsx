import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import CustomButton from '../../../global/Buttons';
import { Colors } from '../../../constants/Colors';
import { fontsfamily } from '../../../constants/FontFamily';
import { fontSize } from '../../../constants/FontSizes';

const AllSetComponent = (props: any) => {
  const biometricLabel = Platform.OS === 'ios' ? 'Face ID' : 'Face Unlock';

  return (
    <View style={styles.vwMain}>
      <View style={styles.vwMain}>
        <Text style={styles.lblMainTitle}>{getTranslation('allready')}</Text>
        <Text style={styles.lblMainSubtitle}>
          {getTranslation('youarereadytostart')}
        </Text>
      </View>
      <CustomButton
        style={{
          marginBottom: props.insets.bottom + getHeight(16),
          alignSelf: 'flex-end',
        }}
        btnPress={props.handleNavigateToBottomTab}
        btnTitle={getTranslation('gototheapp')}
        btnicon={false}
      />

      <Modal
        visible={props.showFaceLockModal}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>
            <Text style={modalStyles.title}>
              {getTranslation('facelockallsettitle')} {biometricLabel}
            </Text>
            <Text style={modalStyles.subtitle}>
              {getTranslation('facelockallsetsubtitle')} {biometricLabel}?{' '}
              {getTranslation('facelockallsetsubtitle2')}
            </Text>
            <CustomButton
              btnPress={props.onEnableFaceLock}
              btnTitle={`Abilita ${biometricLabel}`}
              btnicon={false}
              style={{ marginTop: getHeight(8) }}
            />
            <TouchableOpacity
              style={modalStyles.skipBtn}
              onPress={props.onSkipFaceLock}
              activeOpacity={0.7}
            >
              <Text style={modalStyles.skipText}>
                {getTranslation('skipfacelock')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(24),
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: getWidth(24),
    paddingVertical: getHeight(28),
    // alignItems: 'center',
  },
  iconCircle: {
    width: getHeight(80),
    height: getHeight(80),
    borderRadius: getHeight(40),
    backgroundColor: Colors.purpleE0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getHeight(16),
  },
  iconEmoji: { fontSize: 36 },
  title: {
    fontSize: fontSize.size22,
    fontFamily: fontsfamily.gbold,
    color: Colors.gray0F,
    textAlign: 'center',
    marginBottom: getHeight(8),
  },
  subtitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: getHeight(4),
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: getHeight(14),
    width: '100%',
  },
  skipText: {
    fontSize: fontSize.size15,
    fontFamily: fontsfamily.gmedium,
    color: Colors.gray75,
  },
});

export default AllSetComponent;
