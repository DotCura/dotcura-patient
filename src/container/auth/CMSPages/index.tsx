import { useEffect } from 'react';
import AppHeader from '../../../global/Header';
import { View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import CMSPagesComponent from '../../../components/auth/CMSPages';

const CMSPagesContainer = ({ navigation, route }: any) => {
  const header = () => {
    navigation.setOptions({
      header: () => (
        <View style={{ backgroundColor: Colors.whiteF2 }}>
          <AppHeader
            startBtnOnPress={() => {
              navigation.goBack();
            }}
            dontShowStartBtn={false}
            showTitle={false}
            showSubTitle={false}
            showEndBtn={false}
          />
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);
  return <CMSPagesComponent cmsUrl={route?.params?.cmsUrl} />;
};
export default CMSPagesContainer;
