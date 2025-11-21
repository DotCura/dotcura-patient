import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { ImagePickerManager } from '../../constants/utils/NativeImagePicker';
import ConfrimIdentityComponent from '../../components/ConfrimIdentity';
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
} from '../../constants/GConstant';
import { ScreenNames } from '../../constants/AppConstants';
import { Keyboard } from 'react-native';

const ConfrimIdentityContainer = ({ navigation }: any) => {
  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  const [appTypeValue, setAppTypeValue] = useState<any>('');
  const [frontSide, setFrontSide] = useState(undefined);
  const [frontImageAdd, setFrontImageAdd] = useState(false);
  const [backSide, setBackSide] = useState(undefined);
  const [backImageAdd, setBackImageAdd] = useState(false);
  const insets = useSafeAreaInsets();
  const AppTypeData = [
    { label: getTranslation('passport'), value: '1' },
    { label: getTranslation('electronicsidcard'), value: '2' },
  ];

  const handleSetRole = (item: any) => {
    setAppTypeValue(item.value);
  };

  const handleSubmit = () => {
    if (appTypeValue == '') {
      flashMessageWarning(getTranslation('pleaseselectdocument'));
    } else if (frontSide == undefined || backSide == undefined) {
      flashMessageWarning(getTranslation('pleaseuploadfrontandbackside'));
    } else {
      console.log('hy');
      navigation.navigate(ScreenNames.ADDFAMILYCONTAINER);
    }
  };

  const pickImage = () => {
    Keyboard.dismiss();
   
    checkPermission(cameraPermission, messages.cameraPermission)
      .then(isCameraAllow => {
        if (!isCameraAllow) {
          return;
        }
   
        return ImagePickerManager.choosePickerOptions('photo');
      })
      .then((result: any) => {
        if (!result) return;
   
        const uri = result[0]?.uri;
        if (!uri) return;
   
        setFrontSide(uri);
        setFrontImageAdd(true);
      })
      .catch(error => {
        console.log('🔥 Error in pickImage():', error);
      });
  };
   
  const pickBackImage = () => {
    Keyboard.dismiss();
   
    checkPermission(cameraPermission, messages.cameraPermission)
      .then(isCameraAllow => {
        if (!isCameraAllow) {
          return;
        }
   
        return ImagePickerManager.choosePickerOptions('photo');
      })
      .then((result: any) => {
        if (!result) return;
   
        const uri = result[0]?.uri;
        if (!uri) return;
   
        setBackSide(uri);
        setBackImageAdd(true);
      })
      .catch(error => {
        console.log('🔥 Error in pickBackImage():', error);
      });
  };
   

  // const pickImage = () => {
  //   Keyboard.dismiss();
  //   checkPermission(cameraPermission, messages.cameraPermission).then(
  //     isAllow => {
  //       if (isAllow) {
  //         checkPermission(galleryPermission, messages.galleryPermission).then(
  //           isAllow => {
  //             if (isAllow) {
  //               ImagePickerManager.choosePickerOptions('photo')
  //                 .then((result: any) => {
  //                   const pickerResponse = result;
  //                   console.log('Response==>', result);
  //                   if (pickerResponse[0].uri) {
  //                     const image = pickerResponse[0].uri;
  //                     setFrontSide(image);
  //                     setFrontImageAdd(true);
  //                   } else {
  //                     __DEV__ && console.log('No media selected or captured');
  //                   }
  //                 })
  //                 .catch((error: string) => {
  //                   __DEV__ && console.log('Error capturing media:', error);
  //                 });
  //             }
  //           },
  //         );
  //       }
  //     },
  //   );
  // };

  // const pickBackImage = () => {
  //   Keyboard.dismiss();
  //   checkPermission(cameraPermission, messages.cameraPermission).then(
  //     isAllow => {
  //       if (isAllow) {
  //         checkPermission(galleryPermission, messages.galleryPermission).then(
  //           isAllow => {
  //             if (isAllow) {
  //               ImagePickerManager.choosePickerOptions('photo')
  //                 .then((result: any) => {
  //                   const pickerResponse = result;
  //                   console.log('Response==>', result);
  //                   if (pickerResponse[0].uri) {
  //                     const image = pickerResponse[0].uri;
  //                     setBackSide(image); // ✅ Set image URI to your state
  //                     setBackImageAdd(true);
              
  //                   } else {
  //                     __DEV__ && console.log('No media selected or captured');
  //                   }
  //                 })
  //                 .catch((error: string) => {
  //                   __DEV__ && console.log('Error capturing media:', error);
  //                 });
  //             }
  //           },
  //         );
  //       }
  //     },
  //   );
  // };

  // const pickImage = async () => {
  //   try {
  //     const result: any = await ImagePickerManager.choosePickerOptions(
  //       'photo',
  //       false,
  //     );

  //     if (result && result.length > 0) {
  //       const image = result[0];
  //       setFrontSide(image.uri); // ✅ Set image URI to your state
  //       setFrontImageAdd(true);

  //       console.log('Picked Image:', image.uri);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };
  // const pickBackImage = async () => {
  //   try {
  //     const result: any = await ImagePickerManager.choosePickerOptions(
  //       'photo',
  //       false,
  //     );

  //     if (result && result.length > 0) {
  //       const image = result[0];
  //       setBackSide(image.uri); // ✅ Set image URI to your state
  //       setBackImageAdd(true);

  //       console.log('Picked Image:', image.uri);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };
  return (
    <ConfrimIdentityComponent
      frontSide={frontSide}
      frontImageAdd={frontImageAdd}
      backSide={backSide}
      backImageAdd={backImageAdd}
      onPressFrontSide={pickImage}
      onPressBackSide={pickBackImage}
      insets={insets}
      AppTypeData={AppTypeData}
      appTypeValue={appTypeValue}
      handleSetRole={handleSetRole}
      handleSubmit={handleSubmit}
      headerArray={headerArray}
      navigation={navigation}
    />
  );
};

export default ConfrimIdentityContainer;
