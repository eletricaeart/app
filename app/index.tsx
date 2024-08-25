

import React, {
   useState, useEffect,
} from "react";

import {
   StyleSheet,
   View, Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView,
   ImageBackground,
   Image,
} from "react-native";

import {
   Btn,
   BtnTxt,
   Content,
   Input,
   Label, LabelText,
   Section,
   T2,
} from "@/src/widgets/ui";

import { BlurView } from 'expo-blur';


import { ActivityIndicator, Button } from "react-native-paper";

// import AuthLayout from "@/app/(auth)/_layout";
import AuthLayout from "@/app/(auth)/";
import TabLayout from "@/app/(tabs)/_layout";

import * as CStore from "@/src/widgets/clb-dbs";
import { colors } from "@/src/widgets/clb-colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, FirebaseAuth, SaveDataOnFbRDB,  } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User,
   getAuth, 
   signOut,
} from "firebase/auth";
import { firebase } from "@react-native-firebase/database";

import {
   BtnSquare01,
} from "@/src/widgets/clb-svg";
import { get, child, ref, getDatabase } from "firebase/database";


export default function Index() {
   const 
      // bgImage = require( "@/src/images/bgs/bg_09.jpeg" )
      // ,
      [ User, setUser ] = useState<User | null>( null ),
      [ Name, setName ] = useState( "" ),
      [ Email, setEmail ] = useState( "" ),
      [ Password, setPassword ] = useState( "" ),
      [ Loading, setLoading ] = useState( false ),
      [ IsLogin, setIsLogin ] = useState( true ),
      auth = FirebaseAuth
      ,
      SignIn = async () => {
         setLoading( true );
         await CStore.DeleteData( "user" );
         async function Handle() {
            try {
               const 
                  response = await signInWithEmailAndPassword( auth, Email, Password )
                  ,
                  userUid = response.user.uid
               ;

               console.log( "SigIn() response: \n\n\n", response );
               
               return { response, userUid };
            }
            catch( err: any ) {
               console.log( "SignIn() err: \n\n\n", err );
               alert( `Não consegui fazer seu login!\naconteceu esse erro aqui: ${ err.code }\n${ err.message }` );
            }
            finally {
               setLoading( false );
            }
         }
         Handle().then( returned => {
            async function CreateUserSpace() {
               try {
                  const 
                     // name = await get( child( ref( getDatabase() ), `users/${ returned?.user.uid }/name` ) )
                     // ,
                     userData = {
                        name: "",
                        // uid: returned?.user.uid,
                        uid: returned?.userUid,
                     }
                     ,
                     userReady = JSON.stringify( userData )
                  ;
                  await CStore.StoreData( userReady, "user" );
               } catch( err: any ) { console.log( "CreateUserSpace() err: ", err ); }
            }
            CreateUserSpace();
         } );
      }
      ,
      SignUp = async () => {
         setLoading( true );
         async function Handle() {
            try {
               const 
                  response = await createUserWithEmailAndPassword( auth, Email, Password )
                  ,
                  userUid = response.user.uid
               ;

               console.log( "SigUp() response: \n\n\n", response );
               
               return response;
            }
            catch( err: any ) {
               console.log( "SignUp() err: \n\n\n", err );
               alert( `Deu ruim no cadastro!\n\ncódigo do erro: ${ err.code }\n${ err.message }` );
            }
            finally {
               setLoading( false );
            }
         }
         Handle().then( value => {
            const 
               userData = {
                  name: Name,
                  uid: value?.user.uid,
               }
               ,
               userReady = JSON.stringify( userData )
            ;
            async function CreateUserSpace() {
               SaveDataOnFbRDB( {
                  ref: `users/${ userData.uid }/name`,
                  data: Name,
               } );
               SaveDataOnFbRDB( {
                  ref: `users/${ userData.uid }/uid`,
                  data: userData.uid,
               } );
               await CStore.StoreData( userReady, "user" );
            }
            CreateUserSpace();
         } );
      }
      ,
      SaveUser2DBs = async () => {
         try {
            const 
               data = JSON.stringify( User )
            ;
            await AsyncStorage.setItem( "User", data );
            
            console.log( "SaveUser2DBs() User: \n\n\n", User );
            alert( `SaveUser2DBs() User: \n\n\n ${ User }` );
            
            alert( "Bem Vindo" );
            
         } catch( err ) {
            console.log( "\n\n== == == == == ==\nSaveUser2DBs() saving error: \n", err );
         }
      }
   ;



   async function FetchData() {
      try {
         const 
            localUser: string | null = await AsyncStorage.getItem( "user" )
            ,
            // parsedUser: string = JSON.parse( localUser! )
            parsedUser = localUser ? JSON.parse( localUser ) : null
            ,
            userData = { ...parsedUser }
         ;
         await get( child( ref( getDatabase() ), `users/${ userData.uid }/name` ) )
         .then(
            name => { 
               userData.name = name;
               // setCustomersFB( list );
               // setLoading( false );
               // console.log( "name: ", name );
               console.log( "userData: ", userData );
               return userData;
            }
         );
      } catch( err: any ) {
         alert( `Deu ruim no FetchData() err: \ncode: ${err.code} \nmsg: ${err.message}` );
      }
   }




   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, User => {
         console.log( "aqui[]: ", User );
         setUser( User ); 
      } );
   }, [] );

   useEffect( () => {
      async function load() {
         if( User ) {
            const jsn = JSON.stringify( User );
            await AsyncStorage.setItem( "User", jsn );
         }
      }
      load();
   }, [ User ] );

   // firebase.database().ref( "users" ).child( value.user.uid ).set( { name: name } );


   return( <>
      { User ? 
         ( <TabLayout /> ) 
         : 
         ( <AuthLayout /> )
      }
   </> );
}

