import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import AddCardComponent from '../../components/auth/AddCard';
import AddFamilyComponent from '../../components/AddFamily';
import AppHeader from '../../global/Header';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenNames } from '../../constants/AppConstants';

const AddFamilyContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const familyMember = [
    { id: 1, name: 'Pasquale', relation: 'Figlio' },
    { id: 2, name: 'Maria', relation: 'Moglie' },
  ];

  const [familyMembersData, setFamilyMembersData] = useState(familyMember);
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
              {item.relation}
            </Text>
          </View>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeBtn}
          // onPress={() => handleRemove(item.id)}
        >
          <Text style={styles.removeText}>{getTranslation('edit')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleNavigateFamilyMember = () => {
    navigation.navigate(ScreenNames.ADDFAMILYMEMBERSCONTAINER);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.navigate(ScreenNames.PROFILECONTAINER);
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
  return (
    <AddFamilyComponent
      insets={insets}
      familyMembersData={familyMembersData}
      renderItemFamilyMember={renderItemFamilyMember}
      showEmpty={showEmpty}
      setShowEmpty={setShowEmpty}
      handleNavigateFamilyMember={handleNavigateFamilyMember}
    />
  );
};

export default AddFamilyContainer;
