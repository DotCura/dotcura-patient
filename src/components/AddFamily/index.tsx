import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import AppHeader from '../../global/Header';
import PressScale from '../../global/PressScale';

const AddFamilyComponent = (props: any) => {
  const renderListFooter = () => {
    return (
      <PressScale onPress={props.handleNavigateFamilyMember}>
        <View style={styles.addBtn}>
          <Image source={images.imgPlusDark} />
          <Text style={styles.addText}>{getTranslation('addfamilybtn')}</Text>
        </View>
      </PressScale>
    );
  };
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          paddingHorizontal: 0,
        },
      ]}
    >
      <AppHeader
        startBtnOnPress={() => {
          console.log('hy');
          props.navigation.goBack();
        }}
        dontShowStartBtn={false}
        showTitle={true}
        showSubTitle={false}
        showEndBtn={false}
        centerTitle={getTranslation('family')}
      />

      <FlatList
        onEndReached={props.familyMemberList.loadMore}
        onEndReachedThreshold={0.5}
        refreshing={props.familyMemberList.refreshing}
        onRefresh={props.familyMemberList.refresh}
        ListFooterComponent={() =>
          props.familyMembersData?.length > 0 ? (
            <>
              {props.familyMemberList.loadingMore && (
                <ActivityIndicator
                  size="large"
                  color={Colors.blue002}
                  style={{ marginVertical: getHeight(20) }}
                />
              )}

              {renderListFooter()}
            </>
          ) : null
        }
        ListEmptyComponent={
          !props.familyMemberList.loading &&
          !props.familyMemberList.refreshing ? (
            <View style={styles.vwEmpty}>
              <Image
                source={images.imgFamilyEmpty}
                style={{ marginVertical: getHeight(76), alignSelf: 'center' }}
              />
              <View
                style={{ marginHorizontal: getWidth(7), gap: getHeight(2) }}
              >
                <Text style={styles.emptyTitle} numberOfLines={1}>
                  {getTranslation('emptyaddfamilytitle')}
                </Text>
                <Text style={styles.emptySubtitle} numberOfLines={5}>
                  {getTranslation('emptyaddfamilysubtitle')}
                </Text>
              </View>
              <CustomButton
                btnPress={props.handleNavigateFamilyMember}
                btnTitle={getTranslation('addfamilybtn')}
                style={{
                  backgroundColor: Colors.blueD1,
                }}
                textStyle={{
                  color: Colors.blue002,
                  fontsfamily: fontsfamily.gmedium,
                }}
              />
            </View>
          ) : null
        }
        data={props.familyMembersData}
        renderItem={props.renderItemFamilyMember}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          gap: getHeight(15),
          marginHorizontal: getWidth(16),
          marginTop: getHeight(24),
        }}
      />
    </View>
  );
};

export default AddFamilyComponent;
