import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, ImageBackground } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
//components
import Screen from "./../components/Screen";
import BottomTab from "../components/common/BottomTab";

//config
import Colors from "../config/Colors";

function MapScreen(props) {
  const [activeTab, setActiveTab] = useState("MapScreen");

  return (
    <Screen style={styles.screen}>
      {/* Nav */}
      <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <Image style={{ width: RFPercentage(7), height: RFPercentage(7) }} source={require("../../assets/Images/profile.png")} />
        <View
          style={{
            width: RFPercentage(34),
            height: RFPercentage(5.5),
            backgroundColor: Colors.white,
            borderRadius: RFPercentage(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: RFPercentage(3),
          }}
        >
          <View style={{ width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Image style={{ width: RFPercentage(2.2), height: RFPercentage(2.2), position: "absolute", left: 0 }} source={require("../../assets/Images/search.png")} />
            <TextInput textAlign="right" style={{ width: "100%" }} placeholder="מה לחפש לך?" placeholderTextColor={"#3F8D79"} />
          </View>
        </View>
      </View>

      {/* Background Map Image */}
      <ImageBackground style={{ top: RFPercentage(2), width: "100%", flex: 1, justifyContent: "flex-start", alignItems: "center" }} source={require("../../assets/Images/ms.png")}>
        <Text style={{ top: RFPercentage(1), color: Colors.green, fontSize: RFPercentage(3), fontFamily: "VarelaRound_400Regular" }}>בסביבה שלך</Text>
      </ImageBackground>

      {/* Bottom Tab */}
      <View style={{ width: "100%", position: "absolute", bottom: 0, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            right: RFPercentage(1),
            top: RFPercentage(3.4),
            backgroundColor: "#188142",
            width: RFPercentage(8),
            height: RFPercentage(8),
            borderRadius: RFPercentage(30),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/plus.png")} />
        </TouchableOpacity>
        <BottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#EDEDED",
  },
});

export default MapScreen;
