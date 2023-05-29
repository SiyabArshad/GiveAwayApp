import { View, Text,Pressable,ActivityIndicator,ScrollView, Dimensions } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import fonts from '../helpers/fonts'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import CaptionText from './Typography/BodyText'
export default function OutGoingMessage() {
  return (
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-end",marginBottom:rp(2)}}>
            <View>
            <View style={{backgroundColor:colors.primary,paddingHorizontal:rp(3),paddingVertical:rp(1.5),borderRadius:rp(5)}}>
                <CaptionText size='m' style={{fontSize:rp(2.3)}} text={"Yes its Available"} color={colors.white}/>
            </View>
            <View style={{marginTop:rp(1),display:"flex",flexDirection:"row",justifyContent:"flex-start",marginLeft:rp(2)}}>
            <CaptionText size='s' color={colors.lightblack} text={"10:05 PM"}/>
            </View>
            </View>
        </View>
  )
}