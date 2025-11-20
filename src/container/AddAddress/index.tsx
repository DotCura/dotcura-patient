import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import AddAddressComponent from '../../components/AddAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';

const AddAddressContainer = ({navigation,route}:any) => {
  const insets = useSafeAreaInsets();

  const [headerArray, setHeaderArray] = useState([{ id: 1 }, { id: 2 }]);
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

  const handleNavigateConmpleAddress = () => {
    navigation.navigate(ScreenNames.COMPLETEADDRESSCONTAINER,{
      isfromcheckout:route?.params?.isfromcheckout
    })
  }
  return (
    <AddAddressComponent
      insets={insets}
      headerArray={headerArray}
      searchRef={searchRef}
      handlePlaceSelect={handlePlaceSelect}
      navigation={navigation}
      handleNavigateConmpleAddress={handleNavigateConmpleAddress}
    />
  );
};

export default AddAddressContainer;
