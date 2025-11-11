import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { act } from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../../constants/Styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { activityOpacity } from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';

const GetTestedComponent = (props: any) => {
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        { paddingHorizontal: 0, paddingBottom: getHeight(100) },
      ]}
    >
      {/* vwHeader */}
      <View style={{ paddingHorizontal: getWidth(16) }}>
        {props.searchVisible ? null : (
          <View style={[styles.vwMain, { paddingTop: props.insets.top + 10 }]}>
            <View style={styles.vwHeaderText}>
              <Text style={styles.lblHeaderTitle} numberOfLines={1}>
                {props.kitCount} {getTranslation('kitavailable')}
              </Text>
            </View>

            <View style={styles.vwHeaderRight}>
              <TouchableOpacity
                onPress={() => {
                  props.setSearchVisible(true);
                }}
                activeOpacity={activityOpacity}
                style={styles.vwHeaderbtn}
              >
                <Image source={images.imgSearchBlack} />
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() => {}}
                  activeOpacity={activityOpacity}
                  style={styles.vwHeaderbtn}
                >
                  <Image source={images.imgCartHome} />
                </TouchableOpacity>
                <View style={styles.vwTextCount}>
                  <Text style={styles.labelTextCount}>2</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {props.searchVisible ? (
          <View style={[styles.vwMain, { paddingTop: props.insets.top + 10 }]}>
            <View style={styles.vwTextinputIcon}>
              <Image source={images.imgSearchBlack} />
              <TextInput
                style={styles.textinputsearch}
                cursorColor={Colors.gray0F}
                selectionColor={Colors.gray0F}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.setSearchVisible(false);
              }}
              style={styles.btnClose}
              activeOpacity={activityOpacity}
            >
              <Image source={images.imgClose} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View style={{ marginTop: getHeight(24) }}>
        <FlatList
          onEndReached={() => {
            console.log('callend');
          }}
          numColumns={2}
          data={props.kitData}
          renderItem={props.renderKitData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            gap: getWidth(12),
            alignSelf: 'center',
            paddingBottom: getHeight(250),
          }}
        />
      </View>
    </View>
  );
};

export default GetTestedComponent;
