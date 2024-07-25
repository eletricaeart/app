

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOJfkU9SdDNkhZD426G0jGW5tsMRoDkyw",
  authDomain: "eletrica-e-art.firebaseapp.com",
  databaseURL: "https://eletrica-e-art-default-rtdb.firebaseio.com",
  projectId: "eletrica-e-art",
  storageBucket: "eletrica-e-art.appspot.com",
  messagingSenderId: "443777007460",
  appId: "1:443777007460:web:df8295ae5566e2130ac471",
  measurementId: "G-LWKXMFZSE5"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
// const analytics = getAnalytics(app);