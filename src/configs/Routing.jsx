import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Forgot from '../screens/Forgot';
import ShoeDetail from '../screens/ShoeDetail';
import TabNavigation from './TabNavigation';
import PlaceOrder from '../screens/PlaceOrder';
import Chat from '../screens/Chat';
import Payment from '../screens/Payment';
import AddPayment from '../screens/AddPayment';

const Stack = createNativeStackNavigator();

export default function Routing() {
  return (
        <Stack.Navigator initialRouteName={"signup"} screenOptions={{headerShown:false}}>
        <Stack.Screen name={"signup"} component={Signup}/>
        <Stack.Screen name={"login"} component={Login}/>
        <Stack.Screen name={"forgot"} component={Forgot}/>
        <Stack.Screen name={"home"} component={TabNavigation}/>
        <Stack.Screen name={"details"} component={ShoeDetail}/>
        <Stack.Screen name={"placeorder"} component={PlaceOrder}/>
        <Stack.Screen name={"chat"} component={Chat}/>
        <Stack.Screen name={"payment"} component={Payment}/>
        <Stack.Screen name={"addpayment"} component={AddPayment}/>
        </Stack.Navigator>
  )
}