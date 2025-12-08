import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { constnatStyles } from '../../constants/Styles';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';
import { getTranslation } from '../../localization/i18n/i18n.config';
import { styles } from './styles';

const AnalitiTestDetailComponent = (props: any) => {
  const total = 8;
  const analyzed = 7;

  const progress = analyzed / total; 
  const renderHeaderComponent = () => {
    return (
      <View>
        <View style={styles.vwOuterAnalitiTest}>
          <View
            style={[
              styles.vwBlueProgress,
              {
                width: `${progress * 100}%`, // fill based on value
              },
            ]}
          />

          <View style={styles.vwTextTestImage}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lblTestAnaliti}>Cuore</Text>

              <Text style={styles.lblMainDesCount}>
                <Text style={styles.lblAnalyses}>{analyzed}</Text>{' '}
                {getTranslation('oftext')} {total}{' '}
                {getTranslation('analitietext')}
              </Text>
            </View>

            {/* RIGHT IMAGE AREA */}

            <Image source={images.imgHeart} style={styles.imgTest} />
          </View>
        </View>
        <Text style={styles.lblQuotes}>
          {getTranslation('desanalititestdetails')}
        </Text>
      </View>
    );
  };
  return (
    <View style={constnatStyles.vwContainer}>
      <FlatList ListHeaderComponent={renderHeaderComponent} />
    </View>
  );
};

export default AnalitiTestDetailComponent;
