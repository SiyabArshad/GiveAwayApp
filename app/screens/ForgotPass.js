import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import InputField from "./../components/common/InputField";
import Ionicons from "react-native-vector-icons/Ionicons";

//components
import Screen from "./../components/Screen";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";
import Loading from "../components/Loading";
import MessageCard from "../components/MessageCard";
import { useSelector, useDispatch } from "react-redux";
import { loginaction } from "../redux/auth/authaction";

//firebase stuff
import { createUserWithEmailAndPassword, getAuth, deleteUser, updateProfile, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, getDoc, serverTimestamp } from "firebase/firestore";
import app from "../config/firebase";

function ForgotScreen(props) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  // Input fields
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "הזן אימייל",
      value: "",
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const [isload, setisload] = React.useState(false);
  const [issubmit, setissubmit] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [type, settype] = React.useState(false);
  const handleform = async () => {
    let tempfeilds = [...inputField];
    setisload(true);
    try {
      if (tempfeilds[0].value) {
        setError("חסרים כמה פיילדים");
        settype(false);
      }
      if (tempfeilds[0].value?.length > 10) {
        try {
          await sendPasswordResetEmail(auth, tempfeilds[0].value);
          setError("דוא ל לשחזור סיסמה נשלח");
          settype(true);
        } catch (e) {
          setError("אימייל לא קיים");
          settype(false);
        }
      } else {
        setError("אישורים לא חוקיים");
        settype(false);
      }
    } catch {
      setError("נסה שוב מאוחר יותר");
      settype(false);
    } finally {
      setissubmit(true);
      setisload(false);
    }
  };
  const callbacksubmit = () => {
    setissubmit(false);
  };
  return (
    <Screen style={styles.screen}>
      <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit} />
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ width: "90%", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.navigate("SignInScreen")}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
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
            {/* Image */}
            <Image style={{ left: RFPercentage(4), width: RFPercentage(30), height: RFPercentage(26), marginTop: RFPercentage(5) }} source={require("../../assets/Images/bag.png")} />
          </View>

          {/* Input field */}
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            {inputField.map((item, i) => (
              <View key={i} style={{ marginTop: i == 0 ? RFPercentage(10) : RFPercentage(2) }}>
                <InputField
                  placeholder={item.placeholder}
                  placeholderColor={"#475569"}
                  height={RFPercentage(8)}
                  backgroundColor={"#EFEFEF"}
                  secure={item.secure}
                  borderRadius={RFPercentage(10)}
                  color={Colors.black}
                  fontSize={RFPercentage(2)}
                  handleFeild={(text) => handleChange(text, i)}
                  value={item.value}
                  width={"92%"}
                />
              </View>
            ))}
          </View>

          {/* <View style={{ width: "82%", justifyContent: "flex-start", alignItems: "flex-start", marginTop: RFPercentage(1) }}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ fontSize: RFPercentage(2.2), color: "#000113" }}>שכחת?</Text>
            </TouchableOpacity>
          </View> */}

          {/* Button */}
          <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(5) }}>
            <MyAppButton
              title="לִשְׁלוֹחַ"
              disabled={issubmit}
              onPress={handleform}
              padding={RFPercentage(1.8)}
              backgroundColor={Colors.green}
              borderColor={Colors.white}
              borderWidth={RFPercentage(0.2)}
              color={Colors.white}
              bold={false}
              fontSize={RFPercentage(2.2)}
              borderRadius={RFPercentage(20)}
              width={"80%"}
              loading={isload}
            />
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(10) }} />
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

export default ForgotScreen;
