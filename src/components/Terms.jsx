import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ScrollView, Dimensions } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
import fonts from '../helpers/fonts'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import CaptionText from './Typography/BodyText'
import Heading from './Typography/Heading'
export default function Terms({show=false,callshow=()=>{},message,type}) {
  return (
    <Modal transparent visible={show}>
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,.4)"}}>
        <View style={{
           height:Dimensions.get("window").height/1.4,
    width:"90%",backgroundColor:colors.white,borderRadius:10
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
<ScrollView showsVerticalScrollIndicator={false}>
<View style={{paddingHorizontal:rp(2),paddingBottom:rp(2)}}>
<Heading text={"Read Terms and Conditions"} h='h4' style={{marginBottom:rp(2),paddingHorizontal:rp(2)}}/>
<CaptionText color={colors.black} text={"lorem simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} style={{textAlign:"justify",marginBottom:rp(2),fontSize:rp(2),paddingHorizontal:rp(2),lineHeight:rp(3.5)}} size='m'/>
</View>
</ScrollView>
<Pressable onPress={()=>{
  callshow()
}} style={{marginTop:rp(2),backgroundColor:colors.primary,width:"60%",paddingHorizontal:10,paddingVertical:7,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text style={{color:colors.white,fontSize:18}}>Accept Terms</Text>
</Pressable>
        </View>
    </View>
    </Modal>
 )
}