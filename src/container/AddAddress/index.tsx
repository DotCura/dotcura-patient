import { TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AddAddressComponent from '../../components/AddAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { flashMessageWarning } from '../../constants/GConstant';
import { ScreenNames } from '../../constants/AppConstants';

const AddAddressContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
  const addressType = [
    { label: 'Home', value: '1' },
    { label: 'Apartment', value: '2' },
    { label: 'Residency', value: '3' },
  ];

  const [searchAddress, setSearchAddress] = useState('');
  const [searchAddressError, setSearchAddressError] = useState<any>('');

  const [isdefaultsave, setIsDefaultSave] = useState(true);
  const [floor, setFloor] = useState<string>('');
  const [stairs, setStairs] = useState<string>('');
  const [instructions, setinstructions] = useState<string>('');

  const floorRef = useRef<TextInput | null>(null);
  const stairsRef = useRef<TextInput | null>(null);
  const instructionRef = useRef<TextInput | null>(null);

  const [floorError, setFloorError] = useState<any>('');
  const [stairsError, setStairsError] = useState<any>('');
  const [instructionsError, setInstructionNameError] = useState<any>('');

  const [addressTypeData, setAddressTypeData] = useState(addressType);
  const [addressTypeValue, setAddressTypeValue] = useState<string | null>('1');

  const handleSetAddressType = (item: any) => {
    setAddressTypeValue(item.value);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'floor') {
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
    // if (searchAddress.trim() === '') {
    //   flashMessageWarning(getTranslation('emptysearchaddress'));
    //   return;
    // } else
    if (floor.trim() === '') {
      setFloorError(getTranslation('emptyFloor'));
      return;
    } else if (!/^\d+$/.test(floor)) {
      setFloorError(getTranslation('invalidFloor'));
      return;
    } else if (stairs.trim() === '') {
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
      navigation.popTo(ScreenNames.ADDRESSLISTCONTAINER);
    }
  };

  const searchRef = useRef<any>(null);

  const handlePlaceSelect = async (place: any) => {
    console.log('call', place);
    // if (place && place.placeId) {
    //   toggleLoader(true);
    //   // console.log("Selected place:", JSON.stringify(place));
    //   searchRef.current?.clear();
    //   // setSearchText("");

    //   try {
    //     // Fetch place details to get lat/lng
    //     const response = await fetch(
    //       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&key=${googleApiKey}`
    //     );
    //     const data = await response.json();

    //     console.log("selectPlaceData", JSON.stringify(data));

    //     //Update Search Count API Call
    //     _updateCount();
    //     Keyboard.dismiss();
    //     toggleLoader(false);
    //     if (data.result && data.result.geometry) {
    //       const { lat, lng } = data.result.geometry.location;

    //       setLocationForLatLong({ lat, lng });

    //       // Update map region to the selected location
    //       const newRegion = {
    //         latitude: lat,
    //         longitude: lng,
    //         latitudeDelta: 0.001, // Adjust zoom level as needed
    //         longitudeDelta: 0.001,
    //       };

    //       // Update map region state
    //       setMapRegion(newRegion);

    //       // Animate map to the new location
    //       if (mapRef.current) {
    //         mapRef.current.animateToRegion(newRegion, 700); // 1000 ms animation duration
    //       }
    //       setLatitude(lat);
    //       setLongitude(lng);
    //       // _venueList(lat, lng);
    //       _eventList(lat, lng, 0);

    //       {
    //         subscriptionData?.is_subscription != 0  &&
    //           fetchNearbyAirports(lat, lng);
    //       }

    //       // {
    //       //   subscriptionData?.is_subscription != 0;
    //       //   _getNearByDriverApi(lat, lng);
    //       // }

    //       console.log("Latitude:", lat, "Longitude:", lng);
    //     } else {
    //       console.warn("Could not fetch lat/lng");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching place details:", error);
    //   }
    // }
  };

  const toggleisDefault = () => {
    setIsDefaultSave(!isdefaultsave);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          centerTitle={getTranslation('addresss')}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);
  return (
    <AddAddressComponent
      navigation={navigation}
      insets={insets}
      headerArray={headerArray}
      searchRef={searchRef}
      handlePlaceSelect={handlePlaceSelect}
      handleOnPressSaveAddress={handleOnPressSaveAddress}
      handleOnChangeText={handleOnChangeText}
      floor={floor}
      stairs={stairs}
      instructions={instructions}
      floorRef={floorRef}
      stairsRef={stairsRef}
      instructionRef={instructionRef}
      floorError={floorError}
      setFloorError={setFloorError}
      stairsError={stairsError}
      setStairsError={setStairsError}
      instructionsError={instructionsError}
      setInstructionNameError={setInstructionNameError}
      toggleisDefault={toggleisDefault}
      isdefaultsave={isdefaultsave}
      setAddressTypeValue={setAddressTypeValue}
      addressTypeValue={addressTypeValue}
      addressTypeData={addressTypeData}
      handleSetAddressType={handleSetAddressType}
      searchAddress={searchAddress}
      setSearchAddress={setSearchAddress}
      searchAddressError={searchAddressError}
      setSearchAddressError={setSearchAddressError}
    />
  );
};

export default AddAddressContainer;
