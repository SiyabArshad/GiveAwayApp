import { View, Text,Pressable,ActivityIndicator ,TextInput} from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Heading from "./Typography/Heading"
import BodyText from "./Typography/BodyText"
import { Image } from 'react-native-elements';
export default function ShoeCard({func=()=>{}}) {
  return (
    <Pressable onPress={func} style={{overflow:"hidden",height:220,width:"45%",marginHorizontal:"2.5%",marginBottom:rp(2),backgroundColor:colors.lightgrey,borderRadius:rp(4),display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Image PlaceholderContent={<ActivityIndicator/>} resizeMode='contain' style={{height:100,width:140}} source={require("../../assets/images/shoe1.png")}/>
    <View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Heading text={"Shoe Arm"} h='h5' style={{marginBottom:rp(.5)}}/>
     <BodyText text={"€ 200"} size='m'/>
    </View>
    </Pressable>
  )
}