import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { constnatStyles } from '../../../constants/Styles';
import TopBar from '../../../global/TopBar/TopBar';
import TitleSubtitle from '../../../global/TitleSubtitle';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import CustomButton from '../../../global/Buttons';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { images } from '../../../constants/Images';
import { Colors } from '../../../constants/Colors';
import { ScreenNames } from '../../../constants/AppConstants';
import { GlobalVar } from '../../../constants/GlobalVar';

const InformationConasantComponent = (props: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteF2 }}>
      <View style={{ marginHorizontal: getWidth(16) }}>
        {/* TopBar */}
        <TopBar
          array={props.headerArray}
          currentIndex={1}
          onClickBack={() => props.navigation.goBack()}
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={[constnatStyles.keyboardContainer]}
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
            btnPress={props.handlePressContinue}
            btnTitle={getTranslation('continue')}
            disabled={props.isContinueDisabled}
            style={{ opacity: props.isContinueDisabled ? 0.5 : 1 }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default InformationConasantComponent;
