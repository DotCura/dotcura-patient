import { View } from 'react-native';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import { Colors } from '../../../constants/Colors';
const CMSPagesComponent = (props: any) => {
  return (
    <View style={styles.vwMain}>
      <WebView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: Colors.whiteF2 }}
        source={{ uri: props.cmsUrl }}
      />
    </View>
  );
};

export default CMSPagesComponent;
