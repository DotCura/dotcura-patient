import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images'; // update path if needed
import { styles } from './styles';


type TopBarProps = {
  array: any[];
  currentIndex: number;
  onClick?: () => void;
  onClickBack?: () => void;
  showBack?: boolean;
  showDelete?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({
  array,
  currentIndex,
  onClick,
  onClickBack,
  showBack = true,
  showDelete = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.vwMain, { paddingTop: insets.top + 10 }]}>
      {/* Back Button */}
      {showBack ? (
        <TouchableOpacity style={styles.btnBack} onPress={onClickBack}>
        <Image source={images.imgLeftArrow} />
      </TouchableOpacity>
      ) : (
        <View style={styles.btnBackPlaceholder} />
      )}

      {/* Steps */}
      <View style={{ flexDirection: 'row', gap: getWidth(4) }}>
        {array.map((item: any, index: number) => {
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;

          const barBackgroundColor = isPast || isCurrent ? Colors.blue1C : Colors.grayF3;
          const textColor = isPast || isCurrent ? Colors.white : Colors.gray0F;

          return (
            <View key={index} style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: barBackgroundColor,
                  height: getHeight(36),
                  aspectRatio: 1,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isPast ? (
                  <Image
                    source={images.imgCheck}
                    style={{
                      width: getWidth(16),
                      height: getWidth(16),
                      tintColor: Colors.white,
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={{ color: textColor }}>{item.id}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {showDelete ? (
        <TouchableOpacity>
          <Image source={images.imgDelete} />
        </TouchableOpacity>
      ) : (
        <Image source={images.imgDelete} style={{ opacity: 0 }} />
      )}
    </View>
  );
};

export default TopBar;
