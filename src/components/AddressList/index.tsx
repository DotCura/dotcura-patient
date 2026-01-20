import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { styles } from './styles';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import {
  activityOpacity,
  flashMessageWarning,
} from '../../constants/GConstant';
import AppHeader from '../../global/Header';

const AddressListComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
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

        {props.AddressData.length === 0 && props.isLoading === false ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: getHeight(20),
            }}
          >
            <Image source={images.imgNoDataFoundAddress} />
            <Text style={styles.lblNoAddressFound}>
              {getTranslation('noaddressfoundlabel')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={props.AddressData}
            keyExtractor={item => item.address_id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: getHeight(24),
              flexGrow: 1,
            }}
            renderItem={({ item }) => {
              const isSelected =
                props?.selectedAddress?.address_id === item.address_id;

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
                        <Text style={styles.itemTitle} numberOfLines={1}>
                          {item.title}
                        </Text>
                        {item.is_default === 1 && (
                          <Text style={styles.itemdefault}>
                            {getTranslation('default')}
                          </Text>
                        )}
                        {/* <View style={styles.vwDeleteAddressIcon}>
                        <TouchableOpacity activeOpacity={activityOpacity}>
                          <Image
                            source={images.imgDeleteAddress}
                            style={styles.imgDeleteIcon}
                          ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={activityOpacity}
                          onPress={() => {
                            props.handleOnPressEditAddress(item);
                          }}
                        >
                          <Image
                            source={images.imgEditAddress}
                            style={styles.imgEditIcon}
                          ></Image>
                        </TouchableOpacity>
                      </View> */}
                      </View>

                      <Text
                        style={[
                          styles.itemSubtitle,
                          {
                            color: isSelected ? Colors.blue002 : Colors.gray75,
                          },
                        ]}
                      >
                        {item.address}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
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
        <CustomButton
          btnicon={true}
          btnImage={images.pencilblue}
          style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(8) }}
          imgstyle={{ tintColor: Colors.blue002 }}
          textStyle={{ color: Colors.blue002 }}
          btnPress={() => {
            if (!props.selectedAddress) {
              flashMessageWarning(getTranslation('please_select_address'));
              return;
            }
            props.handleOnPressEditAddress(props.selectedAddress);
          }}
          btnTitle={getTranslation('editaddressbtn')}
        />
      </View>
    </View>
  );
};

export default AddressListComponent;
