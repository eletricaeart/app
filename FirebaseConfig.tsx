

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { 
   getAuth, initializeAuth, getReactNativePersistence, 
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, child, get, set, update, remove, } from "firebase/database";
import { Database } from "firebase/database";
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
export const FirebaseDB = getDatabase( FirebaseApp );
export const FirestoreDB = getFirestore( FirebaseApp );
// const analytics = getAnalytics(app);



/**
 * firebase realtime database crud
 * 
 * == html implementation
 * import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
 * 
 * == app implementation
 * import { getDatabase, ref, child, get, set, update, remove } from "firebase/database";
 * export const FirebaseDB = getDatabase( FirebaseApp );
 * 
 * == app usage
 * import { FirebaseDB } from "@/FirebaseConfig";
 * import { ref, set } from "firebase/database";
 * 
 */
export async function SaveDataOnFbRDB( { ...props } ) {
   await set( ref( FirebaseDB, props.ref ), 
      props.data
   ).then( () => {
      alert( props.okMsg || "data has been sent to the cloud" );
   } ).catch( err => {
      alert( props.errMsg || "deu ruim no envio pra nuvem" );
   } );
}

async function GetDataFromFbRDB( { ...props } ) {
   try {
      // const dbRef = ref( getDatabase() );
      const dbRef = ref( FirebaseDB );
      const data = "";

      get(
         child( dbRef, props.ref ).then( snapshot => {
            if( snapshot.exists() ) {
               props.dataHolder = ( snapshot.val().vampire ) ? "Sim" : "Não";

            } else {
               alert( "User doens't exist" );
            }
         } )
      );

      return data;
   } catch( err ) {
      alert( "Unsuccessful" );
   }
}

async function UpdateDataOnFbRDB( { ...props } ) {
   await update( 
      ref( FirebaseDB, props.ref ),  
      props.data
   ).then( () => {
      alert( props.okMsg || "data has been updated on the cloud" );
   } ).catch( err => {
      alert( props.errMsg || "deu ruim pra atualizar na nuvem" );
   } );
}

async function RemoveDataOnFbRDB( { ...props } ) {
   await remove( ref( FirebaseDB, props.ref
   ) ).then( () => {
      alert( props.okMsg || "data has been destroyed on the cloud");
   } ).catch( err => {
      alert( props.errMsg || "deu ruim pra deletar da nuvem" );
   } );
}