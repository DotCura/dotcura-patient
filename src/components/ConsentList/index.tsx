import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../constants/Styles';
import AppHeader from '../../global/Header';
import TitleSubtitle from '../../global/TitleSubtitle';
import { getTranslation } from '../../localization/i18n/i18n.config';
import CustomButton from '../../global/Buttons';
import { getHeight } from '../../constants/utils/Dimensions';
import { images } from '../../constants/Images';
import { Colors } from '../../constants/Colors';
import { ScreenNames } from '../../constants/AppConstants';

const ConsentListComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
      <AppHeader
        startBtnOnPress={() => {
          props.navigation.goBack();
        }}
        centerTitle={getTranslation('consentProfile') || 'Consensi'}
        dontShowStartBtn={false}
        showTitle={false}
        showSubTitle={false}
        showEndBtn={false}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          constnatStyles.keyboardContainer,
          { paddingHorizontal: 0 },
        ]}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          {/* HeaderView */}
          <View style={styles.vwHeader}>
            <TitleSubtitle
              title={getTranslation('infotitle')}
              subtitle={getTranslation('infosubtitle')}
            />
          </View>

          {/* vwInfoConstant */}
          <View style={styles.optionContainer}>
            <FlatList
              data={props.consentList}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              ListEmptyComponent={() => {
                if (props.isLoading) return null;
                return (
                  <View style={styles.vwNoData}>
                    <Text style={styles.txtNoData}>
                      {getTranslation('noConsentDataFound') ||
                        'Nessun modulo di consenso disponibile al momento.'}
                    </Text>
                  </View>
                );
              }}
              renderItem={({ item }) => {
                const isSelected = props.selectedConsents.includes(item.id);

                const renderTextWithHighlights = (
                  text: string,
                  highlights: any[],
                ) => {
                  if (!highlights || highlights.length === 0) return text;

                  let parts = [{ text: text, isHighlight: false, url: '' }];

                  highlights.forEach(hl => {
                    const newParts: any[] = [];
                    parts.forEach(part => {
                      if (part.isHighlight) {
                        newParts.push(part);
                      } else {
                        const splitText = part.text.split(hl.text);
                        for (let i = 0; i < splitText.length; i++) {
                          newParts.push({
                            text: splitText[i],
                            isHighlight: false,
                            url: '',
                          });
                          if (i < splitText.length - 1) {
                            newParts.push({
                              text: hl.text,
                              isHighlight: true,
                              url: hl.url,
                            });
                          }
                        }
                      }
                    });
                    parts = newParts;
                  });

                  return parts.map((part, index) => {
                    if (part.isHighlight) {
                      return (
                        <Text
                          key={index}
                          style={styles.lblHighlight}
                          onPress={() =>
                            props.navigation.navigate(
                              ScreenNames.CMSPAGECONTAINER,
                              {
                                cmsUrl: part.url,
                              },
                            )
                          }
                        >
                          {part.text}
                        </Text>
                      );
                    }
                    return <Text key={index}>{part.text}</Text>;
                  });
                };

                return (
                  <View style={styles.option}>
                    <TouchableOpacity
                      onPress={() => props.toggleConsent(item.id)}
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: getHeight(2),
                      }}
                    >
                      <Image
                        source={
                          isSelected
                            ? images.imgSelectRadio
                            : images.imgUnselectRadio
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.optionText}>
                      {renderTextWithHighlights(item.text, item.highlights)}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        {/* vwBottomBtn */}
        <View
          style={[
            styles.vwBottom,
            { marginBottom: props.insets.bottom + getHeight(10) },
          ]}
        >
          <CustomButton
            btnPress={props.handlePressSave}
            btnTitle={getTranslation('save') || 'Salva'}
            disabled={props.isSaveDisabled}
            style={{ opacity: props.isSaveDisabled ? 0.5 : 1 }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ConsentListComponent;
