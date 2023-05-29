import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet } from 'react-native'
import React from 'react'
import colors from '../helpers/colors'
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
export default function MessageCard({show=false,callshow=()=>{},message,type}) {
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
 <View style={{ display:"flex",alignItems:"center",justifyContent:"center"}}>
      {
        type?
        <Icon1 name="checkmark-done-circle" size={42} color={colors.green} />
        :
        <Icon2 name="alert" size={42} color={colors.danger} />
      }
    </View>
     <Text style={{fontSize:19,color:colors.black,marginVertical:10}}>{message&&message}</Text>
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