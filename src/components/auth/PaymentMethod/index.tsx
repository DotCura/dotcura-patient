import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../../constants/Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import ModalTitleSubtitle from '../../../global/TitleSubtitleModel';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import { images } from '../../../constants/Images';
import CustomButton from '../../../global/Buttons';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { activityOpacity } from '../../../constants/GConstant';
import { fontSize } from '../../../constants/FontSizes';

const PaymentMethodComponent = (props: any) => {
  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: 0,
            paddingBottom: getHeight(123),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: getHeight(26), flex: 1 }}>
          <View
            style={{
              marginHorizontal: getWidth(15),
              marginBottom: getHeight(39),
            }}
          >
            <TitleSubtitle
              title={getTranslation('paymentmethodtitle')}
              subtitle={getTranslation('paymentmethodsubtitle')}
            />
          </View>
          <ModalTitleSubtitle
            title={getTranslation('savedcards')}
            subtitle={getTranslation('savedcardssubtitle')}
          />
          <View>
            <FlatList
              data={props.cardData}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: getWidth(15),
                marginTop: getHeight(24),
              }}
              renderItem={({ item }) => {
                const isSelected = props?.selectedCards?.id === item.id;

                return (
                  <TouchableOpacity
                    style={[
                      styles.itemBox,
                      {
                        borderColor: isSelected
                          ? Colors.blue002
                          : Colors.grayE7,
                        backgroundColor: Colors.white,
                      },
                    ]}
                    activeOpacity={activityOpacity}
                    onPress={() => {
                      props.setSelectedCards(item);
                      props.setSelectedPays(null);
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: getWidth(12),
                          flex: 1,
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
                          <Text style={styles.itemTitle} numberOfLines={1}>
                            {item.title}
                          </Text>

                          {item.subtitle ? (
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
                          ) : null}
                        </View>
                      </View>
                      <Image
                        source={item.images}
                        style={{ alignSelf: 'center' }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ marginTop: getHeight(24) }}>
            <ModalTitleSubtitle
              title={getTranslation('paymentmethodmodel')}
              subtitle={''}
            />
            <View>
              <FlatList
                data={props.payData}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  marginHorizontal: getWidth(16.5),
                  marginTop: getHeight(24),
                }}
                renderItem={({ item }) => {
                  const isSelected = props?.selectedPays?.id === item.id;

                  return (
                    <TouchableOpacity
                      activeOpacity={activityOpacity}
                      style={[
                        styles.itemBox,
                        {
                          borderColor: isSelected
                            ? Colors.blue002
                            : Colors.grayE7,
                          backgroundColor: Colors.white,
                        },
                      ]}
                      onPress={() => {
                        props.setSelectedCards(null);
                        props.setSelectedPays(item);
                      }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: getWidth(12),
                            flex: 1,
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
                            <Text style={styles.itemTitle} numberOfLines={1}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                        <Image source={item.images} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginHorizontal: getWidth(16),
          marginTop: getHeight(20),
          marginBottom: props.insets.bottom + getHeight(16),
        }}
      >
        <CustomButton
          btnicon={true}
          btnImage={images.imgPlusBlack}
          imgstyle={{ tintColor: Colors.white }}
          btnTitle={getTranslation('addcardtext')}
          btnPress={props.handlePressAddCardProfile}
        />
        <CustomButton
          btnicon={false}
          style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(8) }}
          textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
          btnTitle={getTranslation('edit')}
          //   btnPress={props.handlePressAddCardProfile}
        />
      </View>
    </>
  );
};

export default PaymentMethodComponent;
