import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import InputField from "./../components/common/InputField";

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
import { createUserWithEmailAndPassword, getAuth, deleteUser, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, getDoc, serverTimestamp } from "firebase/firestore";
import app from "../config/firebase";
function SignInScreen(props) {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  // Input fields
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "אימייל",
      value: "",
    },
    {
      placeholder: "סיסמה",
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
      if (tempfeilds[0].value?.length === 0 && tempfeilds[1].value?.length === 0) {
        setError("חסרים כמה פיילדים");
        settype(false);
      }
      const userinfo = await signInWithEmailAndPassword(auth, tempfeilds[0].value, tempfeilds[1].value);
      const myDocRef = doc(db, "users", userinfo.user.uid);
      const response = await getDoc(myDocRef);
      if (response.exists()) {
        dispatch(loginaction(response.data())).finally(() => {
          setError("התחבר בהצלחה");
          settype(true);
        });
      }
    } catch (e) {
      console.log(e);
      setError("נסה שוב מאוחר יותר");
      settype(false);
    } finally {
      setisload(false);
      setissubmit(true);
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
          {/* Image */}
          <Image style={{ left: RFPercentage(4), width: RFPercentage(30), height: RFPercentage(26), marginTop: RFPercentage(5) }} source={require("../../assets/Images/bag.png")} />

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
              title="התחבר"
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

          {/* Social Media Login */}
          {/* <View style={{ alignSelf: "center", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(5), width: "90%" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#F1F5F9",
                borderRadius: RFPercentage(30),
                width: RFPercentage(20),
                height: RFPercentage(6),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/google.png")} />
              <Text style={{ color: "#475569", fontSize: RFPercentage(2), marginLeft: RFPercentage(1) }}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#F1F5F9",
                borderRadius: RFPercentage(30),
                width: RFPercentage(20),
                height: RFPercentage(6),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginLeft: RFPercentage(2),
              }}
            >
              <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/facebook.png")} />
              <Text style={{ color: "#475569", fontSize: RFPercentage(2), marginLeft: RFPercentage(1) }}>Facebook</Text>
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity activeOpacity={0.5} style={{ marginTop: RFPercentage(4), justifyContent: "center", alignItems: "center" }} onPress={() => props.navigation.navigate("SignUpScreen")}>
            <Text style={{ color: "#828282", fontSize: RFPercentage(2), marginTop: RFPercentage(2) }}>צור חשבון חדש</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={{ justifyContent: "center", alignItems: "center" }} onPress={() => props.navigation.navigate("ForgotScreen")}>
            <Text style={{ color: "#828282", fontSize: RFPercentage(2), marginTop: RFPercentage(1.5) }}>שכחת את הסיסמא?</Text>
          </TouchableOpacity>
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

export default SignInScreen;
