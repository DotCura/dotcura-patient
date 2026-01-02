import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import CustomButton from '../../../global/Buttons';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import { getHeight, getWidth } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';
import { activityOpacity } from '../../../constants/GConstant';
import { images } from '../../../constants/Images';

const OnBoardingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={[
          styles.indicatorContainer,
          {
            marginTop: props.insets.top + getHeight(16),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.btnBack}
          onPress={props.handleBack}
          activeOpacity={activityOpacity}
        >
          <Image source={images.imgLeftArrow} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginRight: getWidth(14),
            gap: getWidth(4),
          }}
        >
          {props.onBoardingArrData.map((_: any, index: any) => (
            <TouchableOpacity key={index} activeOpacity={1}>
              <View
                style={[
                  styles.indicator,
                  index === props.currentIndex
                    ? styles.activeIndicator
                    : index < props.currentIndex
                    ? styles.completedIndicator
                    : styles.inactiveIndicator,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Image source={images.imgDelete} style={{ opacity: 0 }} />
      </View>

      {/* centerview */}
      <View style={{ flex: 1 }}>
        {/* fltOnboarding */}

        <FlatList
          data={props.onBoardingArrData}
          ref={props.flatListRef}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={props.handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
          contentContainerStyle={{
            flexGrow: 1,
          }}
          renderItem={({ item, index }: any) => {
            return (
              <View
                style={[
                  styles.vwImgOnboarding,
                  {
                    marginBottom: index == 2 ? getHeight(40) : getHeight(58),
                  },
                ]}
                key={index}
              >
                <View
                  style={[
                    styles.imageContainer,
                    {
                      marginTop: index == 2 ? getHeight(26) : getHeight(70),
                    },
                  ]}
                >
                  <Image
                    source={item.image}
                    style={[
                      styles.onboardingImage,
                      {
                        resizeMode: index == 0 ? 'stretch' : 'contain',
                      },
                    ]}
                  />
                </View>

                <View style={[styles.contentContainer]}>
                  <Text style={styles.txtTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.txtSubtitle} numberOfLines={4}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* next btn */}
      <View
        style={[
          styles.buttonContainer,
          {
            marginBottom: props.insets.bottom + getHeight(16),
          },
        ]}
      >
        <CustomButton
          btnPress={props.handleNext}
          btnTitle={
            props.currentIndex === props.onBoardingArrData.length - 1
              ? getTranslation('startlabel')
              : getTranslation('continue')
          }
        />
        {props.currentIndex !== props.onBoardingArrData.length - 1 && (
          <CustomButton
            style={{ backgroundColor: Colors.blueDC }}
            textStyle={{ color: Colors.gray0F }}
            btnPress={props.handleSkip}
            btnTitle={getTranslation('skip')}
          />
        )}
      </View>
    </View>
  );
};

export default OnBoardingComponent;
