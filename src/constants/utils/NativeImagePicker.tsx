import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  Asset,
} from 'react-native-image-picker';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { showAlert } from '../GConstant';

const ImagePickerSelectionOptions = {
  CAMERA: 1,
  GALLERY: 2,
};

// ✅ ANDROID CAMERA PERMISSION REQUIRED
async function requestCameraPermission() {
  if (Platform.OS !== 'android') return true;

  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera.',
        buttonPositive: 'OK',
      },
    );

    console.log('📸 CAMERA PERMISSION RESULT:', result);

    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.log('❌ CAMERA PERMISSION ERROR:', err);
    return false;
  }
}

export const ImagePickerManager = {
  // -------------------------------------------------------------
  // 📌 SELECT PICKER (CAMERA / GALLERY)
  // -------------------------------------------------------------
  selectPicker: async (
    pickerType: number,
    mediaType: MediaType,
    isMultiSelection?: boolean,
  ) => {
    console.log('➡️ selectPicker called. Type:', pickerType);

    return new Promise(async (resolve, reject) => {
      const launchOption =
        pickerType === ImagePickerSelectionOptions.CAMERA
          ? launchCamera
          : launchImageLibrary;

      if (pickerType === ImagePickerSelectionOptions.CAMERA) {
        const allowed = await requestCameraPermission();
        if (!allowed) {
          console.log('❌ Camera permission denied.');
          reject('Camera permission denied');
          return;
        }
      }

      console.log(
        pickerType === ImagePickerSelectionOptions.CAMERA
          ? '📸 Launching CAMERA...'
          : '🖼 Launching GALLERY...',
      );

      const mediaOptions: ImageLibraryOptions = {
        mediaType: mediaType,
        quality: 1,
        videoQuality: 'high',
        selectionLimit: isMultiSelection ? 10 : 1,
        presentationStyle: 'overFullScreen',
      };

      console.log('📋 Picker Options:', mediaOptions);

      try {
        launchOption({ ...mediaOptions, cameraType: 'back' }, mediaRes => {
          console.log('📤 Raw Picker Response:', mediaRes);

          if (mediaRes?.didCancel) {
            console.log('⚠️ User cancelled picker.');
            reject('User cancelled');
            return;
          }

          if (mediaRes?.errorCode) {
            console.log('❌ Picker Error Code:', mediaRes.errorCode);
            console.log('❌ Picker Error Message:', mediaRes.errorMessage);
            reject(mediaRes.errorMessage);
            return;
          }

          const assets = mediaRes?.assets;

          if (!assets || assets.length === 0) {
            console.log('⚠️ No media returned.');
            reject('No media selected');
            return;
          }

          const maxVideoDuration = 60;

          // Single Selection
          if (assets.length === 1) {
            const item = assets[0];

            if (item.duration && item.duration > maxVideoDuration) {
              showAlert('The selected video is longer than 60 seconds');
              reject('Video too long');
              return;
            }

            console.log('✅ Single media selected:', assets);
            resolve(assets);
          } else {
            // Multi-selection
            const longVideos = assets.filter(
              x => x.duration && x.duration > maxVideoDuration,
            );

            if (longVideos.length > 0) {
              showAlert('Some videos are longer than 60 seconds');
              reject('Some videos too long');
              return;
            }

            console.log('✅ Multiple media selected:', assets);
            resolve(assets);
          }
        });
      } catch (error) {
        console.log('🔥 Error in selectPicker:', error);
        reject(error);
      }
    });
  },

  // -------------------------------------------------------------
  // 📌 PICKER ALERT (Select Camera / Gallery)
  // -------------------------------------------------------------
  choosePickerOptions: async (
    mediaType: MediaType,
    isMultiSelection?: boolean,
  ) => {
    console.log('📂 choosePickerOptions called...');

    return new Promise((resolve, reject) => {
      Alert.alert(
        'Select Media',
        '',
        Platform.select({
          android: [
            {
              text: 'CANCEL',
              style: 'destructive',
              onPress: () => {
                console.log('❌ User cancelled picker');
                reject('User cancelled');
              },
            },
            {
              text: 'CAMERA',
              onPress: async () => {
                console.log('📸 CAMERA option tapped...');
                try {
                  const result = await ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.CAMERA,
                    mediaType,
                    isMultiSelection,
                  );
                  console.log('📸 CAMERA Result:', result);
                  resolve(result);
                } catch (e) {
                  console.log('🔥 CAMERA Error:', e);
                  reject(e);
                }
              },
            },
            {
              text: 'GALLERY',
              onPress: async () => {
                console.log('🖼 GALLERY option tapped...');
                try {
                  const result = await ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.GALLERY,
                    mediaType,
                    isMultiSelection,
                  );
                  console.log('🖼 GALLERY Result:', result);
                  resolve(result);
                } catch (e) {
                  console.log('🔥 GALLERY Error:', e);
                  reject(e);
                }
              },
            },
          ],

          ios: [
            {
              text: 'CAMERA',
              onPress: async () => {
                console.log('📸 CAMERA option tapped...');
                try {
                  const result = await ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.CAMERA,
                    mediaType,
                  );
                  console.log('📸 CAMERA Result:', result);
                  resolve(result);
                } catch (e) {
                  console.log('🔥 CAMERA Error:', e);
                  reject(e);
                }
              },
            },
            {
              text: 'GALLERY',
              onPress: async () => {
                console.log('🖼 GALLERY option tapped...');
                try {
                  const result = await ImagePickerManager.selectPicker(
                    ImagePickerSelectionOptions.GALLERY,
                    mediaType,
                    isMultiSelection,
                  );
                  console.log('🖼 GALLERY Result:', result);
                  resolve(result);
                } catch (e) {
                  console.log('🔥 GALLERY Error:', e);
                  reject(e);
                }
              },
            },
            {
              text: 'CANCEL',
              style: 'destructive',
              onPress: () => {
                console.log('❌ User cancelled picker');
                reject('User cancelled');
              },
            },
          ],
        }),
      );
    });
  },
};
