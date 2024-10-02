
// https://medium.com/@adityasinghrathore360/implementing-firebase-authentication-in-react-native-app-with-expo-a-detailed-explanation-cea4d1113501

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, initializeAuth, getReactNativePersistence, } from "firebase/auth";

// Have to do ts-ignore as getReactNativePersistence is not detected by ts compiler with firebase 10.3.0
// @ts-ignore 
import { 
   initializeAuth, 
   getReactNativePersistence, 
   getAuth 
} from "@firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, child, get, set, update, remove, } from "firebase/database";
import { Database } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_firebaseConfig_apiKey,
  authDomain: process.env.EXPO_PUBLIC_firebaseConfig_authDomain,
  databaseURL: process.env.EXPO_PUBLIC_firebaseConfig_databaseURL,
  projectId: process.env.EXPO_PUBLIC_firebaseConfig_projectId,
  storageBucket: process.env.EXPO_PUBLIC_firebaseConfig_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_firebaseConfig_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_firebaseConfig_appId,
  measurementId: process.env.EXPO_PUBLIC_firebaseConfig_measurementId
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

// initializeAuth( FirebaseApp, {
//    persistence: getReactNativePersistence( AsyncStorage )
// } );

// Have to do ts-ignore as getReactNativePersistence is not detected by ts compiler with firebase 10.3.0
// @ts-ignore 
// export const FirebaseAuth = initializeAuth( FirebaseApp, {
//    persistence: getReactNativePersistence( ReactNativeAsyncStorage )
// } );

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


/**
 * Save data
 * == == == == == == == == == */
type SaveDataProps = { 
   ref: string; 
   data: {}; 
   okMsg: string; 
   errMsg: string; 
};

export async function SaveDataOnFbRTDB( { ...props }: SaveDataProps ) {
   await set( ref( FirebaseDB, props.ref ), 
      props.data
   ).then( () => {
      // alert( props.okMsg || "data has been sent to the cloud" );
      ToastAndroid.show( props.okMsg || "data has been sent to the cloud", ToastAndroid.SHORT );
   } ).catch( err => {
      // alert( || "deu ruim no envio pra nuvem" );
      ToastAndroid.show( props.errMsg  || "deu ruim no envio pra nuvem", ToastAndroid.SHORT );
   } );
}

/**
 * Get data
 * == == == == == == == == == */
type GetDataProps = { 
   ref: string; 
   dataHolder: any; 
   value?: string; 
};

export async function GetDataFromFbRDB( { ...props }: GetDataProps ) {
   try {
      // const dbRef = ref( getDatabase() );
      const dbRef = ref( FirebaseDB );
      const data = "";

      get(
         child( ref( FirebaseDB ), props.ref ).then( snapshot => {
            if( snapshot.exists() ) {
               props.dataHolder = ( snapshot.val().vampire ) ? "Sim" : "Não";
               // props.dataHolder = ( snapshot.val(). ) ? "Sim" : "Não";

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

/**
 * Fetch data
 * == == == == == == == == == */
type FetchDataProps = {
   ref: string;
};

export async function FetchRTDBData( { ...props }: FetchDataProps ) {
   async function handle() {
      try {
         // const dbRef = ref( getDatabase() );
         // let 
         //    data ;
         //    await get(
         //       child( ref( FirebaseDB ), props.ref )
         //    ).then( snapshot => {
         //       if( snapshot.exists() ) {
         //          console.log( "snapshot.val(): ", snapshot.val() );
         //          data = snapshot.val();
         //       } else {
         //          console.log( "No data available" );
         //       }
         //    } ).catch( err => {
         //       console.error( err );
         //    } )
         // ;
   
         // return data;

         return await get( child( ref( FirebaseDB ), props.ref ) );
      } catch( err: any ) {
         console.log( "Unsuccessful: ", err );
      }
   }
   handle().then( fb => {
      console.log( "fb?.val(): ", fb?.val() );
      return fb?.val();
   } );
}

/**
 * Update data
 * == == == == == == == == == */
type UpdateDataProps = {
   ref: string;
   data: {};
   okMsg: string;
   errMsg: string;
};

export async function UpdateDataOnFbRDB( { ...props }: UpdateDataProps ) {
   await update( 
      ref( FirebaseDB, props.ref ),  
      props.data
   ).then( () => {
      alert( props.okMsg || "data has been updated on the cloud" );
   } ).catch( err => {
      alert( props.errMsg || "deu ruim pra atualizar na nuvem" );
   } );
}


/**
 * Remove data
 * == == == == == == == == == */
type RemoveDataProps = {
   ref: string;
   okMsg: string;
   errMsg: string;
};

async function RemoveDataOnFbRDB( { ...props }: RemoveDataProps ) {
   await remove( 
      ref( FirebaseDB, props.ref )
   ).then( () => {
      alert( props.okMsg || "data has been destroyed on the cloud");
   } ).catch( err => {
      alert( props.errMsg || "deu ruim pra deletar da nuvem" );
   } );
}