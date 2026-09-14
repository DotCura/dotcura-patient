import { Platform, PermissionsAndroid } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { flashMessageSucess, flashMessageWarning } from '../GConstant';

const checkAndroidPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') return true;

  // On Android 10 (API level 29) and above, scoped storage is used.
  // Writing to the public Downloads directory does not require WRITE_EXTERNAL_STORAGE.
  const apiLevel = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);
  if (apiLevel >= 29 || isNaN(apiLevel)) return true;

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
    return true; // Fallback to allow download attempt via DownloadManager
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
    const downloadPath = `${dirs.DownloadDir}/${fileName}`;

    // Clean up existing file at path to avoid filename collisions
    try {
      const exists = await ReactNativeBlobUtil.fs.exists(downloadPath);
      if (exists) {
        await ReactNativeBlobUtil.fs.unlink(downloadPath);
      }
    } catch (e) {
      console.log('Error cleaning up existing file:', e);
    }

    try {
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: downloadPath,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: getTranslation('exportDownloading') || 'Downloading patient data export ZIP archive.',
          mime: 'application/zip',
          mediaScannable: true,
          storeInDownloads: true,
        },
      }).fetch('GET', url);

      flashMessageSucess(getTranslation('exportSuccess'));

      const filePath = res.path() || downloadPath;
      if (filePath) {
        try {
          await ReactNativeBlobUtil.android.actionViewIntent(filePath, 'application/zip');
        } catch (intentErr) {
          console.log('Error with actionViewIntent application/zip, trying fallback mime:', intentErr);
          try {
            await ReactNativeBlobUtil.android.actionViewIntent(filePath, '*/*');
          } catch (fallbackErr) {
            console.log('Error with fallback actionViewIntent:', fallbackErr);
          }
        }
      }
    } catch (err) {
      console.error('Download error:', err);
      flashMessageWarning(getTranslation('exportError'));
    }
  } else {
    // iOS: Save to Documents directory and open preview document sheet
    const filePath = `${dirs.DocumentDir}/${fileName}`;
    try {
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: filePath,
      }).fetch('GET', url);

      ReactNativeBlobUtil.ios.previewDocument(res.path() || filePath);
      flashMessageSucess(getTranslation('exportSuccess'));
    } catch (err) {
      console.error('Download error:', err);
      flashMessageWarning(getTranslation('exportError'));
    }
  }
};
