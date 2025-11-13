import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { constnatStyles } from '../../../constants/Styles';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { ZustandStores } from '../../../store';
import { styles } from './styles';
import { activityOpacity } from '../../../constants/GConstant';
import { images } from '../../../constants/Images';
import { getTranslation } from '../../../localization/i18n/i18n.config';

const YourProfileComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();
  return (
    <View
      style={[
        constnatStyles.vwContainer,
        {
          paddingHorizontal: 0,
        },
      ]}
    >
      {/* vwHeader */}
      <View style={{}}>
        <View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.vwHeaderText}
            activeOpacity={activityOpacity}
          >
            <Text style={styles.lblHeaderTitle} numberOfLines={1}>
              Hello Giovanni!
            </Text>
            <Image
              source={images.imgLeftArrow}
              style={{
                transform: [{ rotate: '270deg' }], // Rotates the box by 45 degrees clockwise
              }}
            />
          </TouchableOpacity>

          <View style={styles.vwHeaderRight}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={activityOpacity}
              style={[styles.vwHeaderbtnSearch]}
            >
              <Image source={images.imgSearchBlack} />
              <Text style={styles.lblSearchProfile}>
                {getTranslation('searchprofile')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={activityOpacity}
              style={styles.vwHeaderbtn}
            >
              <Image source={images.imgCartHome} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* scrollContent */}
      <ScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          {
            paddingHorizontal: 0,
            paddingBottom: getHeight(250),
          },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={{ marginTop: getHeight(24) }}>
          <Text style={styles.latestanlaysis}>
            {getTranslation('latestanalysis')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default YourProfileComponent;
