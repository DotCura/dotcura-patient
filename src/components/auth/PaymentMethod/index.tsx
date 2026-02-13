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
import {
  activityOpacity,
  flashMessageSucess,
} from '../../../constants/GConstant';
import { fontSize } from '../../../constants/FontSizes';
import { CustomerSheet } from '@stripe/stripe-react-native';

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
              // marginBottom: getHeight(39),
            }}
          >
            <TitleSubtitle
              title={getTranslation('paymentmethodtitle')}
              subtitle={getTranslation('paymentmethodsubtitle')}
            />
          </View>
          {props.cardData.length !== 0 && (
            <View style={{ marginTop: getHeight(39) }}>
              <ModalTitleSubtitle
                title={getTranslation('savedcards')}
                subtitle={getTranslation('savedcardssubtitle')}
              />
            </View>
          )}
          <View>
            <FlatList
              data={props.cardData}
              keyExtractor={item => item.stripe_payment_method_id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                marginHorizontal: getWidth(15),
                marginTop: getHeight(24),
              }}
              renderItem={({ item }) => {
                const isSelected =
                  props.defaultType === '4' && item.is_default === 1;
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
                    // onPress={() => {
                    //   props.setSelectedCards(item);
                    //   props.setSelectedPays(null);
                    // }}
                    onPress={() => {
                      props._setDefaultCardApi('4', item.card_id.toString());
                    }}
                  >
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
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
                            •••• {item.last4}
                          </Text>

                          {item.brand ? (
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
                              {item.brand}
                            </Text>
                          ) : null}
                        </View>
                      </View>
                      <TouchableOpacity
                        activeOpacity={activityOpacity}
                        onPress={() => {
                          props._deleteCard(item.card_id);
                        }}
                      >
                        <Image source={images.imgDelete} />
                      </TouchableOpacity>
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
                  console.log(
                    typeof props.defaultType,
                    typeof item.id,
                    'props.defaultType',
                  );

                  const isSelected =
                    props.cardData[0]?.default_payment_method ===
                    item.id.toString();

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
                      // onPress={() => {
                      //   props._setDefaultCardApi(item.id.toString(), null);
                      // }}
                      onPress={() => {
                        flashMessageSucess(getTranslation('indevelopment'));
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
        {/* <CustomButton
          btnicon={false}
          style={{ backgroundColor: Colors.blueD1, marginTop: getHeight(8) }}
          textStyle={{ color: Colors.blue002, fontSize: fontSize.size16 }}
          btnTitle={getTranslation('edit')}
          //   btnPress={props.handlePressAddCardProfile}
        /> */}
      </View>

      {props.showCustomerSheet && (
        <CustomerSheet.Component
          visible={props.showCustomerSheet}
          customerId={props.stripeCustomerId}
          customerEphemeralKeySecret={props.stripeEphemeralKey}
          merchantDisplayName="DotCura"
          onResult={(result: any) => {
            console.log('result', result);
            // 🔥 ALWAYS CLOSE SHEET
            props.setShowCustomerSheet(false);
            if (result.error) {
              console.log('CustomerSheet Error:', result.error);
              props.setShowCustomerSheet(false);
              props._getCardList();
              return;
            }

            if (result.paymentMethod?.id) {
              props._addCardapi(result.paymentMethod?.id);
              console.log('Selected PM ID:', result.paymentMethod.id);
            }
            props._getCardList();
          }}
        />
      )}
    </>
  );
};

export default PaymentMethodComponent;
