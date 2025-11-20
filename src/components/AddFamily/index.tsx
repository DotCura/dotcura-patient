import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { styles } from './styles';
import { images } from '../../constants/Images';
import { activityOpacity } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import { Colors } from '../../constants/Colors';

const AddFamilyComponent = (props: any) => {
  const renderListFooter = () => {
    return (
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={activityOpacity}
        onPress={props.handleNavigateFamilyMember}
      >
        <Image source={images.addblue} />
        <Text style={styles.addText}>Aggiungi familiare</Text>
      </TouchableOpacity>
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
      {/* vwEmpty */}
      {props.showEmpty && (
        <View style={styles.vwEmpty}>
          <View style={{ marginHorizontal: getWidth(7), gap: getHeight(2) }}>
            <Text style={styles.emptyTitle} numberOfLines={1}>
              {getTranslation('emptyaddfamilytitle')}
            </Text>
            <Text style={styles.emptySubtitle} numberOfLines={5}>
              {getTranslation('emptyaddfamilysubtitle')}
            </Text>
          </View>
          <CustomButton
            btnPress={() => props.setShowEmpty(false)}
            btnTitle={getTranslation('addfamilybtn')}
            style={{
              backgroundColor: Colors.lightBlurE4,
            }}
            textStyle={{ color: Colors.blue17 }}
          />
        </View>
      )}
      {props.showEmpty == false && (
        <FlatList
          data={props.familyMembersData}
          renderItem={props.renderItemFamilyMember}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            gap: getHeight(15),
            marginHorizontal: getWidth(16),
            marginTop: getHeight(24),
          }}
          ListFooterComponent={renderListFooter}
        />
      )}
    </View>
  );
};

export default AddFamilyComponent;
