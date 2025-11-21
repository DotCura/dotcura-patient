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

const KitDetailsComponent = (props: any) => {
  return (
    <>
      <ScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* vwHeader */}
        <View style={styles.vwHeaderTitle}>
          <Text style={styles.kittitle}>Anaemia</Text>
          <Text style={styles.kitsubtitle}>
            9 {getTranslation('analytesinthekit')}
          </Text>
        </View>

        {/* vwwarning */}
        <View style={styles.vwwarningDetails}>
          <View style={{ alignSelf: 'flex-start', marginTop: getHeight(2) }}>
            <Image
              source={images.imgWarning}
              tintColor={Colors.black12}
            ></Image>
          </View>
          <View style={styles.vwInBank}>
            <Text style={styles.txtBankDetails} numberOfLines={1}>
              {getTranslation('betterinmorning')}
            </Text>
            <Text style={styles.txtWeCanNot} numberOfLines={5}>
              {getTranslation('betterinmorningsubtitle')}
            </Text>
          </View>
        </View>

        {/* vwTestList */}
        <View style={{ marginTop: getHeight(24) }}>
          <View style={styles.vwKitDeatils}>
            <Text style={styles.lblAnlaytics} numberOfLines={1}>
              {getTranslation('analytics')}
            </Text>
            <TouchableOpacity
              style={styles.btnSelectAll}
              activeOpacity={activityOpacity}
              onPress={props.selectAll}
            >
              <Image source={images.addblue} />
              <Text style={styles.lblSelectAll}>
                {props.selectedTests.length === props.kitsArrayData.length
                  ? getTranslation('selectall')
                  : getTranslation('desellectall')}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              onEndReached={() => {
                console.log('callend');
              }}
              data={props.kitsArrayData}
              renderItem={props.renderItemKitsData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                marginTop: getHeight(16),
                gap: getHeight(20),
              }}
            />
          </View>
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
      <TouchableOpacity
        style={[styles.vwGoToCart, { bottom: props.insets.bottom>0?props.insets.bottom:props.insets.bottom+getHeight(20) }]}
        activeOpacity={activityOpacity}
        onPress={props.handleNavigateCheckout}
      >
        <View style={styles.vwCartImage}>
          <Image source={images.imgCartHome} tintColor={Colors.white} />
          <Text style={styles.lblGoToCart}>{getTranslation('gotocart')}</Text>
        </View>
        <View style={styles.vwPrice}>
          {/* {props.selectedTests.length === props.kitsArrayData.length && (
            <Text style={styles.disprice}>{currency}0.54</Text>
          )} */}
          <Text style={styles.totalprice}>
            {currency}
            {props.totalPrice.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default KitDetailsComponent;
