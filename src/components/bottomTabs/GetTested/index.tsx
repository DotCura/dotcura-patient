import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { constnatStyles } from '../../../constants/Styles';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { activityOpacity } from '../../../constants/GConstant';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { Colors } from '../../../constants/Colors';
import { fontsfamily } from '../../../constants/FontFamily';
import { ZustandStores } from '../../../store';
import CustomButton from '../../../global/Buttons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const GetTestedComponent = (props: any) => {
  const { orderStatus } = ZustandStores.OrderstatusStore();

  const searchAnim = useSharedValue(0); // 0 = header, 1 = search

  React.useEffect(() => {
    searchAnim.value = withTiming(props.searchVisible ? 1 : 0, {
      duration: 300, // 0.3s
      easing: Easing.bezier(0.22, 0.68, 0.01, 0.99),
    });
  }, [props.searchVisible]);

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: 1 - searchAnim.value,
    transform: [
      {
        translateX: -searchAnim.value * ScreenDimensions.screenWidth,
      },
    ],
  }));

  const searchAnimStyle = useAnimatedStyle(() => ({
    opacity: searchAnim.value,
    transform: [
      {
        translateX: (1 - searchAnim.value) * ScreenDimensions.screenWidth,
      },
    ],
  }));

  return (
    <View style={[constnatStyles.vwContainer, { paddingHorizontal: 0 }]}>
      {/* vwHeader */}
      <View>
        {/* NORMAL HEADER */}
        <Animated.View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
              position: 'absolute',
              // width: '100%',
            },
            headerAnimStyle,
          ]}
          pointerEvents={props.searchVisible ? 'none' : 'auto'}
        >
          <View style={styles.vwHeaderText}>
            <Text style={styles.lblHeaderTitle} numberOfLines={1}>
              {getTranslation('analysistext')}
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

            <TouchableOpacity
              onPress={props.handleNavigateCheckout}
              activeOpacity={activityOpacity}
              style={styles.vwHeaderbtn}
            >
              <Image source={images.imgCartHome} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* SEARCH HEADER */}
        <Animated.View
          style={[
            styles.vwMain,
            {
              paddingTop:
                orderStatus == '' ? props.insets.top + 10 : getHeight(25),
            },
            searchAnimStyle,
          ]}
          pointerEvents={props.searchVisible ? 'auto' : 'none'}
        >
          <View style={styles.vwTextinputIcon}>
            <Image source={images.imgSearchBlack} />
            <TextInput
              style={styles.textinputsearch}
              cursorColor={Colors.gray0F}
              selectionColor={Colors.gray0F}
              autoFocus={props.searchVisible}
              value={props.searchHistory}
              onChangeText={(text: any) => {
                props.setSeachHistory(text);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              props.setSearchVisible(false);
              props.setSeachHistory('');
            }}
            style={styles.btnClose}
            activeOpacity={activityOpacity}
          >
            <Image source={images.imgClose} tintColor={Colors.blue002} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* vwCheckupAnaliti */}
      <View style={styles.vwCheckupAnaliti}>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          onPress={() => props.setSelectedTab('checkup')}
          style={[
            styles.btncheckup,
            {
              backgroundColor:
                props.selectedTab === 'checkup'
                  ? Colors.blue002
                  : Colors.grayE7,
            },
          ]}
        >
          <Image
            source={images.imgCartHome}
            style={{
              resizeMode: 'contain',
              tintColor:
                props.selectedTab === 'checkup' ? Colors.white : Colors.blue002,
            }}
          />
          <Text
            style={[
              styles.lblCheckup,
              {
                fontFamily: fontsfamily.gmedium,

                color:
                  props.selectedTab === 'checkup'
                    ? Colors.white
                    : Colors.blue002,
              },
            ]}
          >
            {getTranslation('checkuptext')} ({props.checkupcount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          onPress={() => props.setSelectedTab('analiti')}
          style={[
            styles.btnAnlaiti,
            {
              backgroundColor:
                props.selectedTab === 'analiti'
                  ? Colors.blue002
                  : Colors.grayE7,
            },
          ]}
        >
          <Image
            source={images.imgCartHome}
            style={{
              resizeMode: 'contain',
              tintColor:
                props.selectedTab === 'analiti' ? Colors.white : Colors.blue002,
            }}
          />
          <Text
            style={[
              styles.lblAnaliti,
              {
                fontFamily: fontsfamily.gmedium,
                color:
                  props.selectedTab === 'analiti'
                    ? Colors.white
                    : Colors.blue002,
              },
            ]}
          >
            {getTranslation('analitiheadertext')} ({props.analiticount})
          </Text>
        </TouchableOpacity>
      </View>

      {props.selectedTab === 'checkup' ? (
        <FlatList
          key={'checkup-2'}
          onEndReached={props.checkup.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={props.checkup.refreshing}
          onRefresh={props.checkup.refresh}
          ListFooterComponent={
            props.checkup.loadingMore ? (
              <ActivityIndicator size="large" color={Colors.blue002} />
            ) : null
          }
          ListEmptyComponent={
            !props.checkup.loading ? (
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
                  {getTranslation('nocheckoutlistfound')}
                </Text>
              </View>
            ) : null
          }
          numColumns={2}
          data={props.kitData}
          renderItem={props.renderKitData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            gap: getWidth(12),
            marginTop: getHeight(20),
            alignSelf: 'center',
            paddingBottom: getHeight(150),
          }}
        />
      ) : (
        <FlatList
          onEndReached={props.analiti.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={props.analiti.refreshing}
          onRefresh={props.analiti.refresh}
          ListFooterComponent={
            props.analiti.loadingMore ? (
              <ActivityIndicator size="large" color={Colors.blue002} />
            ) : null
          }
          ListEmptyComponent={
            !props.analiti.loading ? (
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
                  {getTranslation('noAnlitilistfound')}
                </Text>
              </View>
            ) : null
          }
          key={'analiti-1'}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          data={props.analitiData}
          renderItem={props.renderAnalitiData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: getWidth(12),
            paddingBottom: getHeight(150),
            marginTop: getHeight(20),
          }}
        />
      )}

      {/* filterModel */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={props.isFilterModelVisible}
        statusBarTranslucent={true}
        onRequestClose={props.handleFunCloseFilterModel}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000060',
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={props.handleFunCloseFilterModel}
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
            <View style={[styles.vwMainModelHeader]}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={props.funCloseCancleOrder} // close modal
              >
                <Image source={images.imgLeftArrow} />
              </TouchableOpacity>
              <View>
                <Text
                  style={[
                    constnatStyles.lblHeaderTitle,
                    {
                      letterSpacing: 0.2,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {getTranslation('filter')}
                </Text>
              </View>

              <Image source={images.imgDelete} style={{ opacity: 0 }} />
            </View>
            <View
              style={{
                marginHorizontal: getWidth(16),
                marginTop: getHeight(25),
                gap: getHeight(24),
              }}
            >
              {/* Categories */}
              <View>
                <Text style={styles.heading}>Categories</Text>
                <View style={styles.row}>
                  {props.categoryData.map((item: any) => {
                    const isSelected = props.selectedCategories.includes(
                      item.id,
                    );
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => props.toggleCategory(item.id)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextSel,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View>
                {/* Gender */}
                <Text style={styles.heading}>Gender</Text>
                <View style={styles.row}>
                  {props.genderData.map((item: any) => {
                    const isSelected = props.selectedGender === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => props.toggleGender(item.id)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextSel,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View>
                {/* Age */}
                <Text style={styles.heading}>Age</Text>
                <View style={styles.row}>
                  {props.ageData.map((item: any) => {
                    const isSelected = props.selectedAge === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => props.toggleAge(item.id)}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            isSelected && styles.chipTextSel,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>

            {/* Apply Button
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>
                {props.totalFilters > 0
                  ? `Apply ${props.totalFilters} filters`
                  : 'Apply'}
              </Text>
            </TouchableOpacity>

            Reset
            <TouchableOpacity onPress={props.resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity> */}
            <View
              style={{
                marginHorizontal: getWidth(16),
                marginTop: getHeight(164),
                marginBottom: props.insets.bottom + getHeight(16),
              }}
            >
              <CustomButton
                btnTitle={
                  props.totalFilters > 0
                    ? `Apply ${props.totalFilters} filters`
                    : 'Apply'
                }
                btnPress={props.handleFunCloseFilterModel}
              />
              <CustomButton
                btnTitle={'Reset'}
                style={{ backgroundColor: Colors.white }}
                textStyle={{ color: Colors.gray0F }}
                btnPress={props.resetFilters}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GetTestedComponent;
