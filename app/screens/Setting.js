import { View, Text, Modal, TouchableOpacity, Pressable, Image, StyleSheet, ImageBackground, Dimensions, Platform, Linking, ActivityIndicator, TextInput, ScrollView, FlatList } from "react-native";
import React from "react";
import colors from "../config/Colors";
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { loginaction, logoutaction } from "../redux/auth/authaction";
import userimaeg from "../../assets/Images/user.png";
import BottomTab from "../components/common/BottomTab";
import { useIsFocused } from "@react-navigation/native";
import  AntDesign  from "react-native-vector-icons/AntDesign";
import Loading from "../components/Loading";
import app from "../config/firebase";
import { createUserWithEmailAndPassword, getAuth, deleteUser, updateProfile, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, getDoc, collection, query, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request,PERMISSIONS} from "react-native-permissions"
export default function Setting({ navigation }) {
  const askForPermissions=async(permissions)=>{
    const result=await request(permissions)
    return result
}
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.AuthReducer);

  const focused = useIsFocused();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const [image, setImage] = React.useState(null);
  const [isload, setisload] = React.useState(false);
  const [profiledata, setprofiledata] = React.useState(null);
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
              // setImage(res?.assets[0].uri)
              const imageUri = res?.assets[0].uri;
              const userId = userinfo?.currentUser.userid;
              const storageRef = ref(storage, "giveawayappuserdps/" + userId + "profile +image1" + new Date().toLocaleString());
              const img = await fetch(result.uri);
              const bytes = await img.blob();
              uploadBytes(storageRef, bytes)
                .then((snapshot) => {
                  return getDownloadURL(snapshot.ref);
                })
                .then(async (downloadURL) => {
                  await updateDoc(doc(db, "users", userId), {
                    profilepic: downloadURL,
                  });
                })
                .catch((e) => {
                  alert("upload failed");
                });
              setImage(imageUri); 
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
              // setImage(res?.assets[0].uri)
              const imageUri = res?.assets[0].uri;
              const userId = userinfo?.currentUser.userid;
              const storageRef = ref(storage, "giveawayappuserdps/" + userId + "profile +image1" + new Date().toLocaleString());
              const img = await fetch(result.uri);
              const bytes = await img.blob();
              uploadBytes(storageRef, bytes)
                .then((snapshot) => {
                  return getDownloadURL(snapshot.ref);
                })
                .then(async (downloadURL) => {
                  await updateDoc(doc(db, "users", userId), {
                    profilepic: downloadURL,
                  });
                })
                .catch((e) => {
                  alert("upload failed");
                });
              setImage(imageUri);
          }
    }
  
};

  React.useEffect(() => {
    setisload(true);

    // Retrieve data from Firestore using user ID as filter
    const firestore = getFirestore();
    const userRef = doc(firestore, "users", userinfo && userinfo?.currentUser?.userid);
    getDoc(userRef)
      .then((doc) => {
        if (doc.exists()) {
          setprofiledata(doc.data());
        } else {
        }
      })
      .catch((error) => {
        console.error("Error retrieving user data:", error);
      })
      .finally(() => {
        setisload(false);
      });
  }, []);
  if (isload) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: colors.white }}>
      <View style={styles.mnonb}>
        <View style={[styles.centertext, { marginTop: rp(4) }]}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{ height: 80, width: 80, borderRadius: 40 }}
              source={profiledata?.profilepic !== "" && profiledata?.profilepic !== undefined ? { uri: profiledata?.profilepic } : userimaeg || image}
            />
          </TouchableOpacity>
          <Text style={{ color: colors.black, fontSize: rp(3), marginTop: rp(1) }}>{userinfo?.currentUser?.name ? userinfo?.currentUser?.name : ""}</Text>
          <Text style={{ color: colors.black }}>{userinfo?.currentUser?.email ? userinfo?.currentUser?.email : ""}</Text>
        </View>
        <View style={{ marginTop: rp(6) }}>
          <Pressable
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: rp(2),
              paddingVertical: rp(1.8),
              borderRadius: rp(1),
              marginBottom: rp(1),
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="sharealt" size={24} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: rp(2.3), marginLeft: rp(2) }}>לַחֲלוֹק</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: rp(0.5) }}>
          <Pressable
            onPress={() => dispatch(logoutaction())}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: rp(2),
              paddingVertical: rp(1.8),
              borderRadius: rp(1),
              marginBottom: rp(1),
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="logout" size={24} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: rp(2.3), marginLeft: rp(2) }}>להתנתק</Text>
          </Pressable>
        </View>
      </View>
      <BottomTab />
    </View>
  );
}

const styles = StyleSheet.create({
  mnonb: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: rp(3),
    paddingVertical: rp(5),
  },
  centertext: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: colors.black,
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
