import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import CustomButton from '../../global/Buttons';
import AppHeader from '../../global/Header';

const FavouritesComponent = (props: any) => {
  return (
    <>
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={false}
        showSubTitle={false}
        showEndBtn={false}
      />
      <View style={constnatStyles.vwContainer}>
        {/* favtitlesubtitle */}
        <View style={{ marginTop: getHeight(23), marginBottom: getHeight(26) }}>
          <TitleSubtitle
            title={getTranslation('favtitle')}
            subtitle={getTranslation('favsubtitle')}
          />
        </View>

        <FlatList
          onEndReached={props.favourites.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={props.favourites.refreshing}
          onRefresh={props.favourites.refresh}
          ListFooterComponent={
            props.favourites.loadingMore ? (
              <ActivityIndicator size="large" color={Colors.blue002} />
            ) : null
          }
          ListEmptyComponent={
            !props.favourites.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: getHeight(20),
                  marginTop: getHeight(100),
                }}
              >
                <Image source={images.imgNoDataFoundAddress} />
                <Text style={styles.lblNoAddressFound}>
                  {getTranslation('nodatafoundlikereport')}
                </Text>
              </View>
            ) : null
          }
          style={{ flex: 1 }}
          data={props.kitFavData}
          renderItem={props.renderFavKitData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.test.id}
          contentContainerStyle={{
            gap: getWidth(12),
            paddingBottom: getHeight(50),
          }}
        />

        <Modal
          transparent={true}
          animationType="slide"
          visible={props.showDeleteModel}
          statusBarTranslucent={true}
          onRequestClose={props.funCloseDeleteModel}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#00000060',
            }}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={props.funCloseDeleteModel}
            />

            <View
              style={{
                backgroundColor: Colors.white,
                borderTopLeftRadius: getHeight(20),
                borderTopRightRadius: getHeight(20),
                maxHeight: '90%',
              }}
            >
              {/* Header */}
              <View style={styles.vwHeadingLine} />

              {/* backbtn */}
              <View style={[styles.vwMainModelHeader]}>
                <TouchableOpacity
                  style={styles.btnBack}
                  onPress={props.funCloseDeleteModel} // close modal
                >
                  <Image source={images.imgLeftArrow} />
                </TouchableOpacity>
              </View>

              {/* title */}
              <Text style={styles.lblunfavtitle} numberOfLines={1}>
                {getTranslation('unfavconfirmationtitle')}
              </Text>
              <View
                style={{
                  paddingHorizontal: getWidth(16),
                  paddingBottom: props.insets.bottom + getHeight(16),
                }}
              >
                <CustomButton
                  style={{
                    backgroundColor: Colors.redFC,
                    marginTop: getHeight(41),
                  }}
                  textStyle={{ color: Colors.red40 }}
                  btnPress={props.handlePressUnfav}
                  btnTitle={getTranslation('confirmationdelete')}
                />
                <CustomButton
                  style={{
                    backgroundColor: Colors.blueD1,
                    marginTop: getHeight(8),
                  }}
                  textStyle={{ color: Colors.blue002 }}
                  btnPress={props.funCloseDeleteModel}
                  btnTitle={getTranslation('canclefav')}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default FavouritesComponent;
