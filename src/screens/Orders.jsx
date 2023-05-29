import { View, Text,StyleSheet,TextInput,TouchableOpacity,Pressable, ScrollView,Dimensions,ActivityIndicator,ImageBackground } from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import CaptionText from "../components/Typography/BodyText"
import Heading from "../components/Typography/Heading"
import Screen from "../components/Screen"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Image } from 'react-native-elements';
import BodyText from '../components/Typography/BodyText';
import CustomButton from "../components/CustomButton"
import OrderModal from '../components/OrdersModal';
export default function Orders() {
    const [showmodal,setshowmodal]=React.useState(false)
    const callshow=()=>{
        setshowmodal(false)
    }
  return (
    <Screen>
        <OrderModal callshow={callshow} show={showmodal}/>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal:rp(2),paddingVertical:rp(2)}}>
            {
                [1,2,34,56,7,8,98].map((item,i)=>(
                    <Pressable onPress={()=>setshowmodal(true)} key={i} style={{paddingHorizontal:rp(2),paddingVertical:rp(1.5),backgroundColor:colors.lightgrey,marginBottom:rp(1),borderRadius:rp(1)}}>
                        <Heading text={"Order #46784889"} h='h4' style={{marginBottom:rp(1)}}/>
                        <BodyText color={colors.lightblack} text={"Nike Air Jorden"} size='m'/>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                            <Heading h='h4' text={"€ 600"}/>
                        </View>
                    </Pressable>
                ))
            }
        </View>
    </ScrollView>
    </Screen>
  )
}