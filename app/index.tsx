

import React, { useState } from "react";

import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
} from "firebase/auth";

import {
   BottomNavigationBar,
} from "@/assets/modules/clb-modules";

import { 
   View, 
   Text,
   TextInput,
   Pressable,
} from "react-native";

import { router } from "expo-router";
import TabLayout from "@/app/(tabs)/_layout";


export default function Index() {
   const 
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
   ;

   // const 
   //    SignIn = async () => {
   //       try {
   //          const user = await signInWithEmailAndPassword( FIREBASE_AUTH, Email, Password )
   //          if( user ) { router.replace( "./index0" ) }
   //       } catch( error : any ) {
   //          console.log( "SignIn error: \n\n\n", error );
   //          alert( `login failed: ${ error.message }` );   
   //       }
   //    }
   //    ,
   //    SignUp = async () => {
   //       try {
   //          const user = await createUserWithEmailAndPassword( FIREBASE_AUTH, Email, Password )
   //          if( user ) { router.replace( "./index0" ) }
   //       } catch( error : any ) {
   //          console.log( "SignUp error: \n\n\n", error );
   //          alert( `login failed: ${ error.message }` );   
   //       }
   //    }
   // ;

   return( <>
      <TabLayout />
      {/* <BottomNavigationBar /> */}
   </> );
}