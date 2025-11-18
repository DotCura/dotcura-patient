import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { images } from '../../constants/Images';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { getInitials, getInitialsTwoDigit } from '../../constants/GConstant';
import { fontSize } from '../../constants/FontSizes';
import { constnatStyles } from '../../constants/Styles';

const ProfileComponent = (props: any) => {
  const Item = ({ item, onPress }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}
    >
      <Image source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  const ItemTwo = ({ item, onPress }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item)}
    >
      {/* <Image source={item.image} /> */}
      <Text style={[styles.title, { marginLeft: getWidth(28) }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator={false}
      bounces={true}
      contentContainerStyle={[
        constnatStyles.keyboardContainer,
        { paddingHorizontal: 0 },
      ]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      {/* vwProfile */}
      <View style={styles.vwProfile}>
        <View style={styles.vwName}>
          <Text style={styles.txtFirstCharacter}>
            {getInitialsTwoDigit(props.fullName)}
          </Text>
          <View style={styles.vwInsta}>
            <Image source={images.imginsta}></Image>
          </View>
        </View>
        <View style={styles.vwNameDate}>
          <Text style={styles.txtFullName}>{props.fullName}</Text>
          <Text style={styles.txtMember}>
            {getTranslation('membersince') + ' ' + props.memberSince}
          </Text>
        </View>
      </View>

      <View style={styles.vwAvabilityWorkArea}>
        <TouchableOpacity
          onPress={props.onPressDisponia}
          style={styles.vwAvablity}
        >
          <View style={styles.vwInAva}>
            <Image source={images.imgUserProfile}></Image>
          </View>
          <Text style={styles.txtAvability}>{getTranslation('personal')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.vwAvablity}>
          <View style={styles.vwInAva}>
            <Image source={images.imgFamily}></Image>
          </View>
          <Text style={styles.txtAvability}>{getTranslation('family')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.vwLatestValue]}>
        <View style={{ marginHorizontal: getWidth(16) }}>
          <Text style={styles.lblLatestValue}>
            {getTranslation('favourite')}
          </Text>
        </View>

        {/* vwFavourites */}
        <View>
          <FlatList
            onEndReached={() => {
              console.log('callend');
            }}
            data={props.recommandAnalysisData}
            renderItem={props.renderRecommandAnlaysisData}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              gap: getWidth(12),
              paddingLeft: getWidth(16),
              paddingRight: getWidth(16),
            }}
          />
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={props.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Item item={item} onPress={() => {}} />}
        />
      </View>

      <TouchableOpacity style={styles.vwSupport} onPress={() => {}}>
        <Image source={images.imgHelpProfile} />
        <Text style={styles.title}>{getTranslation('supportprofile')}</Text>
      </TouchableOpacity>

      <View style={[styles.containerTwo]}>
        <FlatList
          scrollEnabled={false}
          data={props.dataTwo}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ItemTwo item={item} onPress={() => {}} />}
        />
      </View>
      <View style={{ marginHorizontal: getWidth(16) }}>
        <CustomButton
          style={{ backgroundColor: Colors.redFD, marginTop: getHeight(16) }}
          textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
          btnPress={props.handlePressLoginFun}
          btnTitle={getTranslation('exit')}
        />

        <CustomButton
          btnImage={images.imgDeleteRed}
          btnicon={true}
          style={{ backgroundColor: Colors.white, marginTop: getHeight(10) }}
          textStyle={{ color: Colors.red40, fontSize: fontSize.size16 }}
          btnPress={props.handlePressLoginFun}
          btnTitle={getTranslation('deleteaccountanddata')}
        />
      </View>

      <Text
        style={[
          styles.txttitle,
          { marginBottom: props.insets.bottom + getHeight(15) },
        ]}
      >
        {'Versione: v3.4.5 (1111)'}
      </Text>
    </ScrollView>
  );
};

export default ProfileComponent;
