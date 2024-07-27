


import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import {
   View,
   Text,
   Image,
   Button,
} from "react-native";

import { FirebaseAuth } from "@/FirebaseConfig";
import {
   onAuthStateChanged,
   User,
} from "firebase/auth";

import {
   AppBar,
   AppBarLeft,
   AppBarRight,
   BottomNavigationBar,
   PageFooter,
} from "@/assets/modules/clb-modules";

import { Icon } from "@/assets/modules/clb-icons";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const 
      [ User, setUser ] = useState<User | null>( null )
      , 
      [loaded] = useFonts( {
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
      } )   
   ;

   useEffect( () => {
     if( loaded ) {
         SplashScreen.hideAsync();
     }
   }, [loaded] );
 
   if( !loaded ) { return null; }

   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, user => {
         console.log( { User } );
         setUser( User ); 
      } );
   }, [] );

   return( <>
      <Stack screenOptions={ { ...stack_screenOptions } } >
         <Stack.Screen name="jf" options={ { ...screen_00_options } } />
         <Stack.Screen name="+not-found" />
      </Stack>
   </> );
}

const 
   stack_screenOptions = {
      headerShown: false,
      headerTitleAlign: "center"
      ,
      headerTintColor: "#e5e5e5"
      ,
      headerTitleStyle: {
         // fontFamily: "GodOfThunder",
         fontWeight: "bold",
         color: "#fff",
      }
      // ,
      // headerStyle: {
      //    backgroundColor: "#00559C",
      // }
      ,
      statusBarColor: "#00559c",
      headerBlurEffect: "regular",
      headerTransparent: true,
   }
   ,
   screen_00_options = {
      // headerTitle: "Eletrica & Art",
      headerShown: false,
   }
;