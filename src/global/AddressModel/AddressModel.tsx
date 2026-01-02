import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { activityOpacity } from '../../constants/GConstant';
import PrimaryTitleTextInput from '../PrimaryTitleTextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../Buttons';
import Modal from 'react-native-modal';

const AddressModel = ({
  visible,
  addresses,
  selectedId,
  onSelect,
  onAddAddress,
  onClose,
  onSave,
}: any) => {
  const insets = useSafeAreaInsets();
  const selectedItem = addresses.find((a: any) => a.id === selectedId);

  return (
    <Modal
      statusBarTranslucent
      useNativeDriverForBackdrop={true}
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0 }} // full-screen bottom sheet
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: Colors.whiteF2,
            borderTopLeftRadius: getHeight(20),
            borderTopRightRadius: getHeight(20),
            height: '90%',
          }}
        >
          {/* Header */}
          <View style={styles.vwHeadingLine} />

          <View style={styles.vwMainModelHeader}>
            <TouchableOpacity style={styles.btnBack} onPress={onClose}>
              <Image source={images.imgLeftArrow} />
            </TouchableOpacity>

            <View>
              <Text
                style={[constnatStyles.lblHeaderTitle, { letterSpacing: 0.2 }]}
                numberOfLines={2}
              >
                {getTranslation('address')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.vwSave}
              activeOpacity={activityOpacity}
              onPress={() => onSave(selectedItem)}
            >
              <Text style={styles.lblSave}>{getTranslation('save')}</Text>
            </TouchableOpacity>
          </View>

          {/* Address List */}
          <FlatList
            data={addresses}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: getWidth(16.5),
              marginTop: getHeight(24),
            }}
            renderItem={({ item }) => {
              const isSelected = selectedId === item.id;

              return (
                <TouchableOpacity
                  activeOpacity={activityOpacity}
                  style={[
                    styles.itemBox,
                    {
                      borderColor: isSelected ? Colors.blue002 : Colors.white,
                      backgroundColor: Colors.white,
                    },
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: getWidth(12),
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={
                        isSelected
                          ? images.imgRadioBigSelected
                          : images.imgRadioBigUnSelected
                      }
                    />

                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.itemTitle}>{item.title}</Text>

                        {isSelected && (
                          <Text style={styles.itemdefault}>
                            {getTranslation('default')}
                          </Text>
                        )}
                      </View>

                      {item.subtitle && (
                        <Text
                          style={[
                            styles.itemSubtitle,
                            {
                              color: isSelected
                                ? Colors.blue002
                                : Colors.gray75,
                            },
                          ]}
                        >
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {/* Bottom Buttons */}
          <View
            style={{
              marginBottom: insets.bottom + getHeight(10),
              marginHorizontal: getWidth(16),
            }}
          >
            <CustomButton
              btnImage={images.imgPlusBlack}
              btnicon
              imgstyle={{ tintColor: Colors.white }}
              btnPress={onAddAddress}
              btnTitle={getTranslation('addaddresspopupbtn')}
            />

            <CustomButton
              btnImage={images.pencilblue}
              btnicon
              style={{
                backgroundColor: Colors.blueD1,
                marginTop: getHeight(8),
              }}
              textStyle={{ color: Colors.blue002 }}
              btnTitle={getTranslation('editaddressbtn')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddressModel;
