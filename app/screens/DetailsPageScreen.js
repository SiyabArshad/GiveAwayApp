import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MyAppButton from "../components/common/MyAppButton";
import {Linking} from 'react-native'
//components
import Screen from "./../components/Screen";

//config
import Colors from "../config/Colors";
const dialCall = (number) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
  else {phoneNumber = `telprompt:${number}`; }
  Linking.openURL(phoneNumber).catch(e=>console.war(e));
};
function DetailsPageScreen(props) {
  const data=props.route.params.data
  return (
    <Screen style={styles.screen}>
      {/* Back Navigation */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate("ProductsScreen")}
        style={{
          position: "absolute",
          top: RFPercentage(8),
          left: RFPercentage(2),
          width: RFPercentage(5),
          height: RFPercentage(5),
          backgroundColor: Colors.green,
          borderRadius: RFPercentage(20),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(3) }} color={Colors.white} />
      </TouchableOpacity>
      {/* Images*/}
      <Image style={{ width: RFPercentage(30), height: RFPercentage(20), marginTop: RFPercentage(3) }} source={data?.productimage?{uri:data?.productimage}:require("../../assets/Images/p1.png")} />

      {/* Details */}
      <ScrollView style={{ flex: 1, width: "100%", marginTop: RFPercentage(4) }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ width: "100%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center" }}>
            <View style={{ marginTop: RFPercentage(1.7), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ fontSize: RFPercentage(2.1), color: Colors.black }}>{data?.category}</Text>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.2), color: Colors.primary }}>${data?.price}</Text>
              </View>
            </View>
            <View style={{ marginTop: RFPercentage(2), width: "90%", alignSelf: "center", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(1.7), color: Colors.darkGrey }}>{data?.address}</Text>
            </View>
            <View style={{ marginTop: RFPercentage(2.5), width: "90%", alignSelf: "center", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(1.7), color: Colors.darkGrey }}>Zipcode-City-State</Text>
              <Text style={{ marginLeft: RFPercentage(5), fontSize: RFPercentage(1.7), color: Colors.darkGrey }}>{data?.zipcode}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center" }}>
            <Text style={{ color: Colors.green, fontWeight: "bold", fontSize: RFPercentage(2.2) }}>Details</Text>
            <Text style={{ lineHeight: RFPercentage(2.8), marginTop: RFPercentage(2), color: Colors.black, fontSize: RFPercentage(1.8) }}>
             {data?.desc}
              </Text>
          </View>

          {/* Owner Info */}
          <View
            style={{
              marginTop: RFPercentage(6),
              width: RFPercentage(48),
              height: RFPercentage(10),
              backgroundColor: Colors.green,
              borderRadius: RFPercentage(2.5),
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ marginLeft: RFPercentage(2), justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: Colors.white, fontSize: RFPercentage(2), left: RFPercentage(-2) }}>Owner Info:</Text>
              <Text style={{ marginTop: RFPercentage(1), color: Colors.white, fontSize: RFPercentage(1.8) }}>+{data?.phone}</Text>
            </View>

            {/* Call Icon */}
            <TouchableOpacity activeOpacity={0.8} style={{ position: "absolute", right: RFPercentage(2) }}>
              <TouchableOpacity
              onPress={()=>dialCall(data?.phone)}
                style={{ backgroundColor: Colors.darkOrange, justifyContent: "center", alignItems: "center", width: RFPercentage(6), height: RFPercentage(6), borderRadius: RFPercentage(2.8) }}
              >
                <FontAwesome name="phone" style={{ fontSize: RFPercentage(3.2) }} color={Colors.white} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
});

export default DetailsPageScreen;
