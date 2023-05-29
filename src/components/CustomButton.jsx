import { View, Text,Pressable,ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import fonts from '../helpers/fonts'
import ButtonText from './Typography/BodyText'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";

export default function CustomButton({text,style,func=()=>{},textstyle,btnloading,children,btncontentstyle}) {
  return (
    <Pressable onPress={()=>func()} style={[{backgroundColor:colors.primary,width:"90%",paddingVertical:rp(1.5),display:"flex",justifyContent:"center",alignItems:"center",marginHorizontal:"5%",borderRadius:rp(2.7)},style]}>
  {
    btnloading?<ActivityIndicator size={24} color={colors.white}/>
    :
 <View style={{display:"flex",flexDirection:"row",alignItems:"center",...btncontentstyle}}>
        {children}
       <ButtonText text={text} color={colors.white} style={{fontSize:rp(2.8),textTransform:"uppercase",...textstyle}}/>
 </View>
  }
</Pressable>
  )
}