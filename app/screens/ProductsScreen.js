import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//components
import Screen from "./../components/Screen";
import BottomTab from "../components/common/BottomTab";

//config
import Colors from "../config/Colors";
import { useSelector, useDispatch } from "react-redux";
import { loginaction, logoutaction } from "../redux/auth/authaction";
import Loading from "../components/Loading";
import { useIsFocused } from "@react-navigation/native";
import { doc, setDoc, getFirestore, addDoc, getDoc, collection, query, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import app from "../config/firebase";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Locations from "../config/locations";
const db = getFirestore(app);
function ProductsScreen(props) {
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const [active, setActive] = useState("1");
  const [loading, setloading] = React.useState(false);
  const [serveas, setserveas] = useState("All");
  const [products, setproducts] = React.useState([]);
  const [tempproducts, settempproducts] = React.useState([]);
  const [search, setsearch] = React.useState("");

  const getAllProducts = async () => {
    setloading(true);
    try {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const availableproducts = [];
      querySnapshot.forEach((doc) => {
        const documentdata = doc.data();
        availableproducts.push(documentdata);
      });
      setproducts(availableproducts);
      settempproducts(availableproducts);
    } catch {
    } finally {
      setloading(false);
    }
  };
  const Searchfnc = (e) => {
    setsearch(e);
    if (e === "") {
      setproducts(tempproducts);
    } else {
      setproducts(products.filter((item) => item.productname?.toLowerCase().includes(e.toLowerCase())));
    }
  };
  const SearchbyLocation = (e) => {
    setserveas(e);
    if (e === "All") {
      setproducts(tempproducts);
    } else {
      setproducts(products.filter((item) => item.location === e));
    }
  };
  React.useEffect(() => {
    if (focus) {
      getAllProducts();
    }
  }, [focus]);
  const iconComponent = () => {
    return <MaterialCommunityIcons name={"chevron-down"} size={20} color={Colors.green} />;
  };

  return (
    <Screen style={styles.screen}>
      <Loading visible={loading} />
      {/* Nav */}
      <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.6} style={{ position: "absolute", left: 0 }} onPress={() => props.navigation.navigate("HomeScreen")}>
          <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(3) }} color="black" />
        </TouchableOpacity>
        <View
          style={{
            width: RFPercentage(35),
            height: RFPercentage(5.5),
            backgroundColor: Colors.white,
            borderRadius: RFPercentage(10),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Image style={{ width: RFPercentage(2.2), height: RFPercentage(2.2), position: "absolute", left: 0 }} source={require("../../assets/Images/search.png")} />
            <TextInput onChangeText={(e) => Searchfnc(e)} textAlign="right" style={{ width: "100%" }} placeholder="What are you looking for?" placeholderTextColor={"#3F8D79"} />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(logoutaction())} style={{ flexDirection: "row", position: "absolute", right: 0 }}>
          <AntDesign name="logout" style={{ fontSize: RFPercentage(2.7), marginLeft: RFPercentage(1) }} color={Colors.darkOrange} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: RFPercentage(6), width: "90%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
        <Text style={{ position: "absolute", left: 0, color: Colors.primary, fontSize: RFPercentage(2) }}>Choose a Location</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: RFPercentage(27),
            height: RFPercentage(5),
            borderRadius: RFPercentage(1.5),
            borderColor: Colors.primary,
            borderWidth: RFPercentage(0.1),
            position: "absolute",
            right: 0,
          }}
        >
          <View style={{ width: "90%" }}>
            <RNPickerSelect
              value={serveas}
              onValueChange={(value) => SearchbyLocation(value)}
              placeholder={{ label: "Location" }}
              Icon={Platform.OS == "android" ? null : iconComponent}
              items={Locations}
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, width: "100%", marginTop: RFPercentage(5) }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {products?.length > 0 ? (
            products.map((item, i) => (
              <>
                <View key={i} style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.4), fontFamily: "VarelaRound_400Regular" }}>{item?.category}</Text>
                </View>
                {/* Second */}
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginTop: RFPercentage(3),
                    width: "90%",
                    height: RFPercentage(30),
                    backgroundColor: Colors.white,
                    borderRadius: RFPercentage(3),
                  }}
                >
                  <View style={{ marginTop: RFPercentage(4), width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.2), fontFamily: "VarelaRound_400Regular" }}>{item?.condition?item?.condition:"Good"}</Text>
                    <TouchableOpacity activeOpacity={0.6} 
                     onPress={() => props.navigation.navigate("DetailsPageScreen", { data: item })}
                    style={{ position: "absolute", right: RFPercentage(-4) }}>
                      <Image
                        style={{ width: RFPercentage(26), height: RFPercentage(16), borderRadius: RFPercentage(2) }}
                        source={
                          item?.productimage
                            ? { uri: item.productimage } //code for customize image
                            : require("../../assets/Images/p2.png")
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: RFPercentage(10), width: "70%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ marginLeft: RFPercentage(-3), color: Colors.primary, fontSize: RFPercentage(2), fontFamily: "VarelaRound_400Regular" }}>{item?.productname}</Text>
                  </View>

                  <View style={{ marginTop: RFPercentage(2), width: "70%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("DetailsPageScreen", { data: item })}
                      activeOpacity={0.7}
                      style={{ width: RFPercentage(15), height: RFPercentage(6), backgroundColor: Colors.green, borderRadius: RFPercentage(1.5), justifyContent: "center", alignItems: "center" }}
                    >
                      <Text style={{ color: Colors.white, fontSize: RFPercentage(1.8), fontFamily: "VarelaRound_400Regular" }}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("AddProductScreen")}
                      activeOpacity={0.7}
                      style={{
                        marginLeft: RFPercentage(2),
                        width: RFPercentage(15),
                        height: RFPercentage(6),
                        backgroundColor: Colors.white,
                        borderColor: Colors.primary,
                        borderWidth: RFPercentage(0.1),
                        borderRadius: RFPercentage(1.5),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: Colors.green, fontSize: RFPercentage(1.8), fontFamily: "VarelaRound_400Regular" }}>Adding an item</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ))
          ) : (
            <Text>No Product</Text>
          )}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
      </ScrollView>

      {/* Bottom Tab */}
      <View style={{ width: "100%", position: "absolute", bottom: 0, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate("AddProductScreen")}
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
        <BottomTab />
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

export default ProductsScreen;
