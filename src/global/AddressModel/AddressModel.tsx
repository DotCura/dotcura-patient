import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
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

const AddressModel = ({
  visible,
  addresses,
  selectedId,
  onSelect,
  onAddAddress,
  onClose,
}: any) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000060',
        }}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: getHeight(20),
            borderTopRightRadius: getHeight(20),
            height: '85%',
          }}
        >
          {/* Header */}
          <View style={styles.vwHeadingLine} />
          <View style={[styles.vwMainModelHeader]}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={onClose} // close modal
            >
              <Image source={images.imgLeftArrow} />
            </TouchableOpacity>

            <View>
              <Text
                style={[
                  constnatStyles.lblHeaderTitle,
                  {
                    letterSpacing: 0.2,
                  },
                ]}
                numberOfLines={2}
              >
                {getTranslation('address')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.vwSave}
              activeOpacity={activityOpacity}
              onPress={onClose}
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
                  style={[
                    styles.itemBox,
                    {
                      borderColor: isSelected ? Colors.blue1C : Colors.grayE7,
                      backgroundColor: isSelected
                        ? Colors.lightBlurE4
                        : Colors.white,
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
                    <View>
                      {/* Tick / Untick icon */}
                      <Image
                        source={
                          isSelected
                            ? images.imgSelectRadio
                            : images.imgUnselectRadio
                        }
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.itemTitle}>{item.title}</Text>

                      {item.subtitle ? (
                        <Text
                          style={[
                            styles.itemSubtitle,
                            {
                              color: isSelected ? Colors.blue1C : Colors.gray75,
                            },
                          ]}
                        >
                          {item.subtitle}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {/* Add Address Button */}
          <TouchableOpacity
            style={[
              styles.addBtn,
              {
                marginBottom:
                  insets.bottom > 0
                    ? insets.bottom
                    : insets.bottom + getHeight(16),
              },
            ]}
            onPress={onAddAddress}
          >
            <Image source={images.addblue} tintColor={Colors.white} />
            <Text style={styles.addBtnTxt}>
              {getTranslation('addaddresspopupbtn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddressModel;
