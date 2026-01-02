import { Image, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import { images } from '../../constants/Images';

const CustomSplash = ({}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#DEEDF4' }}>
      <Video
        source={images.splashvideo}
        style={{ flex: 1, backgroundColor: '#DEEDF4' }}
        resizeMode="none"
      />
    </View>
  );
};

export default CustomSplash;

