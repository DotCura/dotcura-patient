import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import CompleteAddressComponent from '../../components/CompleteAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTranslation } from '../../localization/i18n/i18n.config';

const CompleteAddressContainer = () => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  const [type, setType] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [stairs, setStairs] = useState<string>('');
  const [instructions, setinstructions] = useState<string>('');

  const typeRef = useRef<TextInput | null>(null);
  const floorRef = useRef<TextInput | null>(null);
  const stairsRef = useRef<TextInput | null>(null);
  const instructionRef = useRef<TextInput | null>(null);

  const [typeError, setTypeError] = useState<any>('');
  const [floorError, setFloorError] = useState<any>('');
  const [stairsError, setStairsError] = useState<any>('');
  const [instructionsError, setInstructionNameError] = useState<any>('');

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'address') {
      // Allow letters, numbers, spaces, commas, hyphens
      let newText = text.replace(/[^a-zA-Z0-9\s,-]/g, '');
      newText = newText.replace(/\s{2,}/g, ' '); // No double spaces
      setType(newText);
    } else if (type === 'floor') {
      // Only numbers
      let newText = text.replace(/[^\d]/g, '');
      setFloor(newText);
    } else if (type === 'stairs') {
      // Only alphabet letters
      let newText = text.replace(/[^a-zA-Z]/g, '');
      setStairs(newText);
    } else if (type === 'instruction') {
      // Free text, only remove extra spaces at start
      let newText = text.replace(/^\s+/, '');
      setinstructions(newText);
    }
  };

  const handleOnPressSaveAddress = () => {
    // HOME TYPE VALIDATION
    if (type.trim() === '') {
      setTypeError(getTranslation('emptyHomeType'));
      return;
    }

    // FLOOR VALIDATION
    else if (floor.trim() === '') {
      setFloorError(getTranslation('emptyFloor'));
      return;
    } else if (!/^\d+$/.test(floor)) {
      setFloorError(getTranslation('invalidFloor'));
      return;
    }
    // FLOOR VALIDATION
    else if (stairs.trim() === '') {
      setStairsError(getTranslation('emptyStairs'));
      return;
    } else if (!/^[A-Za-z]+$/.test(stairs)) {
      setFloorError(getTranslation('invalidStairs'));
      return;
    }

    // INSTRUCTION VALIDATION (optional, no limit)
    else if (instructions.trim() == '') {
      setInstructionNameError(getTranslation('emptyInstructions'));
      return;
    } else {
    }

    // If all good → call API
    // handleApiSaveAddress();
  };

  return (
    <CompleteAddressComponent
      insets={insets}
      headerArray={headerArray}
      handleOnPressSaveAddress={handleOnPressSaveAddress}
      handleOnChangeText={handleOnChangeText}
      type={type}
      floor={floor}
      stairs={stairs}
      instructions={instructions}
      typeRef={typeRef}
      floorRef={floorRef}
      stairsRef={stairsRef}
      instructionRef={instructionRef}
      typeError={typeError}
      setTypeError={setTypeError}
      floorError={floorError}
      setFloorError={setFloorError}
      stairsError={stairsError}
      setStairsError={setStairsError}
      instructionsError={instructionsError}
      setInstructionNameError={setInstructionNameError}
    />
  );
};

export default CompleteAddressContainer;
