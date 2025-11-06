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
import { getHeight } from '../../../constants/utils/Dimensions';
import { Colors } from '../../../constants/Colors';

const OnBoardingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicatorContainer,
          {
            marginTop: props.insets.top + getHeight(16),
          },
        ]}
      >
        {props.onBoardingArrData.map((_: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              props.flatListRef.current?.scrollToIndex({
                index,
                animated: true,
              });
              props.setCurrentIndex(index);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.indicator,
                props.currentIndex === index
                  ? styles.activeIndicator
                  : styles.inactiveIndicator,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

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
              <View style={styles.vwImgOnboarding} key={index}>
                {/* <View style={[styles.imageContainer]}>
                  <Image source={item.image} style={styles.onboardingImage} />
                </View> */}

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
          { paddingBottom: props.insets.bottom + getHeight(16) },
        ]}
      >
        <CustomButton
          btnPress={props.handleNext}
          btnTitle={
            props.currentIndex === props.onBoardingArrData.length - 1
              ? getTranslation('next')
              : getTranslation('next')
          }
        />
        <CustomButton
          style={{ backgroundColor: Colors.white }}
          textStyle={{ color: Colors.gray0F }}
          btnPress={props.handleSkip}
          btnTitle={getTranslation('skip')}
        />
      </View>
    </View>
  );
};

export default OnBoardingComponent;
