// import {
//   launchCamera,
//   launchImageLibrary,
//   ImageLibraryOptions,
//   MediaType,
//   Asset,
// } from 'react-native-image-picker';
// import {Alert, Platform} from 'react-native';
// import {showAlert} from '../GConstant';

// const ImagePickerSelectionOptions = {
//   CAMERA: 1,
//   GALLERY: 2,
// };

// export const ImagePickerManager = {
//   selectPicker: async (
//     pickerType: number,
//     mediaType: MediaType,
//     isMultiSelection?: boolean,
//   ) => {
//     return new Promise((resolve, reject) => {
//       const launchOption =
//         pickerType == ImagePickerSelectionOptions.CAMERA
//           ? launchCamera
//           : launchImageLibrary;

//       try {
//         const mediaOptions: ImageLibraryOptions = {
//           mediaType: mediaType,
//           videoQuality: 'high',
//           quality: 1,
//           selectionLimit: isMultiSelection ? 10 : 1,
//           // maxHeight: 500,
//           // maxWidth: 500,
//           presentationStyle: 'overFullScreen',
//         };

//         launchOption({...mediaOptions, cameraType: 'back'}, mediaRes => {
//           // console.log('Response=>', mediaRes);
//           if (mediaRes?.didCancel != true) {
//             const maxFileSize = 1000000; // 1MB in bytes
//             const maxVideoSize = 60; // 20 seconds
//             const mediaResponse: Asset[] | undefined = mediaRes?.assets;
//             const isSingle = mediaResponse?.length === 1;
//             const item: Asset | undefined = mediaResponse && mediaResponse[0];
//             if (isSingle) {
//               // ✅ Check single image filesize
//               // if (item?.fileSize && item?.fileSize > maxFileSize) {
//               //   showAlert('The selected file is larger than 1MB');
//               // }
//               // ✅ Check single video duration
//               if (item?.duration && item?.duration > maxVideoSize) {
//                 showAlert('The selected video is longer than 60 seconds');
//               } else {
//                 resolve(mediaResponse);
//               }
//             } else {
//               // ✅ Check multiple image filesize
//               const largeFiles = mediaResponse?.filter(
//                 item => item.fileSize && item.fileSize > maxFileSize,
//               );

//               // ✅ Check multiple video duration
//               const longVideos = mediaResponse?.filter(
//                 item => item.duration && item.duration > maxVideoSize,
//               );

//               // ❌ Reject with proper messages
//               // if (largeFiles?.length && longVideos?.length) {
//               //   showAlert(
//               //     'Some files are larger than 1MB and some videos are longer than 20 seconds',
//               //   );
//               // } else if (largeFiles?.length) {
//               //   showAlert('Some files are larger than 1MB');
//               // }
//               if (longVideos?.length) {
//                 showAlert('Some videos are longer than 60 seconds');
//               } else {
//                 resolve(mediaResponse);
//               }
//             }
//           } else {
//             reject('Error in picking media');
//           }
//         });
//       } catch (error) {
//         console.log('Error==>', error);
//       }
//     });
//   },

//   choosePickerOptions: async (
//     mediaType: MediaType,
//     isMultiSelection?: boolean,
//   ) => {
//     return new Promise((resolve, reject) => {
//       Alert.alert(
//         'Select Media',
//         '',
//         Platform.select({
//           android: [
//             {
//               text: 'CANCEL',
//               style: 'destructive',
//               onPress: () => reject('User cancelled picker'),
//             },
//             {
//               text: 'CAMERA',
//               onPress: () => {
//                 try {
//                   const result = ImagePickerManager.selectPicker(
//                     ImagePickerSelectionOptions.CAMERA,
//                     mediaType,
//                   );
//                   resolve(result);
//                 } catch (error) {
//                   reject(error);
//                 }
//               },
//             },
//             {
//               text: 'GALLERY',
//               onPress: () => {
//                 try {
//                   const result = ImagePickerManager.selectPicker(
//                     ImagePickerSelectionOptions.GALLERY,
//                     mediaType,
//                     isMultiSelection,
//                   );
//                   resolve(result);
//                 } catch (error) {
//                   reject(error);
//                 }
//               },
//             },
//           ],
//           ios: [
//             {
//               text: 'CAMERA',
//               onPress: () => {
//                 try {
//                   const result = ImagePickerManager.selectPicker(
//                     ImagePickerSelectionOptions.CAMERA,
//                     mediaType,
//                   );
//                   resolve(result);
//                 } catch (error) {
//                   reject(error);
//                 }
//               },
//             },
//             {
//               text: 'GALLERY',
//               onPress: () => {
//                 try {
//                   const result = ImagePickerManager.selectPicker(
//                     ImagePickerSelectionOptions.GALLERY,
//                     mediaType,
//                     isMultiSelection,
//                   );
//                   resolve(result);
//                 } catch (error) {
//                   reject(error);
//                 }
//               },
//             },
//             {
//               text: 'CANCEL',
//               style: 'destructive',
//               onPress: () => reject('User cancelled picker'),
//             },
//           ],
//         }),
//       );
//     });
//   },
// };

import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  MediaType,
  Asset,
} from 'react-native-image-picker';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {showAlert} from '../GConstant';
 
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
        launchOption({...mediaOptions, cameraType: 'back'}, mediaRes => {
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