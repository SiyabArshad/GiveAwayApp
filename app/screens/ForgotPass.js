import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import InputField from "./../components/common/InputField";

//components
import Screen from "./../components/Screen";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";
import Loading from "../components/Loading"
import MessageCard from "../components/MessageCard"
import { useSelector,useDispatch } from 'react-redux';
import { loginaction } from '../redux/auth/authaction';
//firebase stuff
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, serverTimestamp} from "firebase/firestore"
import app from '../config/firebase';
function ForgotScreen(props) {
  const db=getFirestore(app)
  const auth=getAuth(app)
  const dispatch=useDispatch()
  // Input fields
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "Email",
      value: "",
    }
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

const [isload,setisload]=React.useState(false)
const [issubmit,setissubmit]=React.useState(false)
const [Error,setError]=React.useState('')
const [type,settype]=React.useState(false)
const handleform=async()=>{
  let tempfeilds = [...inputField];
  setisload(true)
    try{
        if(tempfeilds[0].value)
        {
        setError("Some Feilds are Missing")
        settype(false)
        }
        if(tempfeilds[0].value?.length>10){
           try{
            await sendPasswordResetEmail(auth,tempfeilds[0].value)
            setError("Password Recovery Email sent")
            settype(true)
           }
           catch(e){
            setError("Email not exist")
            settype(false)
         
           }
        }
        else
        {
            setError("Invalid Credentials")
            settype(false)
       
        }
    }
    catch{
        setError("Try again later")
        settype(false)
       
    }
    finally{
      setissubmit(true)
    setisload(false)
    }
}
const callbacksubmit=()=>{
    setissubmit(false)
}
  return (
    <Screen style={styles.screen}>
        <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
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
              title="Send"
              disabled={issubmit} 
              onPress={handleform}
              padding={RFPercentage(1.8)}
              backgroundColor={Colors.green}
              borderColor={Colors.white}
              borderWidth={RFPercentage(0.2)}
              color={Colors.white}
              bold={false}
              fontSize={RFPercentage(2.2)}
              fontFamily={"VarelaRound_400Regular"}
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
