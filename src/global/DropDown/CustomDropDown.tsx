import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { FontFamily } from '../../constants/FontFamily';
import { getHeight, getWidth } from '../../constants/StylesConstants';
import { FontSize } from '../../constants/FontSize';
import { Colors } from '../../constants/Colors';
import { ImageConstants } from '../../constants/ImageConstants';


type BaseProps = {
  data: { label: string; value: string }[];
  value: string | string[] | null;
  onChange: (val: any) => void;
  placeholder?: string;
  search?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  multiple?: boolean; // 👈 decide single vs multi
};

const CustomDropdown: React.FC<BaseProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select item(s)',
  search = true,
  dropdownPosition = 'auto',
  multiple = false,
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
      style={styles.dropdown}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={typeof value === 'string' ? value : null}
      onChange={onChange}
      dropdownPosition={dropdownPosition}
      search={search}
      selectedTextStyle={{
        fontFamily: FontFamily.SemiBold,
        marginTop: getHeight(1),
      }}
      placeholderStyle={{
        fontSize: FontSize.size18,
        fontFamily: FontFamily.Regular,
        color: Colors.black30,
        marginTop:getHeight(4)
      }}
      selectedTextProps={{
        numberOfLines: 1,
      }}
      containerStyle={{
        backgroundColor: Colors.white,
        borderRadius: 10,
      }}
      maxHeight={220}
      itemContainerStyle={
        {
          // backgroundColor: 'pink',
        }
      }
      itemTextStyle={{
        fontSize: FontSize.size16,
        color: Colors.black33,
      }}
      activeColor={Colors.grey5E}
      inputSearchStyle={{
        height: 40,
        borderRadius: 10,
      }}
      searchPlaceholder={'Search'}
      searchPlaceholderTextColor={Colors.black}
      autoScroll={true}
      showsVerticalScrollIndicator={false}
      renderLeftIcon={() => (
        <View style={{flexDirection:'row'}}>
          <Image
            source={ImageConstants.imgEmail}
            style={{ }}
          />
            <View
          style={styles.verticalLine}
        ></View>
        </View>
      )}
      renderRightIcon={() => <Image source={ImageConstants.imgArrowDown} style={{height:getHeight(25),aspectRatio:1}} />}
    />
  );
};

const styles = StyleSheet.create({
  verticalLine:{
    width: 1,
    backgroundColor: Colors.black30,
    height: getHeight(34),
    alignSelf: 'center',
    marginLeft:getWidth(16),
    marginRight:getWidth(18)
  },
  dropdown: {
    height: getHeight(60),
    borderRadius: 50,
    paddingHorizontal: getWidth(27),
    overflow: 'hidden',
    borderWidth:1,
    borderColor:Colors.black30
  },
});

export default CustomDropdown;
