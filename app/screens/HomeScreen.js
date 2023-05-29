import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";

//components
import Screen from "./../components/Screen";
import BottomTab from "../components/common/BottomTab";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";

function HomeScreen(props) {
  const CartsData = [
    {
      image1Source: require("../../assets/Images/c1.png"),
      image2Source: require("../../assets/Images/c2.png"),
      image3Source: require("../../assets/Images/c3.png"),
      image1Label: "ציוד רפואי",
      image2Label: "רְהִיטִים",
      image3Label: "פריטים לחיות מחמד",
    },
    {
      image1Source: require("../../assets/Images/c1.png"),
      image2Source: require("../../assets/Images/c4.png"),
      image3Source: require("../../assets/Images/c5.png"),
      image1Label: "ציוד",
      image2Label: "אביזרים לבית",
      image3Label: "מכשירי חשמל",
    },
    {
      image1Source: require("../../assets/Images/c3.png"),
      image2Source: require("../../assets/Images/c2.png"),
      image3Source: require("../../assets/Images/c5.png"),
      image1Label: "נייד",
      image2Label: "עיצוב בית",
      image3Label: "כלים",
    },
  ];

  return (
    <Screen style={styles.screen}>
      {/* Nav */}
      <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.6} style={{ position: "absolute", left: 0 }} onPress={() => props.navigation.navigate("SelectionScreen")}>
          <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(3) }} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.navigation.navigate("ProductsScreen")}
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
            <Ionicons name="search" style={{ fontSize: RFPercentage(3), position: "absolute", left: 0 }} color={Colors.darkOrange} />
            <Text style={{ position: "absolute", right: 0, color: Colors.green }}>מה לחפש לך?</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ marginTop: RFPercentage(4.5), width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(2), color: Colors.green, fontWeight: "bold" }}>מצא את כל מה שאתה צריך!</Text>
          </View>

          {/* Carts */}
          {CartsData.map((item, i) => (
            <View key={i} style={{ marginTop: RFPercentage(4), width: "89%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ borderRadius: RFPercentage(2), width: RFPercentage(14), height: RFPercentage(14), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}
              >
                <Image style={{ width: RFPercentage(4), height: RFPercentage(4) }} source={item.image1Source} />
                <Text style={{ marginTop: RFPercentage(0.8), color: Colors.darkOrange, fontSize: RFPercentage(1.8) }}>{item.image1Label}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ borderRadius: RFPercentage(2), width: RFPercentage(14), height: RFPercentage(14), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}
              >
                <Image style={{ width: RFPercentage(7.9), height: RFPercentage(4.8) }} source={item.image2Source} />
                <Text style={{ marginTop: RFPercentage(0.8), color: Colors.darkOrange, fontSize: RFPercentage(1.8) }}>{item.image2Label}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ borderRadius: RFPercentage(2), width: RFPercentage(14), height: RFPercentage(14), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}
              >
                <Image style={{ width: RFPercentage(8), height: RFPercentage(5) }} source={item.image3Source} />
                <Text style={{ marginTop: RFPercentage(0.8), color: Colors.darkOrange, fontSize: RFPercentage(1.8) }}>{item.image3Label}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={{ marginTop: RFPercentage(4.5), color: Colors.darkOrange, fontSize: RFPercentage(2.1), fontWeight: "bold" }}>ועוד הרבה!</Text>

          {/* Button */}
          <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(4) }}>
            <MyAppButton
              title="בוא נלך!"
              onPress={() => props.navigation.navigate("ProductsScreen")}
              padding={RFPercentage(1.8)}
              backgroundColor={Colors.green}
              borderColor={Colors.white}
              borderWidth={RFPercentage(0.2)}
              color={Colors.white}
              bold={false}
              fontSize={RFPercentage(2)}
              borderRadius={RFPercentage(20)}
              width={"60%"}
            />
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(25) }} />
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

export default HomeScreen;
