import { View, Text,Pressable,ActivityIndicator ,TextInput} from 'react-native'
import React from 'react'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import colors from '../helpers/colors';
import fonts from '../helpers/fonts';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
export default function CustomInput({placeholder="Search",changefunc=()=>{},val="",style,children}) {


  return (
    <View
    style={[{
        width: '95%',
        marginHorizontal: '2.5%',
        fontFamily: fonts.mregular,
        color: colors.brown,
        borderRadius: 20, // Make the input box rounded
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderColor:colors.lightblack,
        paddingHorizontal:rp(1.5),
        paddingVertical:rp(1)
      },style]}

    >
        {children}
        {/* <MaterialCommunityIcons name="magnify" color={colors.lightblack} size={24} /> */}
<TextInput
placeholder={placeholder}
onChangeText={(e)=>changefunc(e)}
value={val}
placeholderTextColor={colors.lightblack}
style={{paddingHorizontal:rp(2)}}
/>
    </View>

  )
}