import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../global/Header';
import { images } from '../../constants/Images';
import { activityOpacity, currency, flashMessageWarning } from '../../constants/GConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { ScreenNames } from '../../constants/AppConstants';
import { getTranslation } from '../../localization/i18n/i18n.config';
import AnalitiDetailsComponent from '../../components/AnalitiDetails';

const AnalitiDetailsContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const analitidata = [
    {
      id: '1',
      name: 'Colesterolo Totale',
      desc: 'Quanto colesterolo hai nel sangue',
      price: 8.0,
      status: null,
    },
    {
      id: '2',
      name: 'Colesterolo HDL',
      desc: "Il colesterolo 'buono' per il cuore",
      price: 10.0,
      status: null,
    },
    {
      id: '3',
      name: 'Colesterolo LDL',
      desc: "Il colesterolo 'cattivo' da controllare",
      price: 6.0,
      status: 'Da fare',
    },
    {
      id: '4',
      name: 'Trigliceridi',
      desc: 'Grassi da tenere sotto controllo',
      price: 11.0,
      status: null,
    },
    {
      id: '5',
      name: 'Profilo Lipidico Completo',
      desc: 'Analisi completa dei grassi nel sangue',
      price: 10.0,
      status: null,
    },
  ];

  const [analitiArrayData, setAnalitiArraysData] = useState(analitidata);
  const [selectedTests, setSelectedTests] = useState(analitiArrayData.map(t => t.id));


  console.log('selectedTests', selectedTests);

 
  const toggleSelect = (id: string) => {
    setSelectedTests(prev => {
      if (prev.length === 1 && prev.includes(id)) {
        flashMessageWarning(getTranslation("atleastoneselected"))
        return prev;
      }
  
      return prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id];
    });
  };

 

  const totalPriceanaliti = analitiArrayData
    .filter(t => selectedTests.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  const renderItemAnalitiData = ({ item, index }: { item: any; index: any }) => {
    const selected = selectedTests.includes(item.id);
    const isLastSelected = selectedTests.length === 1 && selected;

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
          <View style={{ flex: 1, marginRight: getWidth(20), gap: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.lblTestName} numberOfLines={2}>
                {item.name}{' '}
              </Text>
              {item.status && (
                <View style={{ alignItems: 'center' }}>
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
              )}
            </View>

            <Text style={styles.lblDesc} numberOfLines={3}>
              {item.desc}
            </Text>
            <Text style={styles.lblCurrency}>
              {currency} {item.price.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{ alignSelf: 'flex-start', marginTop: 2 }}>
        {!selected ? (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={styles.btnadd}
            disabled={isLastSelected}

            onPress={() => toggleSelect(item.id)}
          >
            <Image source={images.imgPlusDark} />
            <Text style={styles.lblAdd}>{getTranslation('add')}</Text>
          </TouchableOpacity>
           ) : (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={[styles.btnadd, { backgroundColor: Colors.white }]}
            onPress={() => toggleSelect(item.id)}
          >
            <Image source={images.imgminusdark} />
            <Text style={styles.lblAdd}>{getTranslation('remove')}</Text>
          </TouchableOpacity>
           )}
        </View>
      </View>
    );
  };

  const handleNavigateCheckout = () => {
    navigation.navigate(ScreenNames.CHECKOUTCONTAINER);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <AppHeader
          startBtnOnPress={() => {
            console.log('hy');
            navigation.goBack();
          }}
          dontShowStartBtn={false}
          centerTitle={getTranslation('analititextdetails')}
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
    
    <AnalitiDetailsComponent
    navigation={navigation}
      insets={insets}
      analitiArrayData={analitiArrayData}
      renderItemAnalitiData={renderItemAnalitiData}
      totalPriceanaliti={totalPriceanaliti}
      selectedTests={selectedTests}
      handleNavigateCheckout={handleNavigateCheckout}
    />
  );
};

export default AnalitiDetailsContainer;
