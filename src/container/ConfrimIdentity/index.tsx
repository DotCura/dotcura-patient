import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { ImagePickerManager } from '../../constants/utils/NativeImagePicker';
import ConfrimIdentityComponent from '../../components/ConfrimIdentity';
import { flashMessageWarning } from '../../constants/GConstant';

const ConfrimIdentityContainer = () => {
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
    }
  };

  const pickImage = async () => {
    try {
      const result: any = await ImagePickerManager.choosePickerOptions(
        'photo',
        false,
      );

      if (result && result.length > 0) {
        const image = result[0];
        setFrontSide(image.uri); // ✅ Set image URI to your state
        setFrontImageAdd(true);

        console.log('Picked Image:', image.uri);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const pickBackImage = async () => {
    try {
      const result: any = await ImagePickerManager.choosePickerOptions(
        'photo',
        false,
      );

      if (result && result.length > 0) {
        const image = result[0];
        setBackSide(image.uri); // ✅ Set image URI to your state
        setBackImageAdd(true);

        console.log('Picked Image:', image.uri);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <ConfrimIdentityComponent
      frontSide={frontSide}
      frontImageAdd={frontImageAdd}
      backSide={backSide}
      backImageAdd={backImageAdd}
      onPressFrontSide={pickImage}
      onPressBackSide={pickBackImage}
      AppTypeData={AppTypeData}
      insets={insets}
      appTypeValue={appTypeValue}
      handleSetRole={handleSetRole}
      handleSubmit={handleSubmit}
      headerArray={headerArray}
    />
  );
};

export default ConfrimIdentityContainer;
