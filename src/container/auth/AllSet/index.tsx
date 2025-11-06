import React, { useState } from 'react';
import OrientationComponent from '../../../components/auth/Orientation';
import { images } from '../../../constants/Images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AllSetComponent from '../../../components/auth/AllSet';

const AllSetContainer = () => {
  const insets = useSafeAreaInsets()


 
  

 
 

  return (
    <AllSetComponent
    insets={insets}
    
    />
  );
};

export default AllSetContainer;

