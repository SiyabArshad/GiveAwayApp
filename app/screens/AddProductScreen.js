import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Button, Image, ActivityIndicator, Pressable } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";

//components
import Screen from "./../components/Screen";
import InputField from "./../components/common/InputField";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";
import Loading from "../components/Loading";
import MessageCard from "../components/MessageCard";
import { useSelector, useDispatch } from "react-redux";
import { loginaction } from "../redux/auth/authaction";
//firebase stuff
import { createUserWithEmailAndPassword, getAuth, deleteUser, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, getDoc, serverTimestamp, collection } from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import Locations from "../config/locations";
import app from "../config/firebase";
const STORAGE_BUCKET = "giveaway-f9613.appspot.com";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request,PERMISSIONS} from "react-native-permissions"
function AddProductScreen(props) {
  const askForPermissions=async(permissions)=>{
    const result=await request(permissions)
    return result
}
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.AuthReducer);
  const [serveas, setserveas] = useState("Furniture");
  const [location, setlocation] = React.useState("New York Street");
  const [selectedImage, setSelectedImage] = useState(null);
  const [indicator, showIndicator] = useState(false);
  const [isload, setisload] = React.useState(false);
  const [issubmit, setissubmit] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [type, settype] = React.useState(false);
  const [tab, settab] = React.useState(0);
  const [cond, setcond] = React.useState("Good");
  // Input fields
  const [inputField, SetInputField] = useState([
    {
      placeholder: "שם מוצר",
      value: "",
    },
    {
      placeholder: "טלפון",
      value: "",
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const iconComponent = () => {
    return <MaterialCommunityIcons name={"chevron-down"} size={20} color={Colors.green} />;
  };

  // Image Picker
  const [image, setImage] = useState(null);

  const pickImage = async() => {
    if(Platform.OS==="ios")
    {
        const rees=askForPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY)
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 0.7,
            maxWidth: 500,
            maxHeight: 500,
          };
          
          const res=await launchImageLibrary(options);
          if(!res.didCancel)
          {
              setImage(res?.assets[0].uri)
          }
    }
    else
    {
        askForPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        const options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 0.7,
            maxWidth: 500,
            maxHeight: 500,
          };
          
          const res=await launchImageLibrary(options);
          if(!res.didCancel)
          {
              setImage(res?.assets[0].uri)
          }
    }
  
};


  const handleform = async () => {
    console.log("Starting handleform");
    let tempfeilds = [...inputField];
    if (tempfeilds[0].value === "" || tempfeilds[1].value === "" || image === null) {
      alert("נא למלא את כל השדות");
      return true;
    }
    setisload(true);
    try {
      const storageRef = ref(storage, `Giveawayapp/${userinfo?.currentUser?.userid}${new Date().toLocaleString()}`);
      console.log("storageRef:", storageRef);
      const img = await fetch(image);
      console.log("img:", img);
      const bytes = await img.blob();
      console.log("bytes:", bytes);

      const snapshot = await uploadBytes(storageRef, bytes);
      console.log("snapshot:", snapshot);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("downloadURL:", downloadURL);
      const data = {
        category: serveas,
        location: location,
        productname: tempfeilds[0].value,
        productimage: downloadURL,
        phone: tempfeilds[1].value,
        condition: cond,
        userid: userinfo?.currentUser?.userid,
      };
      await addDoc(collection(db, "products"), data);
      console.log("המוצר נוסף בהצלחה");
      setError("המוצר נוסף בהצלחה");
      settype(true);
    } catch (error) {
      console.log("Error:", error);
      setError("פעולה נכשלה");
      settype(false);
    } finally {
      console.log("לבסוף לחסום");
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
      <View style={{ marginTop: RFPercentage(4), width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
        {/* Back */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.goBack()} style={{ position: "absolute", left: 0 }}>
          <View
            // colors={["#38EF7D", "#11998E"]}
            // start={[1, 1]}
            // end={[0.5, 0.1]}
            style={{ backfaceVisibility:Colors.green,justifyContent: "center", alignItems: "center", width: RFPercentage(4), height: RFPercentage(4), borderRadius: RFPercentage(30) }}
          >
            <Ionicons name="chevron-back-outline" style={{ fontSize: RFPercentage(3) }} color={Colors.green} />
          </View>
        </TouchableOpacity>
        <Text style={{ color: Colors.primary, fontSize: RFPercentage(2.3) }}>הוסף מוצר</Text>
      </View>

      <View style={{ marginTop: RFPercentage(5), width: "90%", justifyContent: "center", alignItems: "flex-start" }}>
        <Text style={{ color: Colors.black, fontSize: RFPercentage(2.2), fontWeight: "bold" }}>פרטי מודעה:</Text>
      </View>

      {/* Input Fields */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1, width: "100%" }}>
        <ScrollView style={{ flex: 1, width: "100%", marginTop: RFPercentage(1) }}>
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            <View
              style={{
                borderColor: Colors.green,
                height: RFPercentage(7),
                borderWidth: RFPercentage(0.2),
                borderRadius: RFPercentage(2),
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFPercentage(3),
              }}
            >
              <View style={{ width: "90%" }}>
                <RNPickerSelect
                  value={serveas}
                  onValueChange={(value) => setserveas(value)}
                  placeholder={{ label: "סוג מוצר" }}
                  Icon={Platform.OS == "android" ? null : iconComponent}
                  items={[
                    { label: "Furniture", value: "Furniture" },
                    { label: "Appliances", value: "Appliances" },
                    { label: "Clothing + footwear", value: "Clothing + footwear" },
                    { label: "Sport", value: "Sport" },
                  ]}
                />
              </View>
            </View>

            <View
              style={{
                borderColor: Colors.green,
                height: RFPercentage(7),
                borderWidth: RFPercentage(0.2),
                borderRadius: RFPercentage(2),
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFPercentage(3),
              }}
            >
              <View style={{ width: "90%" }}>
                <RNPickerSelect
                  value={location}
                  onValueChange={(value) => setlocation(value)}
                  placeholder={{ label: "בחר את המיקום שלך" }}
                  Icon={Platform.OS == "android" ? null : iconComponent}
                  items={Locations}
                />
              </View>
            </View>

            {/* Input field */}
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
              {inputField.map((item, i) => (
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(2) }}>
                  <InputField
                    placeholder={item.placeholder}
                    placeholderColor={"#475569"}
                    height={item.height}
                    backgroundColor={"#EFEFEF"}
                    secure={item.secure}
                    multiline={item.multiLine}
                    borderRadius={RFPercentage(2)}
                    color={Colors.black}
                    fontSize={RFPercentage(2)}
                    handleFeild={(text) => handleChange(text, i)}
                    value={item.value}
                    width={"92%"}
                  />
                </View>
              ))}
            </View>
            <View style={{ marginVertical: RFPercentage(2), display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "90%" }}>
              <View style={{ justifyContent: "flex-start", flexDirection: "row", alignItems: "center", marginRight: RFPercentage(5) }}>
                <Text style={{ marginRight: RFPercentage(1), color: Colors.primary, fontSize: RFPercentage(2.2) }}>מצב:</Text>
                <Pressable
                  onPress={() => {
                    settab(0);
                    setcond("טוֹב");
                  }}
                  style={{
                    backgroundColor: tab === 0 ? Colors.primary : Colors.white,
                    paddingHorizontal: RFPercentage(3),
                    paddingVertical: RFPercentage(2),
                    borderRadius: 5,
                    marginRight: RFPercentage(1),
                  }}
                >
                  <Text style={{ color: tab === 0 ? Colors.white : Colors.primary }}>טוֹב</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    settab(1);
                    setcond("רַע");
                  }}
                  style={{
                    backgroundColor: tab === 1 ? Colors.primary : Colors.white,
                    paddingHorizontal: RFPercentage(3),
                    paddingVertical: RFPercentage(2),
                    borderRadius: 5,
                    marginRight: RFPercentage(1),
                  }}
                >
                  <Text style={{ color: tab === 1 ? Colors.white : Colors.primary }}>רַע</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    settab(2);
                    setcond("מְעוּלֶה");
                  }}
                  style={{
                    backgroundColor: tab === 2 ? Colors.primary : Colors.white,
                    paddingHorizontal: RFPercentage(1.5),
                    paddingVertical: RFPercentage(2),
                    borderRadius: 5,
                    marginRight: RFPercentage(1),
                  }}
                >
                  <Text style={{ color: tab === 2 ? Colors.white : Colors.primary }}>מְעוּלֶה</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: RFPercentage(6), width: "88%", justifyContent: "center", alignItems: "flex-end" }}>
              <Text style={{ color: Colors.darkOrange, fontSize: RFPercentage(2.1) }}>הוספת תמונות:</Text>
            </View>

            {/* Image Picker */}
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.6}
              style={{
                width: "88%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: Colors.green,
                borderWidth: RFPercentage(0.2),
                marginTop: RFPercentage(3),
                borderRadius: RFPercentage(2),
                height: RFPercentage(30),
                overflow: "hidden",
              }}
            >
              {image ? (
                <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
              ) : (
                <Image style={{ width: RFPercentage(4), height: RFPercentage(4) }} source={require("../../assets/Images/add.png")} />
              )}
            </TouchableOpacity>

            {/* Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFPercentage(6),
                width: "70%",
                height: RFPercentage(8),
                backgroundColor: "#4F8472",
                borderRadius: RFPercentage(2),
              }}
              disabled={issubmit}
              onPress={handleform}
            >
              {isload ? (
                <ActivityIndicator size={24} color={Colors.white} />
              ) : (
                <>
                  <Image style={{ width: RFPercentage(4), height: RFPercentage(4) }} source={require("../../assets/Images/heart.png")} />
                  <Text style={{ marginLeft: RFPercentage(1), color: Colors.white, fontSize: RFPercentage(2.4) }}>מוסר.ת מכל ה-</Text>
                </>
              )}
            </TouchableOpacity>
            <View style={{ marginBottom: RFPercentage(4) }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default AddProductScreen;
