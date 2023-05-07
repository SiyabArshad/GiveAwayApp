import { authContants } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc} from "firebase/firestore"
import app from '../../config/firebase';
const db=getFirestore(app)

export const getCurrentuser=()=>{
    return async(dispatch)=>{
        const jsonValue = await AsyncStorage.getItem('giveawayapp')
        const currentuser=jsonValue != null ? JSON.parse(jsonValue) : null;//data will come form async storage
            dispatch({
                type:authContants.currentuser,
                payload:currentuser
            })
    }
}
export const loginaction = (payload) => {
    return async (dispatch) => {
      try {
        //logic comes here
        const jsonValue = JSON.stringify(payload);
        const dataofuser = await AsyncStorage.setItem("giveawayapp", jsonValue);
        dispatch({
          type: authContants.login,
          payload: payload,
        });
      } catch (error) {
        console.log("Error in loginaction: ", error);
      }
    };
  };
  
export const logoutaction=()=>{
    return async(dispatch)=>{
        //logic comes here
        await AsyncStorage.removeItem("giveawayapp")
        dispatch({
            type:authContants.logout
        })
    }
}