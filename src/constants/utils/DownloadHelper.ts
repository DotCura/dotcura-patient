import { Platform, PermissionsAndroid } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { flashMessageSucess, flashMessageWarning } from '../GConstant';

const checkAndroidPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  // Android 10 (API level 29) and above uses scoped storage, writing to the Downloads folder
  // does not require WRITE_EXTERNAL_STORAGE permission.
  if (typeof Platform.Version === 'number' && Platform.Version >= 29) return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: getTranslation('permissionTitle') || 'Storage Permission Required',
        message: getTranslation('permissionMessage') || 'This app needs access to your storage to download files.',
        buttonNeutral: getTranslation('buttonNeutral') || 'Ask Me Later',
        buttonNegative: getTranslation('buttonNegative') || 'Cancel',
        buttonPositive: getTranslation('buttonPositive') || 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const downloadZipFile = async (url: string, fileName: string) => {
  const hasPermission = await checkAndroidPermission();
  if (!hasPermission) {
    flashMessageWarning(getTranslation('permissionDenied'));
    return;
  }

  const { dirs } = ReactNativeBlobUtil.fs;

  if (Platform.OS === 'android') {
    // Save directly to the public Downloads folder with system notification
    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: getTranslation('exportDownloading') || 'Downloading patient data export ZIP archive.',
        path: `${dirs.DownloadDir}/${fileName}`,
        mime: 'application/zip',
      },
    })
      .fetch('GET', url)
      .then((_res) => {
        flashMessageSucess(getTranslation('exportSuccess'));
      })
      .catch((err) => {
        console.error('Download error:', err);
        flashMessageWarning(getTranslation('exportError'));
      });
  } else {
    // iOS: Save to Documents directory and open preview document sheet
    const filePath = `${dirs.DocumentDir}/${fileName}`;
    ReactNativeBlobUtil.config({
      fileCache: true,
      path: filePath,
    })
      .fetch('GET', url)
      .then((_res) => {
        ReactNativeBlobUtil.ios.previewDocument(filePath);
        flashMessageSucess(getTranslation('exportSuccess'));
      })
      .catch((err) => {
        console.error('Download error:', err);
        flashMessageWarning(getTranslation('exportError'));
      });
  }
};
