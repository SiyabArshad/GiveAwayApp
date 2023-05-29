import { View, Text,StyleSheet,TextInput,TouchableOpacity,Pressable, ScrollView,Dimensions,ActivityIndicator } from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import Screen from "../components/Screen"
import Octicons from "react-native-vector-icons/Octicons"
import { Avatar,Image } from 'react-native-elements'
import ShoeCard from '../components/ShoeCard';

export default function Favourite({navigation,route}) {
    const[search,setsearch]=React.useState("")
    const[lth,setlth]=React.useState(false)
  return (
    <Screen>
      <View style={styles.header}>
        <TextInput onChangeText={(e)=>setsearch(e)} value={search} placeholder='Search Favourite Shoe' style={styles.inp}/>    
        <Pressable onPress={()=>setlth(!lth)} style={[styles.center,{backgroundColor:lth?colors.primary:colors.white,paddingHorizontal:rp(1),paddingVertical:rp(.5),borderRadius:rp(.5)}]}>
        <Octicons name="arrow-switch" size={28} color={lth?colors.white:colors.primary} />
        </Pressable>
       </View>
         {/* products */}
         <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",alignItems:"center",marginVertical:rp(1),marginHorizontal:rp(2),marginVertical:rp(1)}}>
          {
            [1,2,2,3,4,5,6,7,33,7,788].map((item,i)=>(
              <ShoeCard func={()=>navigation.navigate("details")} key={i}/>
            ))
          }
          </View>
        </ScrollView>
        {/* end products */}
    </Screen>
  )
}
const styles=StyleSheet.create({
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:rp(2),
        marginTop:rp(4),
        marginBottom:rp(2)
    },
    center:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    inp:{
      flex:1,
      paddingHorizontal:rp(2),
      paddingVertical:rp(1.2),
      marginRight:rp(1),
      borderRadius:rp(1),
      fontSize:rp(2.7),
      fontFamily:fonts.mregular,
      backgroundColor:colors.lightgrey
    }
})