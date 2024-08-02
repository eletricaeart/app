

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
   apiKey: process.env.EXPO_PUBLIC_firebaseConfig_apiKey,
   authDomain: process.env.EXPO_PUBLIC_firebaseConfig_authDomain,
   databaseURL: process.env.EXPO_PUBLIC_firebaseConfig_databaseURL,
   projectId: process.env.EXPO_PUBLIC_firebaseConfig_projectId,
   storageBucket: process.env.EXPO_PUBLIC_firebaseConfig_storageBucket,
   messagingSenderId: process.env.EXPO_PUBLIC_firebaseConfig_messagingSenderId,
   appId: process.env.EXPO_PUBLIC_firebaseConfig_appId,
   measurementId: process.env.EXPO_PUBLIC_firebaseConfig_measurementId
   // databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const FIREBASE_DB = getFirestore(FIREBASE_APP);











