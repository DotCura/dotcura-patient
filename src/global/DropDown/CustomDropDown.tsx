import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { getHeight, getWidth } from '../../constants/utils/Dimensions';
import { fontsfamily } from '../../constants/FontFamily';
import { fontSize } from '../../constants/FontSizes';
import { Colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { getInitialShortName } from '../../constants/GConstant';

type BaseProps = {
  data: { label: string; value: string }[];
  value: string | string[] | null;
  onChange: (val: any) => void;
  placeholder?: string;
  search?: boolean;
  isRenderLeftIcon?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  multiple?: boolean; // 👈 decide single vs multi
  dropdownstyle?: any;
};

const CustomDropdown: React.FC<BaseProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select item(s)',
  search = false,
  dropdownPosition = 'auto',
  multiple = false,
  isRenderLeftIcon = false,
  dropdownstyle,
}) => {
  if (multiple) {
    return (
      <MultiSelect
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        dropdownPosition={dropdownPosition}
        search={search}
      />
    );
  }

  return (
    <Dropdown
      style={[styles.dropdown, dropdownstyle,]}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={typeof value === 'string' ? value : null}
      onChange={onChange}
      dropdownPosition={dropdownPosition}
      search={search}
      selectedTextStyle={{
        fontFamily: fontsfamily.gregular,
        fontSize: fontSize.size16,
        color: Colors.gray0F,
        marginTop: getHeight(1),
      }}
      placeholderStyle={{
        fontSize: fontSize.size16,
        fontFamily: fontsfamily.gregular,
        color: Colors.gray75,
      }}
      selectedTextProps={{
        numberOfLines: 1,
      }}
      containerStyle={{
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
      maxHeight={220}
      itemContainerStyle={{
        // backgroundColor: 'pink',
        borderRadius: 10,
      }}
      itemTextStyle={{
        fontSize: fontSize.size16,
        color: Colors.gray0F,
        fontFamily: fontsfamily.gregular,
      }}
      activeColor={Colors.grayE7}
      inputSearchStyle={{
        height: 40,
        borderRadius: 10,
      }}
      searchPlaceholder={'Search'}
      searchPlaceholderTextColor={Colors.black}
      autoScroll={true}
      showsVerticalScrollIndicator={false}
      renderLeftIcon={() =>
        isRenderLeftIcon && (
          <View
            style={{
              height: getHeight(32),
              aspectRatio: 1,
              borderRadius: 799,
              backgroundColor: Colors.grayE7,
              marginRight: getWidth(8),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: fontSize.size13,
                fontFamily: fontsfamily.gregular,
                letterSpacing: 0.1,
                color: Colors.grayAD,
              }}
            >
              {getInitialShortName(
                data.find(item => item.value === value)?.label || '',
              )}
            </Text>
          </View>
        )
      }
      renderRightIcon={() => (
        <Image
          source={images.imgLeftArrow}
          style={{
            height: getHeight(20),
            aspectRatio: 1,
            transform: [{ rotate: '270deg' }],
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  verticalLine: {
    width: 1,
    backgroundColor: Colors.black,
    height: getHeight(34),
    alignSelf: 'center',
    marginLeft: getWidth(16),
    marginRight: getWidth(18),
  },
  dropdown: {
    height: getHeight(56),
    borderRadius: 12,
    paddingHorizontal: getWidth(12),
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.grayD8,
  },
});

export default CustomDropdown;
