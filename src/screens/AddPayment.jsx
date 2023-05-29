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
import { menShoeSizesEU,womenShoeSizesEU } from '../helpers/shoesizes';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request,PERMISSIONS} from "react-native-permissions"
import CustomButton from "../components/CustomButton"

export default function AddPayment({navigation,route}) {
  const [method,setmethod]=React.useState("card")
  const [cardNumber, setCardNumber] = React.useState('');

  const handleCardNumberChange = (value) => {
    // Remove any non-digit characters from the input
    const cleanedValue = value.replace(/\D/g, '');

    // Split the cleaned value into groups of 4 digits
    const cardNumberGroups = cleanedValue.match(/.{1,4}/g) || [];

    // Join the groups with a space between each group
    const formattedCardNumber = cardNumberGroups.join(' ');

    // Update the state with the formatted card number
    setCardNumber(formattedCardNumber);
  };
  return (
    <Screen>
       <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:rp(2),marginVertical:rp(2)}}>
                 <Pressable onPress={()=>navigation.pop()} style={styles.center}>
                 <Entypo name="chevron-left" size={24} color={colors.primary}/>
               </Pressable>
     </View>
    <View style={{marginHorizontal:rp(2),flex:1}}>
      
    <View style={{marginVertical:rp(3)}}>
      <Heading color={colors.primary} text={"Payment Methods"} h='h3'/>
      <View style={{marginTop:rp(2)}}>
        <View  style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:rp(2)}}>
          <TouchableOpacity onPress={()=>setmethod("visa")} style={{height:14,width:14,borderRadius:7,borderWidth:1,borderColor:colors.primary,backgroundColor:method==="visa"?colors.primary:colors.white,marginRight:rp(2)}}/>
          <BodyText size='m' text={"Visa Master Card"}/>
        </View>
        <View  style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:rp(2)}}>
          <TouchableOpacity onPress={()=>setmethod("paypal")} style={{height:14,width:14,borderRadius:7,borderWidth:1,borderColor:colors.primary,backgroundColor:method==="paypal"?colors.primary:colors.white,marginRight:rp(2)}}/>
          <BodyText size='m' text={"Paypal"}/>
        </View>
        <View  style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:rp(2)}}>
          <TouchableOpacity onPress={()=>setmethod("revolt")} style={{height:14,width:14,borderRadius:7,borderWidth:1,borderColor:colors.primary,backgroundColor:method==="revolt"?colors.primary:colors.white,marginRight:rp(2)}}/>
          <BodyText size='m' text={"Revolt"}/>
        </View>
      </View>
    </View>
    <View style={{marginBottom:rp(2)}}>
      <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:rp(2)}}>
        <Heading color={colors.primary} h='h4' text={"Amount"}/>
        <BodyText text={"€  5"}/>
      </View>
    {
      method==='visa'&&  <View style={{marginBottom:rp(2)}}>
      <Heading text={"Card Number"} h='h4'/>
      <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:rp(1),paddingVertical:rp(1.4),borderBottomWidth:1,borderBottomColor:colors.black}}>
           <TextInput
      keyboardType="numeric"
      maxLength={19}
      placeholder="2321 3456 2123 4564"
      value={cardNumber}
      onChangeText={handleCardNumberChange}
      style={{fontSize:rp(2.8)}}
    />
      </View>
    </View>
    }
    </View>

    <CustomButton style={{marginTop:rp(2),marginBottom:rp(5),backgroundColor:colors.primary,borderRadius:rp(5)}} textstyle={{color:colors.white,textTransform:"capitalize",fontFamily:fonts.msemibold}} text={"Publish"}/>
    </View>
    </Screen>
  )
}


const styles=StyleSheet.create({
  mncon:{
      flex:1,
      backgroundColor:colors.white
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