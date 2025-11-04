import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import OnBoardingComponent from '../../../components/auth/OnBoarding'


const OnBoardingContainer = ({navigation}:any) => {
  return (
   <OnBoardingComponent
   navigation={navigation}/>
  )
}

export default OnBoardingContainer
