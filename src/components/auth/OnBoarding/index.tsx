import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ScreenNames } from '../../../constants/AppConstants'
import { getTranslation } from '../../../localization/i18n/i18n.config'


const OnBoardingComponent = (props:any) => {
  return (
    <View>

      <Text onPress={()=> props.navigation.navigate(ScreenNames.LOGINCONTAINER)} style={{marginTop:100}}>{getTranslation("name")}</Text>
    </View>
  )
}

export default OnBoardingComponent
