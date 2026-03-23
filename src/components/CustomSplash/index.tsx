import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import { images } from '../../constants/Images';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';

interface Props {
  showBiometricOverlay?: boolean;
  biometricError?: string;
  isAuthenticating?: boolean;
  onRetry?: () => void;
}

const CustomSplash = ({
  showBiometricOverlay = false,
  biometricError = '',
  isAuthenticating = false,
  onRetry,
}: Props) => {
  const biometricLabel =
    Platform.OS === 'ios'
      ? getTranslation('faceid')
      : getTranslation('faceunlock');
  const isSimulatorError =
    biometricError.includes('configurata') ||
    biometricError.includes('not enrolled');

  return (
    <View style={{ flex: 1, backgroundColor: '#DEEDF4' }}>
      <Video
        source={images.splashvideo}
        style={{ flex: 1, backgroundColor: '#DEEDF4' }}
        resizeMode="none"
      />

      {showBiometricOverlay && (
        <View style={styles.overlay}>
          <View style={styles.card}>
            {/* Icon circle */}
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔒</Text>
            </View>

            <Text style={styles.title}>{getTranslation('verifyidentity')}</Text>
            <Text style={styles.subtitle}>
              {getTranslation('facelockdes1')} {biometricLabel}{' '}
              {getTranslation('facelockdes2')}
            </Text>

            {!!biometricError && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{biometricError}</Text>
                {Platform.OS === 'ios' && isSimulatorError && (
                  <Text style={styles.hintText}>
                    {'💡 Simulatore: '}
                    <Text style={styles.hintBold}>
                      Features → Face ID → Enrolled
                    </Text>
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[styles.button, isAuthenticating && styles.buttonDisabled]}
              onPress={onRetry}
              disabled={isAuthenticating}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isAuthenticating
                  ? 'Verifica in corso...'
                  : `Usa ${biometricLabel}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white, // blue002 tinted
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(24),
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 28,
    paddingHorizontal: getWidth(24),
    paddingVertical: getHeight(28),
    alignItems: 'center',
    shadowColor: Colors.blue002,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
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
  iconEmoji: {
    fontSize: 36,
  },
  title: {
    fontSize: fontSize.size22,
    fontFamily: fontsfamily.gbold,
    color: Colors.blue002,
    marginBottom: getHeight(6),
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray75,
    textAlign: 'center',
    marginBottom: getHeight(20),
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  errorBox: {
    width: '100%',
    backgroundColor: Colors.redFD,
    borderRadius: 14,
    paddingHorizontal: getWidth(14),
    paddingVertical: getHeight(10),
    marginBottom: getHeight(16),
  },
  errorText: {
    fontSize: fontSize.size13,
    fontFamily: fontsfamily.gmedium,
    color: Colors.redCA,
    textAlign: 'center',
  },
  hintText: {
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.gregular,
    color: Colors.gray55,
    textAlign: 'center',
    marginTop: getHeight(6),
    lineHeight: 18,
  },
  hintBold: {
    fontFamily: fontsfamily.gbold,
    color: Colors.blue002,
  },
  button: {
    backgroundColor: Colors.blue002,
    paddingVertical: getHeight(15),
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: Colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.gsemiBold,
    letterSpacing: 0.2,
  },
});

export default CustomSplash;
