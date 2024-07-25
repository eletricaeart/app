

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

const firebaseConfig = {
   apiKey: "AIzaSyAOJfkU9SdDNkhZD426G0jGW5tsMRoDkyw",
   authDomain: "eletrica-e-art.firebaseapp.com",
   projectId: "eletrica-e-art",
   storageBucket: "eletrica-e-art.appspot.com",
   messagingSenderId: "443777007460",
   appId: "1:443777007460:web:df8295ae5566e2130ac471",
   measurementId: "G-LWKXMFZSE5",
   // databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const FIREBASE_DB = getFirestore(FIREBASE_APP);











