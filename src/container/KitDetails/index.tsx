import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import KitDetailsComponent from '../../components/KitDetails';
import AppHeader from '../../global/Header';
import { images } from '../../constants/Images';
import { currency } from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';

const KitDetailsContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const kitsData = [
    {
      id: '1',
      name: 'Emocromo',
      desc: 'Conteggio completo delle cellule del sangue',
      price: 7.0,
      status: null,
    },
    {
      id: '2',
      name: 'Sideremia',
      desc: 'Livello di ferro nel sangue',
      price: 6.0,
      status: null,
    },
    {
      id: '3',
      name: 'Ferritina',
      desc: 'Riserve di ferro nell’organismo',
      price: 6.0,
      status: 'Da fare',
    },
    {
      id: '4',
      name: 'Emoglobulina A2',
      desc: 'Proteina che trasporta il ferro',
      price: 11.0,
      status: null,
    },
    {
      id: '5',
      name: 'Vitamina B12',
      desc: 'Vitamina essenziale per la produzione di globuli rossi',
      price: 10.0,
      status: null,
    },
    {
      id: '6',
      name: 'Sangue occulto',
      desc: 'Ricerca di sangue nascosto nelle feci',
      price: 12.0,
      status: 'Deal',
    },
    {
      id: '7',
      name: 'Anticorpi transglutaminasi',
      desc: 'Test per escludere celiachia',
      price: 10,
      status: null,
    },
  ];

  const [kitsArrayData, setKitsArraysData] = useState(kitsData);
  const [selectedTests, setSelectedTests] = useState<string[]>(
    kitsArrayData.map(t => t.id),
  );

  // console.log('selectedTests', selectedTests);

  const toggleSelect = (id: string) => {
    setSelectedTests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedTests.length === kitsArrayData.length) {
      setSelectedTests([]);
    } else {
      setSelectedTests(kitsArrayData.map(t => t.id));
    }
  };

  const totalPrice = kitsArrayData
    .filter(t => selectedTests.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  const renderItemKitsData = ({ item, index }: { item: any; index: any }) => {
    const selected = selectedTests.includes(item.id);
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            gap: getWidth(12),
          }}
        >
          <TouchableOpacity onPress={() => toggleSelect(item.id)}>
            <Image
              source={
                selected ? images.imgSelectRadio : images.imgUnselectRadio
              }
            />
          </TouchableOpacity>
          <View style={{ flex: 1, marginRight: getWidth(20) }}>
            <Text style={styles.lblTestName} numberOfLines={2}>
              {item.name}{' '}
              <View style={{ alignItems: 'center',marginTop:3 }}>
                <Text
                  style={[
                    styles.lblStatus,
                    {
                      backgroundColor:
                        index == 2
                          ? Colors.greenD9
                          : index == 5
                          ? Colors.redFC
                          : Colors.white,
                      color:
                        index == 2
                          ? Colors.green0D
                          : index == 5
                          ? Colors.red40
                          : Colors.white,
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </Text>

            <Text style={styles.lblDesc} numberOfLines={3}>
              {item.desc}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.lblCurrency}>
            + {currency}
            {item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
          }}
          dontShowStartBtn={false}
          centerTitle={'Anaemia'}
          showTitle={true}
          showSubTitle={false}
          showEndBtn={false}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);
  return (
    <KitDetailsComponent
      insets={insets}
      kitsArrayData={kitsArrayData}
      renderItemKitsData={renderItemKitsData}
      selectAll={selectAll}
      totalPrice={totalPrice}
      selectedTests={selectedTests}
    />
  );
};

export default KitDetailsContainer;
