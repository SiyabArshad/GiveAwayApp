import { View, Text } from 'react-native'
import React from 'react'
import colors from "../../helpers/colors"
import fonts from "../../helpers/fonts"
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
const fontSizeMapping = {
    h1: 4,
    h2: 3.5,
    h3: 3,
    h4: 2.5,
    h5: 2,
    h6: 1.6,
  };
export default function Heading({text,color=colors.black,h="h1",style}) {
    const fontSize = fontSizeMapping[h] || fontSizeMapping.h1; // Default to h1 if the heading level is not found in the mapping
  return (
    <Text style={[{color:color,fontFamily:fonts.mbold,fontSize:rp(fontSize)},style]}>
        {
            text
        }
    </Text>
  )
}