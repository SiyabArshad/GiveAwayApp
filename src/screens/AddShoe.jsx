import { View, Text,StyleSheet,TextInput,TouchableOpacity,Pressable, ScrollView,Dimensions,ActivityIndicator,ImageBackground } from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import Heading from "../components/Typography/Heading"
import Screen from "../components/Screen"
import AntIcon from "react-native-vector-icons/AntDesign"
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

export default function AddShoe({navigation,route}) {
    const [title, settitle] = React.useState('');
    const [desc,setdesc]=React.useState("")
    const [brand,setbrand]=React.useState("")
    const [shoecolor,setshoecolor]=React.useState("Others")
    const [phone,setphone]=React.useState()
    const [price,setprice]=React.useState()
    const [shoesize,setshoesize]=React.useState(40)
    const [gender,setgender]=React.useState("Men")
    const [condition,setcondition]=React.useState("New")
    const [pair,setpair]=React.useState("Pair")
    const askForPermissions=async(permissions)=>{
        const result=await request(permissions)
        return result
    }
    const[image,setimage]=React.useState(null)

    const openImagePicker = async() => {
        if(Platform.OS==="ios")
        {
            const rees=askForPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY)
            const options = {
                title: 'Select Image',
                mediaType: 'photo',
                quality: 0.7,
                maxWidth: 500,
                maxHeight: 500,
              };
              
              const res=await launchImageLibrary(options);
              if(!res.didCancel)
              {
                  setimage(res?.assets)
              }
        }
        else
        {
            askForPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
            const options = {
                title: 'Select Image',
                mediaType: 'photo',
                quality: 0.7,
                maxWidth: 500,
                maxHeight: 500,
              };
              
              const res=await launchImageLibrary(options);
              if(!res.didCancel)
              {
                  setimage(res?.assets)
              }
        }
      
    };

return (
  <Screen> 
     <View style={{flex:1,paddingHorizontal:rp(2),paddingVertical:rp(2)}}>
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={{}}>
        <Heading text={"Create Your Ad"} h='h3' style={{marginBottom:rp(2)}}/>
        <TextInput  onChangeText={(e)=>settitle(e)} value={title} style={{marginBottom:rp(2),paddingHorizontal:rp(2),paddingVertical:rp(1.5),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.5)}} placeholder='Enter Shoe Name'/>
        <TextInput  onChangeText={(e)=>setbrand(e)} value={brand}  style={{marginBottom:rp(2),paddingHorizontal:rp(2),paddingVertical:rp(1.5),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.5)}} placeholder='Enter Brand Name'/>
        <TextInput keyboardType='number-pad'  onChangeText={(e)=>setprice(e)} value={price}  style={{marginBottom:rp(2),paddingHorizontal:rp(2),paddingVertical:rp(1.5),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.5)}} placeholder='Enter Shoe Price'/>
        <TextInput keyboardType='number-pad'  onChangeText={(e)=>setphone(e)} value={phone} maxLength={15}  style={{marginBottom:rp(2),paddingHorizontal:rp(2),paddingVertical:rp(1.5),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.5)}} placeholder='Enter Phone Number'/>
        <View style={{minHeight:100}}>
<TextInput onChangeText={(e)=>setdesc(e)} value={desc} multiline style={{flex:1,paddingHorizontal:rp(2),paddingVertical:rp(1.4),borderWidth:1,borderColor:colors.lightblack,borderRadius:rp(.6),color:colors.black,fontFamily:fonts.mregular,marginBottom:rp(2)}} placeholder='Enter Shoe Details'/>
</View>
<View style={{display:"flex",flexDirection:"row",alignContent:"center",marginBottom:rp(2)}}>
    <Pressable onPress={()=>setgender("Men")} style={{backgroundColor:gender==="Men"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={gender==="Men"?colors.white:colors.primary} text={"Men"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setgender("Women")} style={{backgroundColor:gender==="Women"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={gender==="Women"?colors.white:colors.primary} text={"Women"} size='m'/>
    </Pressable>
</View>
<View style={{display:"flex",flexDirection:"row",alignContent:"center",marginBottom:rp(2)}}>
    <Pressable onPress={()=>setcondition("New")} style={{backgroundColor:condition==="New"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={condition==="New"?colors.white:colors.primary} text={"New"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setcondition("Used")} style={{backgroundColor:condition==="Used"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={condition==="Used"?colors.white:colors.primary} text={"Used"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setcondition("Like New")} style={{backgroundColor:condition==="Like New"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={condition==="Like New"?colors.white:colors.primary} text={"Like New"} size='m'/>
    </Pressable>
</View>
<View style={{display:"flex",flexDirection:"row",alignContent:"center",marginBottom:rp(2)}}>
    <Pressable onPress={()=>setpair("Pair")} style={{backgroundColor:pair==="Pair"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={pair==="Pair"?colors.white:colors.primary} text={"Pair"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setpair("Left")} style={{backgroundColor:pair==="Left"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={pair==="Left"?colors.white:colors.primary} text={"Left"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setpair("Right")} style={{backgroundColor:pair==="Right"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={pair==="Right"?colors.white:colors.primary} text={"Right"} size='m'/>
    </Pressable>
</View>
<View style={{display:"flex",flexDirection:"row",alignContent:"center",marginBottom:rp(2)}}>
    <Pressable onPress={()=>setshoecolor("Pink")} style={{backgroundColor:shoecolor==="Pink"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={shoecolor==="Pink"?colors.white:colors.primary} text={"Pink"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setshoecolor("Blue")} style={{backgroundColor:shoecolor==="Blue"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={shoecolor==="Blue"?colors.white:colors.primary} text={"Blue"} size='m'/>
    </Pressable>
    <Pressable onPress={()=>setshoecolor("Others")} style={{backgroundColor:shoecolor==="Others"?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={shoecolor==="Others"?colors.white:colors.primary} text={"Other"} size='m'/>
    </Pressable>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
<View style={{display:"flex",flexDirection:"row",alignContent:"center",marginBottom:rp(2)}}>
   {
    gender==="Men"?
    menShoeSizesEU.map((item,i)=>(
        <Pressable key={i} onPress={()=>setshoesize(item)} style={{backgroundColor:shoesize===item?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={shoesize===item?colors.white:colors.primary} text={item} size='m'/>
    </Pressable>
    
    ))
    :
    womenShoeSizesEU.map((item,i)=>(
        <Pressable key={i} onPress={()=>setshoesize(item)} style={{backgroundColor:shoesize===item?colors.primary:colors.white,borderWidth:1,borderColor:colors.primary,paddingHorizontal:rp(2),paddingVertical:rp(.5),borderRadius:rp(.5),marginRight:rp(1)}}>
        <BodyText style={{}} color={shoesize===item?colors.white:colors.primary} text={item} size='m'/>
    </Pressable>
    
    ))
   }
</View>
</ScrollView>
<View style={{marginBottom:rp(2)}}>
        <BodyText text={"Shoe Picture"} size='m' style={{marginVertical:rp(2)}}/>
        <Pressable onPress={openImagePicker} style={{height:rp(30),borderWidth:1,borderRadius:rp(2),borderColor:colors.primary,borderStyle:'dashed',display:"flex",justifyContent:"center",alignItems:"center"}}>
        <AntIcon name="cloudupload" size={40} color={colors.lightblack} />
               <View style={{display:"flex",flexDirection:"row",marginTop:rp(2)}}>
                <BodyText size='m' text={"Drop your files here or "} color={colors.lightblack}/>
                <BodyText size='m' text={"Choose File"} color={colors.primary} style={{}} />
                </View> 
                <BodyText size='m' text={"upload file up to 10 mb"} color={colors.lightblack}/>
        </Pressable>
    </View>
   {
    image!==null&& 
<View style={{marginBottom:rp(2)}}>
<Image  source={{uri:image[0]?.uri}} style={{height:rp(30),borderRadius:rp(2)}}>
    </Image>
</View>
   }
    <CustomButton func={()=>navigation.navigate("payment")} style={{backgroundColor:colors.primary,borderRadius:rp(5)}} textstyle={{color:colors.white,textTransform:"capitalize",fontFamily:fonts.msemibold}} text={"Continue"}/>
     </View>
      </ScrollView>
    </View>
    </Screen>
  )
} 