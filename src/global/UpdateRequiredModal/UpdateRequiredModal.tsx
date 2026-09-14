import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../Buttons';

export interface UpdateRequiredModalProps {
  visible: boolean;
  onUpdate: () => void;
  title?: string;
  description?: string;
  buttonTitle?: string;
}

const UpdateRequiredModal: React.FC<UpdateRequiredModalProps> = ({
  visible,
  onUpdate,
  title,
  description,
  buttonTitle,
}) => {
  if (!visible) return null;

  const modalTitle =
    title || getTranslation('updateRequiredTitle') || 'Aggiornamento richiesto';
  const modalDescription =
    description ||
    getTranslation('updateRequiredDescription') ||
    'È disponibile una nuova versione dell’app. Aggiorna ora per continuare ad utilizzare DotCura.';
  const modalButtonTitle =
    buttonTitle || getTranslation('updateNowButton') || 'Aggiorna ora';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{modalTitle}</Text>
          <Text style={styles.description}>{modalDescription}</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              btnTitle={modalButtonTitle}
              btnPress={onUpdate}
              containerStyle={styles.buttonWrapper}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: getWidth(24),
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: getHeight(20),
    padding: getWidth(24),
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontFamily: fontsfamily.gbold,
    fontSize: fontSize.size20,
    color: Colors.gray0F,
    textAlign: 'center',
    marginBottom: getHeight(12),
  },
  description: {
    fontFamily: fontsfamily.gregular,
    fontSize: fontSize.size14,
    color: Colors.gray55,
    textAlign: 'center',
    lineHeight: getHeight(20),
    marginBottom: getHeight(24),
    paddingHorizontal: getWidth(8),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: getHeight(48),
    borderRadius: getHeight(24),
    backgroundColor: Colors.blue002,
  },
});

export default UpdateRequiredModal;
