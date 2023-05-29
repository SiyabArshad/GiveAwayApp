import { View, Text } from 'react-native'
import React from 'react'
import Routing from './src/configs/Routing'
import SplashScreen from 'react-native-splash-screen'

import { NavigationContainer } from '@react-navigation/native'
export default function App() {
  React.useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide()
   
    },5000)
  },[])
  return (
    <NavigationContainer>
      <Routing/>
    </NavigationContainer>
    )
}