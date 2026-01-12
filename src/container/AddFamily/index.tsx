import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './styles';
import AddCardComponent from '../../components/auth/AddCard';
import AddFamilyComponent from '../../components/AddFamily';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';
import { apiPromise } from '../../global/ApiHelper/apiPromise';
import { ApiEndPoints } from '../../api/APIConstant';
import {
  LoadType,
  usePaginatedList,
} from '../../global/ApiHelper/usePaginatedList';
import { useFocusEffect } from '@react-navigation/native';

const AddFamilyContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const [showEmpty, setShowEmpty] = useState(true);

  const renderItemFamilyMember = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          {/* Initial circle */}
          <View style={styles.initialCircle}>
            <Text style={styles.initialText}>{item.name.charAt(0)}</Text>
          </View>

          {/* Name & relation */}
          <View
            style={{ flex: 1, marginHorizontal: 12, justifyContent: 'center' }}
          >
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.relation} numberOfLines={1}>
              {item.relationship_name}
            </Text>
          </View>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleEditFamily(item)}
        >
          <Text style={styles.removeText}>{getTranslation('edit')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleNavigateFamilyMember = () => {
    navigation.navigate(ScreenNames.ADDFAMILYMEMBERSCONTAINER);
  };

  const handleEditFamily = (item: any) => {
    navigation.navigate(ScreenNames.ADDFAMILYMEMBERSCONTAINER, {
      familyMemberId: item.id,
      editFamilyMemberData: item,
      editFamilyMember: true,
    });
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            // navigation.navigate(ScreenNames.PROFILECONTAINER);
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
          centerTitle={getTranslation('family')}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  //================= API ==============================
  const fetchFamilyMemberList = useCallback(
    async ({ page, loadType }: { page: number; loadType: any }) => {
      const res = await apiPromise({
        navigation,
        apiEndPoint: ApiEndPoints.FAMILY.GETFAMILYMEMBERLIST,
        method: 'POST',
        showLoader:
          loadType === LoadType.INITIAL || loadType === LoadType.TAB_CHANGE,
        params: {
          page,
        },
      });

      // 🔥 NORMALIZE RESPONSE
      return {
        ...res,
        data: res?.data ?? [], // ✅ always array
      };
    },
    [navigation],
  );

  const familyMemberList: any = usePaginatedList<any>({
    pageSize: 10,
    enabled: true,
    fetcher: fetchFamilyMemberList,
  });

  useFocusEffect(
    useCallback(() => {
      // Reset pagination & re-call API
      familyMemberList?.reset?.();
    }, []),
  );

  return (
    <AddFamilyComponent
      navigation={navigation}
      insets={insets}
      familyMembersData={familyMemberList?.data}
      renderItemFamilyMember={renderItemFamilyMember}
      showEmpty={showEmpty}
      setShowEmpty={setShowEmpty}
      handleNavigateFamilyMember={handleNavigateFamilyMember}
      familyMemberList={familyMemberList}
    />
  );
};

export default AddFamilyContainer;
