import { View, Text,Pressable,ActivityIndicator,ScrollView, Dimensions } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import fonts from '../helpers/fonts'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import CaptionText from './Typography/BodyText'
export default function IncommingMessage() {
  return (
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginBottom:rp(2)}}>
            <View>
            <View style={{backgroundColor:colors.lightgrey,paddingHorizontal:rp(3),paddingVertical:rp(1.5),borderRadius:rp(5)}}>
                <CaptionText size='m' style={{fontSize:rp(2.3)}} text={"its Available"} color={colors.black}/>
            </View>
            <View style={{marginTop:rp(1),display:"flex",flexDirection:"row",justifyContent:"flex-start",marginLeft:rp(2)}}>
            <CaptionText size='s' color={colors.lightblack} text={"10:00 PM"}/>
            </View>
            </View>
        </View>
  )
}