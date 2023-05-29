// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgsZVZKpg5l-D19JpGzEd5-BtcI09OoE0",
  authDomain: "giveaway-f9613.firebaseapp.com",
  projectId: "giveaway-f9613",
  storageBucket: "giveaway-f9613.appspot.com",
  messagingSenderId: "527947884746",
  appId: "1:527947884746:web:0ee22167fd3d0d1f892c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;