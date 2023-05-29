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
import IncommingMessage from '../components/IncommingMessage';
import OutGoingMessage from '../components/OutGoingMessage';
import questions from '../helpers/Questioner';
export default function Chat({navigation,route}) {
  return (
    <Screen>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:rp(2),marginVertical:rp(2)}}>
                   <Pressable onPress={()=>navigation.pop()} style={styles.center}>
                   <Entypo name="chevron-left" size={24} color={colors.primary}/>
                 </Pressable>
                 <View>
                    <Image style={{height:40,width:40,borderRadius:20}} source={require("../../assets/images/user2.jpg")} PlaceholderContent={<ActivityIndicator/>}/>
                 </View>
    </View>
    <View style={{flex:1,flexDirection:"column",justifyContent:"space-between",paddingBottom:rp(2)}}>
        <View style={{flex:1,paddingHorizontal:rp(2),display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
               <View>
               <Heading text={"Chat for Shoe "}  h='h4' style={{marginBottom:rp(3)}}/>
                <IncommingMessage/>
                <OutGoingMessage/>
               </View>
             <View style={{marginVertical:rp(2)}}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                           {
                            questions.map((item,i)=>(
                            <Pressable key={i} style={{marginHorizontal:rp(1),marginVertical:rp(.6),backgroundColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.9),borderRadius:rp(2)}}>
                                <CaptionText size='m' color={colors.white} text={item.quest}/>
                            </Pressable>
                            ))
                           }
                            
                        </View>
                </ScrollView> 
             </View>
        </View>
        <CustomButton func={()=>navigation.navigate("placeorder")} style={{backgroundColor:colors.primary,borderRadius:rp(5)}} textstyle={{color:colors.white,textTransform:"capitalize",fontFamily:fonts.msemibold}} text={"Buy Now"}/>
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