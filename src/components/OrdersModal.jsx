import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
import fonts from '../helpers/fonts'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import CaptionText from './Typography/BodyText'
import Heading from './Typography/Heading'
export default function OrderModal({show=false,callshow=()=>{},message,type}) {
  return (
    <Modal transparent visible={show}>
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,.4)"}}>
        <View style={{
            minHeight:150,
    width:"80%",backgroundColor:colors.white,borderRadius:10
    ,shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity:  0.21,
    shadowRadius: 8.19,
    elevation: 11,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center"
    ,paddingVertical:20
    }}>
<View style={{}}>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <Text style={{width:"80%",marginBottom:rp(1),fontFamily:fonts.mregular}}>{`Address: 123 Main Street Anytown, CA 12345 United States`}</Text>       
    </View>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        <Text style={{width:"80%",marginBottom:rp(1),fontFamily:fonts.mregular}}>{`Phone:(555) 123-4567`}</Text>       
    </View>
    <View style={{marginBottom:rp(2),display:"flex",flexDirection:"row",alignItems:"center"}}>
        <Text style={{width:"80%",marginBottom:rp(1),fontFamily:fonts.mregular}}>{`Token:8uweue8uw89872367`}</Text>       
    </View>
    
</View>
<Pressable onPress={()=>{
  callshow()
}} style={{backgroundColor:colors.primary,width:"60%",paddingHorizontal:10,paddingVertical:7,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text style={{color:colors.white,fontSize:18}}>Ok</Text>
</Pressable>
        </View>
    </View>
    </Modal>
 )
}