import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { Colors } from '../../constants/Colors';
import { getHeight } from '../../constants/utils/Dimensions';
import { activityOpacity, currency } from '../../constants/GConstant';
import AppHeader from '../../global/Header';
import PressScale from '../../global/PressScale';

const AnalitiDetailsComponent = (props: any) => {
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        centerTitle={getTranslation('analititextdetails')}
        showTitle={true}
        showSubTitle={false}
        showEndBtn={false}
      />
      <ScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imgkitdetails}>
          <View style={styles.vwHeaderTitle}>
            <Image
              source={{ uri: props?.analitiArrayData?.kit_image }}
              style={{
                height: getHeight(64),
                aspectRatio: 1,
                borderRadius: 10,
              }}
            />
            <Text style={styles.kittitle}>{props?.analitiArrayData?.name}</Text>
            <Text style={styles.kitsubtitle}>
              {props?.analitiArrayData?.tests?.length}{' '}
              {getTranslation('analititextdetails')}
            </Text>
          </View>
        </View>

        {/* vwTestList */}
        <View>
          <FlatList
            onEndReached={() => {
              console.log('callend');
            }}
            bounces={false}
            data={props?.analitiArrayData?.tests}
            renderItem={props.renderItemAnalitiData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.test_id.toString()}
            contentContainerStyle={{
              marginTop: getHeight(31),
              gap: getHeight(20),
            }}
          />
        </View>

        {/* vwInfoView */}
        <View
          style={{
            marginTop: getHeight(30),
            gap: getHeight(8),
            marginBottom: props.insets.bottom + getHeight(100),
          }}
        >
          <View style={styles.vwInfo1}>
            <View style={styles.vwInBank}>
              <Text style={styles.txtBankDetails} numberOfLines={1}>
                {getTranslation('usefullif')}
              </Text>
              <Text style={styles.txtinfo1Subtitle} numberOfLines={5}>
                {getTranslation('usefullifsubtitle1')}{' '}
                <Text style={styles.txtinfo1SubtitleBold}>
                  {getTranslation('usefullifsubtitle2')},
                  {getTranslation('usefullifsubtitle3')}
                </Text>{' '}
                {getTranslation('usefullifsubtitle4')}{' '}
                <Text style={styles.txtinfo1SubtitleBold}>
                  {getTranslation('usefullifsubtitle5')}
                </Text>
                {getTranslation('usefullifsubtitle6')}
              </Text>
            </View>
          </View>
          <View style={styles.vwInfo2}>
            <View style={styles.vwInBank}>
              <Text style={styles.txtBankDetails} numberOfLines={1}>
                {getTranslation('howtoprepare')}
              </Text>
              <Text style={styles.txtlablinfo2} numberOfLines={5}>
                {getTranslation('howtopreparesubtitle1')}
                <Text style={styles.txtinfo1SubtitleBold}>
                  {getTranslation('howtopreparesubtitle2')}
                </Text>
                {getTranslation('howtopreparesubtitle3')}{' '}
                <Text style={styles.txtinfo1SubtitleBold}>
                  {getTranslation('howtopreparesubtitle4')}
                </Text>
                {getTranslation('howtopreparesubtitle5')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* vwGotoCart */}
      <PressScale onPress={props.handleNavigateCheckout}>
        <View
          style={[
            styles.vwGoToCart,
            {
              bottom: getHeight(30),
            },
          ]}
        >
          <View style={styles.vwCartImage}>
            <Image source={images.imgCartHome} tintColor={Colors.white} />
            <Text style={styles.lblGoToCart}>
              {getTranslation('addtoorder')} ({props.selectedTests.length})
            </Text>
          </View>
          <View style={styles.vwPrice}>
            <Text style={styles.totalprice}>
              {currency} {props?.totalPriceanaliti?.toFixed(2)}
            </Text>
          </View>
        </View>
      </PressScale>
    </>
  );
};

export default AnalitiDetailsComponent;
