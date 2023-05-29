import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//components
import Screen from "./../components/Screen";

//config
import Colors from "../config/Colors";

function SelectionScreen(props) {
  return (
    <Screen style={styles.screen}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <Text style={{ marginTop: RFPercentage(14), color: Colors.primary, fontSize: RFPercentage(3.5) }}>צהריים טובים חיים,</Text>

          {/* Selection Buttons */}
          {/* First */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("AddProductScreen")}
            style={{
              marginTop: RFPercentage(12),
              width: RFPercentage(30),
              height: RFPercentage(15),
              borderRadius: RFPercentage(2.5),
              backgroundColor: "#297058",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "95%", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
              <Text style={{ textAlign: "center", color: Colors.white, fontSize: RFPercentage(2.6) }}>מעונין / רוצה למסור</Text>
            </View>
          </TouchableOpacity>
          {/* Second */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate("HomeScreen")}
            style={{
              marginTop: RFPercentage(4),
              width: RFPercentage(30),
              height: RFPercentage(15),
              borderRadius: RFPercentage(2.5),
              backgroundColor: "#DE6D05",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "95%", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
              <Text style={{ textAlign: "center", color: Colors.white, fontSize: RFPercentage(2.6) }}>רוצה לאסוף</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: RFPercentage(10) }} />
      </ScrollView>
      <View style={{ width: "96%", flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: RFPercentage(8) }}>
        <Image style={{ width: RFPercentage(20), height: RFPercentage(14) }} source={require("../../assets/Images/material1.png")} />
        <Image style={{ width: RFPercentage(20), height: RFPercentage(14) }} source={require("../../assets/Images/material2.png")} />
      </View>
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

export default SelectionScreen;
