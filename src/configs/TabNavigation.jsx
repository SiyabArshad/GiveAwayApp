import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../screens/Home"
import Favourite from '../screens/Favourite'
import Orders from '../screens/Orders'
import AddShoe from '../screens/AddShoe'
import Setting from '../screens/Setting'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5  from "react-native-vector-icons/FontAwesome5"
import { RFPercentage } from 'react-native-responsive-fontsize';
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
    initialRouteName={"homescreen"}
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.lightblack,
      headerShown: false,
      tabBarStyle: {
        paddingVertical:10,
        backgroundColor: colors.white,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        minHeight:70,
        paddingVertical:RFPercentage(2)
         }
    })}
  >
    <Tab.Screen
      name={"homescreen"}
      component={Home}
      options={{
        tabBarShowLabel: false,
        tabBarIcon:({color,size})=>
        (<View style={{display:"flex",alignItems:"center",justifyContent:"center",paddingVertical:RFPercentage(.5),marginBottom:5}}>
          <AntDesign name="home" size={size} color={color} />
          <Text style={{color:color,fontFamily:fonts.mregular,fontSize:12,marginTop:5}}>Home</Text>
        </View>
        )
        }}
      
    />
 <Tab.Screen
      name={"favscreen"}
      component={Favourite}
      options={{
        tabBarShowLabel: false,
        tabBarIcon:({color,size})=>
        (<View style={{display:"flex",alignItems:"center",justifyContent:"center",paddingVertical:RFPercentage(.5),marginBottom:5}}>
          <MaterialIcons name="favorite" size={size} color={color} />
          <Text style={{color:color,fontFamily:fonts.mregular,fontSize:12,marginTop:5}}>Favorites</Text>
        </View>
        )
        }}
      
    />
    <Tab.Screen
      name={"addproductscreen"}
      component={AddShoe}
      options={{
        tabBarShowLabel: false,
        tabBarIcon:({color,size})=>
        (<View style={{display:"flex",alignItems:"center",justifyContent:"center",paddingVertical:RFPercentage(.5),marginBottom:5}}>
          <Ionicons name="add-circle" size={size} color={color} />
          <Text style={{color:color,fontFamily:fonts.mregular,fontSize:12,marginTop:5}}>Add</Text>
        </View>
        )
        }}
      
    />
    <Tab.Screen
      name={"ordersscreen"}
      component={Orders}
      options={{
        tabBarShowLabel: false,
        tabBarIcon:({color,size})=>
        (<View style={{display:"flex",alignItems:"center",justifyContent:"center",paddingVertical:RFPercentage(.5),marginBottom:5}}>
          <FontAwesome5 name="shipping-fast" size={size} color={color} />
          <Text style={{color:color,fontFamily:fonts.mregular,fontSize:12,marginTop:5}}>Orders</Text>
        </View>
        )
        }}
      
    />
    <Tab.Screen
      name={"settingscreen"}
      component={Setting}
      options={{
        tabBarShowLabel: false,
        tabBarIcon:({color,size})=>
        (<View style={{display:"flex",alignItems:"center",justifyContent:"center",paddingVertical:RFPercentage(.5),marginBottom:5}}>
          <AntDesign name="setting" size={size} color={color} />
          <Text style={{color:color,fontFamily:fonts.mregular,fontSize:12,marginTop:5}}>Setting</Text>
        </View>
        )
        }}
      
    />
  </Tab.Navigator>
  )
}