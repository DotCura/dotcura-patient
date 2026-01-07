import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { styles } from './styles';
import { constnatStyles } from '../../constants/Styles';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { activityOpacity } from '../../constants/GConstant';
import PrimaryTitleTextInput from '../PrimaryTitleTextInput';
import Modal from 'react-native-modal';
import { fontsfamily } from '../../constants/FontFamily';

const AddItemModal = ({
  visible,
  title,
  data,
  onClose,
  onSave,
  selectedItems,
  onSearch, // 🔥 new
}: any) => {
  const [search, setSearch] = useState('');

  const searchref = useRef<any>(null);
  const [localSelected, setLocalSelected] = useState(selectedItems);
  const [searchError, setSearchError] = useState('');
  const [showList, setShowList] = useState(false);
  const searchTimeout = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      setSearch('');
      setShowList(false);
      setLocalSelected(selectedItems);
    }
  }, [visible]);

  const handleSearch = (text: string) => {
    setSearch(text);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearch(text); // 🔥 API call
    }, 500);
  };

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (item: any) => {
    const exists = localSelected.some((i: any) => i.id === item.id);

    if (exists) {
      setLocalSelected(localSelected.filter((i: any) => i.id !== item.id));
    } else {
      setLocalSelected([...localSelected, item]);
    }
  };

  const isSelected = (id: any) => {
    return localSelected.some((i: any) => i.id === id);
  };

  const NoDataFound = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: getHeight(20),
      }}
    >
      <Text
        style={{
          color: Colors.black,
          fontSize: 14,
          fontFamily: fontsfamily.bold,
        }}
      >
        No se encontraron datos
      </Text>
    </View>
  );

  return (
    <Modal
      statusBarTranslucent
      useNativeDriverForBackdrop={true}
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0 }} // important for full-screen bottom modal
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderTopLeftRadius: getHeight(20),
            borderTopRightRadius: getHeight(20),
            height: '85%',
          }}
        >
          {/* Header */}
          <View style={styles.vwHeadingLine} />
          <View style={[styles.vwMainModelHeader]}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={onClose} // close modal
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
                {title}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.vwSave}
              activeOpacity={activityOpacity}
              onPress={() => onSave(localSelected)}
            >
              <Text style={styles.lblSave}>{getTranslation('save')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.vwInput}>
            <PrimaryTitleTextInput
              leftIcon={true}
              fieldIcon={images.imgSearchModel}
              placHolderLabel={getTranslation('searchplaceholder')}
              refs={searchref}
              inputLabel={''}
              blur={false}
              keyaboardType={'default'}
              value={search}
              onChangeFun={handleSearch} // 🔥 here
              autoCapitalize={'none'}
              errorMessage={searchError}
              setErrorMessage={setSearchError} // ✅ Just pass this once
              maxlength={200}
              isMultiline={false}
              isBorder={false}
              onFocus={() => setShowList(true)}
            />
          </View>
          {/* Show list only when input focused */}
          {showList && (
            <View
              style={{
                marginHorizontal: getWidth(16),
                marginTop: getHeight(60),
                backgroundColor: Colors.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 16,
                padding: 6,
                marginBottom: getHeight(150),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                ListEmptyComponent={
                  search.trim().length > 0 ? <NoDataFound /> : null
                }
                keyExtractor={item => item.id.toString()} // ✅ CORRECT
                contentContainerStyle={{
                  gap: getHeight(5),
                }}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => toggleSelect(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: getHeight(32),
                        backgroundColor: isSelected(item.id)
                          ? Colors.grayED
                          : Colors.white,
                        padding: 6,
                        gap: getWidth(6),
                        borderRadius: 8,
                      }}
                    >
                      {isSelected(item.id) && (
                        <Image source={images.imgRightTickBlack} />
                      )}
                      <Text style={styles.lblItemInner}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddItemModal;
