import { View, Text,StyleSheet,TextInput,TouchableOpacity,Pressable, ScrollView,Dimensions,ActivityIndicator,ImageBackground } from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import Heading from "../components/Typography/Heading"
import Screen from "../components/Screen"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Avatar,Image } from 'react-native-elements'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import BodyText from '../components/Typography/BodyText';
import Loading from "../components/Loading"
import MessageCard from "../components/MessageCard"
export default function PlaceOrder({navigation,route}) {
    const [name,setname]=React.useState("")
    const [phone,setphone]=React.useState("")
    const [address,setaddress]=React.useState("")
    const [notes,setnotes]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const placeorderfunc=()=>{
        setisload(true);
        try {
 
          setError("Placed");
          settype(true);
        } catch (error) {
          setError("Failed");
          settype(false);
        }
       finally{
        setissubmit(true);
        setisload(false);
        navigation.navigate("payment") 
      }
    }
      
    const callbacksubmit=()=>{
        setissubmit(false)
    }
  return (
    <Screen>
          <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
  <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:rp(2),marginVertical:rp(3)}}>
                 <Pressable onPress={()=>navigation.pop()} style={styles.center}>
                 <Entypo name="chevron-left" size={28} color={colors.primary}/>
               </Pressable>
</View>
  <ScrollView showsVerticalScrollIndicator={false}>
  <View style={{marginHorizontal:rp(2)}}>
    <BodyText text={"Sapatu Blue Shoes"} style={{textDecorationLine:"underline"}}/>
<View style={{marginTop:rp(4)}}>
<TextInput onChangeText={(e)=>setname(e)} value={name} style={{paddingHorizontal:rp(2),paddingVertical:rp(1.4),borderWidth:1,borderColor:colors.black,borderRadius:rp(.6),color:colors.lightblack,fontFamily:fonts.mregular,marginBottom:rp(2)}} placeholder='Name'/>
<TextInput onChangeText={(e)=>setphone(e)} value={phone} maxLength={15} keyboardType='phone-pad' style={{paddingHorizontal:rp(2),paddingVertical:rp(1.4),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.6),color:colors.black,fontFamily:fonts.mregular,marginBottom:rp(2)}} placeholder='Phone'/>
<TextInput onChangeText={(e)=>setaddress(e)} value={address} multiline style={{paddingHorizontal:rp(2),paddingVertical:rp(1.4),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.6),color:colors.black,fontFamily:fonts.mregular,marginBottom:rp(2)}} placeholder='Address'/>
<View style={{minHeight:200}}>
<TextInput onChangeText={(e)=>setnotes(e)} value={notes} multiline style={{flex:1,paddingHorizontal:rp(2),paddingVertical:rp(1.4),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.6),color:colors.black,fontFamily:fonts.mregular,marginBottom:rp(2)}} placeholder='Notes'/>
</View>
</View>
<View style={{...styles.center,marginTop:rp(2)}}>
<TouchableOpacity onPress={placeorderfunc} style={{backgroundColor:colors.primary,width:"60%",...styles.center,paddingVertical:rp(1),borderRadius:rp(3)}}>
                            <Heading color={colors.white} text={"Proceed"} h='h3'/>
</TouchableOpacity>
</View>
</View>
  </ScrollView>
    </Screen>
  )
}

const styles=StyleSheet.create({
    mncon:{
        flex:1,
    },
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:rp(2),
        marginVertical:rp(2)
    },
    center:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    inp:{
      flex:1,
      paddingHorizontal:rp(2),
      paddingVertical:rp(.7),
      marginRight:rp(1),
      borderWidth:1,
      borderColor:colors.primary,
      borderRadius:rp(1),
      fontFamily:fonts.mregular
    }
})