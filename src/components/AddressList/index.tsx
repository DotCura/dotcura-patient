import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../constants/Styles';
import { styles } from './styles';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { activityOpacity } from '../../constants/GConstant';
import AppHeader from '../../global/Header';

const AddressListComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
       <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            // navigation.navigate(ScreenNames.PROFILECONTAINER);
            props.navigation.goBack();
          }}
          centerTitle={getTranslation('addresss')}
          dontShowStartBtn={false}
          showTitle={false}
          showSubTitle={false}
          showEndBtn={false}
        />
      {/* HeaderView */}
      <View style={styles.vwHeader}>
        <TitleSubtitle
          title={getTranslation('addresstitle')}
          subtitle={getTranslation('addressubtitle')}
        />
        <FlatList
          data={props.AddressData}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: getHeight(24),
            flexGrow: 1,
          }}
          renderItem={({ item }) => {
            const isSelected = props?.selectedAddress?.id === item.id;

            return (
              <TouchableOpacity
                activeOpacity={activityOpacity}
                style={[
                  styles.itemBox,
                  {
                    borderColor: isSelected ? Colors.blue002 : Colors.grayE7,
                    backgroundColor: Colors.white,
                  },
                ]}
                onPress={() => props.onSelectAddress(item)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: getWidth(12),
                  }}
                >
                  <View>
                    {/* Tick / Untick icon */}
                    {isSelected ? (
                      <Image
                        source={images.imgRadioBigSelected}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={images.imgRadioBigUnSelected}
                        tintColor={Colors.grayD8}
                      />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {isSelected && (
                        <Text style={styles.itemdefault}>
                          {getTranslation('default')}
                        </Text>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.itemSubtitle,
                        {
                          color: isSelected ? Colors.blue002 : Colors.gray75,
                        },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View
        style={{
          marginBottom: props.insets.bottom + getHeight(16),
          marginHorizontal: getWidth(16),
        }}
      >
        <CustomButton
          btnicon={true}
          btnImage={images.addblue}
          imgstyle={{ tintColor: Colors.white }}
          btnPress={props.handleOnPressAddAddress}
          btnTitle={getTranslation('addaddresspopupbtn')}
        />
      </View>
    </View>
  );
};

export default AddressListComponent;
