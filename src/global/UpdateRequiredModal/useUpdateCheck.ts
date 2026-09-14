import { useCallback, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { checkVersion } from 'react-native-check-version';
import { STORE_URLS } from '../../constants/AppConstants';

const storeUrl = Platform.OS === 'ios' ? STORE_URLS.IOS : STORE_URLS.ANDROID;

export const useUpdateCheck = () => {
  const [updateRequired, setUpdateRequired] = useState(false);
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);

  const checkForUpdate = useCallback(async () => {
    try {
      const version = await checkVersion();

      if (version.needsUpdate) {
        setUpdateRequired(true);
        if (version.url) {
          setUpdateUrl(version.url);
        }
      }
    } catch (error) {
      __DEV__ && console.log('Version check failed:', error);
    }
  }, []);

  const handleUpdateNow = useCallback(() => {
    const targetUrl = updateUrl || storeUrl;
    Linking.openURL(targetUrl).catch(err => {
      __DEV__ && console.log('Failed to open store URL:', err);
    });
  }, [updateUrl]);

  return { updateRequired, checkForUpdate, handleUpdateNow };
};
