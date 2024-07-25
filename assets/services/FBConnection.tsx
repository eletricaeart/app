

// import firebase, { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import { Database } from "firebase/database";
import database, { firebase } from '@react-native-firebase/database';

const reference = database().ref('/users/123');

const firebaseConfig = {
   apiKey: "AIzaSyAOJfkU9SdDNkhZD426G0jGW5tsMRoDkyw",
   authDomain: "eletrica-e-art.firebaseapp.com",
   projectId: "eletrica-e-art",
   storageBucket: "eletrica-e-art.appspot.com",
   messagingSenderId: "443777007460",
   appId: "1:443777007460:web:df8295ae5566e2130ac471",
   measurementId: "G-LWKXMFZSE5",
   databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

const FBApp = firebase.initializeApp( firebaseConfig );



export default firebase;

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";


// const firebaseConfig = {
//    apiKey: "AIzaSyAOJfkU9SdDNkhZD426G0jGW5tsMRoDkyw",
//    authDomain: "eletrica-e-art.firebaseapp.com",
//    projectId: "eletrica-e-art",
//    storageBucket: "eletrica-e-art.appspot.com",
//    messagingSenderId: "443777007460",
//    appId: "1:443777007460:web:df8295ae5566e2130ac471",
//    measurementId: "G-LWKXMFZSE5"
// };

// const app = initializeApp( firebaseConfig );